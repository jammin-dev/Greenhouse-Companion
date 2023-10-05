README1 clone the repository git@github.com:benjaminvandammeholberton/portfolio_GreenhouseCompanion_V2.git

2 install virtual environnement python3 venv .venv

3 install dependancies
Pip install -r requirements.txt

4 choose your database by create environnement variable DATABASE. you have the choice between sqlite and mysql : export DATABASE=sqlite
if you choose mysql database, set environnement variable with the detail for connection:
export GREENHOUSE_MYSQL_USER=''
export GREENHOUSE_MYSQL_PWD=''
export GREENHOUSE_MYSQL_HOST=''
export GREENHOUSE_MYSQL_DB=''
export GREENHOUSE_MYSQL_PORT=

5 run the api with the command flask run 




The api is ready to be deployed on DigitalOcen, here is the step to step to deploy the projectmake sure you got all the port needed open