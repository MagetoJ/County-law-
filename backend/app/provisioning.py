import secrets
import string
from sqlalchemy.orm import Session
from backend.app.models import User, UserRole
from backend.app.core.security import hash_password

def auto_provision_account(db: Session, target_email: str, target_role: UserRole, target_profile_id: int):
    """
    Auto-provisions a new user account with a temporary password and sends credentials via email.
    """
    # Enforce database uniqueness constraints
    existing = db.query(User).filter(User.email == target_email).first()
    if existing:
        return existing

    # Generate a strong temporary raw password string
    alphabet = string.ascii_letters + string.digits
    temporary_password = "".join(secrets.choice(alphabet) for _ in range(12))
    
    new_user = User(
        email=target_email.lower(),
        hashed_password=hash_password(temporary_password),
        role=target_role,
        linked_profile_id=target_profile_id,
        is_active=True
    )
    db.add(new_user)
    db.commit()

    # Transmit credentials securely to official registration email channel (mocked here)
    print(f"\n{'='*50}\n[EMAIL TRANSMISSION] To: {target_email}\nSubject: KauniSalama Portal Access - Approved Credentials\nUse your email to log in. Your Temporary Password is: {temporary_password}\n{'='*50}\n")
    
    return new_user