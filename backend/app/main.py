from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
from app.routers import auth, schools

app = FastAPI(title="KauniSalama API", version="1.0.0")

# Setup CORS to allow your Next.js frontend to communicate with it
origins = [
    "http://localhost:3000", # Next.js local development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers matching constants.ts mapping
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(schools.router, prefix="/api/schools", tags=["Schools Entry Management"])
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    # Bound to port 3001 matching Next.js constants.ts environment
    uvicorn.run("app.main:app", host="127.0.0.1", port=3001, reload=True)