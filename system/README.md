# REPOSITORY/system

System configuration files for Document Writer. These files control application behaviour and should not be deleted or manually moved.

```
REPOSITORY/                       # Alla böcker
├── {book-slug}/                # Specifik bok (slugified boknamn)
│   ├── book.json               # Metadata: boktitel
│   ├── chapters.json  # Master-index över alla kapitel-ID:n
│   ├── chapters/               # Platta kapitel-filer och statusfiler
│   │   ├── {chapter-id}.md     # Kapitelinnehåll (state: text)
│   │   └── {chapter-id}.json # State management fil (KRITISK för AI-agenter)
│   └── prompts/                # [Optional] Book-specific prompts override global prompts
├── system
│   ├── actions/                    # Global workflow actions
│   │   └── README.md               # Action definitions and scripts
│   ├── prompts/                    # Global LLM prompts for AI-LLM-chats/commands
│   │   ├── prompt_analyze_meta.md
│   │   ├── prompt_org_tasks.md
│   │   ├── prompt_tasks.md
│   │   └── prompt_modify.md
├── src/server.ts               # Webbviewer för bokinnehållet
```


## Files

### `settings.json`
The single source of truth for all root workspaces. Each entry defines a top-level directory under `REPOSITORY/` that the application treats as a workspace root.

**Schema:**
```json
{
  "version": 1,
  "roots": [
    {
      "slug": "books",        // URL slug and lowercase dir identifier
      "title": "BOOKS",       // Filesystem directory name (used for path resolution)
      "name": "Book",         // Singular display name (used e.g. in "Close Book" tab menu)
      "plural_name": "Books", // Plural display name (used in ROOT dropdown)
      "created_at": "YYYY-MM-DD HH:MM"
    }
  ]
}
```

**Validation:** When switching roots in the sidebar, the app verifies that every entry in `settings.json` has a matching directory in `REPOSITORY/` and vice versa. A warning is shown if there is a mismatch. The directories `system`, `actions`, and `prompts` are excluded from this check as they are meta-directories.

---

### `users.json`
Defines the users available in the user selector. Used by the planner and writer features.

```json
{
  "users": [
    { "id": "user1", "name": "Alice", "initials": "AL", "color": "#4a90d9" }
  ]
}
```

---

### `writer_actions.json`
Auto-generated log of all file edits made through the writer interface, keyed by date. Written automatically by the server — safe to delete or truncate if it grows too large.

```json
{
  "2026-03-19": [
    { "time": "14:23:45", "action": "save", "root": "BOOKS", "book": "...", "file": "...", "ref": "..." }
  ]
}
```
