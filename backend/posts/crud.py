from sqlalchemy.orm import Session
from . import model, schema
from users import schema as user_schema

def create_post(db: Session, post: schema.PostRequest, user: user_schema.User):
    db_post = model.Post(title=post.title, description=post.description, owner_id=user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post
