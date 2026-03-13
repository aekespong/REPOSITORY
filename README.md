# REPOSITORY FOR GRAND WRITER 

This is a repo for books, chapters, documents, projects and specifications.

```
REPOSITORY/                       # Alla böcker
├── prompts/                    # Global LLM prompts for AI-LLM-chats/commands
│   ├── prompt_analyze_meta.md
│   ├── prompt_org_tasks.md
│   ├── prompt_tasks.md
│   └── prompt_modify.md
├── actions/                    # Global workflow actions
│   └── README.md               # Action definitions and scripts
├── {book-slug}/                # Specifik bok (slugified boknamn)
│   ├── book.json               # Metadata: boktitel
│   ├── chapters.json  # Master-index över alla kapitel-ID:n
│   ├── chapters/               # Platta kapitel-filer och statusfiler
│   │   ├── {chapter-id}.md     # Kapitelinnehåll (state: text)
│   │   └── {chapter-id}.json # State management fil (KRITISK för AI-agenter)
│   └── prompts/                # [Optional] Book-specific prompts override global prompts
└── src/server.ts               # Webbviewer för bokinnehållet
```
