"""
Contains the class DBStorage

interacts with a MySQL database

Example Usage:
    storage = DBStorage()
    storage.reload()
    objects = storage.all()
    for obj in objects.values():
        print(obj)

Inputs:
    None

Outputs:
    Methods for interacting with a MySQL database, including querying, adding, deleting, and saving objects.
"""
from dotenv import load_dotenv
import json
import models
from models.base_model import BaseModel, Base
from models.garden_area import GardenArea
from models.sensors import Sensors
from models.soil_moisture_set import SoilMoistureSet
from models.to_do_list import ToDoList
from models.vegetable_infos import VegetableInfos
from models.vegetable_manager import VegetableManager
import os 
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

# Load environment variables from the .env file
load_dotenv()

classes = {
    "GardenArea": GardenArea,
    "VegetableManager": VegetableManager,
    "Sensors": Sensors,
    "SoilMoistureSet": SoilMoistureSet,
    "ToDoList": ToDoList,
    "VegetableInfos": VegetableInfos
}


class DBStorage:
    """
    interacts with the MySQL database
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Instantiate a DBStorage object
        """
        # Access the environment variables
        GREENHOUSE_MYSQL_USER = os.environ.get('GREENHOUSE_MYSQL_USER')
        GREENHOUSE_MYSQL_PWD = os.environ.get('GREENHOUSE_MYSQL_PWD')
        GREENHOUSE_MYSQL_HOST = os.environ.get('GREENHOUSE_MYSQL_HOST')
        GREENHOUSE_MYSQL_DB = os.environ.get('GREENHOUSE_MYSQL_DB')
        GREENHOUSE_MYSQL_PORT = os.environ.get('GREENHOUSE_MYSQL_PORT')

        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}:{}/{}'.
                                      format(GREENHOUSE_MYSQL_USER,
                                             GREENHOUSE_MYSQL_PWD,
                                             GREENHOUSE_MYSQL_HOST,
                                             GREENHOUSE_MYSQL_PORT,
                                             GREENHOUSE_MYSQL_DB))
        # if GREENHOUSE_ENV == "test":
        #     Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """
        query on the current database session

        Args:
            cls (class): class to query for objects, default is None

        Returns:
            dict: dictionary of objects
        """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """
        add the object to the current database session

        Args:
            obj (object): object to add
        """
        self.__session.add(obj)

    def save(self):
        """
        commit all changes of the current database session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        delete from the current database session obj if not None

        Args:
            obj (object): object to delete
        """
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """
        reloads data from the database
        """
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """
        call remove() method on the private session attribute
        """
        self.__session.remove()

    def get(self, cls, id):
        """
        Retrieve an object by class and ID

        Args:
            cls (class): class of the object
            id (str): ID of the object

        Returns:
            object: retrieved object or None if not found
        """
        if cls in classes.values() and type(id) is str:
            key = cls.__name__ + '.' + id
            return self.__session.query(classes[cls.__name__]).get(id)
        return None

    def count(self, cls=None):
        """
        Count the number of objects in storage

        Args:
            cls (class): class to count objects for, default is None

        Returns:
            int: number of objects
        """
        if cls is None:
            total_count = 0
            for clss in classes.values():
                total_count += self.__session.query(clss).count()
            return total_count
        elif cls in classes.values():
            return self.__session.query(cls).count()
        return 0
