from . import db
import uuid
from models.base_model import BaseModel
from flask_sqlalchemy import SQLAlchemy

class UserModel(BaseModel, db.Model):
    name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

    areas = db.relationship('AreaModel', backref='user', lazy=False)
    vegetables = db.relationship('VegetableManagerModel', backref='user', lazy=False)