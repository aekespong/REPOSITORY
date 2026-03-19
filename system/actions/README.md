# Actions Directory

This directory contains reusable action definitions for book and project workflows.

## Purpose

Actions are workflow automation scripts or configurations that can be:
- Triggered by events (chapter updates, git commits, etc.)
- Executed manually via CLI or web interface
- Shared across books/projects or customized per workspace

## Structure

Similar to prompts, actions follow a hierarchy:

1. **Global actions** - `REPOSITORY/actions/` (this directory)
2. **Book-specific actions** - `REPOSITORY/BOOKS/{book-slug}/actions/`
3. **Project-specific actions** - `REPOSITORY/PROJECTS/{project-slug}/actions/`

Book/project-specific actions override global actions with the same name.

## Example Actions

- **validate_chapters.yml** - Validate all chapters have required metadata
- **generate_toc.yml** - Auto-generate table of contents
- **export_pdf.yml** - Export book to PDF with specific styling
- **lint_content.yml** - Check content for style guide compliance
- **sync_metadata.yml** - Sync chapter metadata to database

## Usage

Actions can be invoked via:
- CLI: `python cli.py action run <action-name>`
- API: `POST /api/actions/run` with action name
- Automatic triggers (future implementation)

## Format

Actions can be defined as:
- YAML configuration files (`.yml`)
- Shell scripts (`.sh`)
- Python scripts (`.py`)
- JSON workflow definitions (`.json`)

Choose the format that best suits the action's complexity and your workflow.
