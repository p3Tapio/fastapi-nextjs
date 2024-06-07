from sqlalchemy.orm import Session
from . import model, schema
from ..users import schema as user_schema, model as user_model


def create_post(db: Session, post: schema.PostCreate, user: user_schema.User):
    db_post = model.Post(
        title=post.title,
        description=post.description,
        public=post.public,
        owner_id=user.id,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_user_posts(db: Session, user: user_schema.User):
    return db.query(model.Post).filter(model.Post.owner_id == user.id).all()


def get_public_posts(db: Session):
    public_posts_db = db.query(model.Post).filter(model.Post.public == True).all()
    public_posts = []

    for post in public_posts_db:
        owner_name = (
            db.query(user_model.User)
            .filter(user_model.User.id == post.owner_id)
            .first()
            .username
        )

        public_posts.append(
            {
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "owner_name": owner_name,
            }
        )

    return public_posts


def get_user_post_by_id(db: Session, post_id: int, user: user_schema.User):
    return (
        db.query(model.Post)
        .filter(model.Post.owner_id == user.id, model.Post.id == post_id)
        .first()
    )


def update_post(db: Session, db_post: schema.Post, post: schema.Post):
    db_post.title = post.title
    db_post.description = post.description
    db_post.public = post.public
    db.commit()
    # get -- retrieve a single record by its primary key.
    return db.query(model.Post).get(post.id)


def delete_post(db: Session, db_post: schema.Post):
    db.delete(db_post)
    db.commit()
