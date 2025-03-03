from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for, flash

SearchInParadise_bp = Blueprint(
    'SearchInParadise',
    __name__,
    static_folder='static',
    static_url_path='/SearchInParadise/',
    template_folder='templates'
)


@SearchInParadise_bp.route('/SearchInParadise', methods=['GET'])
def search_page():
    if 'email' not in session:
        return redirect(url_for('LogIn.show_login_page'))  # שולח לעמוד התחברות אם המשתמש לא מחובר

    return render_template('SearchInParadise.html')  # מציג את עמוד החיפוש


