from . import db
from models.base_model import BaseModel

class TodoModel(BaseModel, db.Model):
    task = db.Column(db.String(100))
    priority = db.Column(db.Integer)
    complete = db.Column(db.Boolean, default=False)
