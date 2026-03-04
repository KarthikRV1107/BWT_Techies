from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import AnalyzeRequest, AnalyzeResponse, WSIncoming, WSOutgoing
from app.services.language_detector import detect_language
from app.services.ai_service import analyze_static
from app.services.streaming_service import stream_response
import asyncio

app = FastAPI(title="DevResume AI – Real-Time Engine", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(payload: AnalyzeRequest):
    lang = detect_language(payload.code)
    res = analyze_static(payload.code, lang)
    return res

@app.websocket("/ws/analyze")
async def ws_analyze(ws: WebSocket):
    await ws.accept()
    last_ts = 0.0
    try:
        while True:
            data = await ws.receive_json()
            msg = WSIncoming(**data)
            now = asyncio.get_event_loop().time()
            if now - last_ts < 0.2:
                continue
            last_ts = now
            lang = detect_language(msg.code)
            async for chunk in stream_response(msg.code, msg.cursor_position, lang):
                await ws.send_json(WSOutgoing(**chunk).dict())
    except WebSocketDisconnect:
        return
