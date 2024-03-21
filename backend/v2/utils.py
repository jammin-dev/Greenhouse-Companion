from flask_restful import abort

def abort_if_doesnt_exist(Class, id):
    """
    Abort the request if the object with the given ID doesn't exist.

    Parameters:
    - Class (class): The SQLAlchemy model class.
    - id (str): The ID of the object to check.

    Returns:
    - None

    Raises:
    - 404 Error: If the object with the given ID doesn't exist.
    """
    obj = Class.query.filter_by(id=id).first()
    if not obj:
        abort(404, message=f"{Class.__name__} with ID {id} doesn't exist")

def abort_if_exists(Class, attr, value):
    """
    Abort the request if an object with a specific attribute value already exists.

    Parameters:
    - Class (class): The SQLAlchemy model class.
    - attr (str): The attribute to check for uniqueness.
    - value: The value of the attribute.

    Returns:
    - None

    Raises:
    - 404 Error: If an object with the specified attribute value already exists.
    """
    obj = Class.query.filter_by(**{attr: value}).first()
    if obj:
        abort(404, message=f"{Class.__name__} with {attr}={value} already exists")
