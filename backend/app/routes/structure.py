from fastapi import APIRouter
from models import CreateStructureRequest
import os

router = APIRouter()

@router.post("/create")
def create(req: CreateStructureRequest):
    root = req.outputPath
    nodes = req.nodes

    id_to_path = {}

    # first pass: folders
    for n in nodes:
        if n.type == "folder":
            parent_path = id_to_path.get(n.parentId, root)
            path = os.path.join(parent_path, n.name)
            os.makedirs(path, exist_ok=True)
            id_to_path[n.id] = path

    # second pass: files
    for n in nodes:
        if n.type == "file":
            parent_path = id_to_path.get(n.parentId, root)
            file_path = os.path.join(parent_path, n.name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            open(file_path, "a").close()

    return {
        "path": root,
        "folders": sum(1 for n in nodes if n.type == "folder"),
        "files": sum(1 for n in nodes if n.type == "file"),
    }
