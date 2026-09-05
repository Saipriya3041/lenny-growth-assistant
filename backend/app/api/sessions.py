from fastapi import APIRouter
import uuid

router = APIRouter()

@router.post("/")
def create_session():
    session_id = str(uuid.uuid4())
    return {"sessionId": session_id}
