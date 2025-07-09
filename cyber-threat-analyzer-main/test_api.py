import requests
BASE = "http://localhost:5000"

def test_get_threats_basic():
    r = requests.get(f"{BASE}/api/threats")
    assert r.status_code == 200
    json_data = r.json()
    assert "data" in json_data
    assert isinstance(json_data["data"], list)

def test_get_threats_pagination():
    r = requests.get(f"{BASE}/api/threats?page=2&limit=5")
    assert r.status_code == 200
    json_data = r.json()
    assert "data" in json_data
    assert len(json_data["data"]) <= 5  # because limit=5

def test_get_threats_filtering():
    r = requests.get(f"{BASE}/api/threats?category=Malware")
    assert r.status_code == 200
    json_data = r.json()
    for item in json_data["data"]:
        assert item["category"] == "Malware"

def test_get_threats_search():
    r = requests.get(f"{BASE}/api/threats?search=phishing")
    assert r.status_code == 200
    json_data = r.json()
    assert "data" in json_data
    assert isinstance(json_data["data"], list)

def test_get_threat_by_id():
    r = requests.get(f"{BASE}/api/threats/1")  # assuming ID 1 exists
    assert r.status_code == 200
    assert "id" in r.json()

def test_get_threat_by_invalid_id():
    r = requests.get(f"{BASE}/api/threats/99999")  # assuming this ID doesn't exist
    assert r.status_code == 404

def test_get_stats():
    r = requests.get(f"{BASE}/api/threats/stats")
    assert r.status_code == 200
    stats = r.json()
    assert "total_threats" in stats
    assert "categories" in stats
    assert "severities" in stats

def test_post_analyze():
    payload = {"description": "This threat is a phishing attack targeting credentials."}
    r = requests.post(f"{BASE}/api/analyze", json=payload)
    assert r.status_code == 200
    assert "predicted_category" in r.json()


