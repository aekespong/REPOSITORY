# Verktygsintegration och MCP

> Chapter-ID: verktygsintegration
> Status: draft

## Model Context Protocol (MCP)

MCP ar en standard for att koppla AI-modeller till externa verktyg och datakallor. For Grand Writer innebar detta att AI-agenter kan:

- Las kapitelinnehall och metadata direkt
- Uppdatera statusflaggor och versionshistorik
- Soka i begreppsregister och beroendekedjor
- Skapa nya kapitel och material

## Verktygskategorier

### Lasverktyg
- `get_chapter_content(id)` - Hamta kapiteltext
- `get_chapter_status(id)` - Hamta statusflaggor
- `search_concepts(term)` - Sok i begreppsregistret

### Skrivverktyg
- `update_chapter(id, content)` - Uppdatera kapiteltext
- `set_status_flag(id, flag, value)` - Satt statusflagga
- `add_version_entry(id, message)` - Lagg till versionspost

### Analysverktyg
- `find_undefined_concepts(id)` - Hitta oanvanda begrepp
- `check_dependencies(id)` - Kontrollera kapitelberoenden
