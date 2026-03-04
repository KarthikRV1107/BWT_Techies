import asyncio
from typing import AsyncGenerator, Dict, Any
from app.services.ai_service import analyze_static

async def stream_response(code: str, cursor: int, language: str) -> AsyncGenerator[Dict[str, Any], None]:
    res = analyze_static(code, language)
    yield res.dict()
    await asyncio.sleep(0.1)
    if res.warnings:
        yield {
            "language": language,
            "warnings": [],
            "suggestions": res.suggestions[:1],
            "incomplete_blocks": [],
            "risk_flags": [],
            "confidence_score": res.confidence_score,
        }
