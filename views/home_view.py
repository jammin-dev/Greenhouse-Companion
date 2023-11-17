"""
Module: resources.home_resource

This module defines a RESTful resource for a home endpoint in a gardening system using Flask-RESTful.

Classes:
    - Home: Represents the home endpoint and provides a GET method.

"""

from flask_restful import Resource
from flask import jsonify

class Home(Resource):
    """
    Class: Home

    Represents the home endpoint and provides a GET method.

    Methods:
        - get: Retrieve a welcome message.

    """
    def get(self):
        """
        Retrieve a welcome message.

        Returns:
            - response (json): A JSON response with a welcome message.

        """
        return jsonify({"message": "Hello World"})
