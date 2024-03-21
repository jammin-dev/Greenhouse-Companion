"""
Module: resources.vegetable_infos_resource

This module defines RESTful resources for managing vegetable information in a gardening system using Flask-RESTful.

Classes:
    - VegetableInfos: Represents a single vegetable and provides GET, DELETE, and PUT methods.
    - VegetableInfosList: Represents a list of vegetables and provides GET and POST methods.

"""

from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.vegetable_infos_model import VegetableInfosModel
from models import db
from utils import abort_if_doesnt_exist
from datetime import datetime

# Fields for marshaling vegetable information
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
    'soil_temperature': fields.Float,
    'description': fields.String,
    'created_at': fields.String,
    'updated_at': fields.String
}

class VegetableInfos(Resource):
    """
    Class: VegetableInfos

    Represents a single vegetable and provides GET, DELETE, and PUT methods.

    Methods:
        - get: Retrieve vegetable information by vegetable ID.
        - delete: Delete vegetable information by vegetable ID.
        - put: Update vegetable information by vegetable ID.

    """
    @marshal_with(resource_fields)
    def get(self, vegetable_id):
        """
        Retrieve vegetable information by vegetable ID.

        Parameters:
            - vegetable_id (str): The ID of the vegetable.

        Returns:
            - vegetable (VegetableInfosModel): The vegetable information.

        """
        abort_if_doesnt_exist(VegetableInfosModel, vegetable_id)
        vegetable = VegetableInfosModel.query.filter_by(id=vegetable_id).first()
        return vegetable

    def delete(self, vegetable_id):
        """
        Delete vegetable information by vegetable ID.

        Parameters:
            - vegetable_id (str): The ID of the vegetable.

        Returns:
            - Empty string.

        """
        abort_if_doesnt_exist(VegetableInfosModel, vegetable_id)
        vegetable = VegetableInfosModel.query.filter_by(id=vegetable_id).first()
        db.session.delete(vegetable)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, vegetable_id):
        """
        Update vegetable information by vegetable ID.

        Parameters:
            - vegetable_id (str): The ID of the vegetable.

        Returns:
            - vegetable (VegetableInfosModel): The updated vegetable information.

        """
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
            ('soil_temperature', float, None, False),
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
    """
    Class: VegetableInfosList

    Represents a list of vegetables and provides GET and POST methods.

    Methods:
        - get: Retrieve a list of all vegetables.
        - post: Create a new vegetable.

    """
    @marshal_with(resource_fields)
    def get(self):
        """
        Retrieve a list of all vegetables.

        Returns:
            - vegetables (List[VegetableInfosModel]): A list of vegetable information.

        """
        vegetables = VegetableInfosModel.query.all()
        return vegetables

    @marshal_with(resource_fields)
    def post(self):
        """
        Create a new vegetable.

        Returns:
            - new_vegetable (VegetableInfosModel): The newly created vegetable information.

        """
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
            ('soil_temperature', float, None, False),
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
