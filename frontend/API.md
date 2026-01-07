# API Endpoints Documentation

This document describes all the API endpoints used by the Boil-it UI application.

## Configuration

The application can run in two modes:

1. **Local Mode (Default)** - Uses localStorage, no backend required
2. **API Mode** - Connects to a backend API server

To switch to API mode, edit `.env`:

```env
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api
```

## Endpoints Reference

All endpoints are defined in `src/endpoints.ts`. You can customize the base URL and endpoint paths there.

### Templates

#### Get All Templates
- **Method:** `GET`
- **URL:** `/api/templates`
- **Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "tags": ["string"],
    "structure": [TreeNode],
    "createdAt": "ISO Date"
  }
]
```

#### Create Template
- **Method:** `POST`
- **URL:** `/api/templates`
- **Body:**
```json
{
  "name": "string",
  "tags": ["string"],
  "structure": [TreeNode]
}
```
- **Response:** Template object

#### Update Template
- **Method:** `PUT`
- **URL:** `/api/templates/:id`
- **Body:**
```json
{
  "name": "string",
  "tags": ["string"]
}
```

#### Delete Template
- **Method:** `DELETE`
- **URL:** `/api/templates/:id`

### Tags

#### Get All Tags
- **Method:** `GET`
- **URL:** `/api/tags`
- **Response:**
```json
["tag1", "tag2", "tag3"]
```

#### Create Tag
- **Method:** `POST`
- **URL:** `/api/tags`
- **Body:**
```json
{
  "tag": "string"
}
```

#### Delete Tag
- **Method:** `DELETE`
- **URL:** `/api/tags/:tag`

### File Structure Operations

#### Create Structure
- **Method:** `POST`
- **URL:** `/api/structure/create`
- **Body:**
```json
{
  "nodes": [TreeNode],
  "outputPath": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "folderCount": 5,
  "fileCount": 12,
  "outputPath": "/path/to/output"
}
```

### Folder Operations

#### Select Output Folder
- **Method:** `POST`
- **URL:** `/api/folder/select`
- **Response:**
```json
{
  "path": "/selected/folder/path"
}
```

#### Open Folder
- **Method:** `POST`
- **URL:** `/api/folder/open`
- **Body:**
```json
{
  "path": "/folder/path"
}
```

#### Open in VS Code
- **Method:** `POST`
- **URL:** `/api/folder/open-vscode`
- **Body:**
```json
{
  "path": "/folder/path"
}
```

## TreeNode Type

```typescript
interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parentId: string | null;
}
```

## Example Backend Implementation

You can implement these endpoints using:
- Express.js (Node.js)
- Flask/FastAPI (Python)
- Supabase Edge Functions
- Any REST API framework

Example with Express.js:

```javascript
app.get('/api/templates', async (req, res) => {
  // Fetch from database
  const templates = await db.query('SELECT * FROM templates');
  res.json(templates);
});

app.post('/api/templates', async (req, res) => {
  const { name, tags, structure } = req.body;
  // Save to database
  const template = await db.query(
    'INSERT INTO templates (name, tags, structure) VALUES ($1, $2, $3) RETURNING *',
    [name, tags, JSON.stringify(structure)]
  );
  res.json(template);
});
```

## Testing the API

You can test the endpoints using:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl request:

```bash
curl -X GET http://localhost:3000/api/templates \
  -H "Content-Type: application/json"
```
