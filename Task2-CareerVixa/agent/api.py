import os
import sys
import json
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Ensure agent directory is in Python path for submodules
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from main import generate_article

app = FastAPI(title="CareerVixa AI Research Agent Service")

class GenerateRequest(BaseModel):
    topic: Optional[str] = None

@app.get("/health")
def health():
    return {"status": "ok", "service": "careervixa-ai-agent"}

@app.post("/generate")
def generate(req: GenerateRequest):
    try:
        result_json_str = generate_article(req.topic)
        return json.loads(result_json_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
