"""
Module: models.vegetable_manager_model

This module defines the VegetableManagerModel class, representing the management of vegetables in the gardening system.
The VegetableManagerModel inherits from the BaseModel.

Classes:
    - VegetableManagerModel: Represents the management of vegetables in the gardening system.

"""

from . import db
from models.base_model import BaseModel


class VegetableManagerModel(BaseModel, db.Model):
    """
    Class: VegetableManagerModel

    Represents the management of vegetables in the gardening system.

    Attributes:
        - name (str): The name of the vegetable. It cannot be null.
        - quantity (int): The quantity of the vegetable.
        - sowed (bool): A boolean indicating whether the vegetable has been sowed.
        - planted (bool): A boolean indicating whether the vegetable has been planted.
        - sowing_date (Date): The date when the vegetable was sowed.
        - planting_date (Date): The date when the vegetable was planted.
        - harvest_date (Date): The date when the vegetable was harvested.
        - harvest_quantity (float): The quantity of the harvested vegetable.
        - remove_date (Date): The date when the vegetable was removed.
        - notes (str): Additional notes or information about the vegetable.

        - area_id (str): The foreign key linking the vegetable to a specific area.

    """

    name = db.Column(db.String(20), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    sowed = db.Column(db.Boolean, default=False)
    planted = db.Column(db.Boolean, default=False)
    sowing_date = db.Column(db.Date)
    planting_date = db.Column(db.Date)
    harvest_date = db.Column(db.Date)
    harvest_quantity = db.Column(db.Float)
    remove_date = db.Column(db.Date)
    notes = db.Column(db.String(1024))

    area_id = db.Column(db.String(60), db.ForeignKey('area_model.id'), nullable=False)
