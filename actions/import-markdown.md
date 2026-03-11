---
type: command
id: import-markdown
endpoint: /api/actions/run
label: Importera Markdown
icon: "📥"
confirm: true
confirm_message: "Vill du importera detta markdown-dokument som en ny bok?"
has_form: true
---

# Importera Markdown

Importera ett markdown-dokument och dela upp det i kapitel baserat på H1-rubriker.

## Beskrivning

Tar emot markdown-text, delar upp den i kapitel vid varje `# Rubrik`, skapar en ny bok med alla kapitel, metadata och chapters.json.
