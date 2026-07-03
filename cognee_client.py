import cognee
import os
from dotenv import load_dotenv

load_dotenv()

async def connect():
    await cognee.serve(
        url=os.getenv("COGNEE_SERVICE_URL"),
        api_key=os.getenv("COGNEE_API_KEY")
    )

async def disconnect():
    await cognee.disconnect()

async def remember(text: str, dataset: str = "recollect"):
    await connect()
    await cognee.remember(text, dataset_name=dataset)
    await disconnect()

async def recall(query: str):
    await connect()
    results = await cognee.recall(query)
    await disconnect()
    # Debug ke liye
    print("Raw results:", results)
    return [r.get('text', str(r)) for r in results if r]

async def forget(dataset: str = "recollect"):
    await connect()
    await cognee.forget(dataset=dataset)
    await disconnect()