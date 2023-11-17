"""
Module: models.area_model

This module defines the AreaModel class, which represents an area in a gardening system.
The area can have a name, surface, and a relationship with VegetableManagerModel.

Classes:
    - AreaModel: Represents an area in the gardening system.

"""

from . import db
from models.base_model import BaseModel


class AreaModel(BaseModel, db.Model):
    """
    Class: AreaModel

    Represents an area in the gardening system.

    Attributes:
        - name (str): The name of the area. It should be unique and cannot be null.
        - surface (float): The surface area of the garden.
        - vegetables (relationship): Relationship with VegetableManagerModel.

    """

    name = db.Column(db.String(20), unique=True, nullable=False)
    surface = db.Column(db.Float)
    vegetables = db.relationship('VegetableManagerModel', backref='area_model')
