# ⚙️ 4. PR-pipeline (konkret flöde)

När någon öppnar en PR:

###  1. Parsea innehållet

-  Kod
-  Markdown
-  Referenser (REQ, POL, ADR)

###  2. Bygg en “context graph”

-  Vad påverkas?
-  Vilka policies gäller?
-  Vilka beslut är relevanta?

###  3. Kör AI-analyser

-  Prompta med:

  -diff
  -relevanta policies
  -arkitekturplan
  -relaterade ADR:er

###  4. Kommentera PR automatiskt

Exempel:

\>❗ Bryter mot POL-SEC-01: Ingen autentisering i endpoint X
\>
\>⚠️ REQ-123 saknar test
\>
\>💡 Liknar redan lösning i project-b (risk för duplicering)

---
