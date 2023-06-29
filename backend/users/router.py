from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, schema, auth
from db import get_db

user_router = APIRouter(prefix="/user")


@user_router.post("/register", response_model=schema.User)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use"
        )
    return crud.create_user(db=db, user=user)


@user_router.post("/signin", response_model=schema.UserResponse)
def login_user(user: schema.UserSignin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db=db, email=user.email)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    if not auth.verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    db_user.token = {"access_token": access_token, "token_type": "bearer"}
    return db_user
