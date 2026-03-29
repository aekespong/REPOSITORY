# Server functions and HTTP endpoints

This document lists functions and HTTP endpoints implemented in `src/server.ts`.

**Functions grouped by endpoint**

Below the functions are grouped roughly by the endpoints that use them. Functions used across multiple endpoints are listed under "Shared utilities".

**Index & Home (`/`, `/index`)**

- `getBook(): Chapter[]` — Read `chapter_structure.json` for the current book and return ordered chapter entries.
- `getBookTitle(): string` — Read the current book's `book.json` title.
- `getChapterMetadata(chapterId: string): { lastUpdated: string; status: string } | null` — Helper used when building the index to gather each chapter's last update/status.
- `generateIndexPage(chapters: Chapter[]): string` — (Legacy) Produce a standalone HTML index page string; not used when rendering via EJS but present in codebase.
- `generateSidebar(chapters: Chapter[], currentChapterId: string = ''): string` — Render the sidebar chapter tree used on index and other pages.
- `getResizableScript(): string` — Embed client-side JS used by index templates.

**Chapter routes (`/chapter/:id`, `/chapter/:id/images/:filename`)**

- `getChapterContent(chapterId: string): string` — Read raw markdown for a chapter (flat layout `{id}.md`).
- `markdownToHtml(md: string, chapterId: string = ''): ParsedMarkdown` — Convert markdown to HTML, extract blockquote metadata, and rewrite image URLs for the chapter context.
- `getChapterTitle(chapterId: string): string` — Read the chapter title from `chapter_structure.json`.
- `getFormattedChapterTitle(chapterId: string): string` — Return title prefixed with order number for headings and views.
- `getChapterVersions(chapterId: string): Array<{ timestamp: string; message: string }>` — Read versions array from chapter's status file when showing chapter history.
- `getCurrentBookSlug(chapterId: string): string` — Resolve the book slug for editor links and HTML links.

**Books management (`/books/*`, `/books/select`)**

- `findBookForChapter(chapterId: string): string` — Utility to find which book contains a given chapter id when slug resolution is needed.
- `getBookTitle(): string` — Also used across books endpoints to display the selected book title.
- `getAllVersions(): Array<{ chapter: string; chapterId: string; timestamp: string; message: string }>` — Aggregates versions across chapters (used by global views like versions list).

**Versions (`/versions`, `/versions/:id`)**

- `getChapterVersions(chapterId: string): Array<{ timestamp: string; message: string }>` — Per-chapter versions for details view.
- `getAllVersions(): Array<{ chapter: string; chapterId: string; timestamp: string; message: string }>` — Flattened list for site-wide version feeds.
- `formatRelativeTime(timestamp: string): string` — Format timestamps for versions lists.

**Tags & Meta (`/tags`, `/tags/:tagName`, `/meta/:slug`)**

- `getAllTags(): TagData[]` — Collect tags from chapters' meta files and group chapters by tag.
- `getFormattedChapterTitle(chapterId: string): string` — Used to show human-friendly chapter names alongside tag occurrences.

**PDF & HTML (`/pdf*`, `/html*`)**

- `getPdfFiles(): Array<{ name: string; size: number; sizeFormatted: string; dateModified: Date; dateFormatted: string }>` — List PDFs available in `REPOSITORY/generated/`.
- `getHtmlFiles(dir: string, baseDir: string): any[]` — Recursively discover HTML files under `REPOSITORY/generated/html` (used to present grouped HTML outputs).
- `getCurrentBookSlug(chapterId: string): string` — Used by the `/html` redirect to determine the current book slug.
- `formatFileSize(bytes: number): string` — Utility used when rendering file lists for PDFs and HTML outputs.
- `formatRelativeDate(date: Date): string` — Human-friendly relative date string for file listings.

**Editor (`/edit`, `/edit/save`, `/edit/preview`)**

- `markdownToHtml(md: string, chapterId: string = ''): ParsedMarkdown` — Used for on-server preview in the editor and to render preview HTML.
- `getResizableScript(): string` — Embed editor-specific client JS.
- `readStatus(chapterId: string): any | null` — Used when updating or syncing status info after save.

**Static assets & misc views (styles, images, favicon)**

- `getCommonStyles(): string` — Return `<link>` tag for `/styles.css`.
- `getResizableScript(): string` — Client-side JS included across many views.

**Shared utilities (used across multiple endpoints)**

