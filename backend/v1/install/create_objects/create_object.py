import requests
import json


def create_garden_area(data):
    url = "http://127.0.0.1:5001/api/garden_area"
    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 201:
        print("Garden created successfully!")
        garden_area_data = response.json()
        print("Created Garden:")
        for key, value in garden_area_data.items():
            print(f"{key.capitalize()}: {value}")
        print("+++++++++++++++++++++++++++")
    else:
        print("Error:", response.text)


def create_vegetable(data):
    url = "http://127.0.0.1:5000/api/vegetable_manager"
    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 201:
        print("Vegetable created successfully!")
        vegetable_data = response.json()
        print("Created Vegetable:")
        for key, value in vegetable_data.items():
            print(f"{key.capitalize()}: {value}")
        print("+++++++++++++++++++++++++++")
    else:
        print("Error:", response.text)


def create_vegetables_from_file(file_path):
    url = "http://127.0.0.1:5000/api/vegetable_manager"
    headers = {"Content-Type": "application/json"}

    with open(file_path, "r") as file:
        data = json.load(file)

    keys_to_print = ["name", "garden_area_id", "created_at", "updated_at", "sowed", "planted", "sowing_date",
                     "planting_date", "harvest_date", "remove_date", "harvest_quantity", "notes"]

    for item in data:
        print(item)
        response = requests.post(url, json=item, headers=headers)

        if response.status_code == 201:
            print("Vegetable created successfully!")
            vegetable_data = response.json()
            print("Created Vegetable:")
            for key in keys_to_print:
                print(f"{key.capitalize()}: {vegetable_data.get(key)}")
            print("+++++++++++++++++++++++++++")
        else:
            print("Error:", response.text)


if __name__ == "__main__":
    while True:
        print("Choose an action:")
        print("1. Create Garden Area")
        print("2. Create Single Vegetable")
        print("3. Create Vegetables from File")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            garden_area_data = {
                "name": "left",
                "surface": "3",
                "notes": "left side of the greenhouse"
            }
            create_garden_area(garden_area_data)
        elif choice == "2":
            vegetable_data = {
                "name": "aaaaaaaa",
                "garden_area_id": "3d5f2a39-3eb5-4927-914c-f9bcc3df8f72",
                "quantity": 3,
                "sowed": True,
                "planted": None,
                "sowing_date": None,
                "planting_date": None,
                "harvest_date": None,
                "remove_date": None,
                "harvest_quantity": None,
                "notes": None
            }
            create_vegetable(vegetable_data)
        elif choice == "3":
            file_path = "data.json"  # Specify the correct file path
            create_vegetables_from_file(file_path)
        elif choice == "4":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please choose again.")
