## Plan: Add Chat History Listing to Sidebar

Add a chat history feature in the sidebar that lists previous chat sessions stored as `chat_{YYYY_MM_DD}.md` files in `chats/` folders across the REPOSITORY. The presentation will mirror the Books tab structure and use the directory walking pattern from PLANS under ACTIONS.

### Context

**Example chat file**: `REPOSITORY/PROJECTS/business-and-policy-driven-development/chats/chat_2026-03-19.md`

**Current sidebar tabs**:
1. Books tab (leftmost) - shows books grouped with chapters nested
2. Actions tab - dynamically loads action items such as PLANS, RESEARCH, MATERIAL from the directory structure in REPOSITORY. The same directory walking pattern is used to find `chat_*.md` files for the new Chat tab.
3. Chat tab - currently navigates to /chat page with no listing and the listing in the sidebar needs to be implemented in this plan and its tasks.

**Requirements**:
- List all chat files from `chats/` folders under any book in REPOSITORY
- Extract title from first `#` line in markdown (similar to chapter title extraction)
- Group by book/path with book as heading
- Show date and title for each chat. Fetch title from markdown content (first `#` line) and date from filename (`chat_YYYY_MM_DD.md`)
- Clicking a chat item should navigate to `/chat?file={path}` to load that specific chat file in the chat interface
- Similar presentation to chapter list (Books tab structure) and PLANS listing (directory walking pattern). For each file count the lines and show metadata (created date, line count) in the sidebar and title in the top level of the sidebar and contents in the main area when clicked. It is a markdown file and should be rendered in a similar way as View in the chapter view.

### Architecture References

**Pattern 1: Chapter Listing (Books Tab)**
- File: `src/views/partials/sidebar.ejs` lines 74-132
- Structure: Books as top-level items, chapters nested under active book
- Display: Title, metadata (created date, line count, last updated)
- Navigation: Click to load `/repo/{root}/{bookSlug}/{chapterId}`

**Pattern 2: Directory Walking (PLANS)**
- File: `src/controllers/planner.controller.ts`
- Function: `listRepositoryWideFiles()` lines 340-430
- Process:
  1. Walks REPOSITORY directory structure recursively
  2. Looks for target folders (e.g., 'plans', 'research', 'material')
  3. Collects .md files from matching folders
  4. Extracts heading via `extractFirstHeading()` function (lines 235-250)
  5. Groups results by source/book
- Returns: Array with {book, dir, filename, heading, path, snippet, source}

**Pattern 3: Title Extraction**
- Function: `extractFirstHeading(filePath)` in planner.controller.ts lines 235-250
- Logic:
  1. Read file content
  2. Find first line starting with `#`
  3. Extract text after `#` and trim
  4. Fallback to filename without extension

**Pattern 4: Actions Tab Dynamic Loading**
- File: `src/views/partials/sidebar.ejs` lines 23-64
- JavaScript fetches from `/api/actions`
- Renders navigation list dynamically
- Pattern: fetch → renderNav → populate HTML

### Implementation Steps

**Phase 1: Backend - API Endpoint**

1. Create API endpoint `/api/chat-history` in `src/controllers/chat.controller.ts`
   - *depends on nothing*
   - Walk REPOSITORY directory structure (all roots: BOOKS, PROJECTS, DOCS, etc.)
   - Look for `chats/` folders at any level
   - Collect `chat_*.md` files
   - Extract title using `extractFirstHeading()` pattern
   - Parse date from filename `chat_YYYY_MM_DD.md`
   - Group by book path
   - Return JSON: `{ chats: [{ book, bookTitle, path, filename, title, date, dateFormatted }] }`

2. Add route in `src/routes/chat.routes.ts`
   - *depends on step 1*
   - `router.get('/api/chat-history', ctrl.getChatHistory)`

**Phase 2: Frontend - Sidebar UI**

3. Update `src/views/partials/sidebar.ejs`
   - *depends on step 2*
   - Add chat list container in `<div id="tab-chat">` (currently empty except header)
   - Structure similar to Books tab:
     ```html
     <nav class="chapter-tree">
       <ul id="chat-history-list">
         <!-- Populated by JavaScript -->
       </ul>
     </nav>
     ```
   - Add `<script>` block to fetch and render chat history
   - Render pattern: Book headings with chat list nested below
   - Each chat item shows: title, date, metadata

