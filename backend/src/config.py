from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("ALGORITH")
environment = os.getenv("ENV", "development")
local_db_user = os.getenv("LOCAL_DB_USER")
local_db_password = os.getenv("LOCAL_DB_PASSWORD")
local_db_server = os.getenv("LOCAL_DB_SERVER")
local_db_port = os.getenv("LOCAL_DB_PORT")
local_db_name = os.getenv("LOCAL_DB_NAME")

db_url = ""
if environment == "test":
    db_url = "sqlite:///./app.test.db"
elif environment == "development":
    db_url = f"postgresql://{local_db_user}:{local_db_password}@{local_db_server}:{local_db_port}/{local_db_name}"
else:
    db_url = "sqlite:///./app.db"


env_variables = {
    "secret_key": secret_key,
    "algorithm": algorithm,
    "environment": environment,
    "db_url": db_url,
}

origins = ["http://localhost:3001"]
methods = ["POST", "GET", "PUT", "DELETE"]
