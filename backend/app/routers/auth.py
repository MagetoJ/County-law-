from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
import time
import random

router = APIRouter()

# Data models matching frontend types.ts LoginRequest
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class OTPRequest(BaseModel):
    email: EmailStr

class OTPVerify(BaseModel):
    email: EmailStr
    code: str

class OfficerRegistrationSchema(BaseModel):
    serviceNumber: str
    nationalId: str
    firstName: str
    lastName: str
    rank: str
    station: str
    email: EmailStr
    phone: str

# Mock user database tracking roles from your Next.js project
MOCK_USERS = {
    "commander@police.ke": {"id": "1", "firstName": "John", "lastName": "Kipchoge", "role": "commander", "county": "Nairobi"},
    "officer@police.ke": {"id": "2", "firstName": "Jane", "lastName": "Muthoni", "role": "officer", "county": "Nairobi"},
    "governor@police.ke": {"id": "3", "firstName": "Governor", "lastName": "User", "role": "governor", "county": "Nairobi"},
}

# In-memory databases for OTPs and Pending Officer Applications
PENDING_OTPS = {}
PENDING_OFFICERS_DB = []

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
    
    return {
        "token": mock_token,
        "user": user_info
    }

@router.post("/request-otp")
async def request_otp(payload: OTPRequest):
    """Generates a 6-digit verification code and simulates sending it via email."""
    email_key = payload.email.lower()
    code = f"{random.randint(100000, 999999)}"
    
    PENDING_OTPS[email_key] = {
        "code": code,
        "expires_at": time.time() + 300  # valid for 5 minutes
    }
    
    # Simulating standard email log output (Leave here so we can change transport later)
    print("\n" + "="*50)
    print(f"[EMAIL OTP TRANSMISSION] To: {payload.email}")
    print(f"Subject: KauniSalama Security Verification Code")
    print(f"Your 6-digit OTP verification code is: {code}")
    print("="*50 + "\n")
    
    return {"success": True, "message": "OTP verification code dispatched to email."}

@router.post("/verify-otp")
async def verify_otp(payload: OTPVerify):
    """Validates the 6-digit verification code before committing registrations."""
    email_key = payload.email.lower()
    
    if email_key not in PENDING_OTPS:
        raise HTTPException(status_code=400, detail="No active verification code found for this email address.")
        
    otp_data = PENDING_OTPS[email_key]
    
    if time.time() > otp_data["expires_at"]:
        del PENDING_OTPS[email_key]
        raise HTTPException(status_code=400, detail="The verification code has expired. Please try again.")
        
    if otp_data["code"] != payload.code:
        raise HTTPException(status_code=400, detail="Invalid verification code. Please check and try again.")
        
    # Valid transaction token context cleared upon success
    del PENDING_OTPS[email_key]
    return {"success": True, "message": "Email identity verified successfully."}

@router.post("/register/officer", status_code=status.HTTP_201_CREATED)
async def register_officer_pipeline(payload: OfficerRegistrationSchema):
    """Silos officer submissions into the law-admin verification pipeline."""
    if any(o["serviceNumber"] == payload.serviceNumber for o in PENDING_OFFICERS_DB):
        raise HTTPException(status_code=400, detail="An application with this service number is already under review.")
        
    new_officer = payload.model_dump()
    new_officer["status"] = "pending"
    new_officer["verification_status"] = "pending"
    PENDING_OFFICERS_DB.append(new_officer)
    
    return {"status": "pending_verification", "message": "Officer account submitted successfully to Law Admin review queue."}