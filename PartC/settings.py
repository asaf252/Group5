import os
from dotenv import load_dotenv

# טוען משתנים מקובץ .env
load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')
# מגדיר משתנים גלובליים עבור Flask
DB_URI = os.environ.get('DB_URI')  # מוסיף את ה-DB_URI להגדרות
