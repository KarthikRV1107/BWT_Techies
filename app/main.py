from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal, Optional, Dict, Any, List
import os
import httpx
import re
import json

app = FastAPI(title="DevResume AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    code: str
    level: Literal["Beginner", "Intermediate", "Advanced"]

class Momentum(BaseModel):
    completion: int
    effort: Literal["Low", "Medium", "High"]

class AnalyzeResponse(BaseModel):
    goal: str
    current_state: str
    explanation: str
    next_steps: List[str]
    momentum: Momentum
    risks: List[str]

LLM_API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1/chat/completions")
LLM_API_KEY = os.getenv("LLM_API_KEY", "")

def local_analyzer(code: str, level: str) -> AnalyzeResponse:
    lines = code.splitlines()
    todos = sum(1 for l in lines if "TODO" in l or "todo" in l.lower())
    passes = sum(1 for l in lines if re.search(r"\bpass\b", l))
    notimpl = sum(1 for l in lines if "NotImplementedError" in l)
    defs = sum(1 for l in lines if re.match(r"\s*def\s+\w+", l))
    classes = sum(1 for l in lines if re.match(r"\s*class\s+\w+", l))
    try_blocks = sum(1 for l in lines if re.match(r"\s*try\s*:", l))
    except_blocks = sum(1 for l in lines if re.match(r"\s*except\b", l))
    has_tests = any("pytest" in l or "unittest" in l for l in lines)

    incomplete_signals = todos + passes + notimpl
    structure_signals = defs + classes
    error_handling_signals = try_blocks + except_blocks

    completion_base = max(5, min(90, structure_signals * 10 - incomplete_signals * 8))
    completion = max(5, min(95, completion_base))
    effort = "Low" if incomplete_signals <= 1 else "Medium" if incomplete_signals <= 3 else "High"

    goal_guess = "Build application logic" if defs else "Draft module scaffolding"
    if "auth" in code.lower() or "login" in code.lower():
        goal_guess = "Build authentication endpoint"
    if "payment" in code.lower() or "gateway" in code.lower():
        goal_guess = "Implement payment processing"
    if "api" in code.lower() and "request" in code.lower():
        goal_guess = "Integrate external API"

    explanation_levels = {
        "Beginner": "This code includes function/class definitions and placeholders. TODO and pass indicate incomplete parts. You should replace placeholders with real logic and add basic error handling.",
        "Intermediate": "The module outlines core structures. Incomplete markers (TODO, pass, NotImplementedError) indicate pending work. Prioritize implementing validation, business logic, and error handling paths. Consider writing tests to pin behavior.",
        "Advanced": "Structural signals suggest partial scaffolding with missing control flow. Focus on edge cases, transactional integrity, and observability. Replace placeholders with resilient logic and verify invariants through tests.",
    }

    risks = []
    if todos: risks.append(f"{todos} TODO items indicate unfinished work")
    if passes: risks.append(f"{passes} pass statements leave code paths unimplemented")
    if notimpl: risks.append(f"{notimpl} NotImplementedError occurrences mark missing functionality")
    if error_handling_signals == 0 and defs > 0:
        risks.append("Missing try/except blocks for error handling")
    if not has_tests:
        risks.append("No tests detected; behavior may regress")

    next_steps = []
    if todos or passes or notimpl:
        next_steps.append("Replace TODO/pass/NotImplementedError with working logic")
    next_steps.append("Add validation and error handling for critical paths")
    next_steps.append("Write unit tests for core functions")

    return AnalyzeResponse(
        goal=goal_guess,
        current_state=f"Functions: {defs}, Classes: {classes}. Incomplete markers: TODO={todos}, pass={passes}, NotImplementedError={notimpl}.",
        explanation=explanation_levels[level],
        next_steps=next_steps,
        momentum=Momentum(completion=completion, effort=effort),
        risks=risks or ["No major risks detected"]
    )

def build_llm_prompt(code: str, level: str) -> str:
    return f"""You are DevResume AI, an advanced Developer Context Recovery Assistant.
Analyze the code and respond ONLY as valid JSON with these keys:
goal, current_state, explanation, next_steps (array of strings), momentum (object: completion, effort), risks (array of strings).
Constraints: effort must be one of Low, Medium, High. completion must be integer 0-100.
Level: {level}
Code:
{code}
"""

async def llm_analyze(code: str, level: str) -> Optional[Dict[str, Any]]:
    if not LLM_API_KEY:
        return None
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {LLM_API_KEY}"}
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a precise code analysis engine that outputs strict JSON."},
            {"role": "user", "content": build_llm_prompt(code, level)},
        ],
        "temperature": 0.2,
        "max_tokens": 800,
    }
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(LLM_API_URL, json=payload, headers=headers)
        resp.raise_for_status()
        data = resp.json()
        content = data["choices"][0]["message"]["content"]
        try:
            return json.loads(content)
        except Exception:
            # Fallback: attempt to coerce into JSON by simple heuristics (last resort)
            return None

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(payload: AnalyzeRequest):
    llm = None
    try:
        llm = await llm_analyze(payload.code, payload.level)
    except Exception as e:
        llm = None
    if llm:
        # basic validation & coercion
        try:
            momentum = llm.get("momentum", {})
            completion = int(momentum.get("completion", 0))
            effort = momentum.get("effort", "Medium")
            return AnalyzeResponse(
                goal=llm.get("goal", ""),
                current_state=llm.get("current_state", ""),
                explanation=llm.get("explanation", ""),
                next_steps=list(llm.get("next_steps", [])),
                momentum=Momentum(completion=max(0, min(100, completion)), effort=effort),
                risks=list(llm.get("risks", [])),
            )
        except Exception:
            pass
    # Local fallback
    return local_analyzer(payload.code, payload.level)

@app.get("/")
def root():
    return {"message": "DevResume AI – Context Recovery Engine"}
