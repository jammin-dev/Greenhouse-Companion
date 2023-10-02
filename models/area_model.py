from. import db
from models.base_model import BaseModel

class AreaModel(BaseModel, db.Model):
    name = db.Column(db.String(20), unique=True, nullable=False )
    surface = db.Column(db.Float)
    vegetables = db.relationship('VegetableManagerModel', backref='area_model')
    user_id = db.Column(db.Integer, db.ForeignKey('user_model.id'), nullable=False)
