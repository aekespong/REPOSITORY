# Chapter Editor - Användarguide

## Översikt

Den nya kapitelredigeraren är en split-screen editor med live preview-funktion för att redigera kapitelinnehåll direkt från Doc Writer servern.

## Användning

### Öppna en fil för redigering

Anropa följande URL-struktur:

```
http://localhost:3000/edit?book=nar-framtiden-blir-personlig-v3&file=business-design.md
```

**Parametrar:**

- `book`: Bokmappen under `REPOSITORY/` (t.ex. `nar-framtiden-blir-personlig-v3`)
- `file`: Markdownfilens namn under `chapters/`-mappen (t.ex. `business-design.md`)

### Exempel

```
GET /edit?book=nar-framtiden-blir-personlig-v3&file=business-design.md
```

## Funktioner

### Redigerare (vänster pane)

- Skriv eller klistra in markdown-innehål
- Automatisk satsintervall mellan ändringar och förhandsvisning
- Linjnumrering och teckenvältäljare i statusfältet

### Förhandsvisning (höger pane)

- Live renderering av markdown till HTML
- Stöd för:
  - Rubriker (H1-H6)
  - Fetad och kursiv text
  - Listor (oordnade och ordnade)
  - Kodblock
  - Tabeller
  - Bilder
  - Blockquotes
  - Länkad text

### Spara

- Klicka på **Spara** knappen eller tryck **Ctrl+S**
- Spara-indikatorn visar sparstatus:
  - 🟢 Grön puls: Sparad
  - 🔴 Röd: Osparad ändringar

### Navigering

- Använd **Tillbaka**-knappen för att återgå till föregående sida
- Statusfältet visar radreferens (rad:kolumn) och teckental

## API Endpoints

### GET /edit

Öppnar editorgränssnittet för en fil.

**Parametrar:**

- `book` (required): Bokmappen
- `file` (required): Filnamnet

**Svar:** HTML-sida med redigeringsinterface

### POST /edit/save

Sparar filens innehåll.

**Body:**

```json
{
  "content": "# Markdown content...",
  "filePath": "REPOSITORY/nar-framtiden-blir-personlig-v3/chapters/business-design.md"
}
```

**Svar:**

```json
{
  "success": true,
  "message": "Filen sparades framgångsrikt"
}
```

### POST /edit/preview

Genererar HTML-förhandsvisning av markdown.

**Body:**

```json
{
  "content": "# Markdown content..."
}
```

**Svar:**

```json
{
  "htmlContent": "<h1>Markdown content...</h1>"
}
```

## Säkerhet

- Directory traversal-skydd implementerat för alla filvägar
- Endast filer under `REPOSITORY/`-mappen kan nås
- Filvägar valideras innan läsning/skrivning

## Styling

Editorn använder ett mörkt tema (VS Code-inspirerat) med:

- Mörkgrå bakgrund
- Ljusgrå text
- Syntaxmarkering för markdown
- Responsiv design för mobila enheter

## Anpassning

Den nya chapter-editor.ejs-vyn kan anpassas genom att redigera:

- CSS-stilar för utseende
- JavaScript-funktionalitet för interaktion
- HTML-struktur för layout
