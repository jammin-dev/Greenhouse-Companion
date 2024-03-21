"""
Module: models.user_model

This module defines the UserModel class, representing user information in the system.
The UserModel inherits from the BaseModel.

Classes:
    - UserModel: Represents user information in the system.

"""

from . import db
from models.base_model import BaseModel
from flask_sqlalchemy import SQLAlchemy


class UserModel(BaseModel, db.Model):
    """
    Class: UserModel

    Represents user information in the system.

    Attributes:
        - name (str): The name of the user. It should be unique and cannot be null.
        - password (str): The password associated with the user.
        - admin (bool): A boolean indicating whether the user has administrative privileges.

    """

    name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120))
    admin = db.Column(db.Boolean)
