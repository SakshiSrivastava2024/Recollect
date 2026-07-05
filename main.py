from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import cognee_client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RememberRequest(BaseModel):
    text: str
    dataset: str = "recollect"

class RecallRequest(BaseModel):
    query: str

class ForgetRequest(BaseModel):
    dataset: str = "recollect"

@app.post("/remember")
async def remember(req: RememberRequest):
    await cognee_client.remember(req.text, req.dataset)
    return {"status": "saved"}

@app.post("/recall")
async def recall(req: RecallRequest):
    results = await cognee_client.recall(req.query)
    return JSONResponse(
        content={"results": results},
        media_type="application/json; charset=utf-8"
    )

@app.post("/improve")
async def improve():
    await cognee_client.improve()
    return {"status": "memory improved"}

@app.post("/forget")
async def forget(req: ForgetRequest):
    await cognee_client.forget(req.dataset)
    return {"status": "forgotten"}

@app.get("/health")
async def health():
    return {"status": "ok"}