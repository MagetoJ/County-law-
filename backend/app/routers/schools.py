from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import SchoolRegistration, VerificationStatus
import random
import string
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/schools", tags=["schools"])

# --- Helper Utilities ---
def generate_reference_number() -> str:
    """Generates an explicit reference number format: MRG-SCH-2026-XXXX"""
    rand_suffix = ''.join(random.choices(string.digits, k=4))
    return f"MRG-SCH-2026-{rand_suffix}"

def trigger_sms_notification(phone: str, text: str):
    """Placeholder function for integration with your SMS gateway"""
    print(f"[SMS GATEWAY] Dispatching to {phone}: '{text}'")

# --- Request Schemas ---
class RegistrationSubmitSchema(BaseModel):
    school_name: str
    knec_number: str
    school_type: str
    level: str
    ownership: str
    headteacher_name: str
    national_id: str
    tsc_number: str
    phone: str
    email: EmailStr
    constituency: str
    ward: str
    sublocation: str
    documents: dict

class VerificationActionSchema(BaseModel):
    status: VerificationStatus
    reason: str | None = None

# --- Route Implementations ---
@router.post("/register-public", status_code=status.HTTP_201_CREATED)
def self_register_school(payload: RegistrationSubmitSchema, db: Session = Depends(get_db)):
    # Check duplicate KNEC profile
    existing = db.query(SchoolRegistration).filter(SchoolRegistration.knec_number == payload.knec_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="A school with this KNEC registration code is already registered.")

    ref_id = generate_reference_number()
    
    new_request = SchoolRegistration(
        reference_number=ref_id,
        verification_status=VerificationStatus.PENDING,
        **payload.model_dump()
    )
    
    db.add(new_request)
    db.commit()

    # Step 2 Automations: Dispatch required SMS notifications
    trigger_sms_notification(
        payload.phone, 
        f"Your registration for {payload.school_name} has been received. Your reference ID is {ref_id}. Awaiting admin review."
    )

    return {"reference_number": ref_id, "status": "pending"}

@router.patch("/verify-queue/{registration_id}")
def verify_school_registration(
    registration_id: int, 
    action: VerificationActionSchema, 
    db: Session = Depends(get_db)
):
    reg = db.query(SchoolRegistration).filter(SchoolRegistration.id == registration_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration log asset not found.")

    reg.verification_status = action.status
    if action.reason:
        reg.admin_notes = action.reason

    # Notification pipeline rules engine
    if action.status == VerificationStatus.VERIFIED:
        temp_password = "ChangeMe2026!" 
        trigger_sms_notification(
            reg.phone, 
            f"Congratulations! Your registration request for {reg.school_name} is approved. Login: {reg.email} Pwd: {temp_password}"
        )
    elif action.status == VerificationStatus.REJECTED:
        trigger_sms_notification(
            reg.phone, 
            f"Your registration request was rejected. Reason: {action.reason}."
        )
    elif action.status == VerificationStatus.FLAGGED:
        trigger_sms_notification(
            reg.phone, 
            f"Action Required: Your registration application for {reg.school_name} has been flagged. Correction list: {action.reason}"
        )

    db.commit()
    return {"id": reg.id, "current_status": reg.verification_status}