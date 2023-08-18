from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status
from passlib.context import CryptContext
from jose import jwt
from sqlalchemy.orm import Session
from config import env_variables
from . import schema, crud

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

print("ENV VARS: ", env_variables["algorithm"])

SECRET_KEY = env_variables["secret_key"]
ALGORITH = env_variables["algorithm"]

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# TODO: expires?
def create_access_token(data: dict):
    token = jwt.encode(data, SECRET_KEY, ALGORITH)
    return token


def get_current_user(db: Session, token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITH)
        email: str = payload.get("sub")

        if email is None:
            raise credentials_exception

        token_data = schema.TokenData(email=email)
        return crud.get_user_by_email(db=db, email=token_data.email)

    except:
        raise credentials_exception
