from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.vegetable_infos_model import VegetableInfosModel
from models import db
from utils import abort_if_doesnt_exist
from datetime import datetime

resource_fields = {
    'id': fields.String,
    'name': fields.String,
    'family': fields.String,
    'start_indoor': fields.String,
    'start_outdoor': fields.String,
    'end': fields.String,
    'water_needs': fields.Integer,
    'cold_resistance': fields.Integer,
    'spacing_on_raw': fields.Float,
    'spacing_between_raw': fields.Float,
    'description': fields.String,
    'created_at': fields.String,
    'updated_at': fields.String
}

class VegetableInfos(Resource):
    @marshal_with(resource_fields)
    def get(self, vegetable_id):
        abort_if_doesnt_exist(VegetableInfosModel, vegetable_id)
        vegetable = VegetableInfosModel.query.filter_by(id=vegetable_id).first()
        return vegetable

    def delete(self, vegetable_id):
        abort_if_doesnt_exist(VegetableInfosModel, vegetable_id)
        vegetable = VegetableInfosModel.query.filter_by(id=vegetable_id).first()
        db.session.delete(vegetable)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, vegetable_id):
        abort_if_doesnt_exist(VegetableInfosModel, vegetable_id)
        vegetable = VegetableInfosModel.query.filter_by(id=vegetable_id).first()

        parser_update = reqparse.RequestParser()
        argument_list = [
            ('name', str, None, False),
            ('family', str, None, False),
            ('start_indoor', str, None, False),
            ('start_outdoor', str, None, False),
            ('end', str, None, False),
            ('water_needs', int, None, False),
            ('cold_resistance', int, None, False),
            ('spacing_on_raw', float, None, False),
            ('spacing_between_raw', float, None, False),
            ('description', str, None, False)
        ]

        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_update.add_argument(
                arg_name, 
                type=arg_type, 
                help=arg_help,
                required=arg_required
            )
        args = parser_update.parse_args()

        # Parse date fields from strings to datetime.date objects
        date_fields = ['start_indoor', 'start_outdoor', 'end']
        for field in date_fields:
            if args[field] is not None:
                args[field] = datetime.strptime(args[field], "%Y-%m-%d").date()

        # Update the vegetable object with non-null arguments
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(vegetable, arg_name, arg_value)
        db.session.commit()
        return vegetable, 201


class VegetableInfosList(Resource):
    @marshal_with(resource_fields)
    def get(self):
        vegetables = VegetableInfosModel.query.all()
        return vegetables

    @marshal_with(resource_fields)
    def post(self):
        parser_create = reqparse.RequestParser()

        # Define a list of argument names and their types
        argument_list = [
            ('name', str, "Name is required", True),
            ('family', str, None, False),
            ('start_indoor', str, None, False),
            ('start_outdoor', str, None, False),
            ('end', str, None, False),
            ('water_needs', int, None, False),
            ('cold_resistance', int, None, False),
            ('spacing_on_raw', float, None, False),
            ('spacing_between_raw', float, None, False),
            ('description', str, None, False)
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

        # Parse date fields from strings to datetime.date objects
        date_fields = ['start_indoor', 'start_outdoor', 'end']
        for field in date_fields:
            if args[field] is not None:
                args[field] = datetime.strptime(args[field], "%Y-%m-%d").date()

        # Create the VegetableInfosModel object using the arguments
        new_vegetable = VegetableInfosModel(**args)
        
        db.session.add(new_vegetable)
        db.session.commit()
        
        return new_vegetable, 201

