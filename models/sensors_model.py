from. import db
from models.base_model import BaseModel

class SensorsModel(BaseModel, db.Model):
    air_temperature = db.Column(db.Float)
    air_humidity = db.Column(db.Float)
    luminosity = db.Column(db.Float)

class AutomationModel(BaseModel, db.Model):
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
