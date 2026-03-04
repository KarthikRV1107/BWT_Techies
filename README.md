# DevResume AI – Context Recovery Engine for Developers

Problem: Developers don’t lose productivity because they lack skill. They lose it because they lose context. DevResume AI restores context instantly and tells you exactly where to continue—clean, sharp, strong.

## Key Features
- Paste unfinished code and analyze instantly
- Goal inference from code structure
- Current state summary with completeness signals
- Level-based explanation (Beginner / Intermediate / Advanced)
- Next steps (prioritized)
- Momentum Score (completion % and effort)
- Risks / Improvements surfaced automatically

## Architecture
```
BWT_Techies/
├── app/            # FastAPI backend
│   └── main.py     # /analyze -> structured JSON
├── static/         # Single-file frontend
│   └── index.html  # HTML/CSS/JS + Three.js background (CDN)
├── requirements.txt
└── README.md
```

### Data Flow
- Frontend POST /analyze with { code, level }
- Backend builds strict-JSON prompt and calls LLM (if key present)
- If no LLM key, backend uses local analyzer fallback
- Frontend renders structured JSON into result cards

## Tech Stack
- Frontend: HTML + CSS + Vanilla JS, Three.js (CDN) for subtle 3D background
- Backend: Python + FastAPI
- LLM: OpenAI (via structured prompt, strict JSON)

## Setup
1. Install Python deps
   ```
   pip install -r requirements.txt
   ```
2. Run backend
   ```
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
3. Open frontend
   - Double-click `static/index.html` or serve as static file
   - Ensure it can reach `http://localhost:8000/analyze`

### Environment (optional)
```
LLM_API_URL=https://api.openai.com/v1/chat/completions
LLM_API_KEY=sk-...
```

## LLM Prompt (strict JSON)
Backend requests:
- Keys: goal, current_state, explanation, next_steps[], momentum{completion, effort}, risks[]
- constraints: completion int 0–100; effort in Low/Medium/High

## Future Scope
- Projects workspace and grouping
- OAuth login and multi-tenant teams
- Export PDF/Markdown server-side
- Advanced scoring with domain-specific heuristics
- IDE plugin and PR analysis

## Architecture Diagram Layout
- Browser: Single-page app renders UI and 3D background
- Frontend -> Backend: POST /analyze
- Backend:
  - If LLM key: Calls OpenAI with strict JSON prompt
  - Else: Local analyzer computes signals (TODO/pass/def/class/etc.)
  - Returns structured JSON
- Frontend: Updates result cards, Momentum Score, and Risks with animation
