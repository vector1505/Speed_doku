# Speed_doku API Documentation

## Base URL

- Local: `http://localhost:3000/`

---

## Endpoints

### 1. GET `/`
- **Description:** Health check endpoint.
- **Response:**
  - `200 OK`: `{ success: "true" }`

### 2. GET `/leaderboard`
- **Description:** Retrieve all leaderboard entries.
- **Response:**
  - `200 OK`: Array of leaderboard objects
  - `500`: `{ error: "Failed to fetch leaderboard", details: ... }`
- **Example Response:**
```json
[
  { "_id": "...", "name": "Alice", "time": "00:30" },
  { "_id": "...", "name": "Bob", "time": "00:25" }
]
```

### 3. POST `/add`
- **Description:** Add a new entry to the leaderboard.
- **Request Body:**
```json
{
  "name": "string",
  "time": "string"
}
```
- **Response:**
  - `201 Created`: The created leaderboard object
  - `400`: `{ error: "Failed to add entry", details: ... }`

### 4. GET `/test`
- **Description:** Add a test entry (`name: Vijay`, `time: 00:20`) to the leaderboard.
- **Response:**
  - `201 Created`: The created test entry
  - `400`: `{ error: "Failed to add test entry", details: ... }`

---

## Data Model

### Leaderboard Entry
- `name` (string, required): Player's name
- `time` (string, required): Completion time (format: `mm:ss`)

---

## Error Handling
- All endpoints return JSON error messages with an `error` field and additional `details` if an error occurs.

---

## Example Usage

### Add Entry
```bash
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"name": "Charlie", "time": "00:22"}'
```

### Get Leaderboard
```bash
curl http://localhost:3000/leaderboard
```

---

## Notes
- All responses are in JSON format.
- CORS is enabled.
- Ensure MongoDB is running and `DB_URI` is set in `.env`.
