from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse
from models.to_do_model import TodoModel
from models import db
from utils import abort_if_doesnt_exist

resource_fields = {
    'id': fields.String,
    'task': fields.String,
    'priority': fields.Integer,
    'complete': fields.Boolean
}
class Todo(Resource):
    @marshal_with(resource_fields)
    def get(self, todo_id):
        abort_if_doesnt_exist(TodoModel, todo_id)
        todo = TodoModel.query.filter_by(id=todo_id).first()
        return todo

    def delete(self, todo_id):
        abort_if_doesnt_exist(TodoModel, todo_id)
        todo = TodoModel.query.filter_by(id=todo_id).first()
        db.session.delete(todo)
        db.session.commit()
        return ''

    @marshal_with(resource_fields)
    def put(self, todo_id):
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
        # Update the vegetable object with non-null arguments
        for arg_name, arg_value in args.items():
            if arg_value is not None:
                setattr(todo, arg_name, arg_value)
        db.session.commit()
        return todo, 201


class TodoList(Resource):
    @marshal_with(resource_fields)
    def get(self):
        todos = TodoModel.query.all()
        return todos

    @marshal_with(resource_fields)
    def post(self):
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
