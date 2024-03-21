from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .to_do_model import TodoModel
from .area_model import AreaModel
from .sensors_model import SensorsModel, AutomationModel
from .user_model import UserModel
from .vegetable_infos_model import VegetableInfosModel
from.vegetable_manager_model import VegetableManagerModel