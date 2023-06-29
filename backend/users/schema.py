from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    username: str
    password: str


class UserSignin(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserResponse(User):
    username: str
    token: Token


class UserInDb(User):
    password_hash: str
