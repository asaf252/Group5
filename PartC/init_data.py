from db_connector import Kennels_col, registered_users_col, dogs_col
from datetime import datetime

def clear_database():
    """ מוחק את כל הנתונים מהקולקציות הרלוונטיות כדי להתחיל מחדש """
    print("⚠️ Clearing all collections before re-initialization...")

    Kennels_col.delete_many({})
    registered_users_col.delete_many({})
    dogs_col.delete_many({})

    print("✅ Database cleared successfully!")

def insert_initial_data():
    """ אתחול מחדש של מסד הנתונים עם נתונים התחלתיים """

    # תחילה נמחק את כל הנתונים הקיימים
    clear_database()

    print("🔄 Initializing database with initial data...")

    # הכנסת 5 כלביות (Kennels)
    kennels = [
        {
            'name': 'Paw Paradise',
            'Address': '100 Luxury Pet Road, Beverly Hills, CA',
            'Dog type': ['Small', 'Medium', 'Large', 'Giant'],
            'PhoneNumber': '555-9999',
            'capacity': 50,
            'WeekEndPrice': 120,
            'Price': 100,
            'Description': 'The ultimate dog boarding resort with luxury suites, a swimming pool, gourmet meals, and 24/7 care.',
            'grade': 5
        },
        {
            'name': 'Happy Paws Lodge',
            'Address': '123 Bark Street, New York, NY',
            'Dog type': ['Small', 'Medium', 'Large'],
            'PhoneNumber': '555-1234',
            'capacity': 20,
            'WeekEndPrice': 60,
            'Price': 50,
            'Description': 'A cozy and friendly dog boarding facility with spacious play areas.',
            'grade': 4
        },
        {
            'name': 'Canine Comfort Inn',
            'Address': '456 Woof Avenue, Los Angeles, CA',
            'Dog type': ['Medium', 'Large'],
            'PhoneNumber': '555-5678',
            'capacity': 15,
            'WeekEndPrice': 70,
            'Price': 55,
            'Description': 'Luxury dog boarding with personal suites and daily outdoor activities.',
            'grade': 3
        },
        {
            'name': 'Tail Waggers Retreat',
            'Address': '789 Paw Drive, Chicago, IL',
            'Dog type': ['Small', 'Medium'],
            'PhoneNumber': '555-9101',
            'capacity': 10,
            'WeekEndPrice': 65,
            'Price': 45,
            'Description': 'A boutique-style dog boarding service specializing in small and medium breeds.',
            'grade': 2
        },
        {
            'name': 'Bark Haven Hotel',
            'Address': '654 Tail Trail, Seattle, WA',
            'Dog type': ['Small', 'Medium', 'Large'],
            'PhoneNumber': '555-3344',
            'capacity': 25,
            'WeekEndPrice': 75,
            'Price': 60,
            'Description': 'A high-end dog boarding hotel with 24/7 care and premium meals.',
            'grade': 1
        }
    ]
    Kennels_col.insert_many(kennels)
    print("🏠 5 kennels inserted into database!")

    # הכנסת משתמשים חדשים (כולל המשתמשים מהתמונות)
    sample_users = [
        {
            'firstName': 'Test',
            'lastName': 'User',
            'email': 'testuser@example.com',
            'phone': '123456789',
            'password': 'password123',
            'locationAccess': True
        },
        {
            'firstName': 'asa',
            'lastName': 'asq',
            'email': 'shira@example.com',
            'phone': '0527078322',
            'password': '12345qwerT!',
            'locationAccess': False
        }
    ]
    registered_users_col.insert_many(sample_users)
    print("👤 Sample users inserted into database!")

    # הכנסת כלבים לכל משתמש + כלב ללא בעלים
    sample_dogs = [
        # כלבים של Test User
        {
            "ownerEmail": "testuser@example.com",
            "dogName": "Buddy",
            "breed": "Golden Retriever",
            "age": 4,
            "weight": 30,
            "medicalConditions": ["None"],
            "vaccinationStatus": True,
            "favoriteFood": "Chicken & Rice",
            "behaviorNotes": "Loves to play fetch",
            "lastVisit": datetime(2024, 2, 15)
        },
        {
            "ownerEmail": "testuser@example.com",
            "dogName": "Max",
            "breed": "Poodle",
            "age": 5,
            "weight": 12,
            "medicalConditions": ["Arthritis"],
            "vaccinationStatus": False,
            "favoriteFood": "Fish & Rice",
            "behaviorNotes": "Prefers quiet environments",
            "lastVisit": datetime(2023, 12, 10)
        },

        # כלבים של asa asq (shira@example.com)
        {
            "ownerEmail": "shira@example.com",
            "dogName": "Charlie",
            "breed": "Labrador",
            "age": 3,
            "weight": 25,
            "medicalConditions": ["Allergies"],
            "vaccinationStatus": True,
            "favoriteFood": "Beef & Vegetables",
            "behaviorNotes": "Friendly with other dogs",
            "lastVisit": datetime(2024, 1, 20)
        },
        {
            "ownerEmail": "shira@example.com",
            "dogName": "Rocky",
            "breed": "Bulldog",
            "age": 2,
            "weight": 22,
            "medicalConditions": ["None"],
            "vaccinationStatus": True,
            "favoriteFood": "Turkey & Carrots",
            "behaviorNotes": "Loves to cuddle",
            "lastVisit": datetime(2024, 3, 5)
        },

        # כלב ללא בעלים
        {
            "ownerEmail": None,  # אין בעלים
            "dogName": "Shadow",
            "breed": "Mixed",
            "age": 6,
            "weight": 20,
            "medicalConditions": ["None"],
            "vaccinationStatus": True,
            "favoriteFood": "Salmon & Sweet Potato",
            "behaviorNotes": "Very independent",
            "lastVisit": datetime(2024, 2, 28)
        }
    ]

    dogs_col.insert_many(sample_dogs)
    print("🐶 Sample dogs inserted into database!")

    print("✅ Database initialization complete!")

if __name__ == '__main__':
    insert_initial_data()
