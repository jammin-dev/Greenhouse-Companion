from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.sensors_model import SensorsModel, AutomationModel
from models import db
from utils import abort_if_doesnt_exist

resource_fields = {
    'id': fields.String,
    'air_temperature': fields.Float,
    'air_humidity': fields.Float,
    'luminosity': fields.Float,
    'created_at': fields.String,
    'updated_at': fields.String
}

class Sensor(Resource):
    @marshal_with(resource_fields)
    def get(self, sensor_id):
        abort_if_doesnt_exist(SensorsModel, sensor_id)
        sensor = SensorsModel.query.filter_by(id=sensor_id).first()
        return sensor

    def delete(self, sensor_id):
        abort_if_doesnt_exist(SensorsModel, sensor_id)
        sensor = SensorsModel.query.filter_by(id=sensor_id).first()
        db.session.delete(sensor)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, sensor_id):
        abort_if_doesnt_exist(SensorsModel, sensor_id)
        sensor = SensorsModel.query.filter_by(id=sensor_id).first()
        
        parser_update = reqparse.RequestParser()
        argument_list = [
            ('air_temperature', float, None, False),
            ('air_humidity', float, None, False),
            ('luminosity', float, None, False),
        ]
        # Iterate through the argument list and add arguments to the parser
        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_update.add_argument(
                arg_name, 
                type=arg_type, 
                help=arg_help,
                required=arg_required
            )
        args = parser_update.parse_args()
        # Update the vegetable object with non-null arguments
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(sensor, arg_name, arg_value)
        db.session.commit()
        return sensor, 201


class SensorList(Resource):
    @marshal_with(resource_fields)
    def get(self):
        sensors = SensorsModel.query.all()
        return sensors

    def post(self):
        parser_create = reqparse.RequestParser()
        argument_list = [
            ('air_temperature', float, None, False),
            ('air_humidity', float, None, False),
            ('luminosity', float, None, False),
        ]

        # Iterate through the argument list and add arguments to the parser
        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_create.add_argument(
                arg_name, 
                type=arg_type, 
                help=arg_help,
                required=arg_required
            )

        args = parser_create.parse_args()
        new_sensor = SensorsModel(**args)
        db.session.add(new_sensor)
        db.session.commit()

        # Comparing the values to the values of automation tables
        # to send response to the esp32
        response = {}
        
        all_selection = AutomationModel.query.all()
        sorted_sensors = sorted(all_selection, key=lambda all_selection: all_selection.created_at, reverse=True)
        if sorted_sensors:
            last_selection = sorted_sensors[0]

        if new_sensor.air_temperature > last_selection.air_temperature_selection or \
        new_sensor.air_humidity > last_selection.air_humidity_selection:
            extractor_plugged_timer = f"smart_plug_{last_selection.extractor_plug}_timer"
            extractor_plugged_state = f"smart_plug_{last_selection.extractor_plug}_state"
            setattr(last_selection, extractor_plugged_state, True)
            setattr(last_selection, extractor_plugged_timer, 5000)
            # response[f"smart_plug_{last_selection.extractor_plug}_state"]=60

        # Define a dictionary to map attribute names to response keys
        attribute_to_key = {
        'smart_plug_1_state': 'smart_plug_1_timer',
        'smart_plug_2_state': 'smart_plug_2_timer',
        'smart_plug_3_state': 'smart_plug_3_timer',
        'smart_plug_4_state': 'smart_plug_4_timer',
         }
        # Loop through the attributes and check if they are True
        for attribute, response_key in attribute_to_key.items():
            if getattr(last_selection, attribute):
                response[response_key] = getattr(last_selection, response_key)
                setattr(last_selection, attribute, False)
        
        db.session.add(last_selection)
        db.session.commit()
        print(response)
        return jsonify(response)

class SensorsLast(Resource):
    @marshal_with(resource_fields)
    def get(self):
        most_recent_sensor = SensorsModel.query.order_by(SensorsModel.created_at.desc()).first()
        return most_recent_sensor
