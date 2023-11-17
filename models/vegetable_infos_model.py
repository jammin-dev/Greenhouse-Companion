"""
Module: models.vegetable_infos_model

This module defines the VegetableInfosModel class, representing information about various vegetables.
The VegetableInfosModel inherits from the BaseModel.

Classes:
    - VegetableInfosModel: Represents information about various vegetables.

"""

from . import db
from models.base_model import BaseModel


class VegetableInfosModel(BaseModel, db.Model):
    """
    Class: VegetableInfosModel

    Represents information about various vegetables.

    Attributes:
        - name (str): The name of the vegetable. It should be unique and cannot be null.
        - family (str): The family or category to which the vegetable belongs.
        - start_indoor (Date): The recommended date to start the vegetable indoors.
        - start_outdoor (Date): The recommended date to start the vegetable outdoors.
        - end (Date): The recommended end date for the vegetable's growth.
        - water_needs (int): The water needs of the vegetable.
        - cold_resistance (int): The cold resistance level of the vegetable.
        - spacing_on_raw (float): The recommended spacing on the row for planting.
        - soil_temperature (float): The preferred soil temperature for the vegetable.
        - description (str): A brief description or additional information about the vegetable.

    """

    name = db.Column(db.String(20), unique=True, nullable=False)
    family = db.Column(db.String(20))
    start_indoor = db.Column(db.Date)
    start_outdoor = db.Column(db.Date)
    end = db.Column(db.Date)
    water_needs = db.Column(db.Integer)
    cold_resistance = db.Column(db.Integer)
    spacing_on_raw = db.Column(db.Float)
    soil_temperature = db.Column(db.Float)
    description = db.Column(db.String(250))
