import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Pull the connection string from your .env file, or default to a local SQLite file for dev
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./kaunisalama.db")

# SQLite needs a specific argument, PostgreSQL doesn't
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# This is the exact dependency engine your routers are trying to import
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()