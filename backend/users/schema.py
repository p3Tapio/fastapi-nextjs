from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class UserBase(BaseModel):
    email: EmailStr


class UserRequest(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserResponse(User):
    token: Token

class UserInDb(User):
    password_hash: str
