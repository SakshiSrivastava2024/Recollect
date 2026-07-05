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
    
    # Only return ACTUAL saved data from graph (filter out generic responses)
    filtered = []
    for r in results:
        if isinstance(r, dict) and r.get('source') == 'graph':
            text = r.get('text', '')
            # Filter out all generic/AI-generated responses
            if (text and 
                'sorry' not in text.lower() and 
                "i don't" not in text.lower() and
                "don't have" not in text.lower() and
                "don't see" not in text.lower() and
                "can't recommend" not in text.lower()):
                filtered.append(text)
    
    # Return ONLY actual saved items (no artificial padding)
    return filtered

async def forget(dataset: str = "recollect"):
    await connect()
    await cognee.forget(dataset=dataset)
    await disconnect()