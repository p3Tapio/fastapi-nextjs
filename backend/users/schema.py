from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr


class UserRequest(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserInDb(User):
    password_hash: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
