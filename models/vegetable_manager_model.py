from. import db
from models.base_model import BaseModel

class VegetableManagerModel(BaseModel, db.Model):
    name = db.Column(db.String(20), nullable=False )
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
    user_id = db.Column(db.String(60), db.ForeignKey('user_model.id'), nullable=False)