import requests
import json

url = "http://127.0.0.1:5001/api/vegetable_infos"
headers = {"Content-Type": "application/json"}


# date format : YYYY-MM-DD

with open("data_vegetable_infos.json", "r") as file:
    data = json.load(file)
for item in data:
    print(item)

    response = requests.post(url, json=item, headers=headers)

    if response.status_code == 201:
            print("done")

