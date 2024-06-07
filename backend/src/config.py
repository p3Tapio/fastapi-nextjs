from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("ALGORITH")
environment = os.getenv("ENV", "local")
local_db_connection_string = os.getenv("LOCAL_BD_CONNECTION_STRING")

db_url = ""
if environment == "test":
    db_url = "sqlite:///./app.test.db"
elif environment == "local":
    db_url = local_db_connection_string
elif environment == "production":
    db_url = "sqlite:///./app.db"  # TODO
else:
    print("Missing environment definition. Shutting down.")
    os.kill(os.getpid(), 15)


env_variables = {
    "secret_key": secret_key,
    "algorithm": algorithm,
    "environment": environment,
    "db_url": db_url,
}

origins = ["http://localhost:3001"]
methods = ["POST", "GET", "PUT", "DELETE"]
