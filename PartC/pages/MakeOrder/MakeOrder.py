from flask import Blueprint, render_template, request, session, jsonify, redirect
from PartC.db_connector import mydatabase  # חיבור למונגו
from datetime import datetime  # נשתמש לשמירת תאריך הזמנה

# יצירת Blueprint
MakeOrder_bp = Blueprint(
    'MakeOrder',
    __name__,
    static_folder='static',
    template_folder='templates',
    static_url_path='/MakeOrder',
)

# חיבור לקולקציה החדשה של הזמנות
orders_col = mydatabase["Orders"]


# מסלול להצגת עמוד ההזמנה עם בדיקת התחברות
@MakeOrder_bp.route('/MakeOrder', methods=['GET'])
def new_order_page():
    if 'email' not in session:
        return redirect('/')  # אם המשתמש לא מחובר, מפנה לדף ההתחברות
    return render_template('MakeOrder.html')


# מסלול לקבלת נתוני משתמש, כלבים וכלביות
@MakeOrder_bp.route('/MakeOrder/data', methods=['GET'])
def get_order_data():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    user_email = session['email']
    users_col = mydatabase["registered_users"]
    kennels_col = mydatabase["Kennels"]
    dogs_col = mydatabase["Dogs"]

    user = users_col.find_one({"email": user_email}, {"_id": 0, "firstName": 1, "lastName": 1})
    if not user:
        return jsonify({"error": "User not found"}), 404

    full_name = f"{user['firstName']} {user['lastName']}"

    kennels = list(kennels_col.find({}, {"_id": 0, "name": 1, "Price": 1, "WeekEndPrice": 1}))

    user_dogs = list(dogs_col.find({"ownerEmail": user_email}, {"_id": 0, "dogName": 1}))

    return jsonify({
        "fullName": full_name,
        "kennels": kennels,
        "dogs": [dog["dogName"] for dog in user_dogs]
    })


# מסלול לשמירת הזמנה
@MakeOrder_bp.route('/MakeOrder/submit', methods=['POST'])
def submit_order():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    data = request.get_json()

    # בדיקות תקינות של הנתונים
    required_fields = ["kennel", "ownerName", "dogName", "fromDate", "untilDate", "totalPrice"]
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # יצירת מסמך להזמנה
    new_order = {
        "userEmail": session['email'],
        "kennel": data["kennel"],
        "ownerName": data["ownerName"],
        "dogName": data["dogName"],
        "fromDate": datetime.strptime(data["fromDate"], "%Y-%m-%d"),
        "untilDate": datetime.strptime(data["untilDate"], "%Y-%m-%d"),
        "totalPrice": float(data["totalPrice"]),
        "timestamp": datetime.utcnow()
    }

    orders_col.insert_one(new_order)
    print(f"✅ Order saved: {new_order}")

    return jsonify({"message": "Order saved successfully!"}), 200
