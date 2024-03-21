"""
This script defines a Flask web application for an API.

Inputs:
    None

Flow:
    - Create a Flask web application instance.
    - Register the blueprint `app_views` to the application.
    - Enable Cross-Origin Resource Sharing (CORS) for the application, allowing access from any origin.
    - Define an error handler for 404 errors, returning a JSON response with an error message.
    - Define a teardown function to close the storage.
    - If the script is executed directly (not imported), determine the host and port for the application.
    - Run the application with the specified host, port, and other options.

Outputs:
    A Flask web application is created and runs with the specified configuration.
"""

from flask import Flask
from flask import jsonify
from flask_cors import CORS
from models import storage
from api.views import app_views
import os


app = Flask(__name__)

# Register the blueprint
app.register_blueprint(app_views)


# Implementation of CORS to enable access from any origin
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "0.0.0.0"}})


@app.errorhandler(404)
def _handle_api_error(exception):
    return jsonify(error="Not found"), 404


@app.teardown_appcontext
def teardown_db(exception):
    """closes the storage on teardown"""
    storage.close()


if __name__ == "__main__":
    if os.environ.get('HBNB_API_HOST'):
        host = os.environ.get('HBNB_API_HOST')
    else:
        host = "0.0.0.0"

    if os.environ.get('HBNB_API_PORT'):
        port = int(os.environ.get('HBNB_API_PORT'))
    else:
        port = 5000
    app.run(host=host, port=port, threaded=True, debug=True)
