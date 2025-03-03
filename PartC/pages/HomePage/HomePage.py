from flask import Flask, render_template, session, redirect, url_for
from flask import Blueprint

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
        return redirect(url_for('signIn.login'))  # מפנה לדף התחברות אם אין חיבור
    return render_template('HomePage.html')
