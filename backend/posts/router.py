from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import schema, crud
from users import auth
from db import get_db
from typing import Annotated

post_router = APIRouter(prefix="/post")


@post_router.post("/", response_model=schema.Post)
def create_post(post: schema.PostCreate,  token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_post = crud.create_post(db=db, post=post, user=user)
    return db_post


@post_router.get("/", response_model=list[schema.Post])
def get_user_posts(token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_posts = crud.get_user_posts(db=db, user=user)
    return db_posts


@post_router.put("/")
def update_post(post: schema.PostUpdate, token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_post = crud.get_user_post_by_id(db=db, post_id=post.id, user=user)

    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )

    try:
        updated_post = crud.update_post(db=db, db_post=db_post, post=post)
        return {"message": "update success",  "updatedPost": updated_post}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@post_router.delete("/{post_id}")
def delete_post(post_id: int, token: Annotated[str, Depends(auth.oauth2_scheme)], db: Session = Depends(get_db)):
    user = auth.get_current_user(db=db, token=token)
    db_post = crud.get_user_post_by_id(db=db, post_id=post_id, user=user)

    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )
    try:
        crud.delete_post(db=db, db_post=db_post)
        return {"message": "delete success", "id": post_id}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
