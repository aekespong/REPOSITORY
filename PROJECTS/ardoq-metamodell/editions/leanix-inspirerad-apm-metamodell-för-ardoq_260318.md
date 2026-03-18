# LeanIX-inspirerad APM-metamodell för Ardoq 

## Designprinciper

LeanIX bygger på konceptet **Fact Sheets** — enkla, väldefinierade korttyper med tydliga relationer. SAP LeanIX rekommenderar att hålla sig nära standardmodellen, enkel och icke-komplex, eftersom fler Fact Sheet-typer ökar arkitekturens komplexitet och försvårar förståelsen i organisationen. [SAP Learning](https://learning.sap.com/courses/getting-started-with-your-sap-leanix-onboarding/sap-leanix-meta-model) Samma princip bör vägleda Ardoq-implementationen.

En tumregel är att en publik kan förstå en arkitekturmodell med upp till 15 komponenttyper — håll antalet nere. [Ardoq](https://help.ardoq.com/en/articles/43971-seven-principles-for-creating-a-great-enterprise-architecture-metamodel)

## Föreslagna komponenttyper (Workspaces)

Jag föreslår **tre workspaces** med tydliga ansvarsområden:

### Workspace 1 — Application Portfolio _(kärnan)_

| Komponenttyp | LeanIX-motsvarighet | Beskrivning |
| --- | --- | --- |
| **Application** | Application | En affärsapplikation med tydligt ägarskap |
| **Application Module** | (subtyp) | Delsystem / modul inom en applikation |
| **Interface** | Interface | Integrationspunkt mellan två applikationer |

**Nyckelattribut på Application:**

- Lifecycle (Active / Phase-out / End of Life)

- Business Criticality (Low / Medium / High / Mission Critical)

- Functional Fit & Technical Fit (enkel 1–4 skala)

- TIME-klassificering (Tolerate / Invest / Migrate / Eliminate)

- Owner (person/org-enhet)

- Hosting-typ (On-premise / SaaS / IaaS / PaaS)

### Workspace 2 — Business Architecture

| Komponenttyp | LeanIX-motsvarighet | Beskrivning |
| --- | --- | --- |
| **Business Capability** | Business Capability | Vad verksamheten gör (oberoende av hur) |
| **Organizational Unit** | UserGroup | Avdelning eller team |

### Workspace 3 — Technology

| Komponenttyp | LeanIX-motsvarighet | Beskrivning |
| --- | --- | --- |
| **IT Component** | IT Component | Teknisk komponent (databas, OS, ramverk, SaaS-produkt) |
| **Technology Category** | Technology Category | Teknikdomän / klassificering |

## Relationer (References) — det väsentliga

```
Application  ──[Supports]──▶  Business Capability
Application  ──[Belongs To]──▶  Organizational Unit (ägare)
Application  ──[Uses]──▶  IT Component
Application  ──[Has Child]──▶  Application Module
Application  ──[Connects To]──▶  Interface ──[Connects To]──▶  Application
IT Component ──[Belongs To]──▶  Technology Category
Application  ──[Succeeds]──▶  Application (för roadmap/migration)
```

## Jämförelse med LeanIX

| LeanIX Fact Sheet | Ardoq-komponent | Workspace |
| --- | --- | --- |
| Application | Application | Application Portfolio |
| Interface | Interface | Application Portfolio |
| Business Capability | Business Capability | Business Architecture |
| UserGroup | Organizational Unit | Business Architecture |
| IT Component | IT Component | Technology |
| Data Object | _(kan läggas till senare)_ | — |
| Initiative / Project | _(Ardoq Presentations/Scenarios)_ | — |

## Tips för enkel adoption

**Håll det minimalt från start.** Börja med bara Application + Business Capability + IT Component och de mest kritiska fälten. Lägg till Interface och fler attribut när användarna är bekväma.

**Använd Ardoq Surveys** för att låta applikationsägare uppdatera sin information utan att behöva lära sig verktyget — precis som LeanIX:s survey-funktion.

**Standardisera lifecycle-värdena** tidigt. Det är det vanligaste sättet att visualisera APM-värde direkt (t.ex. en heatmap av applikationer per livscykelstatus × affärskritikalitet).

**Undvik att importera CMDB-data** på komponentnivå initialt — för komplexa modeller rekommenderas att planera utökning noggrant, eftersom alltför komplexa metamodeller är svåra att navigera och fråga mot. [Ardoq](https://help.ardoq.com/en/articles/43968-application-integration-management-metamodel)

Vill du att jag tar fram ett mer detaljerat förslag på fältdefinitioner per komponenttyp, eller en visuell metamodell som ett diagram? Jag kan också hjälpa med hur man bäst mappar detta mot Ardoqs inbyggda APM-mall som utgångspunkt.

Jag gillar APM inkl integration, men de andra är inte prioriterade.

Investeringar och projekt är viktiga och roadmaps. Det liknar portföljstyrning.

Det är bra med en grundläggande organisationsstruktur och verksamhetsområden, men förmågor är inte prioriterade. De kan komma senare.

Primära dataobjekt är viktiga. De bör kopplas till integrationerna.

En av de viktigaste områdena är Governance. Dvs att koppla orgenheter och individer till applikationer, tjänster, dataobjekt, processer mm.

Byt ut de två nedre i ditt förslag och komplettera med två eller fler.

Allt detta

Mar 14

Bra precisering! Låt mig uppdatera och utöka modellen med dina prioriteringar.

Searched the web

Perfekt, nu har jag en tydlig bild. Här är den reviderade och utökade metamodellen:
