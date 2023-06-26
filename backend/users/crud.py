from sqlalchemy.orm import Session
from . import model, schema
from .auth import pwd_context


def create_user(db: Session, user: schema.UserRequest):
    password_hash = pwd_context.hash(user.password)
    db_user = model.User(email=user.email, password_hash=password_hash)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(model.User).filter(model.User.email == email).first()
