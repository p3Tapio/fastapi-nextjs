from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class Base(BaseModel):
    class Config:
        extra = "forbid"

class UserRegister(Base):
    username: str
    email: EmailStr
    password: str

class UserSignin(Base):
    email: EmailStr
    password: str


class User(Base):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class AuthResponse(Base):
    user: User
    accessToken: str

    class Config:
        orm_mode = True


class UserInDb(User):
    password_hash: str
