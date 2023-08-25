from sqlalchemy.orm import Session
from . import model, schema
from ..users import schema as user_schema


def create_post(db: Session, post: schema.PostCreate, user: user_schema.User):
    db_post = model.Post(
        title=post.title, description=post.description, owner_id=user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_user_posts(db: Session, user: user_schema.User):
    return db.query(model.Post).filter(model.Post.owner_id == user.id).all()


def get_user_post_by_id(db: Session, post_id: int, user: user_schema.User):
    return (
        db.query(model.Post)
        .filter(model.Post.owner_id == user.id, model.Post.id == post_id)
        .first()
    )


def update_post(db: Session, db_post: schema.Post, post: schema.Post):
    db_post.title = post.title
    db_post.description = post.description
    db.commit()
    # get -- retrieve a single record by its primary key.
    return db.query(model.Post).get(post.id)


def delete_post(db: Session, db_post: schema.Post):
    db.delete(db_post)
    db.commit()
