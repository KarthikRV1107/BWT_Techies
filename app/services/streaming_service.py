import asyncio
from typing import AsyncGenerator, Dict, Any
from app.services.ai_service import analyze_static
from app.services.ai_llm_service import stream_llm
from app.config import LLM_API_KEY

async def stream_response(code: str, cursor: int, language: str) -> AsyncGenerator[Dict[str, Any], None]:
    res = analyze_static(code, language)
    yield res.dict()
    if LLM_API_KEY:
        async for chunk in stream_llm(code, language):
            yield chunk
    else:
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
