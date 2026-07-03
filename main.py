from fastapi import FastAPI
from pydantic import BaseModel
import cognee_client

app = FastAPI()

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
    return {"results": results}

@app.post("/forget")
async def forget(req: ForgetRequest):
    await cognee_client.forget(req.dataset)
    return {"status": "forgotten"}

@app.get("/health")
async def health():
    return {"status": "ok"}