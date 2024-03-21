"""
Contains the TestGardenAreaDocs classes
"""

from datetime import datetime
import inspect
import models
from models import garden_area
from models.base_model import BaseModel
import pycodestyle as pep8
import unittest
GardenArea = garden_area.GardenArea


class TestGardenAreaDocs(unittest.TestCase):
    """Tests to check the documentation and style of GardenArea class"""
    @classmethod
    def setUpClass(cls):
        """Set up for the doc tests"""
        cls.garden_area_f = inspect.getmembers(GardenArea, inspect.isfunction)

    def test_pep8_conformance_garden_area(self):
        """Test that models/garden_area.py conforms to PEP8."""
        pep8s = pep8.StyleGuide(quiet=True)
        result = pep8s.check_files(['models/garden_area.py'])
        self.assertEqual(result.total_errors, 0,
                         "Found code style errors (and warnings).")

    def test_pep8_conformance_test_garden_area(self):
        """Test that tests/test_models/test_garden_area.py conforms to PEP8."""
        pep8s = pep8.StyleGuide(quiet=True)
        result = pep8s.check_files(['tests/test_models/test_garden_area.py'])
        self.assertEqual(result.total_errors, 0,
                         "Found code style errors (and warnings).")

    def test_garden_area_module_docstring(self):
        """Test for the garden_area.py module docstring"""
        self.assertIsNot(garden_area.__doc__, None,
                         "garden_area.py needs a docstring")
        self.assertTrue(len(garden_area.__doc__) >= 1,
                        "garden_area.py needs a docstring")

    def test_garden_area_class_docstring(self):
        """Test for the GardenArea class docstring"""
        self.assertIsNot(GardenArea.__doc__, None,
                         "GardenArea class needs a docstring")
        self.assertTrue(len(GardenArea.__doc__) >= 1,
                        "GardenArea class needs a docstring")

    def test_garden_area_func_docstrings(self):
        """Test for the presence of docstrings in GardenArea methods"""
        for func in self.garden_area_f:
            self.assertIsNot(func[1].__doc__, None,
                             "{:s} method needs a docstring".format(func[0]))
            self.assertTrue(len(func[1].__doc__) >= 1,
                            "{:s} method needs a docstring".format(func[0]))


class TestGardenArea(unittest.TestCase):
    """Test the GardenArea class"""
    def test_is_subclass(self):
        """Test that GardenArea is a subclass of BaseModel"""
        garden_area = GardenArea()
        self.assertIsInstance(garden_area, BaseModel)
        self.assertTrue(hasattr(garden_area, "id"))
        self.assertTrue(hasattr(garden_area, "created_at"))
        self.assertTrue(hasattr(garden_area, "updated_at"))

    def test_name_attr(self):
        """Test that GardenArea has attribute name, and it's an empty string"""
        garden_area = GardenArea()
        self.assertTrue(hasattr(garden_area, "name"))
        self.assertEqual(garden_area.name, None)

    def test_to_dict_creates_dict(self):
        """test to_dict method creates a dictionary with proper attrs"""
        c = GardenArea()
        new_d = c.to_dict()
        self.assertEqual(type(new_d), dict)
        self.assertFalse("_sa_instance_state" in new_d)
        for attr in c.__dict__:
            if attr != "_sa_instance_state":
                self.assertTrue(attr in new_d)
        self.assertTrue("__class__" in new_d)

    def test_to_dict_values(self):
        """test that values in dict returned from to_dict are correct"""
        t_format = "%Y-%m-%d %H:%M:%S"
        c = GardenArea()
        new_d = c.to_dict()
        self.assertEqual(new_d["__class__"], "GardenArea")
        self.assertEqual(type(new_d["created_at"]), str)
        self.assertEqual(type(new_d["updated_at"]), str)
        self.assertEqual(new_d["created_at"], c.created_at.strftime(t_format))
        self.assertEqual(new_d["updated_at"], c.updated_at.strftime(t_format))

    def test_str(self):
        """test that the str method has the correct output"""
        garden_area = GardenArea()
        string = "[GardenArea] ({}) {}".format(garden_area.id,
                                               garden_area.__dict__)
        self.assertEqual(string, str(garden_area))
