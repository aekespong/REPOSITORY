# Git for REPOSISTORY

Your local REPOSITORY has 4 commits that aren't on the remote, and the remote has 200 that you don't have. You need to decide how to reconcile them.

  The safest option is rebase (replays your 4 local commits on top of the remote's 200):

  git -C /home/andre/projects/gw/REPOSITORY pull --rebase

  If you'd rather just merge them:

  git -C /home/andre/projects/gw/REPOSITORY pull --no-rebase

  Which 4 commits do you have locally that differ? You can check with:

  git -C /home/andre/projects/gw/REPOSITORY log origin/master..HEAD --oneline

# Git workflow for my-changes

## Branch layout

```
main          → always mirrors upstream (origin/main), never commit here
my-changes    → your personal commits on top of main
```

You run the service from `my-changes`. The `main` branch is only used to pull upstream updates.

## Updating from upstream

```bash
git checkout main
git pull
git checkout my-changes
git rebase main
```

If no conflicts: done. Your commits are now replayed on top of the latest main.

## Resolving conflicts during rebase

When `git rebase main` hits a conflict, it stops and tells you:

```
CONFLICT (content): Merge conflict in src/index.ts
error: could not apply 7cb2ce8... feat: add Gmail, Calendar integrations
```

### Step 1: See which files have conflicts

```bash
git status
```

Files marked `both modified:` have conflicts.

### Step 2: Open the file and find conflict markers

Conflicts look like this:

```
<<<<<<< HEAD
// upstream's version of this code
=======
// your version of this code
>>>>>>> feat: add Gmail, Calendar integrations
```

- **Above `=======`** is the upstream version (what's in main)
- **Below `=======`** is your version (from your commit)

### Step 3: Resolve

Edit the file to keep what you want. Delete all three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`). You can:

- Keep your version only
- Keep upstream's version only
- Combine both (most common — upstream added something, you added something else)

### Step 4: Mark resolved and continue

```bash
git add src/index.ts          # mark this file as resolved
git rebase --continue         # move on to the next commit
```

If the next commit also has conflicts, repeat steps 1-4. If you want to abort and go back to how things were before the rebase:

```bash
git rebase --abort
```

## Example: typical conflict

Upstream added a new function to `src/db.ts`. You also added cost tracking functions in the same area. After rebase:

```
<<<<<<< HEAD
export function newUpstreamFunction(): void {
  // ...
}
=======
export function storeCost(record: CostRecord): void {
  // ...
}
>>>>>>> feat: add cost tracking
```

Resolution — keep both:

```
export function newUpstreamFunction(): void {
  // ...
}

export function storeCost(record: CostRecord): void {
  // ...
}
```

Then: `git add src/db.ts && git rebase --continue`

## Tips

- Rebase replays your commits one at a time, so conflicts are small and scoped to one commit
- If a rebase goes badly wrong: `git rebase --abort` gets you back to where you started
- After a successful rebase, rebuild and restart:
  ```bash
  ./container/build.sh && npm run build && systemctl --user restart nanoclaw.service
  ```
- Never commit directly to `main` — that makes pulling upstream messy
