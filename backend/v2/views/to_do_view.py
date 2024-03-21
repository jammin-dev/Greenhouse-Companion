"""
Module: resources.todo_resource

This module defines RESTful resources for managing to-do tasks in a gardening system using Flask-RESTful.

Classes:
    - Todo: Represents a single to-do task and provides GET, DELETE, and PUT methods.
    - TodoList: Represents a list of to-do tasks and provides GET and POST methods.

"""

from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.to_do_model import TodoModel
from models import db
from utils import abort_if_doesnt_exist

# Fields for marshaling to-do task data
resource_fields = {
    'id': fields.String,
    'task': fields.String,
    'priority': fields.Integer,
    'complete': fields.Boolean
}

class Todo(Resource):
    """
    Class: Todo

    Represents a single to-do task and provides GET, DELETE, and PUT methods.

    Methods:
        - get: Retrieve to-do task data by to-do ID.
        - delete: Delete to-do task data by to-do ID.
        - put: Update to-do task data by to-do ID.

    """
    @marshal_with(resource_fields)
    def get(self, todo_id):
        """
        Retrieve to-do task data by to-do ID.

        Parameters:
            - todo_id (str): The ID of the to-do task.

        Returns:
            - todo (TodoModel): The to-do task data.

        """
        abort_if_doesnt_exist(TodoModel, todo_id)
        todo = TodoModel.query.filter_by(id=todo_id).first()
        return todo

    def delete(self, todo_id):
        """
        Delete to-do task data by to-do ID.

        Parameters:
            - todo_id (str): The ID of the to-do task.

        Returns:
            - Empty string.

        """
        abort_if_doesnt_exist(TodoModel, todo_id)
        todo = TodoModel.query.filter_by(id=todo_id).first()
        db.session.delete(todo)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, todo_id):
        """
        Update to-do task data by to-do ID.

        Parameters:
            - todo_id (str): The ID of the to-do task.

        Returns:
            - todo (TodoModel): The updated to-do task data.

        """
        abort_if_doesnt_exist(TodoModel, todo_id)
        todo = TodoModel.query.filter_by(id=todo_id).first()
        
        parser_update = reqparse.RequestParser()
        argument_list = [
            ('task', str, None, False),
            ('priority', int, None, False),
            ('complete', bool, None, False),
        ]
        # Iterate through the argument list and add arguments to the parser
        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_update.add_argument(
                arg_name, 
                type=arg_type, 
                help=arg_help,
                required=arg_required
            )
        args = parser_update.parse_args()
        # Update the to-do task object with non-null arguments
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(todo, arg_name, arg_value)
        db.session.commit()
        return todo, 201


class TodoList(Resource):
    """
    Class: TodoList

    Represents a list of to-do tasks and provides GET and POST methods.

    Methods:
        - get: Retrieve a list of all to-do tasks.
        - post: Create a new to-do task.

    """
    @marshal_with(resource_fields)
    def get(self):
        """
        Retrieve a list of all to-do tasks.

        Returns:
            - todos (List[TodoModel]): A list of to-do task data.

        """
        todos = TodoModel.query.all()
        return todos

    @marshal_with(resource_fields)
    def post(self):
        """
        Create a new to-do task.

        Returns:
            - new_todo (TodoModel): The newly created to-do task data.

        """
        parser_create = reqparse.RequestParser()
        argument_list = [
            ('task', str, "Task is required", True),
            ('priority', int, None, False),
        ]

        # Iterate through the argument list and add arguments to the parser
        for arg_name, arg_type, arg_help, arg_required in argument_list:
            parser_create.add_argument(
                arg_name, 
                type=arg_type, 
                help=arg_help,
                required=arg_required
            )

        args = parser_create.parse_args()
        
        new_todo = TodoModel(**args)
        db.session.add(new_todo)
        db.session.commit()
        return new_todo, 201
