from flask import jsonify, g
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
    'updated_at': fields.String,
    'user_id': fields.String
}
class Area(Resource):

    @marshal_with(resource_fields)
    @token_required
    def get(self, area_id):
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        return area
    @token_required
    def delete(self, area_id):
        abort_if_doesnt_exist(AreaModel, area_id)
        area = AreaModel.query.filter_by(id=area_id).first()
        db.session.delete(area)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    @token_required
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
    def get(self):
        current_user = getattr(g, 'current_user', None)
        areas = AreaModel.query.filter_by(user_id=current_user.id).all()
        return areas


    @marshal_with(resource_fields)
    @token_required
    def post(self):
        current_user = getattr(g, 'current_user', None)

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
        new_area =AreaModel(**args)

        db.session.add(new_area)
        db.session.commit()
        return new_area, 201
