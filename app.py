import os
import sys

from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from models import db

from views.automation_view import AutomationList
from views.area_view import Area, AreaList
from views.home_view import Home
from views.login_view import Login
from views.sensors_view import Sensor, SensorList, SensorsLast
from views.to_do_view import Todo, TodoList
from views.user_view import User, UserList, PromoteUser
from views.vegetable_infos_view import VegetableInfos, VegetableInfosList
from views.vegetable_manager_view import VegetableManager, VegetableManagerList

app = Flask(__name__)
api = Api(app)
CORS(app)

database = os.environ.get('DATABASE')

if database == 'mysql':
    db_user = os.environ['GREENHOUSE_MYSQL_USER']
    db_password = os.environ['GREENHOUSE_MYSQL_PWD']
    db_host = os.environ['GREENHOUSE_MYSQL_HOST']
    db_port = os.environ['GREENHOUSE_MYSQL_PORT']
    db_name = os.environ['GREENHOUSE_MYSQL_DB']
    db_uri = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
elif database == 'sqlite':
    db_uri = 'sqlite:///greenhouse_dev.db'
else:
    print('Please select a databse')
    sys.exit(1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
db.init_app(app)

api.add_resource(Home, '/')

# api.add_resource(Login, '/login')

api.add_resource(User, '/users/<string:user_id>')
api.add_resource(UserList, '/users')
api.add_resource(PromoteUser, '/users/promote/<string:user_id>')

api.add_resource(Area, '/areas/<string:area_id>')
api.add_resource(AreaList, '/areas')

api.add_resource(Sensor, '/sensors/<string:sensor_id>')
api.add_resource(SensorList, '/sensors')
api.add_resource(SensorsLast, '/sensors/last')

api.add_resource(AutomationList, '/automation')

api.add_resource(Todo, '/todo/<string:todo_id>')
api.add_resource(TodoList, '/todo')

api.add_resource(VegetableInfos, '/vegetable_infos/<string:vegetable_id>')
api.add_resource(VegetableInfosList, '/vegetable_infos')

api.add_resource(VegetableManager, '/vegetable_manager/<string:vegetable_id>')
api.add_resource(VegetableManagerList, '/vegetable_manager')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run()
