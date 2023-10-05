# Greenhouse Companion API

This repository contains the Greenhouse Companion API, which allows you to manage and retrieve information about various vegetables for greenhouse cultivation.

## Software Requirements

The Greenhouse Companion API has been developed and tested on the following software versions:

- **Mac OS Sonoma (Version 14.0):**

- **Python3 (Version 3.11):** 

- **MySQL (Ver 8.1.0 for macos13.3 on arm64):**

- **SQLite (Version 3.39.5):**

## Getting Started

Follow these steps to set up and run the Greenhouse Companion API on your local machine.

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```
git clone git@github.com:benjaminvandammeholberton/portfolio_GreenhouseCompanion_V2.git
```

### 2. Create a Virtual Environment

Navigate to the project's root directory and create a virtual environment using Python 3:


```
python3 -m venv .venv
```

### 3. Install Dependencies

```
pip install -r requirements.txt
```

### 4. Choose Your Database

You have the option to choose between SQLite and MySQL as your database. Set the DATABASE environment variable accordingly:

For SQLite:
```
export DATABASE=sqlite
```

For MySQL, set the following environment variables with your database connection details:

```
export DATABASE=mysql
export GREENHOUSE_MYSQL_USER='<your_mysql_username>'
export GREENHOUSE_MYSQL_PWD='<your_mysql_password>'
export GREENHOUSE_MYSQL_HOST='<your_mysql_host>'
export GREENHOUSE_MYSQL_DB='<your_mysql_database>'
export GREENHOUSE_MYSQL_PORT='<your_mysql_port>'
```

### 5. Run the API

Start the API with the following command. By default, it will run on http://127.0.0.1:5000:

```
flask run
```

### 6. Add Vegetable Data

To add data about vegetables to the database, open a new terminal window, navigate to the project's root directory, and run the following command:
```
python3 add_vegetable_info.py ./vegetables_data/vegetable_infos_data.json
```

You can verify that the data has been added by making a GET request to:

```
http://127.0.0.1:5000/vegetable_infos
```
