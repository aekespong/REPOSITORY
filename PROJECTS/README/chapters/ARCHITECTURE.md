# Arkitektur - Chapter Editor Integration

## Systemöversikt

```
┌─────────────────────────────────────────────────────────────┐
│                      Webbläsare (Client)                   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │           chapter-editor.ejs (UI)                  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Header (Filinfo + Spara/Tillbaka-knappar)  │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌───────────────────┬──────────────────────────┐  │   │
│  │  │  Editor (vänster) │  Preview (höger)        │  │   │
│  │  │                   │                          │  │   │
│  │  │  - Textarea       │  - HTML rendering      │  │   │
│  │  │  - Syntaxmarkering│  - Live preview        │  │   │
│  │  │  - Rad/Kolumn     │  - Markdown styles     │  │   │
│  │  │                   │                          │  │   │
│  │  └───────────────────┴──────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │ Status Bar (Rad:Kolumn + Tecken + Sparstatus)│  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  JavaScript Events:                                         │
│  - input: Uppdaterar preview + sparstatus                 │
│  - Ctrl+S: Sparar fil                                     │
│  - click (Tillbaka): Navigera tillbaka                   │
└─────────────────────────────────────────────────────────────┘
           │                                    │
           │ HTTP Requests                      │ HTTP Responses
           ▼                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Server (server.ts)               │
│                                                             │
│  GET /edit?book=X&file=Y                                   │
│  ├─ Validerar sökväg (säkerhet)                           │
│  ├─ Läser fil från disk                                   │
│  ├─ Konverterar markdown → HTML                           │
│  └─ Renderar chapter-editor.ejs                           │
│                                                             │
│  POST /edit/preview                                        │
│  ├─ Tar emot markdown-innehåll                            │
│  ├─ Konverterar till HTML (markdownToHtml)               │
│  └─ Returnerar HTML för preview                           │
│                                                             │
│  POST /edit/save                                           │
│  ├─ Tar emot innehåll + sökväg                           │
│  ├─ Validerar sökväg (säkerhet)                          │
│  ├─ Skriver till disk                                     │
│  ├─ Uppdaterar status.json (last_updated)                │
│  └─ Returnerar framgång/fel                              │
│                                                             │
│  markdownToHtml(content, chapterId)                        │
│  ├─ Extraherar metadata från markdown                     │
│  ├─ Normaliserar listsyntax                               │
│  ├─ Konfigurerar marked (GFM)                             │
│  └─ Returnerar { html, metadata }                         │
└─────────────────────────────────────────────────────────────┘
           │                                    │
           │ Filsystemoperationer              │ Konfiguration
           ▼                                    ▼
┌─────────────────────────────────────────────────────────────┐
│              Filsystem (lokalt på server)                   │
│                                                             │
│  REPOSITORY/                                                     │
│  └─ {book-slug}/                                           │
│     ├─ book.json (Bokmetadata)                            │
│     ├─ chapter_structure.json (Kapitelindex)              │
│     └─ chapters/                                           │
│        ├─ file1.md                                        │
│        ├─ file2.md                                        │
│        ├─ {chapter-slug}.md                               │
│        ├─ {chapter-slug}.json (Kapitelstatus + last_updated)  │
│        ├─ meta.json                                       │
│        └─ images/                                         │
│           └─ *.png/jpg                                    │
└─────────────────────────────────────────────────────────────┘
```

## Flödesdiagram - Öppna Editor

```
Användare klickar länk
        │
        ▼
GET /edit?book=X&file=Y
        │
        ├─ Validera queryparametrar ──┐
        │                              │
        ├─ Konstruera sökväg           │
        │  REPOSITORY/X/chapters/Y          │
        │                              │
        ├─ Security check ◄────────────┘
        │ (förhindra directory traversal)
        │
        ├─ Läs fil från disk
        │
        ├─ Konvertera till HTML
        │  (markdownToHtml)
        │
        └─► Rendera chapter-editor.ejs
            med variabler:
            - fileName
            - filePath
            - content
            - htmlContent
            - bookName
```

## Flödesdiagram - Spara Fil

