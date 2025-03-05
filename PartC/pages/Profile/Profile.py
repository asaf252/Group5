from flask import Blueprint, render_template, request, session, jsonify, redirect
from PartC.db_connector import mydatabase
from datetime import datetime
from bson.objectid import ObjectId

# יצירת Blueprint לפרופיל
Profile_bp = Blueprint(
    'Profile_bp',
    __name__,
    static_folder='static',
    template_folder='templates',
    static_url_path='/Profile'
)

# מסלול להצגת עמוד הפרופיל עם בדיקת התחברות
@Profile_bp.route('/Profile', methods=['GET'])
def profile_page():
    if 'email' not in session:
        return redirect('/')  # מפנה לדף הבית אם המשתמש לא מחובר
    return render_template("Profile.html")

# מסלול לשליפת נתוני הפרופיל
@Profile_bp.route('/Profile/data', methods=['GET'])
def get_profile_data():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    user_email = session['email']
    users_col = mydatabase["registered_users"]
    dogs_col = mydatabase["Dogs"]
    orders_col = mydatabase["Orders"]

    user = users_col.find_one({"email": user_email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    user["_id"] = str(user["_id"])

    # שליפת הכלבים השייכים למשתמש
    dogs = list(dogs_col.find({"ownerEmail": user_email}))
    for dog in dogs:
        dog["_id"] = str(dog["_id"])

    # שליפת ההזמנות
    orders = list(orders_col.find({"userEmail": user_email}))
    for order in orders:
        order["_id"] = str(order["_id"])

    return jsonify({
        "client": user,
        "dogs": dogs,
        "orders": orders
    })

# מסלול לעדכון פרטי המשתמש
@Profile_bp.route('/Profile/update', methods=['POST'])
def update_profile():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    data = request.get_json()
    users_col = mydatabase["registered_users"]

    update_fields = {
        "firstName": data.get("firstName"),
        "lastName": data.get("lastName"),
        "phone": data.get("phone")
    }

    result = users_col.update_one({"email": session["email"]}, {"$set": update_fields})
    if result.modified_count:
        return jsonify({"message": "Profile updated successfully!"}), 200
    else:
        return jsonify({"error": "No changes made or update failed."}), 400

# מסלול למחיקת כלב
@Profile_bp.route('/Profile/delete_dog', methods=['POST'])
def delete_dog():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    data = request.get_json()
    dog_id = data.get("dogId")
    dogs_col = mydatabase["Dogs"]

    result = dogs_col.delete_one({"_id": ObjectId(dog_id), "ownerEmail": session["email"]})
    if result.deleted_count:
        return jsonify({"message": "Dog deleted successfully!"}), 200
    else:
        return jsonify({"error": "Dog deletion failed."}), 400

# מסלול לביטול הזמנה
@Profile_bp.route('/Profile/cancel_order', methods=['POST'])
def cancel_order():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    data = request.get_json()
    order_id = data.get("orderId")
    orders_col = mydatabase["Orders"]

    order = orders_col.find_one({"_id": ObjectId(order_id), "userEmail": session["email"]})
    if not order:
        return jsonify({"error": "Order not found"}), 404

    until_date = order["untilDate"]
    now = datetime.utcnow()

    if until_date < now:
        return jsonify({"error": "Cannot cancel a past order."}), 400

    result = orders_col.delete_one({"_id": ObjectId(order_id)})
    if result.deleted_count:
        return jsonify({"message": "Order cancelled successfully!"}), 200
    else:
        return jsonify({"error": "Order cancellation failed."}), 400
