from db_connector import mydatabase


def analyze_database():
    print("\n📌 **Database Collections Analysis** 📌\n")

    # קבלת כל ה-collections בבסיס הנתונים
    collections = mydatabase.list_collection_names()

    if not collections:
        print("⚠️ No collections found in the database.")
        return

    for collection_name in collections:
        print(f"🔹 Collection: {collection_name}")

        collection = mydatabase[collection_name]
        documents = list(collection.find())  # משיכת כל הנתונים

        if not documents:
            print("   (Empty Collection)\n")
        else:
            for doc in documents:
                doc['_id'] = str(doc['_id'])  # ממיר ObjectId למחרוזת
                print(doc)
            print("\n" + "-" * 50 + "\n")


# אם הקובץ מורץ ישירות - הפעל את הפונקציה
if __name__ == "__main__":
    analyze_database()