```
Användare klickar Spara
        │
        ▼
JavaScript: POST /edit/save
        │
        ├─ {content, filePath}
        │
        ▼
Express server
        │
        ├─ Validera input
        │
        ├─ Security check
        │
        ├─ Skriv fil
        │  fs.writeFileSync(...)
        │
        ├─ Uppdatera status.json
        │  last_updated = ISO timestamp
        │
        └─► JSON response
            {success: true}
            │
            ▼
JavaScript
        │
        ├─ Uppdatera UI
        │
        ├─ Visa "Sparad ✓"
        │
        └─ Nollställ sparstatus
```

## Flödesdiagram - Live Preview

```
Användare skriver i editor
        │
        ▼
JavaScript: input event
        │
        ├─ Debounce (300ms)
        │
        ▼
POST /edit/preview
        │
        ├─ {content: "# Heading..."}
        │
        ▼
Express server
        │
        ├─ markdownToHtml(content)
        │
        └─► {htmlContent: "<h1>Heading...</h1>"}
            │
            ▼
JavaScript
        │
        └─ Uppdatera preview DOM
           preview.innerHTML = htmlContent
```

## Säkerhet - Path Traversal Prevention

```
Inmatning: ?book=../../evil&file=../../passwd
        │
        ▼
Konstruera sökväg:
  absolutePath = /app/REPOSITORY/../../evil/chapters/../../passwd
        │
        ▼
Resolve path:
  resolvedPath = path.resolve(absolutePath)
  resultat = /app/evil/passwd  ◄─ Absolutad sökväg
        │
        ▼
Validera mot baseDir:
  booksDir = /app/REPOSITORY
  
  resolvedPath.startsWith(booksDir)?
  /app/evil/passwd.startsWith(/app/REPOSITORY)?
  FALSE ◄─ BLOCKERAD!
        │
        ▼
return 403 Forbidden
```

## Integrationspunkter

```
┌─────────────────────────────────────────────────────┐
│  server.ts (Redan befintligt)                      │
├─────────────────────────────────────────────────────┤
│  - markdownToHtml()  ◄─ Används av /edit/preview  │
│  - getBook()         ◄─ Kan användas för navigering│
│  - getBookTitle()    ◄─ Kan användas i header      │
│  - getChapterContent() ◄─ Läser filer på disk     │
└─────────────────────────────────────────────────────┘
           │
           ├─────────────────────────────────────┐
           ▼                                     ▼
    ┌────────────────────┐          ┌──────────────────┐
    │ Editor.ts (Export) │          │ chapter-editor   │
    │ (modulär)          │          │ .ejs (vy)        │
    ├────────────────────┤          ├──────────────────┤
    │ - convertMarkdown  │          │ - HTML struktur  │
    │ - saveFileContent  │          │ - CSS styling    │
    │ - readFileContent  │          │ - JavaScript UI  │
    └────────────────────┘          └──────────────────┘
```

## Data Flow - Spara Operation

```
Client
  │
  ├─ editor.value = "# New content"
  │
  └─ POST /edit/save
     {
       content: "# New content",
       filePath: "REPOSITORY/bok/chapters/fil.md"
     }
         │
         ▼
Server (Express)
  │
  ├─ Validera input ✓
  │
  ├─ Validera sökväg ✓
  │
  ├─ fs.writeFileSync(
  │     absolutePath,
  │     content,
  │     'utf-8'
  │   )
  │
  ├─ Läs status.json
  │
  ├─ status.last_updated = Date.now()
  │
  └─ fs.writeFileSync(status.json)
         │
         ▼
Response
  {
    success: true,
    message: "Filen sparades framgångsrikt"
  }
         │
         ▼
Client
  │
  ├─ lastSavedContent = editor.value
  │
  ├─ saveIndicator.classList.remove('unsaved')
  │
  ├─ saveStatus.textContent = 'Sparad ✓'
  │
  └─ setTimeout(() => {
       saveStatus.textContent = 'Sparad'
     }, 2000)
```

## Framtida Utökningar

```
Current:                          Future:
┌──────────────────────┐         ┌──────────────────────┐
│  /edit (GET)         │         │  /edit (enhanced)    │
│  /edit/save (POST)   │         ├──────────────────────┤
│  /edit/preview (POST)│         │  + /edit/autosave    │
└──────────────────────┘         │  + /edit/history     │
                                 │  + /edit/diff        │
                                 │  + /edit/comments    │
                                 │  + /edit/format      │
                                 └──────────────────────┘
```
