from fastapi import APIRouter
from db import get_db
from models import TagCreate

router = APIRouter()

@router.get("")
def get_all():
    db = get_db()
    rows = db.execute("SELECT tag FROM tags").fetchall()
    db.close()
    return [r["tag"] for r in rows]

@router.post("")
def create(payload: TagCreate):
    db = get_db()
    db.execute(
        "INSERT OR IGNORE INTO tags VALUES (?)",
        (payload.tag,)
    )
    db.commit()
    db.close()
    return {"tag": payload.tag}

@router.delete("/{tag}")
def delete(tag: str):
    db = get_db()
    db.execute("DELETE FROM tags WHERE tag=?", (tag,))
    db.commit()
    db.close()
    return {"deleted": tag}