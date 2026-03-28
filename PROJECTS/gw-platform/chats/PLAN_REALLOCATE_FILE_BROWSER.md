## Plan: Relocate Files Explorer to /browse and Add Chat Tab

**TL;DR:** Move the VS Code-style file tree browser from the sidebar Files tab to the /browse page, replacing the existing miller columns layout. Keep file editing intact. Convert the sidebar Files tab to a Chat placeholder.

**Steps**

### Phase 1: Extract & Prepare Tree Component (_parallel tasks_)

1a. **Create browse-tree.js module** (_parallel with 1b_)

- Copy FileBrowserManager class from sidebar-modules.js (lines 328-740)
- Rename to BrowseTreeManager
- Remove tab-activation dependencies (init immediately, no TabManager needed)
- Modify selectFile() to always open inline editor, never navigate
- Export as standalone module for /browse pages

1b. **Document current miller implementation** (_parallel with 1a_)

- List all file operations in browse-miller.js (save, preview, validate, trash, delete)
- Map editor pane UI elements (textarea, buttons, preview containers)
- Identify localStorage keys for column width preferences
- Note: All API endpoints remain unchanged

### Phase 2: Build New /browse Layout

2. **Create tree-based browse view** (_depends on 1a, 1b_)
   - Update browse.ejs to replace `miller-pane.ejs` include with new markup:
     ```html
     <div class="browse-main">
       <div class="browse-tree-container">
         <div class="fb-tree" id="browse-fb-tree"></div>
       </div>
       <div class="miller-divider"></div>
       <div class="editor-pane">
         <!-- keep existing editor markup from miller-pane -->
       </div>
     </div>
     ```
   - Load browse-tree.js instead of browse-miller.js
   - Initialize: `BrowseTreeManager.init('browse-fb-tree', initialPath, rootSlug)`
   - Keep root selector toolbar and breadcrumb display

3. **Wire tree to editor pane** (_depends on 2_)
   - In BrowseTreeManager.selectFile(): Call showEditor() function to populate editor pane
   - Extract showEditor(), showImage(), saveFile(), toggleMarkdownView() from browse-miller.js
   - Make them standalone functions called by tree click handler
   - Test: File selection → editor shows → save works

### Phase 3: Complete File Operations

4. **Implement all file actions in tree context** (_depends on 3_)
   - Copy from browse-miller.js → browse-tree.js:
     - Save button → POST /api/browse/save
     - Validate button (for .json) → POST /api/browse/validate-structure
     - Preview button (for .md) → markdown rendering
     - Delete button → POST /api/browse/trash
   - Wire keyboard shortcuts: Ctrl+S for save
   - Add visual feedback: save success toast, validation results panel

5. **Test all file types in tree UI** (_depends on 4_)
   - Text files (.md, .txt, .json) → Edit + save
   - Images → Preview display
   - HTML → Preview in iframe
   - Chapter files → Status JSON auto-update on save
   - Verify: browseSave() updates {chapter-id}.json timestamps

### Phase 4: Remove Miller Columns

6. **Delete miller column code** (_depends on 3, 4, 5_)
   - Delete src/public/browse-miller.js (MillerBrowser class)
   - Remove src/views/partials/miller-pane.ejs partial
   - Clean up CSS in browse.css:
     - Remove `.miller-columns`, `.miller-col` rules
     - Remove column selection/hover styles
     - Keep `.miller-divider` (reused for tree/editor split)
     - Keep toolbar, pills, editor-pane styles
   - Update browse.ejs: Remove miller script references

### Phase 5: Convert Sidebar Files Tab to Chat

