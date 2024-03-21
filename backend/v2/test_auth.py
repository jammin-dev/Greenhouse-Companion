import requests

# Replace these values with your Flask application's information
base_url = 'http://127.0.0.1:5000'  # Your Flask app's base URL
auth_endpoint = '/login'       # The authentication endpoint
username = 'Ben'           # Your username
password = '12345'           # Your password

# Prepare Basic Authentication credentials
auth = (username, password)

# Send the POST request with Basic Authentication
response = requests.post(f'{base_url}{auth_endpoint}', auth=auth)

if response.status_code == 200:
    print("Authentication successful.")
    print(response.text)
    # Continue with token extraction and testing protected routes
else:
    print(f"Authentication failed. Status Code: {response.status_code}")
    print("Response Content:")
    print(response.text)