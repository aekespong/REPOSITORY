# Spec-driven workflow

> Chapter-ID: spec-driven-workflow
> Status: draft

## Principer

Spec-driven workflow for bokskrivande foljer samma monster som spec-driven software development:

1. **Hamta state** - Las kapitelstatus och metadata innan arbete paborjas
2. **Utfor uppgift** - Redigera innehall, uppdatera metadata
3. **Verifiera** - Automatisk validering via file watcher
4. **Skriv status** - Persistera resultat for kommande agenter

## Kapitelstatus som state machine

Varje kapitel gar igenom en definierad progression:

- `draft` - Forsta utkast
- `outline_complete` - Struktur och synopsis klar
- `review` - Redo for granskning
- `fact_checked` - Faktagranskad
- `complete` - Fardig for publicering
