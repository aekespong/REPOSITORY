# LLM Error Handling - Extended Error Information

## Overview

Enhanced error handling for LiteLLM API calls in both Python and TypeScript to extract detailed error messages, including budget exceeded information.

## Problem

Previously, when LiteLLM returned a 400 error (e.g., budget exceeded), the system only showed:
- Status code (400)
- Generic status text ("Bad Request")

The actual error message like "Budget has been exceeded! Current cost: 10.398006630000001, Max budget: 10.0" was in the response body but not being extracted.

## Solution

### Python (scripts/lib/llm_client.py)

Added `_extract_error_details()` method to `LiteLLMClient` class that:
1. Catches HTTP errors
2. Parses the response body JSON
3. Extracts error details from common fields:
   - `error.message`
   - `error` (string)
   - `message`
   - `detail`
4. Returns formatted error message with full context

**Before:**
```python
resp.raise_for_status()  # Only raises status code
```

**After:**
```python
if not resp.ok:
    error_msg = self._extract_error_details(resp)
    raise requests.exceptions.HTTPError(error_msg, response=resp)
```

**Example error output:**
```
HTTP 400 Bad Request: Budget has been exceeded! Current cost: 10.398006630000001, Max budget: 10.0
```

### TypeScript (src/controllers/llm.controller.ts)

Added two helper functions:
1. `extractErrorDetails()` - For non-streaming responses (fetch Response)
2. `extractErrorDetailsFromText()` - For streaming responses (text)

Both extract error details from LiteLLM response body JSON.

**Before:**
```typescript
if (!response.ok) {
  res.status(response.status).json({ error: `LLM API fel: ${response.statusText}` });
}
```

**After:**
```typescript
if (!response.ok) {
  const errorDetails = await extractErrorDetails(response, response.statusText);
  res.status(response.status).json({ 
    error: `LLM API fel: ${errorDetails}`,
    statusCode: response.status
  });
}
```

## Affected Endpoints

### Python CLI
- `/models` command
- All chat completion calls

### TypeScript API
- `POST /edit/analyze-llm` - Meta analysis (non-streaming)
- `POST /edit/analyze-llm-stream` - Meta analysis (streaming)
- `POST /edit/analyze-org-tasks` - Organization tasks (non-streaming)
- `POST /edit/analyze-org-tasks-stream` - Organization tasks (streaming)
- `POST /edit/analyze-edit-tasks` - Edit tasks (non-streaming)
- `POST /edit/analyze-edit-tasks-stream` - Edit tasks (streaming)
- `POST /edit/run-changes` - Apply changes (non-streaming)
- `POST /edit/run-changes-stream` - Apply changes (streaming)
- `POST /edit/chat-stream` - Chat with LLM (streaming)

## Error Response Format

### Non-streaming endpoints
```json
{
  "error": "LLM API fel: Budget has been exceeded! Current cost: 10.398006630000001, Max budget: 10.0",
  "statusCode": 400
}
```

### Streaming endpoints (SSE)
```
data: {"error":"LLM API fel: Budget has been exceeded! Current cost: 10.398006630000001, Max budget: 10.0","statusCode":400}
```

## Testing

To test the enhanced error handling:

1. **Simulate budget exceeded:**
   - Configure a low budget limit in your LiteLLM server
   - Make enough requests to exceed the budget
   - Observe the detailed error message in logs and UI

2. **Python test:**
```python
from lib.llm_client import LiteLLMClient

client = LiteLLMClient(api_key="your-key", base_url="your-url")
try:
    response = client.chat_completion("Test message")
except requests.exceptions.HTTPError as e:
    print(f"Error: {e}")  # Now includes detailed budget message
```

3. **TypeScript test:**
```bash
curl -X POST http://localhost:3000/edit/analyze-llm \
  -H "Content-Type: application/json" \
  -d '{"content":"Test","book":"test","chapterPath":"test.md"}'
```

Expected response when budget exceeded:
```json
{
  "error": "LLM API fel: Budget has been exceeded! Current cost: 10.398006630000001, Max budget: 10.0",
  "statusCode": 400
}
```

## Implementation Date

2025-03-10

## Files Modified

- `scripts/lib/llm_client.py` - Added `_extract_error_details()` method
- `src/controllers/llm.controller.ts` - Added helper functions and updated all endpoints

## Benefits

1. **Better debugging** - Developers see exact error messages from LiteLLM
2. **User-friendly errors** - Users see budget information when quota is exceeded
3. **Consistent error handling** - All endpoints use the same error extraction logic
4. **Forward compatible** - Handles various error response formats from LiteLLM
