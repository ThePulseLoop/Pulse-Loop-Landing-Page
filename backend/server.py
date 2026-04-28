from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional


# Configure logging early so it's available everywhere below.
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


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



class WaitlistRequest(BaseModel):
    email: EmailStr
    source: Optional[str] = "landing"


# ───────────────────────────────────────────────────── Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}



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


