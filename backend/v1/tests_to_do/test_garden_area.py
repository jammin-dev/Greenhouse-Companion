import requests
import json

# Update with your actual server URL
base_url = "http://127.0.0.1:5000/api/"

# GET all garden areas
response = requests.get(f"{base_url}/garden_area")
print("GET all garden areas:")
print(response.status_code)
print(response.json())
print("=" * 40)

# GET a specific garden area by ID
garden_area_id = "007832a0-19c2-4fa7-bc52-001c5543b8f5"  # Update with an existing ID
response = requests.get(f"{base_url}/garden_area/{garden_area_id}")
print(f"GET garden area by ID {garden_area_id}:")
print(response.status_code)
print(response.json())
print("=" * 40)

# POST - Create a new garden area
new_garden_data = {
    "name": "New Garden2"
}
response = requests.post(f"{base_url}/garden_area", json=new_garden_data)
print("POST - Create a new garden area:")
print(response.status_code)
print(response.json())
print("=" * 40)

# PUT - Update a specific garden area by ID
updated_garden_data = {
    "name": "Updated Garden Name"
}
response = requests.put(
    f"{base_url}/garden_area/{garden_area_id}", json=updated_garden_data)
print(f"PUT - Update garden area by ID {garden_area_id}:")
print(response.status_code)
print(response.json())
print("=" * 40)

# DELETE - Delete a specific garden area by ID
response = requests.delete(f"{base_url}/garden_area/{garden_area_id}")
print(f"DELETE - Delete garden area by ID {garden_area_id}:")
print(response.status_code)
print(response.json())
print("=" * 40)
