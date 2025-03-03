from flask import Blueprint, request, render_template, session, redirect, url_for, jsonify, make_response
from datetime import timedelta
from PartC.db_connector import find_one_user

Login_bp = Blueprint(
    'LogIn',
    __name__,
    static_folder='static',
    static_url_path='/LogIn',
    template_folder='templates'
)


# ✅ אם המשתמש מחובר ונכנס לדף הבית, להפנות אותו ל-HomePage
@Login_bp.route('/', methods=['GET'])
def show_login_page():
    if 'email' in session:  # אם המשתמש כבר מחובר
        return redirect(url_for('homePage.homePage_func'))  # העברה לדף הבית

    return render_template('LogInPage.html')  # אם לא מחובר, מציג את דף ההתחברות


# ✅ התחברות למערכת
@Login_bp.route('/login', methods=['POST'])
def login():
    print("🔄 Login route was called!")

    try:
        data = request.get_json()  # קבלת נתוני JSON מהבקשה
        if not data:
            return jsonify({'success': False, 'message': 'Invalid request. No JSON received.'}), 400

        email = data.get('email')
        password = data.get('password')

        print(f"📩 Received email: {email}, 🔒 Password: {password}")

        user = find_one_user(email)

        if not user:
            print("❌ User does not exist.")
            return jsonify({'success': False, 'message': 'User does not exist.'}), 401

        if user.get('password') != password:
            print("❌ Incorrect password.")
            return jsonify({'success': False, 'message': 'Incorrect password.'}), 401

        # ✅ הצלחה - שמירת Session עם זמן תפוגה של 2 דקות
        session.permanent = True  # מסמן שה-Session צריך להימשך לזמן מוגדר
        session['email'] = email
        session['firstName'] = user.get('firstName', 'Guest')
        session['logged_in'] = True
        print(f"✅ Logged in as: {user['firstName']}")

        return jsonify({'success': True, 'redirect': url_for('homePage.homePage_func')}), 200  # הפניה ל-HomePage

    except Exception as e:
        print(f"❌ Error in login: {e}")
        return jsonify({'success': False, 'message': 'Internal server error.'}), 500


# ✅ בדיקה אם המשתמש מחובר
@Login_bp.route('/api/check-login-status')
def check_login_status():
    print("🔍 Checking session:", dict(session))  # הצגת ה-Session במסוף לבדיקה
    is_logged_in = 'email' in session  # אם קיים אימייל ב-Session, המשתמש מחובר
    return jsonify({'isLoggedIn': is_logged_in, 'sessionData': dict(session)})


# ✅ התנתקות מהמערכת
@Login_bp.route('/logout', methods=['GET'])
def logout():
    print("🔴 Logging out user:", session.get('email'))

    # מחיקת כל הנתונים מה-Session
    session.clear()

    # מחיקת העוגיה כדי לוודא שהמשתמש מתנתק לחלוטין
    response = make_response(redirect(url_for('LogIn.show_login_page')))
    response.set_cookie('session', '', expires=0)  # מוחק את העוגיה מהדפדפן
    print("✅ Session cleared successfully!")

    return response
