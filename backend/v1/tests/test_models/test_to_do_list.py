"""
Contains the TestToDoListDocs classes
"""

from datetime import datetime
import inspect
import models
from models import to_do_list
from models.base_model import BaseModel
import pycodestyle as pep8
import unittest
ToDoList = to_do_list.ToDoList


class TestToDoListDocs(unittest.TestCase):
    """Tests to check the documentation and style of ToDoList class"""
    @classmethod
    def setUpClass(cls):
        """Set up for the doc tests"""
        cls.to_do_list_f = inspect.getmembers(ToDoList, inspect.isfunction)

    def test_pep8_conformance_to_do_list(self):
        """Test that models/to_do_list.py conforms to PEP8."""
        pep8s = pep8.StyleGuide(quiet=True)
        result = pep8s.check_files(['models/to_do_list.py'])
        self.assertEqual(result.total_errors, 0,
                         "Found code style errors (and warnings).")

    def test_pep8_conformance_test_to_do_list(self):
        """Test that tests/test_models/test_to_do_list.py conforms to PEP8."""
        pep8s = pep8.StyleGuide(quiet=True)
        result = pep8s.check_files(['tests/test_models/test_to_do_list.py'])
        self.assertEqual(result.total_errors, 0,
                         "Found code style errors (and warnings).")

    def test_to_do_list_module_docstring(self):
        """Test for the to_do_list.py module docstring"""
        self.assertIsNot(to_do_list.__doc__, None,
                         "to_do_list.py needs a docstring")
        self.assertTrue(len(to_do_list.__doc__) >= 1,
                        "to_do_list.py needs a docstring")

    def test_to_do_list_class_docstring(self):
        """Test for the ToDoList class docstring"""
        self.assertIsNot(ToDoList.__doc__, None,
                         "ToDoList class needs a docstring")
        self.assertTrue(len(ToDoList.__doc__) >= 1,
                        "ToDoList class needs a docstring")

    def test_to_do_list_func_docstrings(self):
        """Test for the presence of docstrings in ToDoList methods"""
        for func in self.to_do_list_f:
            self.assertIsNot(func[1].__doc__, None,
                             "{:s} method needs a docstring".format(func[0]))
            self.assertTrue(len(func[1].__doc__) >= 1,
                            "{:s} method needs a docstring".format(func[0]))


class TestToDoList(unittest.TestCase):
    """Test the ToDoList class"""
    def test_is_subclass(self):
        """Test that ToDoList is a subclass of BaseModel"""
        to_do_list = ToDoList()
        self.assertIsInstance(to_do_list, BaseModel)
        self.assertTrue(hasattr(to_do_list, "id"))
        self.assertTrue(hasattr(to_do_list, "created_at"))
        self.assertTrue(hasattr(to_do_list, "updated_at"))

    def test_task_attr(self):
        """Test that ToDoList has attribute task, and it's an empty string"""
        to_do_list = ToDoList()
        self.assertTrue(hasattr(to_do_list, "task"))
        self.assertEqual(to_do_list.task, None)

    def test_to_dict_creates_dict(self):
        """test to_dict method creates a dictionary with proper attrs"""
        c = ToDoList()
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
        c = ToDoList()
        new_d = c.to_dict()
        self.assertEqual(new_d["__class__"], "ToDoList")
        self.assertEqual(type(new_d["created_at"]), str)
        self.assertEqual(type(new_d["updated_at"]), str)
        self.assertEqual(new_d["created_at"], c.created_at.strftime(t_format))
        self.assertEqual(new_d["updated_at"], c.updated_at.strftime(t_format))

    def test_str(self):
        """test that the str method has the correct output"""
        to_do_list = ToDoList()
        string = "[ToDoList] ({}) {}".format(to_do_list.id,
                                             to_do_list.__dict__)
        self.assertEqual(string, str(to_do_list))
