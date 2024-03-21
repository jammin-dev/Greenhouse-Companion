import requests

url = "http://127.0.0.1:5001/api/vegetable_manager"
headers = {"Content-Type": "application/json"}

# name, sowed, planted, sowing_date, planting_date,
# harvest_date, remove_date, harvest_quantity, notes,
# garden_area_id

# date format : YYYY-MM-DD

# garde_area_id :
# garden_area_ids = {
#     "middle": "3d5f2a39-3eb5-4927-914c-f9bcc3df8f72",
#     "right": "44e2b299-43c0-4459-9f5d-353af98c1af9",
#     "left": "615f38aa-7ce5-4756-809f-3481325ddaf7",
#     "back": "d54d9455-6257-4243-9e5e-86b52cf45d4e"
# }
# print("Vegetable Creator:")

# print("name:")
# name = input()
# print("quantity:")
# quantity = input()
# print("garden_area_id (left, middle, right or back):")
# garden_area_id = input()
# if garden_area_id not in garden_area_ids:
#     print("Not a good id")
#     exit
# print("sowed (True/False):")
# sowed_input = input().lower()
# sowed = sowed_input == "true"
# print("planted (True/False):")
# planted_input = input().lower()
# planted = planted_input == "true"
# print("sowing_date YYYY-MM-DD:")
# sowing_date = input()
# print("planting_date YYYY-MM-DD:")
# planting_date = input()
# print("harvest_date YYYY-MM-DD:")
# harvest_date = input()
# print("remove_date YYYY-MM-DD:")
# remove_date = input()
# print("harvest_quantity:")
# harvest_quantity = input()
# print("notes")
# notes = input()

# data_for_input = {
#     "name": carrot,
#     "garden_area_id": none,
#     "quantity": int(quantity),
#     "sowed": sowed,
#     "planted": planted,
#     "sowing_date": sowing_date,
#     "planting_date": planting_date,
#     "harvest_date": harvest_date,
#     "remove_date": remove_date,
#     "harvest_quantity": int(harvest_quantity),
#     "notes": notes
# }

data = {
    "name": "Carrots",
    "garden_area_id": "12e6d5cd-420a-47b1-bc77-0d192df55b34",
    "quantity": 50,
    "sowed": True,
    "planted": None,
    "sowing_date": None,
    "planting_date": None,
    "harvest_date": None,
    "remove_date": None,
    "harvest_quantity": None,
    "notes": None
}


keys_to_print = ["name", "garden_area_id",  "created_at",  "updated_at", "sowed", "planted", "sowing_date",
                 "planting_date", "harvest_date", "remove_date", "harvest_quantity", "notes"]


response = requests.post(url, json=data, headers=headers)

if response.status_code == 201:
    print("Vegetable created successfully!")
    vegetable_data = response.json()
    print("Created Vegetable:")
    for key in keys_to_print:
        print(f"{key.capitalize()}: {vegetable_data.get(key)}")
    print("+++++++++++++++++++++++++++")
else:
    print("Error:", response.text)
