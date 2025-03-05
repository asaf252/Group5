from flask import Flask, request
from dotenv import load_dotenv
from datetime import timedelta



# טוען משתנים מהקובץ .env
load_dotenv()

# יצירת אפליקציית Flask
app = Flask(__name__)
app.config.from_pyfile('settings.py')
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=2)  # פקיעת session לאחר 2 דקות




# חיבור למסד הנתונים (MongoDB)
from db_connector import cluster  # מוודא חיבור למסד הנתונים


# בדיקה שהחיבור למונגוDB עובד
try:
    cluster.server_info()  # שולח פינג לבדוק חיבור
    print("✅ Connected to MongoDB successfully!")


except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")

# ייבוא ורישום ה-Blueprints


from pages.HomePage.HomePage import homePage_bp
app.register_blueprint(homePage_bp)

from pages.SignUp.SignUp import signUp_bp
app.register_blueprint(signUp_bp)

from pages.LogIn.LogIn import Login_bp
app.register_blueprint(Login_bp)

from pages.SearchInParadise.SearchInParadise import SearchInParadise_bp
app.register_blueprint(SearchInParadise_bp)

# רישום ה-Blueprint
from pages.AboutUs.AboutUs import  about_bp
app.register_blueprint(about_bp)

from pages.TopKennels.TopKennels import TopKennels_bp
app.register_blueprint(TopKennels_bp)

from pages.MakeOrder.MakeOrder import MakeOrder_bp
app.register_blueprint(MakeOrder_bp)

from pages.Profile.Profile import Profile_bp
app.register_blueprint(Profile_bp)

from pages.AddDog.AddDog import AddDog_bp
app.register_blueprint(AddDog_bp)


# הרצת השרת
if __name__ == '__main__':
    print(" Flask server is starting...")
    app.run(debug=True, host="0.0.0.0", port=5000)


from flask import Flask, session, redirect, request

app = Flask(__name__)

@app.before_request
def require_login():
    allowed_routes = ['home', 'about', 'signup', 'static']  # דפים שמותרים בלי התחברות

    # אם המשתמש לא מחובר ואין לו הרשאה להיכנס לדף
    if 'email' not in session and request.path not in ['/', '/about', '/signup']:
        return redirect('/')


