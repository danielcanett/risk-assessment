from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import RiskAssessmentRequest, RiskAssessmentResponse
from app.risk_calculator import risk_assessment
import json
from pathlib import Path

app = FastAPI(
    title="Consultas de Riesgos API",
    description="API para cálculo y consulta de riesgos dinámicos.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/consultar-riesgo", response_model=RiskAssessmentResponse)
def consultar_riesgo(request: RiskAssessmentRequest):
    results = risk_assessment(
        address=request.address,
        ambito=request.ambito,
        scenarios=request.scenarios,
        security_measures=request.security_measures,
        comments=request.comments,
    )
    return results

@app.get("/warehouses")
def get_warehouses():
    db_path = Path(__file__).parent / "warehouses_db.json"
    with open(db_path, "r", encoding="utf-8") as f:
        return json.load(f)