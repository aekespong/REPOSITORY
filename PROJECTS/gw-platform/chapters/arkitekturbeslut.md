# Arkitekturbeslut

> Chapter-ID: arkitekturbeslut
> Status: draft

## ADR-001: TypeScript for webbserver

Webbservern implementeras i TypeScript med Express for att fa stark typning och bra IDE-stod.

## ADR-002: Python for CLI och content management

Python anvands for CLI-verktyg, Word-import och PDF-generering tack vare rika bibliotek som python-docx och weasyprint.

## ADR-003: Platt filstruktur for kapitel

Kapitel lagras som platta filer (id.md + id.json) istallet for nestade mappar. Detta forenklar sokning, versionering och AI-agentaccess.

## ADR-004: REPOSITORY med multipla rotmappar

REPOSITORY-strukturen stodjer flera rotmappar (BOOKS, PROJECTS) for att separera publicerat material fran pagaende arbete.
