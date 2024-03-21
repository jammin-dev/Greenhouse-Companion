"""This script defines Flask view functions for handling
CRUD operations on the "sensors" resource."""

from api.views import app_views
from flask import jsonify, request, abort, render_template
from models import storage
from models.sensors import Sensors
from models.soil_moisture_set import SoilMoistureSet
import json
from datetime import datetime, date



@app_views.route('/sensors', methods=['GET'], strict_slashes=False)
def get_all_sensors():
    """
    Retrieves all sensor areas from the storage and returns them as a list
    of JSON objects.
    """
    sensors = storage.all(Sensors).values()
    # garden_area = storage.all(GardenArea).values()
    # return render_template('sensors.html', sensors=sensors)

    # Combine the data from both dictionaries
    # combined_data = list(sensors) + list(garden_area)
    return jsonify([data.to_dict() for data in sensors])


@app_views.route('/sensors/last', methods=['GET'], strict_slashes=False)
def get_last_sensor():
    """
    Retrieves the last added sensor data and returns it as a JSON object.
    """
    sensors = storage.all(Sensors).values()

    # Sort the sensors by timestamp in descending order
    sorted_sensors = sorted(sensors, key=lambda sensor: sensor.created_at, reverse=True)

    if sorted_sensors:
        last_sensor = sorted_sensors[0]
        return jsonify(last_sensor.to_dict())
    else:
        # Handle the case where there are no sensors
        return jsonify({"message": "No sensor data available"}), 404


@app_views.route('/sensors/<sensors_id>', methods=['GET'],
                 strict_slashes=False)
def get_sensors(sensors_id):
    """
    Retrieves a specific sensor area based on the provided ID and returns its
    details as a JSON object.
    """
    sensor = storage.get(Sensors, sensors_id)
    if sensor:
        return jsonify(sensor.to_dict())
    abort(404)



@app_views.route('/sensors', methods=['POST'], strict_slashes=False)
def create_sensors():
    """
    Creates a new sensor area based on the provided details and returns
    its details as a JSON object.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    print(f"received : {data}")

    # get the last soil_moisture_set
    soilmoistureset = storage.all(SoilMoistureSet).values()
    sorted_data = sorted(soilmoistureset, key=lambda sensor: sensor.created_at, reverse=True)
    if sorted_data:
        last_soil_moisture_set = sorted_data[0]        
    soil_moisture_selection_left = last_soil_moisture_set.soil_moisture_selection_left
    soil_moisture_selection_middle = last_soil_moisture_set.soil_moisture_selection_middle
    soil_moisture_selection_right = last_soil_moisture_set.soil_moisture_selection_right

    # Load the sensor values into the database
    new_sensor = Sensors(**data)
    new_sensor.save()

    # preparing the response in comparing the soil moisture sensor value with
    # the soil moisture value set by the user
    response = {}
    if new_sensor.soil_humidity_1 > soil_moisture_selection_left:
        response['WaterPumpLeftState']= True
    if new_sensor.soil_humidity_2 > soil_moisture_selection_middle:
        response['WaterPumpMiddleState'] = True
    if new_sensor.soil_humidity_3 > soil_moisture_selection_right:
        response['WaterPumpRRightState'] = True
    json_str = json.dumps(response, indent=4)
    print(f"response: {json_str}")
    return jsonify(response) , 201


@app_views.route('/sensors/set_moisture', methods=['POST'], strict_slashes=False)
def set_moisture_to_watering():
    """
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    new_soil_moisture_set = SoilMoistureSet(**data)
    new_soil_moisture_set.save()
    return jsonify(new_soil_moisture_set.to_dict()) , 201


@app_views.route('/sensors/chart/<start_date>/<end_date>', methods=['GET'], strict_slashes=False)
def get_chart_sensor(start_date, end_date):
    """
    Retrieves the sensor values for a given date range
    and returns them as a JSON object.
    """
    sensors = storage.all(Sensors).values()
    sorted_sensors = sorted(sensors, key=lambda sensor: sensor.created_at, reverse=True)
    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    matching_sensors = []

    for item in sensors:
        item_date = item.created_at.date()  # Extract only the date part
        if start_date <= item_date <= end_date:
            matching_sensors.append(item.to_dict())

    if matching_sensors:
        return jsonify(matching_sensors)
    else:
        # Handle the case where there are no matching sensors
        return jsonify({"message": "No sensor data available for the specified date range"}), 404
