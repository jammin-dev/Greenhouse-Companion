"""
initialize the models package
"""
from models.engine.db_storage import DBStorage
from os import getenv


# storage_t = "db"
storage = DBStorage()

# if storage_t == "db":
#     from models.engine.db_storage import DBStorage
#     storage = DBStorage()
# else:
#     from models.engine.file_storage import FileStorage
#     storage = FileStorage()
storage.reload()
