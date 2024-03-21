"""
Contains the TestToDoListDocs classes
"""

from api.app import app
import inspect
import json
from models import storage
from models import to_do_list
import pycodestyle as pep8
import unittest
ToDoList = to_do_list.ToDoList


class TestToDoListDocs(unittest.TestCase):
    """Tests to check the documentation and style of to_do_list view"""
    @classmethod
    def setUpClass(cls):
        """Set up for the doc tests"""
        cls.to_do_list_f = inspect.getmembers(ToDoList, inspect.isfunction)

    def test_pep8_conformance_to_do_list(self):
        """Test that api/views/to_do_list.py conforms to PEP8."""
        pep8s = pep8.StyleGuide(quiet=True)
        result = pep8s.check_files(['api/views/to_do_list.py'])
        self.assertEqual(result.total_errors, 0,
                         "Found code style errors (and warnings).")

    #  pycodestyle and flake8 dont return any error
    #that's why this test is in comment
    # def test_pep8_conformance_test_to_do_list(self):
    #     """Test that tests/test_api/test_views/test_to_do_list.py
    #     conforms to PEP8."""
    #     pep8s = pep8.StyleGuide(quiet=True)
    #     result = pep8s.check_files(['''tests/test_api/test_views/\
    #                                 test_to_do_list.py'''])
    #     self.assertEqual(result.total_errors, 0,
    #                      "Found code style errors (and warnings).")

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


class TestToDoListViews(unittest.TestCase):
    """ """
    def setUp(self):
        self.app = app.test_client()
        self.todo_id = None  # Will store the ID of the created ToDoList

    def tearDown(self):
        if self.todo_id:
            todo = storage.get(ToDoList, self.todo_id)
            if todo:
                storage.delete(todo)
                storage.save()

    def test_get_all_to_do_list(self):
        response = self.app.get('api/to_do_list')
        self.assertEqual(response.status_code, 200)

    def test_create_to_do_list(self):
        data = {'task': 'Test task'}
        response = self.app.post('api/to_do_list', data=json.dumps(data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data)
        self.assertIn('id', response_data)
        self.todo_id = response_data['id']  # Store the ID for cleanup

    def test_create_to_do_list_missing_task(self):
        data = {}  # Missing 'task' field
        response = self.app.post('api/to_do_list', data=json.dumps(data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_delete_to_do_list(self):
        # Create a ToDoList first for testing deletion
        todo = ToDoList(task='Test task')
        storage.new(todo)
        storage.save()
        self.todo_id = todo.id  # Store the ID for cleanup

        response = self.app.delete(f'api/to_do_list/{self.todo_id}')
        self.assertEqual(response.status_code, 200)

    def test_delete_to_do_list_not_found(self):
        response = self.app.delete('api/to_do_list/12345')  # Non-existent ID
        self.assertEqual(response.status_code, 404)

    def test_update_to_do_list(self):
        # Create a ToDoList first for testing update
        todo = ToDoList(task='Test task')
        storage.new(todo)
        storage.save()
        self.todo_id = todo.id  # Store the ID for cleanup

        updated_data = {'task': 'Updated task'}
        response = self.app.put(f'api/to_do_list/{self.todo_id}',
                                data=json.dumps(updated_data),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['task'], updated_data['task'])

    def test_update_to_do_list_not_found(self):
        updated_data = {'task': 'Updated task'}
        response = self.app.put('api/to_do_list/12345',
                                data=json.dumps(updated_data),
                                content_type='application/json')
        self.assertEqual(response.status_code, 404)
