from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt
from config import jwt_config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# TODO: expires?
def create_access_token(data: dict):
    token = jwt.encode(data, jwt_config["secret_key"], jwt_config["algorithm"])
    return token
