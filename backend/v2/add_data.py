import json
import requests
import sys

# Define the API endpoint URL
api_url = sys.argv[1]
file = sys.argv[2]

# Read the JSON file into a variable
with open(file, 'r') as json_file:
    data = json.load(json_file)

# Loop through each item in the JSON data and make a POST request
for item in data:
    # Assuming 'item' is a dictionary representing your data
    try:
        response = requests.post(api_url, json=item)

        # Check the response status code
        if response.status_code == 201:
            print(f"POST request successful for item: {item}")
        else:
            print(f"Failed to send POST request for item: {item}")
    except Exception as e:
        print(f"Error sending POST request for item: {item}")
        print(f"Error details: {str(e)}")