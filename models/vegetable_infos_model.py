from. import db
from models.base_model import BaseModel

class VegetableInfosModel(BaseModel, db.Model):
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