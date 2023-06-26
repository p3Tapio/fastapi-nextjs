from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

secret_key = os.getenv('SECRET_KEY')
algorithm = os.getenv('ALGORITH')

jwt_config = {"secret_key": secret_key, "algorithm": algorithm}

origins = [
    "http://localhost:3001"
]
