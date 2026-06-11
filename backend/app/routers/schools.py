from fastapi import APIRouter, HTTPException, UploadFile, File, status
from pydantic import BaseModel, EmailStr
from typing import List, Literal

router = APIRouter()

# Data validation model mapping directly onto frontend fields
class SchoolRegistrationSchema(BaseModel):
    name: str
    registrationNumber: str
    type: Literal["primary", "secondary", "mixed"]
    county: str
    constituency: str
    ward: str
    principalName: str
    principalPhone: str
    principalEmail: EmailStr
    yearEstablished: int

# In-memory database holding verification requests
PENDING_SCHOOLS_DB = [
    {
        "name": "St. Jude County Secondary",
        "registrationNumber": "MOE/NBI/SEC/4021",
        "type": "secondary",
        "county": "Nairobi",
        "constituency": "Westlands",
        "ward": "Kitisuru",
        "principalName": "Dr. Florence Mwangi",
        "principalPhone": "0722000111",
        "principalEmail": "f.mwangi@stjude.ac.ke",
        "yearEstablished": 2014,
        "status": "pending"
    }
]

@router.get("/pending")
async def get_pending_schools():
    """Returns all recorded schools currently waiting for approval."""
    return PENDING_SCHOOLS_DB

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_school_direct(payload: SchoolRegistrationSchema):
    """Public self-registration target pushing records directly to the pending array."""
    # Prevent duplicate registration conflicts
    if any(s["registrationNumber"] == payload.registrationNumber for s in PENDING_SCHOOLS_DB):
        raise HTTPException(status_code=400, detail="Registration number already submitted.")
        
    new_school = payload.model_dump()
    new_school["status"] = "pending"
    PENDING_SCHOOLS_DB.append(new_school)
    
    return {"status": "pending_verification", "message": "Successfully appended to review pipeline."}

@router.post("/verify/{reg_number}")
async def verify_school(reg_number: str, action: Literal["approve", "reject"]):
    """Admin terminal endpoint changing state verification targets."""
    for school in PENDING_SCHOOLS_DB:
        if school["registrationNumber"] == reg_number:
            school["status"] = "approved" if action == "approve" else "rejected"
            return {
                "success": True, 
                "message": f"School registration {reg_number} status updated to {school['status']}."
            }
            
    raise HTTPException(status_code=404, detail="Target school registration record could not be found.")