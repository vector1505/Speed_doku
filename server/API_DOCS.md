# Speed_doku API Documentation

## Base URL

- Local: `http://localhost:3000/`

---

## Endpoints

### 1. GET `/`
- **Description:** Health check endpoint.
- **Response:**
  - `200 OK`: `{ success: true, message: "Success", data: { success: "true" } }`

### 2. GET `/leaderboard`
- **Description:** Retrieve all leaderboard entries.
- **Response:**
  - `200 OK`: `{ success: true, message: "Leaderboard fetched", data: [...] }`
  - `500`: Standardized error response (see below)
- **Example Response:**
```json
{
  "success": true,
  "message": "Leaderboard fetched",
  "data": [
    { "_id": "...", "name": "Alice", "time": "00:30" },
    { "_id": "...", "name": "Bob", "time": "00:25" }
  ]
}
```

### 3. POST `/add`
- **Description:** Add a new entry to the leaderboard. **Requires API key.**
- **Headers:**
  - `x-api-key: your_api_key_here`
- **Request Body:**
```json
{
  "name": "string",
  "time": "string"
}
```
- **Response:**
  - `201 Created`: `{ success: true, message: "Entry added", data: { ... } }`
  - `400`: Standardized error response (see below)
  - `401`: `{ success: false, message: "Unauthorized" }` (if API key is missing or invalid)

### 4. GET `/test`
- **Description:** Add a test entry (`name: Vijay`, `time: 00:20`) to the leaderboard.
- **Response:**
  - `201 Created`: `{ success: true, message: "Test entry added", data: { ... } }`
  - `400`: Standardized error response (see below)

---

## Data Model

### Leaderboard Entry
- `name` (string, required): Player's name
- `time` (string, required): Completion time (format: `mm:ss`)

---

## Error Handling
- All errors return a standardized JSON response:
```json
{
  "success": false,
  "message": "Error message",
  "details": "Optional error details"
}
```
- 404 Not Found:
```json
{
  "success": false,
  "message": "Not Found"
}
```

---

## Example Usage

### Add Entry (with API key)
```bash
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{"name": "Charlie", "time": "00:22"}'
```

### Get Leaderboard
```bash
curl http://localhost:3000/leaderboard
```

---

## Notes
- All responses are in JSON format and follow a common structure.
- CORS is enabled.
- Ensure MongoDB is running and `DB_URI` and `API_KEY` are set in `.env`.
- The `/add` endpoint requires a valid API key in the `x-api-key` header.
