# Prompts and Actions Directory Migration

## Summary

Moved `/prompts` directory to `REPOSITORY/system/prompts` and `/actions` directory to `REPOSITORY/system/actions`. Updated all code references to use `.env` REPOSITORY_PATH configuration.

## Changes Made

### 1. Directory Move

- **Prompts From:** `/home/andre/projects/gw/REPOSITORY/prompts/`
- **Prompts To:** `/home/andre/projects/gw/REPOSITORY/system/prompts/`
- **Actions From:** `/home/andre/projects/gw/REPOSITORY/actions/`
- **Actions To:** `/home/andre/projects/gw/REPOSITORY/system/actions/`

### 2. Code Updates

#### TypeScript - llm.controller.ts

**Updated `loadPrompt()` function:**

- **Before:** Checked 3 locations: book-specific, REPO_ROOT_PATH/prompts, process.cwd()/prompts
- **After:** Checks 2 locations: book-specific, REPOSITORY_PATH/system/prompts
- **Logic:**
  1. First tries book-specific: `{REPO_ROOT_PATH}/{book}/prompts/{filename}`
  2. Then tries global: `{REPOSITORY_PATH}/system/prompts/{filename}`
  3. Returns fallback if not found

```typescript
// New implementation uses REPOSITORY_PATH from .env
const repositoryPath =
  process.env.REPOSITORY_PATH || path.join(process.cwd(), "REPOSITORY");
const globalPromptPath = path.join(
  repositoryPath,
  "system",
  "prompts",
  filename,
);
```

#### TypeScript - planner.controller.ts

**Updated global prompts listing:**

- **Before:** `path.join(REPO_ROOT_PATH, 'prompts')` → pointed to `REPOSITORY/BOOKS/prompts/`
- **After:** `path.join(repositoryPath, 'system', 'prompts')` → points to `REPOSITORY/system/prompts/`
- **Path output:** Changed from `BOOKS/prompts/${filename}` to `system/prompts/${filename}`

### 3. Documentation Updates

#### CLAUDE.md

Updated directory structure to show:

```
REPOSITORY/
├── prompts/                    # Global LLM prompts
│   ├── prompt_analyze_meta.md
│   ├── prompt_org_tasks.md
│   ├── prompt_tasks.md
│   ├── prompt_modify.md
│   └── prompt_chat.md
├── {book-slug}/
│   ├── book.json
│   ├── chapters.json
│   ├── chapters/
│   └── prompts/                # [Optional] Book-specific overrides
```

## Prompt Hierarchy

The system now follows a clear hierarchy for prompt resolution:

1. **Book-specific prompts** (highest priority)
   - Location: `REPOSITORY/BOOKS/{book-slug}/prompts/{filename}`
   - Use case: Book-specific customizations, different tone/style per book
   - Example: `REPOSITORY/BOOKS/my-book/prompts/prompt_modify.md`

2. **Global prompts** (fallback)
   - Location: `REPOSITORY/system/prompts/{filename}`
   - Use case: Default prompts used across all books
   - Example: `REPOSITORY/system/prompts/prompt_modify.md`

3. **Hardcoded fallback** (last resort)
   - Provided as function parameter in code
   - Only used if file not found in either location

## Environment Configuration

The prompts system now relies on `.env` configuration:

```bash
# .env
REPOSITORY_PATH="/home/andre/projects/gw/REPOSITORY"
REPO_ROOT="BOOKS"
```

- `REPOSITORY_PATH` - Root directory containing prompts/ and other top-level folders
- `REPO_ROOT` - Active folder within REPOSITORY (BOOKS, PROJECTS, CODE, etc.)

## Available Prompts

### Global Prompts (REPOSITORY/system/prompts/)

1. **prompt_analyze_meta.md** - Meta analysis of chapter content
   - Used by: `/edit/analyze-llm`, `/edit/analyze-llm-stream`
   - Purpose: Analyze chapter structure, themes, improvements

2. **prompt_org_tasks.md** - Organization tasks generation
   - Used by: `/edit/analyze-org-tasks`, `/edit/analyze-org-tasks-stream`
   - Purpose: Generate structural and organizational improvements

3. **prompt_tasks.md** - Edit tasks generation
   - Used by: `/edit/analyze-edit-tasks`, `/edit/analyze-edit-tasks-stream`
   - Purpose: Generate specific content editing tasks

4. **prompt_modify.md** - Apply modifications to text
   - Used by: `/edit/run-changes`, `/edit/run-changes-stream`
   - Purpose: Execute selected editing tasks on chapter text

5. **prompt_chat.md** (NEW) - Interactive chat with editor
   - Used by: `/edit/chat-stream`
   - Purpose: Interactive Q&A and collaborative editing

## Git Status

Since `REPOSITORY/` is in `.gitignore`, the new prompts location is **not tracked by git**. The old `/prompts/` directory shows as deleted in git.

**Git changes:**

```
D prompts/prompt_analyze_meta.md
D prompts/prompt_modify.md
D prompts/prompt_org_tasks.md
D prompts/prompt_tasks.md
```

The new `REPOSITORY/system/prompts/` and `REPOSITORY/system/actions/` files are ignored (by design).

## Testing

### Verified:

- ✅ TypeScript compilation succeeds
- ✅ All prompt files moved successfully
- ✅ New `prompt_chat.md` created
- ✅ Code updated to use REPOSITORY_PATH
- ✅ Planner controller updated for global prompts listing

### To Test:

- [ ] Start server and verify LLM endpoints can load prompts
- [ ] Test book-specific prompt override functionality
- [ ] Verify planner page shows global prompts correctly
- [ ] Test each LLM endpoint (analyze, tasks, modify, chat)

## Migration Commands

If you need to replicate this migration:

```bash
# Move directories
mv /home/andre/projects/gw/REPOSITORY/prompts /home/andre/projects/gw/REPOSITORY/system/prompts
mv /home/andre/projects/gw/REPOSITORY/actions /home/andre/projects/gw/REPOSITORY/system/actions

# Verify
ls -la /home/andre/projects/gw/REPOSITORY/system/

# Rebuild
npm run build
```

## Rollback (if needed)

```bash
# Move back
mv /home/andre/projects/gw/REPOSITORY/system/prompts /home/andre/projects/gw/REPOSITORY/prompts
mv /home/andre/projects/gw/REPOSITORY/system/actions /home/andre/projects/gw/REPOSITORY/actions

# Revert code changes
git checkout src/controllers/llm.controller.ts
git checkout src/controllers/planner.controller.ts
git checkout CLAUDE.md

# Rebuild
npm run build
```

## Impact

- **Python code:** No changes needed (doesn't use prompts directly)
- **TypeScript server:** Updated to use new location
- **Development workflow:** No impact, .env already configured
- **Deployment:** Ensure REPOSITORY_PATH is set correctly in production .env

## Date

Migration completed: 2025-03-10
