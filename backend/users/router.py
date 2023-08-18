from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, schema, auth
from db import get_db
from config import env_variables

user_router = APIRouter(prefix="/user")


@user_router.post("/register", response_model=schema.AuthResponse)
def register_user(user: schema.UserRegister, db: Session = Depends(get_db)):
    try:
        if crud.get_user_by_email(db=db, email=user.email):
            raise Exception("Email already in use")

        if crud.get_user_by_username(db=db, username=user.username):
            raise Exception("Username already in use")

        db_user = crud.create_user(db=db, user=user)
        access_token = auth.create_access_token(data={"sub": user.email})
        return {"user": db_user, "accessToken": access_token}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@user_router.post("/signin", response_model=schema.AuthResponse)
def signin_user(user: schema.UserSignin, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_email(db=db, email=user.email)
        if not db_user:
            raise Exception
        if not auth.verify_password(user.password, db_user.password_hash):
            raise Exception

        access_token = auth.create_access_token(data={"sub": user.email})
        return {"user": db_user, "accessToken": access_token}

    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
