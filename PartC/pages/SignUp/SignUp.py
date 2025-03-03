from flask import Blueprint, request, render_template, session, redirect, url_for, flash, jsonify
from PartC.db_connector import add_new_user  # פונקציה להוספת משתמש ל-DB

signUp_bp = Blueprint(
    'SignUp',
    __name__,
    static_folder='static',
    static_url_path='/SignUp',
    template_folder='templates'
)

@signUp_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template('SignUp.html')  # הצגת טופס ההרשמה

    try:
        data = request.get_json()  # קבלת נתוני JSON מהבקשה
        if not data:
            return jsonify({'success': False, 'message': 'Invalid request. No JSON received.'}), 400

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        phonenumber = data.get('phonenumber')
        password = data.get('password')
        location_access = data.get('location_access', 'false')

        success, message = add_new_user(first_name, last_name, email, phonenumber, password, location_access)

        if success:
            return jsonify({'success': True, 'redirect': url_for('LogIn.login')})  # מעבר לעמוד התחברות
        else:
            return jsonify({'success': False, 'message': message})

    except Exception as e:
        print(f"❌ Error in signup: {e}")
        return jsonify({'success': False, 'message': 'Internal server error.'}), 500