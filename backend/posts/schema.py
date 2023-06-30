from pydantic import BaseModel

class PostBase(BaseModel):
    title: str
    description: str

    class Config:
        extra = "forbid"

class PostRequest(PostBase):
    pass

class Post(PostBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
