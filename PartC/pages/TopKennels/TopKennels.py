from flask import Blueprint, request, render_template, jsonify
from PartC.db_connector import  get_all_Kennels

# יצירת Blueprint לכלביות
kennelProfile_bp = Blueprint(
    'kennelProfile',
    __name__,
    static_folder='static',
    template_folder='templates'
)

# מסלול להצגת עמוד פרופיל הכלביות
@kennelProfile_bp.route('/kennelProfile')
def kennel_profile():
    return render_template('KennelProfile.html')


# מסלול לשליפת כל הכלביות עם מיון
@kennelProfile_bp.route('/kennelProfile/data', methods=['GET'])
def get_all_kennels():
    sort_type = request.args.get('sort', 'alphabetical')  # פרמטר מיון מה-URL

    # קביעת סדר המיון לפי הפרמטר שנשלח
    sort_field = "name"  # ברירת מחדל - מיון אלפביתי
    sort_order = 1  # סדר עולה

    if sort_type == "rate":
        sort_field = "Grade"
        sort_order = -1  # סדר יורד (מהגבוה לנמוך)

    # שליפת הנתונים עם מיון
    kennels = list(get_all_Kennels.find({}, {"_id": 0}).sort(sort_field, sort_order))

    return jsonify(kennels)
