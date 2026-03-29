# Doc Writer - Spec-Driven Authoring System

A specification-driven book authoring system combining Scrivener-inspired tools with AI-agent compatibility and state management.

**Project:** "När framtiden blir personlig" (When the Future Becomes Personal)

## Vision

Doc Writer is a **Spec-Driven Authoring System** that applies software development principles to book authoring. It bridges three essential capabilities:

1. **Scrivener-inspired author tools** - Structure, metadata, concept tracking, and status management
2. **Spec-driven development workflow** - State management, verification, and persistent chapter status
3. **AI-agent compatibility** - Autonomous agents can work with book content using clear state files and atomic tasks

## Key Features

### Implemented

- ✅ **Chapter structure** - Organized hierarchy with markdown content, synopses, and status tracking
- ✅ **State management** - Each chapter has a status file named `{chapter_id}.json` (placed in the book's `chapters/` directory) with boolean flags, version history, and timestamps
- ✅ **Word import** - Automatic import from Word documents with protection against data loss
- ✅ **Web viewer** - Browse chapters with navigation, latest updates, and version history
- ✅ **File watcher** - Auto-updates status timestamps and version entries when content changes
- ✅ **Concept tracking** - Synopsis files for key points and metadata per chapter

### Planned

- ⏳ **Custom metadata** - Keywords, main concepts, related chapters in status files
- ⏳ **Smart collections** - Filter and group chapters by metadata
- ⏳ **Atomic task system** - Break chapters into spec-driven micro-tasks
- ⏳ **Dependency chains** - Model chapter relationships and concept references
- ⏳ **Automated verification** - Validate that key concepts are explained in text
- ⏳ **MCP integration** - Connect AI-agents directly to status data via Model Context Protocol

## Core Concept: Status.json

Each chapter has a `{chapter_id}.json` state file (in the `chapters/` directory) that AI-agents read before working:

```json
{
  "title": "Chapter Title",
  "status": "draft | review | complete",
  "outline_complete": false,
  "content_complete": false,
  "fact_checked": false,
  "concepts_registered": false,
  "reviewed": false,
  "notes": "Next steps for agents",
  "last_updated": "2025-01-10 14:23",
  "versions": [
    {
      "timestamp": "2025-01-10 14:23",
      "message": "updated | Imported from Word | other"
    }
  ]
}
```

Boolean flags act as a checklist and are **CRITICAL** for agent workflows.

## Project Structure

```
REPOSITORY/                             # All books
├── {root}/                             # Root (slugified name) som motsvarar första nivån i REPOSITORY
│   ├── {workspace}/                    # Workspace (slugified name)
│   │   ├── folders.json                # Workspace metadata
│   │   ├── chapters.json     # Chapter index (order + titles)
│   │   ├── chapters/                  # Flat chapter files and status files
│   │   │   ├── file1.md               # Chapter content
│   │   │   ├── file2.md
│   │   │   ├── {chapter-id}.md        # Chapter content
│   │   │   └── {chapter-id}.json # State file (per-chapter, flat layout)
│   │   ├── research/                  # Research and specs
│   │   ├── specs/                     # [PLANNED] Task specs
│   │   └── src/server.ts              # Web viewer
│   ├── {workspace}/                    # Current Workspace (slugified name)
│   │   ├── folders.json                # Workspace metadata
│   │   ├── chapters.json     # Chapter index (order + titles)
│   │   ├── chapters/                  # Flat chapter files and status files
│   ├── folders.json
├── folders.json
├── {root}/                        # Another root (slugified name)
│   ├── {workspace}/                        # Workspace (slugified name)
```

## Safeguards

**Double Import Protection** - The import function prevents overwriting manually edited chapters:

- Detects if a chapter has manual edits (non-WORD_IMPORT versions)
- Compares new content from Word with existing content
- Aborts import if content differs and shows clear resolution steps
- Only continues if content is identical (safe to import)

This protection is automatically active.

## Development Roadmap

Based on spec-driven principles:

1. **Specs system** - Create PRD-like specifications for chapters
2. **Atomic tasks** - Break chapters into small, measurable work items
3. **Metadata expansion** - Keywords, concepts, related chapters
4. **Dependency modeling** - Track which chapters reference which concepts
5. **Automated checks** - Verify claims are supported in text
6. **Agent integration** - MCP protocol for agent-system communication

## Technical Stack

- **Python 3.12** - CLI and content management
- **TypeScript 5.9** - Web server
- **Express 5.2** - HTTP framework
- **python-docx** - Word document processing
- **Rich** - CLI formatting

## Language Conventions

- **Swedish** - All content, UI, commit messages
- **English** - Code, variable names, function names, comments
