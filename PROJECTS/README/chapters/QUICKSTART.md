# Snabbstart - Chapter Editor

## Installation

Editorn är redan integrerad i Doc Writer. Ingen ytterligare installation krävs.

## Starta servern

```bash
cd /home/andre/projects/gt
npm start
# eller
yarn start
```

Servern körs på `http://localhost:3000`

## Öppna editorn

### Metod 1: Direktlänk

Öppna följande URL i din webbläsare:

```
http://localhost:3000/edit?book=nar-framtiden-blir-personlig-v3&file=business-design.md
```

### Metod 2: Från kod

```javascript
// Exempel på hur man kan länka till editorn från Doc Writer
const openChapterEditor = (book, file) => {
  window.location.href = `/edit?book=${book}&file=${file}`;
};
```

## Användarguide

### 1. **Gränssnittet**

```
┌─────────────────────────────────────────────────────┐
│  Filnamn                    [💾 Spara] [←  Tillbaka]│  Header
├─────────────────────────────────────────────────────┤
│                                                     │
│  Redigerare     │     Förhandsvisning             │  Main
│                 │                                 │  Content
│  Markdown här   │     HTML rendering här         │
│                 │                                 │
├──────────────────────────────────────────────────────┤
│  1:1    │  0 tecken         [●] Sparad               │  Status
└─────────────────────────────────────────────────────┘
```

### 2. **Redigera en fil**

- Skriv eller klistra in markdown i den vänstra rutan
- Se live preview av HTML i den högra rutan
- Använd standardmarkdown-syntax

### 3. **Spara ändringar**

- Klicka **Spara**-knappen, eller
- Tryck **Ctrl+S** på tangentbordet

### 4. **Sparstatus**

- 🟢 Grön puls = Filen är sparad
- 🔴 Röd = Osparade ändringar

### 5. **Gå tillbaka**

- Klicka **Tillbaka**-knappen för att återgå till föregående sida

## Markdown-exempel

````markdown
# Huvudrubrik

## Underrubrik

Vanlig text.

**Fetstil** och _kursiv_.

- Lista
- Andra punkt

1. Numrerad lista
2. Andra punkt

> Blockquote

```kod
console.log('Exempel');
```
````

[Länk](https://example.com)

| Kolumn 1 | Kolumn 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

```

## Keyboard-genvägar

| Tangent | Funktion |
|---------|----------|
| `Ctrl+S` | Spara fil |
| `Ctrl+A` | Markera allt |
| `Tab` | Indrag |

## Vanliga uppgifter

### Uppdatera ett befintligt kapitel
```

1. Öppna URL: /edit?book=bok-slug&file=chapter-name.md
2. Redigera innehållet
3. Spara med Ctrl+S

```

### Skapa ny kapitel-fil
```

1. Skapa fil manuellt under: REPOSITORY/{book-slug}/chapters/
2. Öppna med: /edit?book=bok-slug&file=ny-fil.md
3. Skriv innehåll och spara

```

### Byta till annan fil
```

1. Ändra URL-parametrarna
2. Eller använd "Tillbaka" för att gå till översikten

```

## Felsökning

### Problem: "Fil inte funnen"
- Verifiera att bokföldern finns under `REPOSITORY/`
- Verifiera att filen finns under `REPOSITORY/{bok}/chapters/`
- Kontrollera URL-parametrarna för typos

### Problem: "Åtkomst nekad"
- URL-parametrarna kan innehålla farliga tecken
- Använd URL-kodning för specialtecken

### Problem: Ändringar sparas inte
- Kontrollera att servern är igång
- Inspektera webbläsarens konsol för fel (F12)
- Verifiera filbehörigheter på servern

### Problem: Förhandsvisningen uppdateras inte
- Vänta 300ms efter att ha slutat skriva (debounce)
- Uppdatera manuellt genom att klicka någonstans

## API-referens (för utvecklare)

### GET /edit
Öppna editorn
```

GET /edit?book=bok-slug&file=filnamn.md
Svar: HTML-sida med editor-gränssnittet

```

### POST /edit/save
Spara fil
```

POST /edit/save
Body: {
"content": "# Markdown...",
"book": "bok-slug",
"chapterPath": "chapters/file.md"
}
Svar: {"success": true, "message": "..."}

```

### POST /edit/preview
Förhandsvisning
```

POST /edit/preview
Body: {"content": "# Markdown..."}
Svar: {"htmlContent": "<h1>Markdown...</h1>"}

```

## Inställningar

Editorn använder automatiska inställningar:
- **Tema**: Mörkt (VS Code-inspirerat)
- **Font**: System font (Segoe UI / Tahoma)
- **Tabtecken**: 4 mellanslag
- **Debounce för preview**: 300ms
- **Autoformat**: Nej (bevarar användarens formatering)

## Säkerhet

✅ Editorn är säker för att använda på:
- Localhost
- Privata nätverk
- HTTPS-anslutningar

⚠️ För produktion, lägg till:
- CSRF-token-validering
- Användar-autentisering
- Rate limiting
- Input sanitization

## Kontakt & Support

Om du stöter på problem:
1. Kontrollera ARCHITECTURE.md för detaljerad information
2. Se CHAPTER_EDITOR.md för fullständig dokumentation
3. Kolla test-editor.sh för test-instruktioner
```
