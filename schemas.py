from typing import List, Optional
from pydantic import BaseModel

class RiskAssessmentRequest(BaseModel):
    address: str
    ambito: str
    scenarios: List[str]
    security_measures: List[str]
    comments: Optional[str] = ""

class RiskSummaryRow(BaseModel):
    escenario: str
    address: str
    ambito_label: str
    probabilidad: str
    comentarios: str

class RiskAssessmentResponse(BaseModel):
    summary: List[RiskSummaryRow]
    formulas: str
    sources: List[str]
    theories: str