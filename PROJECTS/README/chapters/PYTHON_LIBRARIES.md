# Python Libraries - Quick Reference Guide

## Module Organization

```
scripts/
├── library_config.py      # Configuration management
├── library.py             # READ operations (queries)
├── library_commands.py    # WRITE operations (commands)
├── books_services.py      # Business logic (being refactored)
├── cli.py                 # CLI interface
├── generate_pdf.py        # PDF generation
└── ... other scripts
```

## When to Use Each Module

### library_config.py
Use for **environment variables and configuration**:
```python
from library_config import Config

Config.ensure_dotenv_loaded()
bookshelf = Config.get_bookshelf_path()
current_book = Config.get_current_book_path_from_env()
```

### library.py
Use for **reading data**:
```python
from library import (
    get_bookshelf_folder,
    get_current_book_path,
    read_chapter_structure,
    read_chapter_markdown,
    list_chapters,
    list_books,
    get_book_title
)

chapters = list_chapters()
content = read_chapter_markdown("chapter-id")
title = get_book_title()
```

### library_commands.py
Use for **writing/modifying data**:
```python
from library_commands import (
    create_book,
    validate_and_fix_chapter_structure,
    write_chapter_file,
    update_chapter_structure,
    save_book_metadata,
    repair_all_books
)

create_book("my-book-slug")
validate_and_fix_chapter_structure("my-book-slug")
repair_all_books()
```

## Common Patterns

### Reading Chapter Data
```python
from library import read_chapter_file, read_chapter_markdown

# Read metadata
metadata = read_chapter_file("chapter-id", format="json")

# Read content
markdown = read_chapter_markdown("chapter-id")
```

### Creating a New Chapter
```python
from library_commands import write_chapter_file, update_chapter_structure
from library import list_chapters, read_chapter_structure

# Get current chapters
chapters = list_chapters()

# Add new chapter
new_chapter = {
    "id": "new-chapter",
    "title": "New Chapter",
    "order": len(chapters) + 1
}
chapters.append(new_chapter)

# Save structure
update_chapter_structure(chapters)

# Write chapter files
write_chapter_file("new-chapter", {
    "slug": "new-chapter",
    "status": "draft"
}, format="json")
```

### Validating and Repairing Books
```python
from library_commands import validate_and_fix_chapter_structure
from library import list_books

# Repair single book
is_valid, message = validate_and_fix_chapter_structure("book-slug")

# Repair all books
results = repair_all_books()
print(f"Fixed {results['fixed']} of {results['total']} books")
```

### Listing Available Books
```python
from library import list_books, get_book_title

books = list_books()
for book in books:
    title = get_book_title(book)
    print(f"{book}: {title}")
```

## Error Handling

All functions may raise exceptions. Common patterns:

```python
from library import read_chapter_structure

try:
    structure = read_chapter_structure()
except Exception as e:
    print(f"Error reading chapters: {e}")
```

## Backward Compatibility

Old code will still work through wrapper functions in library_config.py:

```python
# Old way (still works)
from library_config import get_bookshelf_folder
bookshelf = get_bookshelf_folder()

# New way (recommended)
from library_config import Config
bookshelf = Config.get_bookshelf_path()
```

## File Structure on Disk

```
REPOSITORY/
├── book_structure.json             # (optional) overall structure
├── book1/
│   ├── book.json                   # Book metadata
│   ├── chapter_structure.json      # All chapters and order
│   ├── chapters/
│   │   ├── chapter-id.md           # Chapter content
│   │   └── chapter-id.json         # Chapter metadata
│   ├── material/
│   ├── research/
│   └── editions/
└── book2/
    └── ... (same structure)
```

## Configuration

Set in `.env`:
```bash
REPOSITORY_PATH=/path/to/bookshelf
IMPORT_DIR=./import
```

Defaults:
- REPOSITORY_PATH: `./REPOSITORY`
- IMPORT_DIR: `./import`

Access via:
```python
from library_config import Config

bookshelf = Config.get_bookshelf_path()
import_dir = Config.get_import_dir()
```
