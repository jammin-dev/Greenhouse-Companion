"""
Module: models.todo_model

This module defines the TodoModel class, representing tasks in a to-do list.
The TodoModel inherits from the BaseModel.

Classes:
    - TodoModel: Represents tasks in a to-do list.

"""

from . import db
from models.base_model import BaseModel


class TodoModel(BaseModel, db.Model):
    """
    Class: TodoModel

    Represents tasks in a to-do list.

    Attributes:
        - task (str): The description of the task.
        - priority (int): The priority level of the task.
        - complete (bool): The status indicating whether the task is complete or not.

    """

    task = db.Column(db.String(100))
    priority = db.Column(db.Integer)
    complete = db.Column(db.Boolean, default=False)
