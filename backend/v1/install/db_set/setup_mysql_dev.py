import mysql.connector

# Replace with your own database and user information
host = 'localhost'
user = 'root'
password = ''

# Connect to MySQL server
try:
    # Establish connection
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )
    print("Connected to MySQL server")

    # Create a cursor
    cursor = connection.cursor()

    # SQL commands to prepare MySQL server
    sql_commands = [
        "CREATE DATABASE IF NOT EXISTS greenhouse_dev_db",
        "CREATE USER IF NOT EXISTS 'greenhouse_dev'@'localhost' IDENTIFIED BY 'greenhouse_dev_pwd'",
        "GRANT ALL PRIVILEGES ON `greenhouse_dev_db`.* TO 'greenhouse_dev'@'localhost'",
        "GRANT SELECT ON `performance_schema`.* TO 'greenhouse_dev'@'localhost'",
        "FLUSH PRIVILEGES"
    ]

    # Execute each SQL command
    for sql_command in sql_commands:
        cursor.execute(sql_command)
        print(f"Executed: {sql_command}")

    print("MySQL server prepared successfully")

except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    # Close the cursor and connection
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
