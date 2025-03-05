from flask import Blueprint, redirect, session
from flask import  render_template


homePage_bp = Blueprint(
    'homePage',
    __name__,
    static_folder='static',
    static_url_path='/HomePage',
    template_folder='templates',
    url_prefix="/home"
)

@homePage_bp.route('/home', methods=['GET'])
def homePage_func():
    # בדיקה אם המשתמש מחובר
    if 'email' not in session:
        return redirect('/')  # מפנה לדף ההתחברות אם המשתמש לא מחובר

    return render_template('HomePage.html')  # מציג את דף הבית אם המשתמש מחובר

