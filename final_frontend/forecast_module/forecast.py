from datetime import datetime, timedelta
import requests
from geopy.geocoders import Nominatim

# Your OpenWeatherMap API Key
API_KEY = "9b14c40da416807a32337c8ec78d4c15"
lat = "48.8588897"
lon = "2.320041"
exclude = "hourly,minutely,alerts"

# Calculate the timestamp for the start of the current day
current_day = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
current_day_timestamp = int(current_day.timestamp())

# Calculate the timestamp for the start of the next day
next_day = current_day + timedelta(days=1)
next_day_timestamp = int(next_day.timestamp())

# Define the API endpoint
BASE_URL = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={exclude}&appid={API_KEY}"

# Make the API request
response = requests.get(BASE_URL)


if response.status_code == 200:
    data = response.json()

    # Reverse geocoding to get city name
    geolocator = Nominatim(user_agent="geoapiExercises")
    location = geolocator.reverse(f"{lat}, {lon}")
    city_name = location.raw.get("address", {}).get("city", "Unknown City")

    # Extract current weather
    current_weather = data["current"]
    current_temperature_kelvin = current_weather["temp"]
    current_temperature_celsius = current_temperature_kelvin - 273.15
    current_description = current_weather["weather"][0]["description"]

    # Print location and current weather
    print(f"Location: {city_name}")
    print(f"Current Temperature: {current_temperature_celsius:.2f} °C")
    print(f"Current Weather: {current_description}\n")

    # Extract and print daily weather for the next few days
    daily_forecasts = data["daily"][:4]
    for day in daily_forecasts:
        date = day["dt"]
        temperature_kelvin = day["temp"]["day"]
        temperature_celsius = temperature_kelvin - 273.15
        description = day["weather"][0]["description"]
        date_str = datetime.fromtimestamp(date).strftime('%Y-%m-%d')
        print(f"Date: {date_str}, Temperature: {temperature_celsius:.2f} °C, Weather: {description}")

else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")