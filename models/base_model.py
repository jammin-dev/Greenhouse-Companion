"""
Module: models.base_model

This module defines the BaseModel class, which serves as a base for other models in the system.
The BaseModel includes common attributes like id, created_at, and updated_at.

Classes:
    - BaseModel: Serves as a base for other models in the system.

"""

from . import db
from datetime import datetime
import uuid


class BaseModel():
    """
    Class: BaseModel

    Serves as a base for other models in the system.

    Attributes:
        - id (str): A unique identifier for the model, generated using UUID.
        - created_at (datetime): The timestamp indicating when the model was created.
        - updated_at (datetime): The timestamp indicating when the model was last updated.

    """

    id = db.Column(db.String(50), default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now,
                           onupdate=datetime.now, nullable=False)
