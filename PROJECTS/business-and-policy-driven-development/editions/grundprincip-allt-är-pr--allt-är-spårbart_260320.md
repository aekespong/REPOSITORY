# Grundprincip: Allt är PR + allt är spårbart

Du vill ha tre saker som hänger ihop:

-  \*\*Kod\*\* (implementation)
-  \*\*Krav / policies\*\* (vad ska uppfyllas)
-  \*\*Arkitekturbeslut / analyser\*\* (varför)

👉 Lösning: gör allt till \*\*förstaklass-artefakter i Git\*\*

###  Struktur (enkelt men kraftfullt)

```
/projects/  /project-a/    /spec/      requirements.md      constraints.md    /architecture/      decisions/        ADR-001.md    /code//enterprise/  /plans/    target-architecture.md  /policies/    security.md    integration.md  /reference-models/
```

---

# Länka ALLT – men med ID, inte bara text

Det är här många misslyckas.

###  Inför ett enkelt ID-system:

-  `REQ-123` → krav
-  `POL-SEC-01` → policy
-  `ADR-7` → arkitekturbeslut

###  Exempel i kod:

```
Python# Implements: REQ-123# Constrained by: POL-SEC-01
```

###  Exempel i spec:

```
Markdown## REQ-123 – User authenticationMust comply with POL-SEC-01
```

👉 Det här gör att AI + tooling faktiskt kan förstå relationerna.

---

# AI som “kritisk arkitekt” i varje PR

Vid varje PR ska du köra en pipeline som gör tre typer av analys:

---  

##  A. Compliance-check (hård)

-  Uppfyller koden policies?
-  Bryter något mot enterprise-plan?

Exempel:

-  “Denna PR bryter mot POL-INT-02 (ingen direktkoppling mellan system X och Y)”

---  

##  B. Consistency-check (logik)

-  Stämmer kod ↔ krav?
-  Saknas implementation för vissa krav?
-  Implementeras saker som INTE finns i krav?

---  

##  C. Arkitekturkritik (mjuk men viktig)

Här ska AI vara jobbig:

-  “Detta liknar en distributed monolith”
-  “Duplicerad logik jämfört med project-b”
-  “Bryter mot bounded context”

👉 Det här är där värdet verkligen finns.

---

# PR-pipeline (konkret flöde)

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

# Gör PLANS och SPEC maskinläsbara (detta är avgörande)

Om du bara har löptext → AI blir svajig.

###  Gör så här istället:

####  Policies (semi-strukturerade)

```
YAMLid: POL-SEC-01title: Authentication requiredrule: "All endpoints must require authentication"applies_to: ["api"]severity: "high"
```

####  Requirements

```
YAMLid: REQ-123description: User must loginlinked_policies:  - POL-SEC-01
```

👉 Nu kan du göra deterministiska + AI-baserade checks.

---

# GitHub som plattform (konkret implementation)

Du behöver:

###  GitHub Actions

-  triggas på PR
-  kör analys

###  AI-layer

-  t.ex. via:

  -OpenAI / lokala modeller
  -embeddings för att hitta relevanta docs

###  Kommentar-bot

-  skriver direkt i PR

---

# Minimera friktion (detta avgör om det funkar)

Om utvecklarna hatar det → det dör.

###  Gör detta:

-  Auto-suggest länkar (REQ/POL)
-  Generera PR-summary automatiskt
-  Föreslå förbättringar, inte bara klaga

---

# Viktiga risker (ärligt)

###  1. För mycket governance

→ folk workaroundar systemet

###  2. Dålig kvalitet på policies

→ AI ger skräp tillbaka

###  3. Falsk trygghet

→ AI säger “OK” men missar viktiga saker

👉 Lösning:

AI = \*\*assistent, inte domare\*\*

---

# Det riktigt intressanta (nästa nivå)

När detta funkar kan du:

###  🔍 Impact analysis

-  “Om vi ändrar denna policy – vilka system påverkas?”

###  🧠 Knowledge graph

-  hela arkitekturen blir sökbar

###  🔁 Auto-refactoring-förslag

-  “Flytta detta till shared service”

--- 

--- 

### ChatGPT**

Here is a **reformulated and translated version** with a more structured, professional tone while keeping your intent and sharpness:

---
