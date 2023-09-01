from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType
from ..db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(EmailType, unique=True, index=True)
    username = Column(String, unique=True)
    password_hash = Column(String)

    posts = relationship("Post", back_populates="owner")
