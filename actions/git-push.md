---
type: command
id: git-push
endpoint: /api/actions/run
label: Commit & Push
icon: "🚀"
confirm: true
confirm_message: "Vill du committa och pusha alla ändringar till remote?"
---

# Git Push

Git commit och push REPOSITORY till remote.

## Beskrivning

Committar alla ändringar i REPOSITORY och pushar till remote. Bygger automatiskt ett commit-meddelande baserat på ändrade böcker och kapitel.

## Commit-meddelande format

```
Uppdaterat
- Bokens titel: kapitel-1, kapitel-2
- Annan bok: kapitel-3
```
