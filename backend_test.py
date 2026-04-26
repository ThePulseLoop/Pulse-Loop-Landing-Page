#!/usr/bin/env python3
"""
Backend API Testing for Waitlist Endpoint
Tests the POST /api/waitlist endpoint integrated with Supabase
"""

import requests
import json
import uuid
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / "backend"
load_dotenv(ROOT_DIR / '.env')

# Configuration
BACKEND_URL = "https://landing-type-refresh.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

# Supabase configuration for verification
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

def generate_unique_email():
    """Generate a unique email for testing"""
    unique_id = str(uuid.uuid4())[:8]
    return f"test+{unique_id}@example.com"

def test_basic_endpoints():
    """Test that pre-existing endpoints still work"""
    print("\n=== Testing Pre-existing Endpoints ===")
    
    # Test GET /api/
    try:
        response = requests.get(f"{API_BASE}/")
        print(f"GET /api/ - Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            if data.get("message") == "Hello World":
                print("✅ GET /api/ working correctly")
            else:
                print("❌ GET /api/ unexpected response")
        else:
            print(f"❌ GET /api/ failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ GET /api/ failed with error: {e}")
    
    # Test GET /api/status
    try:
        response = requests.get(f"{API_BASE}/status")
        print(f"GET /api/status - Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            print("✅ GET /api/status working correctly")
        else:
            print(f"❌ GET /api/status failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ GET /api/status failed with error: {e}")

def test_new_email_submission():
    """Test Case 1: New email submission"""
    print("\n=== Test Case 1: New Email Submission ===")
    
    email = generate_unique_email()
    payload = {
        "email": email,
        "source": "hero"
    }
    
    try:
        response = requests.post(f"{API_BASE}/waitlist", json=payload)
        print(f"POST /api/waitlist - Status: {response.status_code}")
        print(f"Payload: {payload}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            
            if data.get("status") == "joined":
                print("✅ New email submission working correctly")
                return email  # Return email for duplicate test
            else:
                print(f"❌ Expected status 'joined', got '{data.get('status')}'")
        else:
            print(f"❌ Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ New email submission failed with error: {e}")
    
    return None

def test_duplicate_email(email):
    """Test Case 2: Duplicate email submission"""
    print("\n=== Test Case 2: Duplicate Email ===")
    
    if not email:
        print("❌ No email from previous test to use for duplicate test")
        return
    
    payload = {
        "email": email,
        "source": "hero"
    }
    
    try:
        response = requests.post(f"{API_BASE}/waitlist", json=payload)
        print(f"POST /api/waitlist (duplicate) - Status: {response.status_code}")
        print(f"Payload: {payload}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            
            if data.get("status") == "duplicate":
                print("✅ Duplicate email handling working correctly")
            else:
                print(f"❌ Expected status 'duplicate', got '{data.get('status')}'")
        else:
            print(f"❌ Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Duplicate email test failed with error: {e}")

def test_invalid_email_format():
    """Test Case 3: Invalid email format"""
    print("\n=== Test Case 3: Invalid Email Format ===")
    
    payload = {
        "email": "not-an-email",
        "source": "final"
    }
    
    try:
        response = requests.post(f"{API_BASE}/waitlist", json=payload)
        print(f"POST /api/waitlist (invalid email) - Status: {response.status_code}")
        print(f"Payload: {payload}")
        
        if response.status_code == 422:
            print("✅ Invalid email format validation working correctly")
            print(f"Response: {response.text}")
        else:
            print(f"❌ Expected status 422, got {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Invalid email format test failed with error: {e}")

def test_missing_email_field():
    """Test Case 4: Missing email field"""
    print("\n=== Test Case 4: Missing Email Field ===")
    
    payload = {
        "source": "final"
    }
    
    try:
        response = requests.post(f"{API_BASE}/waitlist", json=payload)
        print(f"POST /api/waitlist (missing email) - Status: {response.status_code}")
        print(f"Payload: {payload}")
        
        if response.status_code == 422:
            print("✅ Missing email field validation working correctly")
            print(f"Response: {response.text}")
        else:
            print(f"❌ Expected status 422, got {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Missing email field test failed with error: {e}")

def test_different_source_value():
    """Test Case 5: Different source value"""
    print("\n=== Test Case 5: Different Source Value ===")
    
    email = generate_unique_email()
    payload = {
        "email": email,
        "source": "final"
    }
    
    try:
        response = requests.post(f"{API_BASE}/waitlist", json=payload)
        print(f"POST /api/waitlist (source: final) - Status: {response.status_code}")
        print(f"Payload: {payload}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            
            if data.get("status") == "joined":
                print("✅ Different source value working correctly")
                return email  # Return email for Supabase verification
            else:
                print(f"❌ Expected status 'joined', got '{data.get('status')}'")
        else:
            print(f"❌ Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Different source value test failed with error: {e}")
    
    return None

def test_supabase_verification(test_emails):
    """Test Case 6: Verify rows actually saved in Supabase"""
    print("\n=== Test Case 6: Supabase Verification ===")
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase credentials not found in environment")
        return
    
    if not test_emails:
        print("❌ No test emails to verify in Supabase")
        return
    
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        for email in test_emails:
            print(f"Checking email: {email}")
            
            # Query the waitlist table for this email
            result = supabase.table("waitlist").select("*").eq("email", email).execute()
            
            if result.data:
                print(f"✅ Email {email} found in Supabase")
                for row in result.data:
                    print(f"   Row data: {row}")
            else:
                print(f"❌ Email {email} NOT found in Supabase")
                
    except Exception as e:
        print(f"❌ Supabase verification failed with error: {e}")

def run_all_tests():
    """Run all test cases"""
    print("🚀 Starting Backend API Tests for Waitlist Endpoint")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Timestamp: {datetime.now()}")
    
    # Store emails for Supabase verification
    test_emails = []
    
    # Test pre-existing endpoints
    test_basic_endpoints()
    
    # Test new email submission
    email1 = test_new_email_submission()
    if email1:
        test_emails.append(email1)
    
    # Test duplicate email
    test_duplicate_email(email1)
    
    # Test invalid email format
    test_invalid_email_format()
    
    # Test missing email field
    test_missing_email_field()
    
    # Test different source value
    email2 = test_different_source_value()
    if email2:
        test_emails.append(email2)
    
    # Verify in Supabase
    test_supabase_verification(test_emails)
    
    print("\n🏁 All tests completed!")
    print(f"Test emails used: {test_emails}")

if __name__ == "__main__":
    run_all_tests()