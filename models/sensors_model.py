"""
Module: models.sensor_model

This module defines the SensorsModel class, representing sensor data in the system.
The SensorsModel inherits from the BaseModel.

Classes:
    - SensorsModel: Represents sensor data in the system.

"""

from . import db
from models.base_model import BaseModel


class SensorsModel(BaseModel, db.Model):
    """
    Class: SensorsModel

    Represents sensor data in the system.

    Attributes:
        - air_temperature (float): The air temperature measured by the sensors.
        - air_humidity (float): The air humidity measured by the sensors.
        - luminosity (float): The luminosity measured by the sensors.

    """

    air_temperature = db.Column(db.Float)
    air_humidity = db.Column(db.Float)
    luminosity = db.Column(db.Float)

class AutomationModel(BaseModel, db.Model):
    """
    Class: AutomationModel

    Represents automation settings in the system.

    Attributes:
        - air_humidity_selection (int): The selected air humidity threshold for automation.
        - air_temperature_selection (int): The selected air temperature threshold for automation.
        - extractor_plug (int): The plug controlling the extractor.
        - smart_plug_1_state (bool): The state of the first smart plug.
        - smart_plug_1_timer (int): The timer setting for the first smart plug.
        - smart_plug_1_total (int): The total usage of the first smart plug.
        - smart_plug_2_state (bool): The state of the second smart plug.
        - smart_plug_2_timer (int): The timer setting for the second smart plug.
        - smart_plug_2_total (int): The total usage of the second smart plug.
        - smart_plug_3_state (bool): The state of the third smart plug.
        - smart_plug_3_timer (int): The timer setting for the third smart plug.
        - smart_plug_3_total (int): The total usage of the third smart plug.
        - smart_plug_4_state (bool): The state of the fourth smart plug.
        - smart_plug_4_timer (int): The timer setting for the fourth smart plug.
        - smart_plug_4_total (int): The total usage of the fourth smart plug.

    """

    air_humidity_selection = db.Column(db.Integer)
    air_temperature_selection = db.Column(db.Integer)
    extractor_plug = db.Column(db.Integer)
    smart_plug_1_state = db.Column(db.Boolean)
    smart_plug_1_timer = db.Column(db.Integer)
    smart_plug_1_total = db.Column(db.Integer)
    smart_plug_2_state = db.Column(db.Boolean)
    smart_plug_2_timer = db.Column(db.Integer)
    smart_plug_2_total = db.Column(db.Integer)
    smart_plug_3_state = db.Column(db.Boolean)
    smart_plug_3_timer = db.Column(db.Integer)
    smart_plug_3_total = db.Column(db.Integer)
    smart_plug_4_state = db.Column(db.Boolean)
    smart_plug_4_timer = db.Column(db.Integer)
    smart_plug_4_total = db.Column(db.Integer)