- `readStatus(chapterId: string): any | null` — Read and parse a chapter's status JSON file if present.
- `findStatusPath(chapterId: string): string | null` — Resolve a chapter's flat `*.json` path (supports flat layout).
- `truncateWithEllipsis(text: string): string` — Truncate very long titles for sidebar display.
- `timeSinceDate(dateStr: string): string` — Compact relative-time string used in some lists and summaries.
- `formatRelativeTime(timestamp: string): string` — Human-friendly relative timestamp formatting (used by versions and metadata).
- `formatRelativeDate(date: Date): string` — Alternative relative-date formatter for file lists.
- `formatFileSize(bytes: number): string` — Human readable file size.

***

**HTTP Endpoints** (alphabetical by path)

- `GET /` : Redirects to `/index`.
- `GET /index` : Render the index page (`views/index.ejs`) listing chapters. Query params: `sortBy` (title|updated|order), `order` (asc|desc).
- `GET /styles.css` : Serve bundled `styles.css` from `src/views` directory.
- `GET /dist/pdf.css` : Serve `pdf.css` for PDF styling.
- `GET /dist/images/:filename` : Serve static image from `public/dist/images/:filename` (directory-traversal protected).
- `GET /dist/images/:chapter/:filename` : Serve static image from `public/dist/images/:chapter/:filename` (directory-traversal protected).
- `GET /chapter/:id` : Render a chapter page (`views/chapter.ejs`). Path param: `id` (chapter id). Reads markdown, metadata, status, prev/next chapters.
- `GET /chapter/:id/images/:filename` : Serve chapter images supporting flat layout conventions; path params: `id`, `filename`.
- `GET /favicon.ico` : Serve `favicon.ico` if present.
- `GET /books/titles` : Return JSON listing available books with `slug`, `title`, `chapterCount`, `lastUpdated`. Uses a registry file or scans `REPOSITORY`.
- `GET /books/registry` : Return the central `folders.json` registry as JSON.
- `GET /books/current` : Return JSON with the currently selected book info read (slug, paths, title, created_at).
- `GET /books/select` : Render the book selection UI (`views/select.ejs`).
- `POST /books/select` : Change the current book. Body or query: `slug` (book directory). Validates existence.
- `GET /versions` : Render versions summary (`views/versions.ejs`) with counts and last-update per chapter. Query params: `sortBy`, `order`.
- `GET /versions/:id` : Render version detail for a chapter. Path param: `id` (chapter id). Query params: `sortBy`, `order`.
- `GET /status` : Render the book status overview (`views/status.ejs`).
- `GET /edit/structure/:slug` : Render structure editor page (`views/book_structure.ejs`).
- `POST /api/edit/structure/update` : Accept JSON body `{ chapters, idChanges, slug }` to update `chapter_structure.json`. Returns `{ success }`.
- `GET /tags` : Render tags index page (`views/tags.ejs`).
- `GET /tags/:tagName` : Render occurrences for a tag. Path param: `tagName` (URL-encoded). Searches chapter text (flat layout).
- `GET /meta/:slug` : Render meta page (`views/meta.ejs`) for a slug (`REPOSITORY/:slug/meta.json`). Path param: `slug`.
- `GET /pdf` : Render PDF listing page (`views/print.ejs`) showing PDFs from `REPOSITORY/generated/`.
- `GET /pdf-view/:filename` : Serve a PDF inline for browser viewing. Path param: `filename` (URL-decoded). Directory-traversal protected.
- `GET /pdf-download/:filename` : Serve a PDF as an attachment for download. Path param: `filename`.
- `POST /pdf-delete/:filename` : Delete a PDF file from `REPOSITORY/generated/`. Path param: `filename`.
- `GET /html` : Redirect to `/html/:bookSlug/book.html` for the current book (requires `REPOSITORY/generated/html` to exist).
- `GET /html/:slug/:filename` : Serve a specific HTML file from `REPOSITORY/generated/html/:slug/:filename` (directory-traversal protected).
- `GET /edit` : Render the chapter editor (`views/chapter-editor.ejs`). Query params: `book` (book slug), `file` (filename). Requires both params.
- `POST /edit/save` : Save edited chapter content. Body: `{ content, book, chapterPath }`. Validates path under `REPOSITORY` and writes file; updates chapter_structure.json title and timestamp.
- `POST /edit/preview` : Return HTML preview for supplied markdown. Body: `{ content }` → `{ htmlContent }`.