7. **Replace Files tab with Chat placeholder** (_parallel with step 6_)
   - [src/views/partials/sidebar.ejs](src/views/partials/sidebar.ejs#L23):
     - Change button label: `<button class="sidebar-tab" data-tab="chat">Chat</button>`
   - [src/views/partials/sidebar.ejs](src/views/partials/sidebar.ejs#L131-L133):
     - Replace `#tab-files` content with:
       ```html
       <div class="sidebar-tab-content" id="tab-chat">
         <div class="chat-placeholder">
           <p style="padding:20px;text-align:center;color:var(--text-muted)">
             Chat (coming soon)
           </p>
         </div>
       </div>
       ```
   - [src/public/sidebar-modules.js](src/public/sidebar-modules.js#L740):
     - Comment out FileBrowserManager instantiation in initSidebar()
     - Or remove completely if fully moved to browse-tree.js

8. **Update navigation references** (_depends on 7_)
   - Search for "Files tab" references in UI/docs → update to "Chat"
   - Update any tooltips, help text, or keyboard shortcut hints
   - Add link to /browse from main menu or toolbar if not exists
   - Test: All tabs switch correctly, Chat shows placeholder

**Relevant files**

- [src/views/partials/sidebar.ejs](src/views/partials/sidebar.ejs#L131-L133) — sidebar Files tab with `fb-tree` div container
- [src/public/sidebar-modules.js](src/public/sidebar-modules.js#L328-L740) — FileBrowserManager class (explorer tree logic)
- [src/file_browser.css](src/file_browser.css) — explorer tree styles (rows, indentation, chevrons, icons)
- [src/views/browse.ejs](src/views/browse.ejs) — current browse view with miller columns
- [src/views/partials/miller-pane.ejs](src/views/partials/miller-pane.ejs) — miller columns + inline editor pane
- [src/public/browse-miller.js](src/public/browse-miller.js) — MillerBrowser class (column rendering, file operations)
- [src/routes/browse.routes.ts](src/routes/browse.routes.ts) — 15+ routes including /browse, /browse/:root, /api/browse/\*
- [src/controllers/browse.controller.ts](src/controllers/browse.controller.ts) — browseList, browseFile, browseSave, sync/validate structure
- [src/browse.css](src/browse.css) — miller columns styles, toolbar, pills

**Verification**

1. Files tab in sidebar shows "Chat" and is empty
2. /browse shows explorer-style tree on left
3. Clicking a file in /browse opens editor on right
4. Save, image view, markdown preview all work from /browse
5. Miller columns are completely removed
6. No console errors or broken links

**Decisions**

- Explorer tree on /browse will use the same `FileBrowserManager` component currently in sidebar → Extract to shared module `browse-tree.js`
- Edit pane layout in /browse: split view (tree left, editor right) similar to VS Code, reusing `.editor-pane` from miller system
- Miller columns code will be removed completely: delete `browse-miller.js`, remove `miller-pane.ejs` include, clean up miller CSS
- Chat tab is a placeholder only — no implementation in this phase
- File operations (save, validate, preview, delete) remain unchanged — same API endpoints work for tree-based UI

**Technical Details**

- **State management**: Tree state (expanded folders, selected file) uses localStorage with keys `expandedFolders:{root}` and `selectedFile:{root}` — already implemented in StorageManager
- **File click behavior**: In /browse context, always open inline editor in `.editor-pane` div (never navigate away like sidebar does)
- **API compatibility**: Tree uses same `/api/browse/list` and `/api/browse/file` endpoints as miller columns, no backend changes needed
- **CSS architecture**: Keep file_browser.css for tree styles, merge needed editor styles from browse.css, remove miller-specific rules
- **Module loading**: browse.ejs will load `browse-tree.js` instead of `browse-miller.js`, same initialization pattern: `BrowseTree.init(initialPath)`
- **Resizable divider**: Keep `.miller-divider` functionality for split resizing between tree and editor panes

**Further Considerations**

1. Should /browse have persistent state (remember last opened file)?
   - Recommendation: Yes, use localStorage to restore last path
2. Should the editor pane be collapsible/resizable?
   - Recommendation: Make it resizable with a draggable divider (already exists via `.miller-divider`)
