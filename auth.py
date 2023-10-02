from flask import jsonify, request, current_app, g
import jwt
from functools import wraps
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from models.user_model import UserModel

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = UserModel.query.get(data['id'])
        except ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401

        if not current_user:
            return jsonify({'message': 'User not found!'}), 401
        g.current_user = current_user
        return f(*args, **kwargs)

    return decorated
