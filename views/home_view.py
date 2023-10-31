from flask_restful import Resource
from flask import jsonify

class Home(Resource):
    def get(self):
        return jsonify({"message": "Hello World"})