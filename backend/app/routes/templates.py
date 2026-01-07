from fastapi import APIRouter
from db import get_db
from models import TemplateIn, TemplateUpdate
import uuid, json

router = APIRouter()

def _deserialize(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "tags": json.loads(row["tags"] or "[]"),
        "structure": json.loads(row["structure"] or "[]"),
        "created_at": row["created_at"],
    }

@router.get("")
def get_all():
    db = get_db()
    rows = db.execute("SELECT * FROM templates").fetchall()
    db.close()
    return [_deserialize(r) for r in rows]

@router.get("/{id}")
def get_by_id(id: str):
    db = get_db()
    row = db.execute(
        "SELECT * FROM templates WHERE id=?", (id,)
    ).fetchone()
    db.close()
    return _deserialize(row) if row else None

@router.post("")
def create(t: TemplateIn):
    tid = str(uuid.uuid4())
    db = get_db()
    db.execute(
        "INSERT INTO templates VALUES (?, ?, ?, ?, datetime('now'))",
        (tid, t.name, json.dumps(t.tags), json.dumps([n.dict() for n in t.structure]))
    )
    db.commit()
    db.close()
    return {"id": tid}

@router.put("/{id}")
def update(id: str, t: TemplateIn):
    db = get_db()
    db.execute(
        "UPDATE templates SET name=?, tags=?, structure=? WHERE id=?",
        (t.name, json.dumps(t.tags), json.dumps([n.dict() for n in t.structure]), id)
    )
    db.commit()
    db.close()
    return {"updated": True}

@router.delete("/{id}")
def delete(id: str):
    db = get_db()
    db.execute("DELETE FROM templates WHERE id=?", (id,))
    db.commit()
    db.close()
    return {"deleted": True}

@router.patch("/{id}")
def patch_template(id: str, t: TemplateUpdate):
    db = get_db()
    row = db.execute(
        "SELECT * FROM templates WHERE id=?", (id,)
    ).fetchone()

    if not row:
        db.close()
        return {"error": "Template not found"}

    name = t.name if t.name is not None else row["name"]
    tags = json.dumps(t.tags) if t.tags is not None else row["tags"]

    db.execute(
        "UPDATE templates SET name=?, tags=? WHERE id=?",
        (name, tags, id)
    )
    db.commit()
    db.close()

    return {"updated": True}