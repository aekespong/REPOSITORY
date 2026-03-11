# State management for agenter

> Chapter-ID: state-management
> Status: draft

## Problemet

AI-agenter ar stateless - de har inget minne mellan anrop. For att mojliggora sammanhangande arbete over tid behovs en extern state-mekanism.

## Losning: JSON-statusfiler

Varje kapitel har en tillhorande `{id}.json` som fungerar som state-fil:

- **Boolean flags** - Checklist-items som `outline_complete`, `fact_checked`
- **Versionshistorik** - Array med timestamps och beskrivningar
- **Notes** - Fritext for att kommunicera mellan agenter
- **Status** - Overordnat tillstand (draft, review, complete)

## Fordel med filbaserad state

- Versioneras med git
- Lasbar for bade manniskor och maskiner
- Ingen databas behovs
- Naturlig integration med file watchers
