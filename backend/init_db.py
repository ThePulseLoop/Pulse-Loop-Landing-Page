"""
Bootstrap the Supabase `waitlist` table.
Tries direct PostgREST first; if not possible, prints the SQL the user must run once
in their Supabase SQL editor.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

CREATE_SQL = """
CREATE TABLE IF NOT EXISTS public.waitlist (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  source      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access" ON public.waitlist;
CREATE POLICY "service_role_full_access" ON public.waitlist
  FOR ALL USING (true) WITH CHECK (true);
"""


def table_exists() -> bool:
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/waitlist?select=id&limit=1",
        headers=headers,
        timeout=10,
    )
    return r.status_code == 200


def main():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("[init_db] Missing SUPABASE_URL or SUPABASE_KEY")
        sys.exit(1)

    if table_exists():
        print("[init_db] ✅ `waitlist` table already exists.")
        return

    print("[init_db] ⚠️  `waitlist` table not found.")
    print("[init_db] Please run this SQL ONCE in your Supabase SQL editor.")
    try:
        project_ref = SUPABASE_URL.split("//")[1].split(".")[0]
        print(f"[init_db] {SUPABASE_URL.rstrip('/')} → SQL Editor: "
              f"https://supabase.com/dashboard/project/{project_ref}/sql/new")
    except Exception:
        pass
    print("=" * 70)
    print(CREATE_SQL)
    print("=" * 70)


if __name__ == "__main__":
    main()
