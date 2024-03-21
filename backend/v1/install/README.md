# Greenhouse Companion API

Welcome to the Greenhouse Companion API! This API allows you to manage your vegetables, garden areas and their related data. You can create, retrieve, update, and delete garden areas as well as manage vegetable data. Below are the available endpoints and instructions on how to use them.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- `Python 3.9` or higher
- `MySQL` database server with root credentials
- `pip` (Python package manager)

## Installation and Setup

1. **Clone the Repository**:

```
git clone https://github.com/benjaminvandammeholberton/portfolio_GreenhouseCompanion.git
cd portfolio_GreenhouseCompanion
```

2. **Create and Activate a Virtual Environment (Optional but recommended)**:

```
python3 -m venv venv
source ./venv/bin/activate
```

3. **Install Required Python Packages**:

```
pip install -r requirements.txt
```

4. **Set Up the MySQL Database**:
   Run the following script to set up the database:
   You can change the user and password in `env.json` file.

```
python install/db_set/setup_mysql_dev.py
```

## Running the API

To run the Greenhouse Companion API, follow these steps:

**1. Start the Flask API Server**
From the `api` directory, run the following command to start the Flask API server: `flask run`
The API will be accessible at http://127.0.0.1:5000 by default.

**2. Verify API Status**
Open a new terminal window and use `curl` or any API testing tool to verify the API status. You should receive a JSON response indicating `{Error: Not found}`," which means the API is running.

```
curl http://127.0.0.1:5000
```

## API Endpoints

### Garden Areas

- **GET /garden_area:** Retrieve a list of all garden areas.

```curl http://127.0.0.1:5000/garden_area```

- **GET /garden_area/<garden_area_id>**: Retrieve details of a specific garden area by its ID.

```curl http://127.0.0.1:5000/garden_area/GARDEN_AREA_ID```

- **POST /garden_area**: Create a new garden area by providing JSON data.

  ```curl -X POST -H "Content-Type: application/json" -d '{"name": "My Garden", "surface": 100.0}' http://127.0.0.1:5000/garden_area```

- **PUT /garden_area/<garden_area_id>**: Update an existing garden area by its ID using JSON data.

  ```curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Garden", "surface": 120.0}' http://127.0.0.1:5000/garden_area/GARDEN_AREA_ID```

- **DELETE /garden_area/<garden_area_id>**: Delete a garden area by its ID.

```curl -X DELETE http://127.0.0.1:5000/garden_area/GARDEN_AREA_ID```


### Vegetables

- **GET /vegetables:** Retrieve a list of all vegetables.

```curl http://127.0.0.1:5000/vegetables```

- **GET /vegetables/<vegetable_id>**: Retrieve details of a specific vegetable by its ID.

```curl http://127.0.0.1:5000/vegetables/VEGETABLE_ID```

- **POST /vegetables**: Create a new vegetable by providing JSON data.

 ```curl -X POST -H "Content-Type: application/json" -d '{"name": "Carrot", "variety": "Orange", "days_to_maturity": 60}' http://127.0.0.1:5000/vegetables```

- **PUT /vegetables/<vegetable_id>**: Update an existing vegetable by its ID using JSON data.

  ```curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Carrot", "variety": "Red", "days_to_maturity": 55}' http://127.0.0.1:5000/vegetables/VEGETABLE_ID```

- **DELETE /vegetables/<vegetable_id>**: Delete a vegetable by its ID.

  ```curl -X DELETE http://127.0.0.1:5000/vegetables/VEGETABLE_ID```

## Conclusion

You have successfully initialized and run the Greenhouse Companion API. You can now use the provided endpoints to manage garden areas and vegetable data. Feel free to customize and expand the functionality of this API to suit your needs.
