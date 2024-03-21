-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS greenhouse_dev_db;

CREATE USER IF NOT EXISTS 'greenhouse_dev' @ 'localhost' IDENTIFIED BY 'greenhouse_dev_pwd';

GRANT ALL PRIVILEGES ON `greenhouse`.* TO 'greenhouse'@'localhost';

GRANT SELECT ON `performance_schema`.* TO 'greenhouse'@'localhost';

FLUSH PRIVILEGES;