""" holds class VegetableInfos"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Date
from sqlalchemy.orm import relationship


class VegetableInfos(BaseModel, Base):
    """Representation of VegetableInfos """
    __tablename__ = 'vegetable_infos'
    name = Column(String(20), nullable=False)
    family = Column(String(20))
    start_indoor = Column(Date)
    start_outdoor = Column(Date)
    end = Column(Date)
    water_needs = Column(Integer)
    cold_resistance = Column(Integer)
    spacing_on_raw = Column(Integer)
    spacing_between_raw = Column(Integer)
    description = Column(String(250))
    plant_per_m2 = Column(Float)

    vegetable_manager = relationship("VegetableManager", backref="vegetable_infos")
    def __init__(self, *args, **kwargs):
        """initializes VegetableInfos"""
        super().__init__(*args, **kwargs)
