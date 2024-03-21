import unittest
import mysql.connector
from install.setup_mysql_dev import setup_database


class TestSetupDatabase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Connect to the test database before running any tests
        cls.test_host = 'localhost'
        cls.test_user = 'greenhouse_dev_db'
        cls.test_password = 'greenhouse_dev_pwd'
        cls.connection = mysql.connector.connect(
            host=cls.test_host,
            user=cls.test_user,
            password=cls.test_password
        )
        cls.cursor = cls.connection.cursor()

    @classmethod
    def tearDownClass(cls):
        # Close the test database connection after all tests are done
        cls.cursor.close()
        cls.connection.close()

    def setUp(self):
        # Create a fresh database and user before each test
        self.cursor.execute(
            "CREATE DATABASE IF NOT EXISTS test_greenhouse_dev_db")
        self.cursor.execute(
            f"CREATE USER IF NOT EXISTS 'test_greenhouse_dev'@'localhost' IDENTIFIED BY 'test_greenhouse_dev_pwd'")
        self.cursor.execute("FLUSH PRIVILEGES")

    def tearDown(self):
        # Clean up the test database and user after each test
        self.cursor.execute("DROP DATABASE IF EXISTS test_greenhouse_dev_db")
        self.cursor.execute(
            "DROP USER IF EXISTS 'test_greenhouse_dev'@'localhost'")
        self.cursor.execute("FLUSH PRIVILEGES")

    def test_database_setup(self):
        # Call your setup_database function with test data
        setup_database(self.test_host, 'test_greenhouse_dev',
                       'test_greenhouse_dev_pwd')

        # Now, write assertions to check if the setup was successful
        self.assertTrue(self.database_exists('test_greenhouse_dev_db'))
        self.assertTrue(self.user_exists('test_greenhouse_dev'))
        self.assertTrue(self.user_has_privileges(
            'test_greenhouse_dev_db', 'test_greenhouse_dev'))

    def database_exists(self, database_name):
        # Implement a function to check if the database exists
        self.cursor.execute(f"SHOW DATABASES LIKE '{database_name}'")
        return self.cursor.fetchone() is not None

    def user_exists(self, username):
        # Implement a function to check if the user exists
        self.cursor.execute(
            f"SELECT 1 FROM mysql.user WHERE user = '{username}'")
        return self.cursor.fetchone() is not None

    def user_has_privileges(self, database_name, username):
        # Implement a function to check if the user has privileges on the database
        self.cursor.execute(f"SHOW GRANTS FOR '{username}'@'localhost'")
        for row in self.cursor:
            if f'ON {database_name}.*' in row[0]:
                return True
        return False


if __name__ == "__main__":
    unittest.main()