4. Style chat list in `src/chat.css` or create `src/sidebar-chat.css`
   - *parallel with step 3*
   - Reuse existing classes: `.chapter-tree`, `.chapter-link`, `.chapter-link-title`, `.chapter-link-meta`
   - Add specific classes if needed: `.chat-item`, `.chat-date`

**Phase 3: Navigation & Chat Loading**

5. Update chat page to accept query parameter `/chat?file={path}`
   - *depends on steps 1-3*
   - Modify `src/controllers/chat.controller.ts` `getChatPage()`
   - Read chat file if `file` parameter provided
   - Parse chat content and display in chat interface
   - Alternatively: Load chat content via API and display client-side

6. Handle click events in sidebar
   - *depends on step 5*
   - Add click handler to chat list items
   - Navigate to `/chat?file={relPath}` or load content dynamically
   - Update active state in sidebar

**Phase 4: Build & Verification**

7. Update `package.json` copy-assets if new CSS created
   - *depends on step 4 if new CSS file*
   - Add to copy-assets script if `sidebar-chat.css` created

8. Testing
   - *depends on steps 1-6*
   - Verify API endpoint returns correct chat list
   - Test sidebar rendering with multiple books
   - Test navigation to specific chat files
   - Verify title extraction from markdown
   - Test with missing chats/ folders (should not error)

### Relevant Files

**Backend**:
- `src/controllers/chat.controller.ts` — Add `getChatHistory()` API endpoint and update `getChatPage()` to load chat files
- `src/routes/chat.routes.ts` — Add `router.get('/api/chat-history', ...)`
- `src/controllers/planner.controller.ts` — Reference `extractFirstHeading()` function for title extraction pattern (lines 235-250)

**Frontend**:
- `src/views/partials/sidebar.ejs` — Update `<div id="tab-chat">` section (currently lines 23-64 show actions pattern)
- `src/views/chat.ejs` — Update to accept and display chat file content
- `src/chat.css` or new `src/sidebar-chat.css` — Style chat history list
- `src/public/sidebar-modules.js` — May need to update tab switching logic if loading chat content client-side

**Build**:
- `package.json` — Update copy-assets script if new CSS file created

### Verification

**Automated**:
1. Run build: `./start.sh` to compile TypeScript and copy assets
2. Test API: `curl http://localhost:3000/api/chat-history` should return chat list JSON
3. Check console for errors during sidebar JavaScript execution

**Manual**:
1. Navigate to any page with sidebar
2. Click Chat tab in sidebar
3. Verify chat history list appears grouped by book
4. Click a chat item
5. Verify chat content loads in main area or navigates to /chat?file=...
6. Verify title extracted correctly from markdown `#` line
7. Verify date formatted properly from filename
8. Test with books that have no chats/ folder (should show empty or no entry)

### Decisions

**Title Extraction**: Use same pattern as PLANS - `extractFirstHeading()` function that reads first `#` line
**Grouping**: By book path (similar to PLANS grouping by source)
**Navigation**: Navigate to `/chat?file={relPath}` to load specific chat file
**File Pattern**: Only match `chat_YYYY_MM_DD.md` format (ignore other .md files in chats/)
**Date Display**: Format YYYY-MM-DD from filename, optionally add relative time (e.g., "3 days ago")
**Styling**: Reuse existing `.chapter-tree`, `.chapter-link` classes for consistency

### Further Considerations

1. **Empty State**: What to show when no chat files exist?
   - Recommendation: Show friendly message "No chat history yet. Start a conversation!"

2. **Date Parsing**: Should we extract dates from file content or rely on filename?
   - Recommendation: Use filename for consistency and performance (avoid reading all files)
   - Enhancement: Could show "Last modified" from file stat if available

3. **Search/Filter**: Should chat history be searchable?
   - Recommendation: Phase 2 enhancement - add search input above list (not in initial implementation)

4. **Active State**: Should clicking a chat mark it active in sidebar?
   - Recommendation: Yes, similar to active chapter highlighting

### Next Steps

After approval:
1. Implement Phase 1 (Backend API)
2. Implement Phase 2 (Sidebar UI)
3. Implement Phase 3 (Navigation)
4. Run verification steps
5. Test and iterate
