"""
Module: resources.vegetable_manager_resource

This module defines RESTful resources for managing vegetable information in a gardening system using Flask-RESTful.

Classes:
    - VegetableManager: Represents a single vegetable and provides GET, DELETE, and PUT methods.
    - VegetableManagerList: Represents a list of vegetables and provides GET and POST methods.

"""

from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.vegetable_manager_model import VegetableManagerModel
from models import db
from utils import abort_if_doesnt_exist
from datetime import datetime

# Fields for marshaling vegetable information
resource_fields = {
    'id': fields.String,
    'name': fields.String,
    'area_id': fields.String,
    'quantity': fields.String,
    'sowed': fields.Boolean,
    'planted': fields.Boolean,
    'sowing_date': fields.String,
    'planting_date': fields.String,
    'harvest_date': fields.String,
    'harvest_quantity': fields.Float,
    'remove_date': fields.String,
    'created_at': fields.String,
    'updated_at': fields.String,
    'user_id': fields.String
}

parser_update = reqparse.RequestParser()
parser_update.add_argument('name', type=str)

class VegetableManager(Resource):
    """
    Class: VegetableManager

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
            - vegetable (VegetableManagerModel): The vegetable information.

        """
        abort_if_doesnt_exist(VegetableManagerModel, vegetable_id)
        vegetable = VegetableManagerModel.query.filter_by(id=vegetable_id).first()
        return vegetable
    def delete(self, vegetable_id):
        """
        Delete vegetable information by vegetable ID.

        Parameters:
            - vegetable_id (str): The ID of the vegetable.

        Returns:
            - Empty string.

        """
        abort_if_doesnt_exist(VegetableManagerModel, vegetable_id)
        vegetable = VegetableManagerModel.query.filter_by(id=vegetable_id).first()
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
            - vegetable (VegetableManagerModel): The updated vegetable information.

        """
        abort_if_doesnt_exist(VegetableManagerModel, vegetable_id)
        vegetable = VegetableManagerModel.query.filter_by(id=vegetable_id).first()

        parser_update = reqparse.RequestParser()
        argument_list = [
            ('name', str, None, False),
            ('quantity', int, None, False),
            ('area_id', str, None, False),
            ('sowed', bool, None, False),
            ('planted', bool, None, False),
            ('sowing_date', str, None, False),
            ('planting_date', str, None, False),
            ('harvest_date', str, None, False),
            ('harvest_quantity', float, None, False),
            ('remove_date', str, None, False),
            ('notes', str, None, False)
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
        date_fields = ['sowing_date', 'planting_date', 'harvest_date', 'remove_date']
        for field in date_fields:
            if args[field] is not None:
                args[field] = datetime.strptime(args[field], "%Y-%m-%d").date()
    
        # Add quantity to the previous quantity
        if args['harvest_quantity'] is not None:
            args['harvest_quantity'] += vegetable.harvest_quantity
        print(f"previous harvest quantity : {vegetable.harvest_quantity}")

        # Update the vegetable object with non-null arguments
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(vegetable, arg_name, arg_value)
        db.session.commit()
        return vegetable, 201


class VegetableManagerList(Resource):
    """
    Class: VegetableManagerList

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
            - vegetables (List[VegetableManagerModel]): A list of vegetable information.

        """
        vegetables = VegetableManagerModel.query.all()
        return vegetables

    @marshal_with(resource_fields)
    def post(self):
        """
        Create a new vegetable.

        Returns:
            - new_vegetable (VegetableManagerModel): The newly created vegetable information.

        """
        parser_create = reqparse.RequestParser()

        # Define a list of argument names and their types
        argument_list = [
            ('name', str, "Name is required", True),
            ('quantity', int, "Quantity is required", True),
            ('area_id', str, "Area is required", True),
            ('sowed', bool, "Sowed state is required", True),
            ('planted', bool, "Planted state is required", True),
            ('sowing_date', str, None, False),
            ('planting_date', str, None, False),
            ('harvest_date', str, None, False),
            ('harvest_quantity', float, None, False),
            ('remove_date', str, None, False),
            ('notes', str, None, False)
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
        date_fields = ['sowing_date', 'planting_date', 'harvest_date', 'remove_date']
        for field in date_fields:
            if args[field] is not None:
                args[field] = datetime.strptime(args[field], "%Y-%m-%d").date()
        
        # Create the VegetableManagerModel object using the arguments
        new_vegetable = VegetableManagerModel(**args)
        
        db.session.add(new_vegetable)
        db.session.commit()
        
        return new_vegetable, 201
