from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    code: str
    cursor_position: Optional[int] = None

class AnalyzeResponse(BaseModel):
    language: str
    warnings: List[str]
    suggestions: List[str]
    incomplete_blocks: List[str]
    risk_flags: List[str]
    confidence_score: float

class WSIncoming(BaseModel):
    code: str
    cursor_position: int

class WSOutgoing(BaseModel):
    language: str
    warnings: List[str]
    suggestions: List[str]
    incomplete_blocks: List[str]
    risk_flags: List[str]
    confidence_score: float
