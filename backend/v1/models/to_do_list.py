""" holds class ToDoList"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Boolean, Integer


class ToDoList(BaseModel, Base):
    """Representation of ToDoList """
    __tablename__ = 'to_do_list'
    task = Column(String(256), nullable=False)
    completed = Column(Boolean, default=False)
    priority = Column(Integer)

    def __init__(self, *args, **kwargs):
        """initializes ToDoList"""
        super().__init__(*args, **kwargs)
