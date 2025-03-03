from flask import Blueprint, render_template

about_bp = Blueprint('about',
                     __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='/AboutUs',
                     )


@about_bp.route('/about')
def about_page():
    return render_template('AboutUs.html')



