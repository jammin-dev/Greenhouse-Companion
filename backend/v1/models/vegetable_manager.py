#!/usr/bin/python3
""" holds class VegetableManager"""
import models
from models.base_model import BaseModel, Base
from models.garden_area import GardenArea
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Date, Float, Boolean, Integer
from sqlalchemy.orm import relationship
from datetime import datetime


class VegetableManager(BaseModel, Base):
    """Representation of VegetableManager"""
    __tablename__ = 'vegetable_manager'
    quantity = Column(Integer, nullable=False)
    # garden_area_name = Column(String(128))
    sowed = Column(Boolean, default=False)
    planted = Column(Boolean, default=False)
    sowing_date = Column(Date)
    planting_date = Column(Date)
    harvest_date = Column(Date)
    remove_date = Column(Date)
    harvest_quantity = Column(Float)
    notes = Column(String(1024))
    # Add a foreign key to link VegetableManager
    garden_area_id = Column(String(60), ForeignKey('garden_area.id'))
    vegetable_infos_id = Column(String(60), ForeignKey('vegetable_infos.id'))


    def __init__(self, *args, **kwargs):
        """initializes VegetableManager"""
        super().__init__(*args, **kwargs)


    def to_dict(self):
        """Returns a dictionary representation of the 
        VegetableManager instance."""
        new_dict = super().to_dict()  # Call the base class's to_dict() method

        if self.garden_area:
            new_dict["garden_area_name"] = self.garden_area.name
            new_dict["vegetable_info_name"] = self.vegetable_infos.name

        return new_dict
