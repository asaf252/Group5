import datetime

from flask import Blueprint, request, session, jsonify, render_template, redirect

from PartC.db_connector import mydatabase

# יצירת Blueprint עבור ניהול הוספת כלבים
AddDog_bp = Blueprint(
    'AddDog',
    __name__,
    static_folder='static',
    static_url_path='/AddDog',
    template_folder='templates',
)


# נתיב להצגת עמוד הוספת כלב (GET)
@AddDog_bp.route('/AddDog', methods=['GET'])
def add_dog_page():
    if 'email' not in session:
        # מפנה לדף ההתחברות אם המשתמש לא מחובר
        return redirect('/')
    return render_template("AddDog.html")


# נתיב לטיפול בבקשת הוספת כלב (POST)
@AddDog_bp.route('/add_dog', methods=['POST'])
def add_dog():
    # בדיקה אם המשתמש מחובר
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    data = request.get_json()
    print("📩 Request received at /add_dog")
    print("✅ Raw received data:", data)

    dogs_col = mydatabase["Dogs"]

    # ולידציה בסיסית (שרתית) לשדות החובה
    if not data.get("dogName") or len(data["dogName"]) < 2:
        return jsonify({"error": "Dog name must be at least 2 characters"}), 400

    if not data.get("breed"):
        return jsonify({"error": "Breed is required"}), 400

    if not data.get("age") or not isinstance(data["age"], int) or data["age"] <= 0:
        return jsonify({"error": "Age must be a positive integer"}), 400

    if not data.get("weight") or not isinstance(data["weight"], (int, float)) or data["weight"] <= 0:
        return jsonify({"error": "Weight must be a positive number"}), 400

    # המרת vaccinationStatus לבוליאן (True/False)
    vaccination_status = bool(data.get("vaccinationStatus", False))

    # המרת birthdate אם קיים (לא חובה)
    # אם תרצה לשמור תאריך לידה, השאר. אחרת אפשר להוריד.
    birthdate_str = data.get("birthdate")
    if birthdate_str:
        try:
            birthdate_obj = datetime.datetime.strptime(birthdate_str, "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid birthdate format (YYYY-MM-DD)"}), 400
    else:
        birthdate_obj = None

    # יצירת מסמך חדש במסד הנתונים
    new_dog = {
        "ownerEmail": session["email"],
        "dogName": data["dogName"],
        "breed": data["breed"],
        "age": data["age"],
        "weight": data["weight"],
        "behaviorNotes": data.get("behaviorNotes", ""),
        "favoriteFood": data.get("favoriteFood", ""),
        "medicalConditions": data.get("medicalConditions", []),
        "vaccinationStatus": vaccination_status,
        "birthdate": birthdate_obj
    }

    result = dogs_col.insert_one(new_dog)
    if result.inserted_id:
        return jsonify({"message": "Dog added successfully!", "dogId": str(result.inserted_id)}), 200
    else:
        return jsonify({"error": "Failed to add dog"}), 500
