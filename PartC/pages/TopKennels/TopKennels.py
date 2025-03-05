from flask import Blueprint, request, render_template, jsonify
from PartC.db_connector import Kennels_col  # חיבור למסד הנתונים

# יצירת Blueprint
TopKennels_bp = Blueprint(
    'TopKennels',
    __name__,
    static_folder='static',
    template_folder='templates',
    static_url_path = '/TopKennels',
)

# מסלול להצגת עמוד התוצאות
@TopKennels_bp.route('/TopKennels', methods=['GET'])
def top_kennels_page():
    return render_template('TopKennels.html')

# מסלול לקבלת הכלביות עם מיון
@TopKennels_bp.route('/TopKennels/data', methods=['GET'])
def get_all_kennels():
    sort_type = request.args.get('sort', 'alphabetical')  # קבלת סוג המיון

    # קביעת סדר המיון
    sort_field = "name"  # ברירת מחדל - לפי שם
    sort_order = 1  # סדר עולה

    if sort_type == "rate":
        sort_field = "Grade"
        sort_order = -1  # סדר יורד (מהגבוה לנמוך)

    # שליפת הנתונים עם מיון
    kennels = list(Kennels_col.find({}, {"_id": 1, "name": 1, "Address": 1, "grade": 1, "PhoneNumber": 1}).sort(sort_field, sort_order))


    for kennel in kennels:
        kennel['_id'] = str(kennel['_id'])

    print("📩 Data sent to frontend:", kennels)  # ✅ הדפסת הנתונים

    return jsonify(kennels)
