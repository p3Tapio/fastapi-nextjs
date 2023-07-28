from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import schema, crud
from users import auth
from db import get_db
from typing import Annotated

post_router = APIRouter(prefix="/post")


@post_router.post("/", response_model=schema.Post)
def create_post(post: schema.PostRequest,  token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_post = crud.create_post(db=db, post=post, user=user)
    return db_post


@post_router.get("/", response_model=list[schema.Post])
def get_user_posts(token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_posts = crud.get_user_posts(db=db, user=user)
    return db_posts
