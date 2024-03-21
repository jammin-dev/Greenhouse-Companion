-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS greenhouse_test_db;

CREATE USER IF NOT EXISTS 'greenhouse_test' @ 'localhost' IDENTIFIED BY 'greenhouse_test_pwd';

GRANT ALL PRIVILEGES ON `greenhouse_test_db`.* TO 'greenhouse_test' @ 'localhost';

GRANT
SELECT
    ON `performance_schema`.* TO 'greenhouse_test' @ 'localhost';

FLUSH PRIVILEGES;