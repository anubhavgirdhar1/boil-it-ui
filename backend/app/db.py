import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "boil_it.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS templates (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            tags TEXT,
            structure TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS tags (
            tag TEXT PRIMARY KEY
        )
        """
    )

    conn.commit()
    conn.close()
