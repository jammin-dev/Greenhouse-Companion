"""
Module: resources.user_resource

This module defines RESTful resources for managing user data in a gardening system using Flask-RESTful.

Classes:
    - User: Represents a single user and provides GET, DELETE, and PUT methods.
    - UserList: Represents a list of users and provides GET and POST methods.
    - PromoteUser: Represents a resource for promoting a user to admin status.

"""

from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.user_model import UserModel
from models import db
from werkzeug.security import generate_password_hash, check_password_hash
from utils import abort_if_doesnt_exist, abort_if_exists
from auth import token_required

# Fields for marshaling user data
resource_fields = {
    'id': fields.String,
    'name': fields.String,
    'password': fields.String,
    'admin': fields.Boolean,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
    'areas': fields.List(fields.String),
    'vegetables': fields.List(fields.String)
}

class User(Resource):
    """
    Class: User

    Represents a single user and provides GET, DELETE, and PUT methods.

    Methods:
        - get: Retrieve user data by user ID.
        - delete: Delete user data by user ID.
        - put: Update user data by user ID.

    """
    @marshal_with(resource_fields)
    def get(self, user_id):
        """
        Retrieve user data by user ID.

        Parameters:
            - user_id (str): The ID of the user.

        Returns:
            - user (UserModel): The user data.

        """
        abort_if_doesnt_exist(UserModel, user_id)
        user = UserModel.query.filter_by(id=user_id).first()
        return user

    def delete(self, user_id):
        """
        Delete user data by user ID.

        Parameters:
            - user_id (str): The ID of the user.

        Returns:
            - Empty string.

        """
        abort_if_doesnt_exist(UserModel, user_id)
        user = UserModel.query.filter_by(id=user_id).first()
        db.session.delete(user)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, user_id):
        """
        Update user data by user ID.

        Parameters:
            - user_id (str): The ID of the user.

        Returns:
            - user (UserModel): The updated user data.

        """
        abort_if_doesnt_exist(UserModel, user_id)
        user = UserModel.query.filter_by(id=user_id).first()
        parser_update = reqparse.RequestParser()
        parser_update.add_argument('name', type=str)
        args = parser_update.parse_args()
        if 'name' in args:
            user.name = args['name']
        db.session.commit()
        return user, 201

class UserList(Resource):
    """
    Class: UserList

    Represents a list of users and provides GET and POST methods.

    Methods:
        - get: Retrieve a list of all users (requires authentication).
        - post: Create a new user.

    """
    @marshal_with(resource_fields)
    @token_required
    def get(self):
        """
        Retrieve a list of all users (requires authentication).

        Returns:
            - users (List[UserModel]): A list of user data.

        """
        users = UserModel.query.all()
        return users

    @marshal_with(resource_fields)
    def post(self):
        """
        Create a new user.

        Returns:
            - new_user (UserModel): The newly created user data.

        """
        parser_create = reqparse.RequestParser()
        parser_create.add_argument('name', type=str, help="Name is required", required=True)
        parser_create.add_argument('password', help="Password is required", type=str)
        args = parser_create.parse_args()
        abort_if_exists(UserModel, 'name', args['name'])
        hashed_password = generate_password_hash(
            args['password'], method='sha256')
        new_user = UserModel(
            name=args['name'], password=hashed_password, admin=False)
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201

class PromoteUser(Resource):
    """
    Class: PromoteUser

    Represents a resource for promoting a user to admin status.

    Methods:
        - put: Promote a user to admin status.

    """
    @marshal_with(resource_fields)
    def put(self, user_id):
        """
        Promote a user to admin status.

        Parameters:
            - user_id (str): The ID of the user.

        Returns:
            - user (UserModel): The user data with admin status updated.

        """
        abort_if_doesnt_exist(UserModel, user_id)
        user = UserModel.query.filter_by(id=user_id).first()
        user.admin = True
        db.session.commit()
        return user, 201
