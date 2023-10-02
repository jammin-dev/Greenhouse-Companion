from flask import jsonify, request, current_app
import jwt
from functools import wraps
from models.user_model import UserModel

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify(401, {'message' : 'Token is missing!'})
        try: 
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = UserModel.query.filter_by(id=data['id']).first()
        except:
            return jsonify(401, {'message' : 'Token is invalid!'})
        return f(current_user, *args, **kwargs)
    return decorated