"""This script defines Flask view functions for handling
CRUD operations on the "garden_area" resource."""

from api.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.garden_area import GardenArea


@app_views.route('/garden_area', methods=['GET'], strict_slashes=False)
def get_all_garden_area():
    """
    Retrieves all garden areas from the storage and returns them as a list
    of JSON objects.
    """
    garden_area = storage.all(GardenArea).values()
    return jsonify([garden.to_dict() for garden in garden_area])



@app_views.route('/garden_area/<garden_area_id>', methods=['GET'],
                 strict_slashes=False)
def get_garden_area(garden_area_id):
    """
    Retrieves a specific garden area based on the provided ID and returns its
    details as a JSON object.
    """
    garden = storage.get(GardenArea, garden_area_id)
    if garden:
        return jsonify(garden.to_dict())
    abort(404)


@app_views.route('/garden_area/<garden_area_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_garden_area(garden_area_id):
    """
    Deletes a specific garden area based on the provided ID and returns
    an empty JSON object.
    """
    state = storage.get(GardenArea, garden_area_id)
    if state:
        storage.delete(state)
        storage.save()
        return jsonify({})
    abort(404)


@app_views.route('/garden_area', methods=['POST'], strict_slashes=False)
def create_garden_area():
    """
    Creates a new garden area based on the provided details and returns
    its details as a JSON object.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    if "name" not in data:
        return jsonify({"error": "Missing name"}), 400
    new_garden = GardenArea(**data)
    new_garden.save()
    return jsonify(new_garden.to_dict()), 201


@app_views.route('/garden_area/<garden_area_id>', methods=['PUT'],
                 strict_slashes=False)
def update_garden_area(garden_area_id):
    """
    Updates a specific garden area based on the provided ID and details,
    and returns its updated details as a JSON object.
    """
    garden = storage.get(GardenArea, garden_area_id)
    if garden:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(garden, key, value)
        garden.save()
        return jsonify(garden.to_dict())
    abort(404)
