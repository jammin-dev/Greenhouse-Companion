README1 clone the repository git@github.com:benjaminvandammeholberton/portfolio_GreenhouseCompanion_V2.git

2 install virtual environnement python3 venv .venv

3 install dependancies
Pip install -r requirements.txt

4 by default, the program will use sqlite, feel free to change your database configuration in app.py use, environnement variable for more security

5. Create tables:  open the flask shell import db : from models import dbthen create the tables: db.create_all()then leave the consolerun the server: flask runin another terminal: import data for the vegetable_infos : run python ./post_json_file.py
Enjoyroutes : 




The api is ready to be deployed on DigitalOcen, here is the step to step to deploy the projectmake sure you got all the port open