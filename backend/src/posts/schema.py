from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    description: str
    public: bool

    class Config:
        extra = "forbid"


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    id: int


class Post(PostBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
