from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from users import crud, schema
from db import get_db

test_router = APIRouter(prefix="/test")


@test_router.get("/add-user")
def create_users(db: Session = Depends(get_db)):
    try:
        crud.remove_test_user(db=db)
        user_1 = schema.UserRegister(
            username="test", email="test@email.com", password="super-secret"
        )

        crud.create_user(db=db, user=user_1)

        return {"status": status.HTTP_201_CREATED, "message": "Users created"}

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
