# CSS Styling Structure

Detta dokument beskriver CSS-arkitekturen i Doc Writer-projektet.

## 📊 Översikt

Doc Writer använder en **lager-baserad CSS-arkitektur** med design tokens som grund:

```
┌─────────────────────────────────────────────────────────────┐
│                    THEME LAYER (Foundation)                  │
│  theme.css (4.5K) - CSS Custom Properties (Design Tokens)   │
│  • --bg, --text, --surface-1, --surface-2                   │
│  • --border, --accent, --primary, --button_bg               │
│  • --header-height, --sidebar-width, --radius               │
│  • Light/Dark mode variants                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BASE LAYER (Common Styles)                │
│  styles.css (32K, 1573 lines) - Application-wide styles     │
│  • Document base (body, html)                               │
│  • Sidebar system (.sidebar, .sidebar-tab)                  │
│  • Container layouts (.container, .content)                 │
│  • Typography (h1, h2, h3, p, code)                         │
│  • Buttons (.btn, .btn-primary, .btn-secondary)             │
│  • Forms (input, textarea, select)                          │
│  • Utilities (.hidden, .toast, flex helpers)                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  SHARED COMPONENT LAYER                      │
│  headers.css (10K) - Header component styles                │
│  • .header, .header-title, .header-controls                 │
│  • .header-btn, .header-menu, .dropdown-menu                │
│                                                              │
│  file_browser.css (8.9K) - File browser (sidebar Files tab) │
│  • .fb-tree, .fb-row, .fb-icon (VS Code-style tree)        │
│                                                              │
│  tabs.css (4.8K) - Tab navigation component                 │
│  • .tab-bar, .tab-item, tab switching                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              FEATURE-SPECIFIC LAYER (Page Styles)           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ browse.css (11K) - File browser page                │   │
│  │ • Miller columns, breadcrumbs, file selection       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ editor.css (36K) - Chapter/code editor              │   │
│  │ • Monaco-style layout, split panes, line numbers    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ actions.css (15K) - Actions page (import, plans)    │   │
│  │ • Action cards, import UI, task lists               │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ planner.css (6.4K) - Planner page (iframe)          │   │
│  │ • Task management, organizational layout            │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ chat.css (6.3K) - Chat interface                    │   │
│  │ • Messages, input, suggestions, avatars             │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ pdf.css (7.4K) - Print/PDF export styles            │   │
│  │ • @media print, page breaks, typography             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Design Principer

### 1. Cascade Order

CSS-filer laddas **alltid** i denna ordning:

```html
<link rel="stylesheet" href="/theme.css">        <!-- 1. Tokens -->
<link rel="stylesheet" href="/styles.css">       <!-- 2. Base -->
<link rel="stylesheet" href="/headers.css">      <!-- 3. Shared -->
<link rel="stylesheet" href="/[feature].css">    <!-- 4. Feature -->
```

### 2. Token Usage Pattern

Alla feature-CSS-filer refererar till `theme.css` variabler:

```css
/* ✅ CORRECT - Uses theme tokens */
.my-element {
  background: var(--surface-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

/* ❌ WRONG - Hardcoded values */
.my-element {
  background: #232323;
  color: #efefef;
  border: 1px solid rgba(255,255,255,0.14);
}
```

### 3. Separation of Concerns

| File | Purpose | Size | Scope |
|------|---------|------|-------|
| **theme.css** | Design tokens only | 4.5K | Global |
| **styles.css** | Application framework | 32K | Global |
| **headers.css** | Header component | 10K | Shared |
| **file_browser.css** | File tree component | 8.9K | Shared |
| **tabs.css** | Tab component | 4.8K | Shared |
| **editor.css** | Editor page | 36K | Feature |
| **actions.css** | Actions page | 15K | Feature |
| **browse.css** | Browse page | 11K | Feature |
| **planner.css** | Planner page | 6.4K | Feature |
| **chat.css** | Chat page | 6.3K | Feature |
| **pdf.css** | Print/PDF | 7.4K | Feature |

### 4. Naming Conventions

```css
/* Component classes - prefixed */
.chat-message { }
.chat-input { }
.fb-tree { }           /* file browser */
.miller-column { }     /* browse */

/* Global utilities - unprefixed */
.container { }
.btn { }
.hidden { }

/* Theme tokens - double dash */
--surface-1
--text-muted
--btn-bg-hover
```

## 📝 Exempel: Hur en sida laddar CSS

**chat.ejs:**
```html
<link rel="stylesheet" href="/theme.css">         <!-- Tokens -->
<link rel="stylesheet" href="/styles.css">        <!-- Sidebar, buttons, base -->
<link rel="stylesheet" href="/file_browser.css">  <!-- Sidebar Files tab -->
<link rel="stylesheet" href="/headers.css">       <!-- Header bar -->
<link rel="stylesheet" href="/chat.css">          <!-- Chat-specific -->
```

**Resultat:**
- **theme.css** tillhandahåller `--text`, `--surface-2`, `--accent` 
- **styles.css** tillhandahåller `.sidebar`, `.btn`, typografi
- **headers.css** tillhandahåller `.header`, `.header-title`
- **chat.css** använder alla tokens: `background: var(--surface-2);`

## 🔑 Viktiga Theme Tokens

### Layout
```css
--sidebar-width: 350px;
--header-height: 50px;
--reading-max-width: 800px;
--content-pad-x: 100px;
--content-pad-y: 30px;
```

### Colors (Dark Mode)
```css
--bg: #141414;
--surface-1: #1b1b1b;      /* editor pane background */
--surface-2: #232323;      /* header and sidebar background */
--text: #efefef;
--text-muted: #b7b7b7;
--text-dim: #8a8a8a;
--border: rgba(255,255,255,0.14);
--border-soft: rgba(255,255,255,0.08);
```

### Accent & Actions
```css
--accent: #a8adb3;
--accent-weak: rgba(168,173,179,0.18);
--accent-strong: rgb(36, 87, 226);
--primary: #b7bdc4;
--primary-hover: #d0d4d8;
```

### Buttons
```css
--btn-bg: rgba(255,255,255,0.08);
--btn-bg-hover: rgba(255,255,255,0.14);
--btn-border: rgba(255,255,255,0.20);
```

## ✅ Fördelar med denna struktur

1. **Konsekvent tema** - Ändra `--accent` på ett ställe
2. **Ingen duplicering** - Base styles delas av alla sidor
3. **Modulär** - Varje sida inkluderar endast vad den behöver
4. **Underhållsbar** - Feature CSS är isolerad
5. **Light/Dark mode** - Byt tema genom att ändra token-värden

## 🎯 När du skapar nya sidor

**Följ detta mönster:**

```css
/* my-feature.css - My Feature page
 * Based on theme.css design tokens
 * Uses styles.css for base components
 */

.my-feature-content {
  background: var(--surface-1);    /* ✅ Use token */
  color: var(--text);              /* ✅ Use token */
  padding: 20px;                   /* ✅ Local spacing */
}

.my-feature-card {
  border: 1px solid var(--border); /* ✅ Use token */
  border-radius: var(--radius);    /* ✅ Use token */
}
```

**HTML Template:**

```html
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>My Feature - Doc Writer</title>
  
  <!-- ALWAYS in this order -->
  <link rel="stylesheet" href="/theme.css">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/headers.css">
  <link rel="stylesheet" href="/my-feature.css">
</head>
<body>
  <%- include('partials/theme-init') %>
  <%- include('partials/sidebar') %>
  
  <header class="header">
    <span class="header-title">My Feature</span>
    <%- include('partials/header-controls') %>
  </header>
  
  <main class="my-feature-content">
    <!-- Feature content here -->
  </main>
</body>
</html>
```

## 🔧 Build Process

CSS-filer kopieras från `src/` till `dist/` via npm script:

```json
"copy-assets": "cp src/theme.css dist/theme.css && 
                cp src/styles.css dist/styles.css && 
                cp src/editor.css dist/editor.css && 
                cp src/chat.css dist/chat.css && 
                ..."
```

**Viktigt:** När du skapar nytt CSS, lägg till det i `package.json` → `copy-assets` script.

## 📚 Relaterad Dokumentation

- `src/theme.css` - Alla theme tokens
- `src/styles.css` - Base application styles
- `src/views/layout.ejs` - Standard page layout template
- `package.json` - Build scripts

## 🎨 Light/Dark Mode

Theme switcher finns i `src/views/partials/theme-init.ejs`:

```javascript
// Detect saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.body.classList.toggle('light-mode', 
  savedTheme === 'light' || (!savedTheme && !prefersDark)
);
```

Toggle via header controls → Theme button.
