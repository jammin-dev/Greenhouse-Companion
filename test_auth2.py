import requests

# Replace these values with your Flask application's information
base_url = 'http://127.0.0.1:5000'  # Your Flask app's base URL
protected_endpoint = '/users'  # The protected endpoint you want to test
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YjYxYzgwLTUxMTEtNDJmYS1iMjFkLTc4YmRjMDYxNDA4MiIsImV4cCI6MTY5NjExNzY0NH0.gqNOwqzwaEh_abJMik8S3s8KFvE2Q3SJTtggppcrEFA'  # Replace with a valid JWT token

# Set the headers to include the JWT token
headers = {'x-access-token': token}

# Send the GET request to the protected route
response = requests.get(f'{base_url}{protected_endpoint}', headers=headers)

if response.status_code == 200:
    print("Access to the protected route was successful.")
    print("Response:")
    print(response.json())
elif response.status_code == 401:
    
    print("Access to the protected route was denied. Token is invalid or missing.")
else:
    print(f"An unexpected error occurred. Status Code: {response.status_code}")
    print("Response Content:")
    print(response.text)