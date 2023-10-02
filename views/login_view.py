from flask_restful import Resource
from models.user_model import UserModel
from flask import Flask, request, jsonify, make_response, current_app
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
import jwt
import datetime

class Login(Resource):
    def post(self):
        auth = request.authorization
        print(auth)
        if not auth or not auth.username or not auth.password:
            return make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        user = UserModel.query.filter_by(name=auth.username).first()
        if not user:
            return make_response('Could not verify2', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        if check_password_hash(user.password, auth.password):
            token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])
            return jsonify({'token': token})
        return make_response('Could not verify3', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
