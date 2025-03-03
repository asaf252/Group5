import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from math import radians, cos, sin, asin, sqrt

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


# function to insert Kennels
def insert_Kennel(kennels_list):
    for kennel in kennels_list:
        # Use the phone number as a unique identifier
        if not Kennels_col.find_one({'phone': kennel['phone']}):
            Kennels_col.insert_one(kennel)
            print(f"Inserted Kennel: {kennel['name']}")
        else:
            print(f"Kennel already exists: {kennel['name']}")

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


# function to initialize the database
def initialize_db():
    kennels = [
        {
            'name': 'Paw Paradise',
            'Address': '100 Luxury Pet Road, Beverly Hills, CA',
            'Dog type': ['Small', 'Medium', 'Large', 'Giant'],
            'PhoneNumber': '555-9999',
            'capacity': 50,
            'WeekEndPrice': 120,
            'Price': 100,
            'Description': 'The ultimate dog boarding resort with luxury suites, a swimming pool, gourmet meals, and 24/7 care.'
        },
        {
            'name': 'Happy Paws Lodge',
            'Address': '123 Bark Street, New York, NY',
            'Dog type': ['Small', 'Medium', 'Large'],
            'PhoneNumber': '555-1234',
            'capacity': 20,
            'WeekEndPrice': 60,
            'Price': 50,
            'Description': 'A cozy and friendly dog boarding facility with spacious play areas.'
        },
        {
            'name': 'Canine Comfort Inn',
            'Address': '456 Woof Avenue, Los Angeles, CA',
            'Dog type': ['Medium', 'Large'],
            'PhoneNumber': '555-5678',
            'capacity': 15,
            'WeekEndPrice': 70,
            'Price': 55,
            'Description': 'Luxury dog boarding with personal suites and daily outdoor activities.'
        },
        {
            'name': 'Tail Waggers Retreat',
            'Address': '789 Paw Drive, Chicago, IL',
            'Dog type': ['Small', 'Medium'],
            'PhoneNumber': '555-9101',
            'capacity': 10,
            'WeekEndPrice': 65,
            'Price': 45,
            'Description': 'A boutique-style dog boarding service specializing in small and medium breeds.'
        },
        {
            'name': 'Bark Haven Hotel',
            'Address': '654 Tail Trail, Seattle, WA',
            'Dog type': ['Small', 'Medium', 'Large'],
            'PhoneNumber': '555-3344',
            'capacity': 25,
            'WeekEndPrice': 75,
            'Price': 60,
            'Description': 'A high-end dog boarding hotel with 24/7 care and premium meals.'
        }
    ]

    insert_Kennel(kennels)



def find_one_user(user_email):
    user = registered_users_col.find_one({'email': user_email})
    return user


def get_user_city(user_email):
    user = registered_users_col.find_one({'email': user_email})
    return user['city']


def update_one_user(user_email, user):
    # Perform the update operation
    result = registered_users_col.update_one({"email": user_email}, {"$set": user})

    if result.modified_count == 0:
        # no information was modified
        return False, "No changes were made to the user."

    # Successful update
    return True, "User updated successfully."




def get_filtered_Kennels(Dogtype=None, WeekEndPrice=None, Price=None):

    Kennels = []

    # the base query with provided filters
    query = {}
    if Dogtype:
        query['classType'] = Dogtype
    if WeekEndPrice:
        query['WeekEndPrice'] = WeekEndPrice
    if WeekEndPrice:
        query['Price'] = Price

    kennels = list(Kennels_col.find(query))
    return kennels


def get_all_Kennels():
    return list(Kennels_col.find({}))


def add_to_user_contacted(user_email, coach_phone):
    result = registered_users_col.update_one(
        {"email": user_email},
        {"$addToSet": {"contacted_coaches": coach_phone}}
    )
    return result.modified_count > 0


# Run the initialize_db function if this script is executed directly
if __name__ == '__main__':
    initialize_db()