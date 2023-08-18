from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from users import crud, schema
from db import get_db

test_router = APIRouter(prefix="/test")

# Ei toistaiseksi tarvetta, mutta esimerkiksi GHA userien luonti
#  - name: Create users
#     run: |
#       API_URL="http://localhost:8000/test/prepare"
#       RESPONSE=$(curl -s "$API_URL")
#       echo "Response: $RESPONSE"

# main.py
# if ENV == "test":
#   app.include_router(test_router)


@test_router.get("/prepare")
def create_users(db: Session = Depends(get_db)):
    try:
        user_1 = schema.UserRegister(
            username="test", email="test@email.com", password="super-secret"
        )

        crud.create_user(db=db, user=user_1)

        user_2 = schema.UserRegister(
            username="test2", email="test2@email.com", password="another-secret"
        )

        crud.create_user(db=db, user=user_2)

        return {"status": status.HTTP_201_CREATED, "message": "Users created"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
