"""This script defines Flask view functions for handling
CRUD operations on the "vegetable_manager" resource."""

from api.views import app_views
from flask import jsonify, request, abort, render_template
from models import storage
from models.vegetable_manager import VegetableManager
from models.garden_area import GardenArea


@app_views.route('/vegetable_manager', methods=['GET'], strict_slashes=False)
def get_all_vegetable_manager():
    """
    Retrieves all vegetable areas from the storage and returns them as a list
    of JSON objects.
    """
    vegetable_manager = storage.all(VegetableManager).values()
    return jsonify([data.to_dict() for data in vegetable_manager])


@app_views.route('/vegetable_manager/<vegetable_manager_id>', methods=['GET'],
                 strict_slashes=False)
def get_vegetable_manager(vegetable_manager_id):
    """
    Retrieves a specific vegetable area based on the provided ID and returns its
    details as a JSON object.
    """
    vegetable = storage.get(VegetableManager, vegetable_manager_id)
    if vegetable:
        return jsonify(vegetable.to_dict())
    abort(404)


@app_views.route('/vegetable_manager/<vegetable_manager_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_vegetable_manager(vegetable_manager_id):
    """
    Deletes a specific vegetable area based on the provided ID and returns
    an empty JSON object.
    """
    state = storage.get(VegetableManager, vegetable_manager_id)
    if state:
        storage.delete(state)
        storage.save()
        return jsonify({})
    abort(404)


@app_views.route('/vegetable_manager', methods=['POST'], strict_slashes=False)
def create_vegetable_manager():
    """
    Creates a new vegetable area based on the provided details and returns
    its details as a JSON object.
    """
    # return ("hello")
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    # if "name" not in data:
    #     return jsonify({"error": "Missing name"}), 400
    new_vegetable = VegetableManager(**data)
    new_vegetable.save()
    return jsonify(new_vegetable.to_dict()), 201


@app_views.route('/vegetable_manager/<vegetable_manager_id>', methods=['PUT'],
                 strict_slashes=False)
def update_vegetable_manager(vegetable_manager_id):
    """
    Updates a specific vegetable area based on the provided ID and details,
    and returns its updated details as a JSON object.
    """
    vegetable = storage.get(VegetableManager, vegetable_manager_id)
    if vegetable:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(vegetable, key, value)
        vegetable.save()
        return jsonify(vegetable.to_dict())
    abort(404)
