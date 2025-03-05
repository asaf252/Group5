import os
from datetime import datetime
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Load environment variables from .env file
load_dotenv()

# uri from .env file
uri = os.environ.get('DB_URI')

cluster = MongoClient(uri, server_api=ServerApi('1'))

# Connection to database
mydatabase = cluster['mydatabase']

# project collections
Kennels_col = mydatabase['Kennels']
registered_users_col = mydatabase['registered_users']
dogs_col = mydatabase['Dogs']  # ✅ נוספה ההגדרה של dogs_col

def add_new_user(first_name, last_name, email, phone, password, location_access):
    location_access_bool = location_access == 'true'

    print(f"🔍 Checking if user exists - Email: {email}, Phone: {phone}")

    # בדיקה אם קיים משתמש עם אותו אימייל או טלפון
    existing_email_user = registered_users_col.find_one({'email': email})
    existing_phone_user = registered_users_col.find_one({'phone': phone})

    if existing_email_user:
        print(f"❌ User already exists with this email: {email}")
        return False, "User already exists with that email."

    if existing_phone_user:
        print(f"❌ User already exists with this phone number: {phone}")
        return False, "User already exists with that phone number."

    # ✅ אם המשתמש לא קיים, מוסיפים אותו למסד הנתונים
    new_user = {
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'phone': phone,
        'password': password,
        'locationAccess': location_access_bool
    }

    registered_users_col.insert_one(new_user)
    print(f"✅ User registered successfully: {email}")

    return True, "User registered successfully."


def find_one_user(user_email):
    user = registered_users_col.find_one({'email': user_email})
    return user


def get_all_Kennels():
    return list(Kennels_col.find({}))


def update_one_user(user_email, user):
    # Perform the update operation
    result = registered_users_col.update_one({"email": user_email}, {"$set": user})

    if result.modified_count == 0:
        # no information was modified
        return False, "No changes were made to the user."

    # Successful update
    return True, "User updated successfully."


