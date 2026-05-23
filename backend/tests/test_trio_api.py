import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://trio-toast-preview.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- root ----------
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("message") == "Trio Collectives API"


# ---------- newsletter create ----------
def test_newsletter_create_valid(s):
    email = f"test_{uuid.uuid4().hex[:10]}@example.com"
    r = s.post(f"{API}/newsletter", json={"email": email})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["email"] == email.lower()
    assert data["source"] == "online-ordering-teaser"
    assert "created_at" in data
    assert "_id" not in data


# ---------- newsletter idempotency ----------
def test_newsletter_idempotent(s):
    email = f"test_idem_{uuid.uuid4().hex[:10]}@example.com"
    r1 = s.post(f"{API}/newsletter", json={"email": email})
    assert r1.status_code == 200, r1.text
    id1 = r1.json()["id"]

    r2 = s.post(f"{API}/newsletter", json={"email": email})
    assert r2.status_code == 200, r2.text
    id2 = r2.json()["id"]

    assert id1 == id2, "Idempotent POST should return same id"


# ---------- newsletter invalid email ----------
def test_newsletter_invalid_email(s):
    r = s.post(f"{API}/newsletter", json={"email": "abc"})
    assert r.status_code == 422


# ---------- newsletter list ----------
def test_newsletter_list_no_id_leak(s):
    # seed a row first
    email = f"test_list_{uuid.uuid4().hex[:10]}@example.com"
    s.post(f"{API}/newsletter", json={"email": email})

    r = s.get(f"{API}/newsletter")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    for row in data:
        assert "_id" not in row
        assert "id" in row
        assert "email" in row
        assert "created_at" in row
    # confirm our email appears
    emails = [row["email"] for row in data]
    assert email.lower() in emails
