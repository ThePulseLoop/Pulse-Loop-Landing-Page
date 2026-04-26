from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (kept; not used by waitlist)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Supabase connection
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ───────────────────────────────────────────────────── Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class WaitlistRequest(BaseModel):
    email: EmailStr
    source: Optional[str] = "landing"


# ───────────────────────────────────────────────────── Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/waitlist")
async def join_waitlist(payload: WaitlistRequest):
    """
    Insert a waitlist email into Supabase.

    Returns:
      - 200 + {status: "joined"} on first-time submission
      - 200 + {status: "duplicate"} if the email is already on the list
      - 500 if Supabase or schema is misconfigured
    """
    if supabase is None:
        raise HTTPException(
            status_code=500,
            detail="Supabase is not configured on the server.",
        )

    email = payload.email.lower().strip()
    source = (payload.source or "landing").strip()[:50]

    try:
        result = supabase.table("waitlist").insert(
            {"email": email, "source": source}
        ).execute()
        return JSONResponse({"status": "joined", "data": result.data})
    except Exception as e:
        msg = str(e)
        # Duplicate-key (unique violation) → "23505"
        if "23505" in msg or "duplicate key" in msg.lower():
            return JSONResponse({"status": "duplicate"})

        # Table missing → "42P01" - the user must run init SQL
        if "42P01" in msg or "does not exist" in msg.lower():
            logger.error("Supabase `waitlist` table missing. Run init SQL.")
            raise HTTPException(
                status_code=503,
                detail="Waitlist table not initialized. Please run the setup SQL.",
            )

        logger.exception("Waitlist insert failed")
        raise HTTPException(status_code=500, detail="Failed to join waitlist.")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
