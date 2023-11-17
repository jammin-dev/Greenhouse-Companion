"""
Module: resources.area_resource

This module defines RESTful resources for managing areas in a gardening system using Flask-RESTful.

Classes:
    - Area: Represents a single area and provides GET, DELETE, and PUT methods.
    - AreaList: Represents a list of areas and provides GET and POST methods.

"""

from flask import jsonify, g
from flask_restful import Resource, fields, marshal_with, reqparse
from models.area_model import AreaModel
from models.user_model import UserModel
from models import db
from utils import abort_if_doesnt_exist

# Fields for marshaling area data
resource_fields = {
    'id': fields.String,
    'name': fields.String,
    'surface': fields.Float,
    'created_at': fields.String,
    'updated_at': fields.String,
    'user_id': fields.String
}

class Area(Resource):
    """
    Class: Area

    Represents a single area and provides GET, DELETE, and PUT methods.

    Methods:
        - get: Retrieve information about a specific area.
        - delete: Delete a specific area.
        - put: Update information for a specific area.

    """
    @marshal_with(resource_fields)
    def get(self, area_id):
        """
        Retrieve information about a specific area.

        Parameters:
            - area_id (str): The unique identifier of the area.

        Returns:
            - area (AreaModel): The area information.

        """
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        return area

    def delete(self, area_id):
        """
        Delete a specific area.

        Parameters:
            - area_id (str): The unique identifier of the area.

        Returns:
            - str: An empty string indicating a successful deletion.

        """
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        db.session.delete(area)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, area_id):
        """
        Update information for a specific area.

        Parameters:
            - area_id (str): The unique identifier of the area.

        Returns:
            - area (AreaModel): The updated area information.

        """
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()

        parser_update = reqparse.RequestParser()
        argument_list = [
            ('name', str, None, False),
            ('surface', float, None, False),
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
                setattr(area, arg_name, arg_value)
        db.session.commit()
        return area, 201


class AreaList(Resource):
    """
    Class: AreaList

    Represents a list of areas and provides GET and POST methods.

    Methods:
        - get: Retrieve a list of all areas.
        - post: Create a new area.

    """
    @marshal_with(resource_fields)
    def get(self):
        """
        Retrieve a list of all areas.

        Returns:
            - areas (List[AreaModel]): A list of area information.

        """
        areas = AreaModel.query.all()
        return areas

    @marshal_with(resource_fields)
    def post(self):
        """
        Create a new area.

        Returns:
            - new_area (AreaModel): The newly created area information.

        """
        parser_create = reqparse.RequestParser()
        argument_list = [
            ('name', str, "Name is required", True),
            ('surface', float, None, False),
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
        new_area = AreaModel(**args)

        db.session.add(new_area)
        db.session.commit()
        return new_area, 201
