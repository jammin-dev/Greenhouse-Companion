"""
Module: resources.login_resource

This module defines a RESTful resource for user authentication in a gardening system using Flask-RESTful.

Classes:
    - Login: Represents the login endpoint and provides a POST method for user authentication.

"""

from flask_restful import Resource
from models.user_model import UserModel
from flask import Flask, request, jsonify, make_response, current_app
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
import jwt
import datetime

class Login(Resource):
    """
    Class: Login

    Represents the login endpoint and provides a POST method for user authentication.

    Methods:
        - post: Authenticate a user and generate a JWT token.

    """
    methods = ['POST']

    def post(self):
        """
        Authenticate a user and generate a JWT token.

        Returns:
            - response (json): A JSON response containing a JWT token upon successful authentication.

        """
        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            return make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        user = UserModel.query.filter_by(name=auth.username).first()
        if not user:
            return make_response('Could not verify2', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        if check_password_hash(user.password, auth.password):
            token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=12)}, current_app.config['SECRET_KEY'])
            return jsonify({'token': token})
        return make_response('Could not verify3', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
