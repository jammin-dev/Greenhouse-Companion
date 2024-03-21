"""This script defines Flask view functions for handling
CRUD operations on the "to_do_list" resource."""

from api.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.to_do_list import ToDoList


@app_views.route('/to_do_list', methods=['GET'], strict_slashes=False)
def get_all_to_do_list():
    """
    Retrieves all todo lists from the storage and returns them as a list
    of JSON objects.
    """
    to_do_list = storage.all(ToDoList).values()
    return jsonify([todo.to_dict() for todo in to_do_list]), 200


@app_views.route('/to_do_list/<to_do_list_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_to_do_list(to_do_list_id):
    """
    Deletes a specific todo based on the provided ID and returns
    an empty JSON object.
    """
    todo = storage.get(ToDoList, to_do_list_id)
    if todo:
        storage.delete(todo)
        storage.save()
        return jsonify({}), 200
    abort(404)


@app_views.route('/to_do_list', methods=['POST'], strict_slashes=False)
def create_to_do_list():
    """
    Creates a new todo based on the provided details and returns
    its details as a JSON object.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    if "task" not in data:
        return jsonify({"error": "Missing task"}), 400
    new_todo = ToDoList(**data)
    new_todo.save()
    return jsonify(new_todo.to_dict()), 201


@app_views.route('/to_do_list/<to_do_list_id>', methods=['PUT'],
                 strict_slashes=False)
def update_to_do_list(to_do_list_id):
    """
    Updates a specific todo based on the provided ID and details,
    and returns its updated details as a JSON object.
    """
    todo = storage.get(ToDoList, to_do_list_id)
    if todo:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(todo, key, value)
        todo.save()
        return jsonify(todo.to_dict()), 200
    abort(404)
