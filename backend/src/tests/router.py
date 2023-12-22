from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..users import crud, schema

test_router = APIRouter(prefix="/test")


@test_router.get("/add-users")
def create_users(db: Session = Depends(get_db)):
    try:
        user_1 = schema.UserRegister(
            username="test", email="test@email.com", password="super-secret"
        )

        crud.create_user(db=db, user=user_1)

        user_2 = schema.UserRegister(
            username="test_2", email="test_2@email.com", password="another-secret"
        )

        crud.create_user(db=db, user=user_2)

        return {"status": status.HTTP_201_CREATED, "message": "Users created"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@test_router.get(("/clear-db"))
def clear_db(db: Session = Depends(get_db)):
    try:
        crud.remove_test_users_and_posts(db=db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
