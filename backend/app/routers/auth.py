from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
import time

router = APIRouter()

# Data models matching frontend types.ts LoginRequest
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Mock user database tracking roles from your Next.js project
MOCK_USERS = {
    "commander@police.ke": {"id": "1", "firstName": "John", "lastName": "Kipchoge", "role": "commander", "county": "Nairobi"},
    "officer@police.ke": {"id": "2", "firstName": "Jane", "lastName": "Muthoni", "role": "officer", "county": "Nairobi"},
    "governor@police.ke": {"id": "3", "firstName": "Governor", "lastName": "User", "role": "governor", "county": "Nairobi"},
}

@router.post("/login")
async def login(payload: LoginRequest):
    user_email = payload.email.lower()
    
    if user_email not in MOCK_USERS or payload.password != "password":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    user_info = MOCK_USERS[user_email]
    mock_token = f"mock-jwt-token-{int(time.time())}"
    
    # Return structure matching frontend ApiClient expectation
    return {
        "token": mock_token,
        "user": user_info
    }