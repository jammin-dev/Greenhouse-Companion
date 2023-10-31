from . import db
from datetime import datetime
import uuid

class BaseModel():
    id = db.Column(db.String(50), default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now,
                           onupdate=datetime.now, nullable=False)
