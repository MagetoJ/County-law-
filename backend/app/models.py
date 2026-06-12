import enum
from sqlalchemy import Column, Integer, String, Enum, Float, JSON, Text, DateTime
from sqlalchemy import Boolean
from app.database import Base

class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    FLAGGED = "flagged"
    REJECTED = "rejected"

class UserRole(str, enum.Enum):
    SCHOOL = "school"
    SCHOOL_ADMIN = "school_admin"
    LAW_ADMIN = "law_admin"
    COUNTY_ADMIN = "county_admin"
    GOVERNOR = "governor"

from datetime import datetime

# Existing SchoolRegistration model

class SchoolRegistration(Base):
    __tablename__ = "school_registrations"

    id = Column(Integer, primary_key=True, index=True)
    reference_number = Column(String, unique=True, index=True, nullable=False)
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False)
    
    # Step 1: School General Info
    school_name = Column(String, nullable=False)
    knec_number = Column(String, unique=True, nullable=False, index=True)
    school_type = Column(String, nullable=False)  # Primary / Secondary
    level = Column(String, nullable=False)        # Day / Boarding / Mixed
    ownership = Column(String, nullable=False)    # Public / Private

    # Headteacher Info
    headteacher_name = Column(String, nullable=False)
    national_id = Column(String, nullable=False)
    tsc_number = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    # Physical Location
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    constituency = Column(String, nullable=False)
    ward = Column(String, nullable=False)
    sublocation = Column(String, nullable=False)

    # Uploads JSON metadata
    documents = Column(JSON, nullable=False)
    
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    linked_profile_id = Column(Integer, nullable=True) # ID points to verified School/Officer record
    is_active = Column(Boolean, default=True)
    
    # Email Password Recovery States
    reset_otp_hash = Column(String, nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)