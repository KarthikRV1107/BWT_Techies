import json
from typing import AsyncGenerator, Dict, Any, Optional
import httpx
from app.config import LLM_API_URL, LLM_API_KEY, LLM_MODEL

def build_prompt(code: str, language: str) -> str:
    return (
        "You are DevResume AI. Analyze the code and return STRICT JSON with keys: "
        "language, warnings[], suggestions[], incomplete_blocks[], risk_flags[], confidence_score "
        f"for language={language}. "
        "Short actionable messages. Never execute or compile code. Respond ONLY JSON."
        "\nCode:\n" + code
    )

async def llm_once(code: str, language: str) -> Optional[Dict[str, Any]]:
    if not LLM_API_KEY:
        return None
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {LLM_API_KEY}"}
    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": "Return STRICT JSON only."},
            {"role": "user", "content": build_prompt(code, language)},
        ],
        "temperature": 0.2,
        "max_tokens": 800,
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(LLM_API_URL, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()
        content = data["choices"][0]["message"]["content"]
        try:
            return json.loads(content)
        except Exception:
            return None

async def stream_llm(code: str, language: str) -> AsyncGenerator[Dict[str, Any], None]:
    res = await llm_once(code, language)
    if res:
        yield res
