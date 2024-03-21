"""This script defines Flask view functions for handling
CRUD operations on the "vegetable_infos" resource."""

from api.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.vegetable_infos import VegetableInfos


@app_views.route('/vegetable_infos', methods=['GET'], strict_slashes=False)
def get_all_vegetable_infos():
    """
    Retrieves all vegetable lists from the storage and returns them as a list
    of JSON objects.
    """
    vegetable_infos = storage.all(VegetableInfos).values()
    return jsonify([vegetable.to_dict() for vegetable in vegetable_infos]), 200


@app_views.route('/vegetable_infos/<vegetable_id>', methods=['GET'], strict_slashes=False)
def get_one_vegetable_infos(vegetable_id):
    """
    Retrieves one vegetable from the storage and returns as a JSON object
    of JSON objects.
    """
    vegetable = storage.get(VegetableInfos, vegetable_id)
    if vegetable:
        return jsonify(vegetable.to_dict()), 200
    abort(404)


@app_views.route('/vegetable_infos/<vegetable_infos_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_vegetable_infos(vegetable_infos_id):
    """
    Deletes a specific vegetable based on the provided ID and returns
    an empty JSON object.
    """
    vegetable = storage.get(VegetableInfos, vegetable_infos_id)
    if vegetable:
        storage.delete(vegetable)
        storage.save()
        return jsonify({}), 200
    abort(404)


@app_views.route('/vegetable_infos', methods=['POST'], strict_slashes=False)
def create_vegetable_infos():
    """
    Creates a new vegetable based on the provided details and returns
    its details as a JSON object.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    if "name" not in data:
        return jsonify({"error": "Missing name"}), 400
    new_vegetable = VegetableInfos(**data)
    new_vegetable.save()
    return jsonify(new_vegetable.to_dict()), 201


@app_views.route('/vegetable_infos/<vegetable_infos_id>', methods=['PUT'],
                 strict_slashes=False)
def update_vegetable_infos(vegetable_infos_id):
    """
    Updates a specific vegetable based on the provided ID and details,
    and returns its updated details as a JSON object.
    """
    vegetable = storage.get(VegetableInfos, vegetable_infos_id)
    if vegetable:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(vegetable, key, value)
        vegetable.save()
        return jsonify(vegetable.to_dict()), 200
    abort(404)
