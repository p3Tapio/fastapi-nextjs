from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    description: str

    class Config:
        extra = "forbid"


class PostCreate(PostBase):
    public: bool = False
    pass


class PostUpdate(PostBase):
    public: bool
    id: int


# TODO Rename this for clarity (e.g. UserPost)
class Post(PostBase):
    id: int
    public: bool
    owner_id: int

    class Config:
        orm_mode = True


class PostPublic(PostBase):
    id: int
    owner_name: str

    class Config:
        orm_mode = True
