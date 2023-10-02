from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.area_model import AreaModel
from models.user_model import UserModel
from models import db
from utils import abort_if_doesnt_exist
from auth import token_required

resource_fields = {
    'id': fields.String,
    'name': fields.String,
    'surface': fields.Float,
    'created_at': fields.String,
    'updated_at': fields.String
}
class Area(Resource):
    @marshal_with(resource_fields)
    def get(self, area_id):
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        return area

    def delete(self, area_id):
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        db.session.delete(area)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, area_id):
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
    @marshal_with(resource_fields)
    @token_required
    def get(self, current_user):
        
        attributes = [attr for attr in dir(current_user) if not callable(getattr(current_user, attr)) and not attr.startswith("__")]
        # Print the list of attributes
        # Access the values of specific attributes
        decorators_value = current_user.decorators
        endpoint_value = current_user.endpoint
        init_every_request_value = current_user.init_every_request
        method_decorators_value = current_user.method_decorators
        methods_value = current_user.methods
        provide_automatic_options_value = current_user.provide_automatic_options
        representations_value = current_user.representations

        # Print the values of the attributes
        print("decorators:", decorators_value)
        print("endpoint:", endpoint_value)
        print("init_every_request:", init_every_request_value)
        print("method_decorators:", method_decorators_value)
        print("methods:", methods_value)
        print("provide_automatic_options:", provide_automatic_options_value)
        print("representations:", representations_value)
        
        print(attributes)
        areas = AreaModel.query.all()
        return areas


    @marshal_with(resource_fields)
    @token_required
    def post(self, current_user):
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
        args['user_id'] = current_user.id
        new_area = AreaModel(**args)
        db.session.add(new_area)
        db.session.commit()
        return new_area, 201
