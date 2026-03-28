# chatGPT Reviderad APM-metamodell för Ardoq

## Fem workspaces — prioriterade enligt dina behov

## 🟦 APM(ws) — Application Portfolio _(kärnan, oförändrad)_

| Komponenttyp           | Beskrivning                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Application**        | Affärsapplikation med livscykel, ägarskap och klassificering |
| **Application Module** | Delsystem / modul inom en applikation                        |
| **Interface**          | Integrationspunkt mellan applikationer                       |

**Nyckelattribut på Application:**

- Lifecycle (Active / Phase-out / End of Life / Planned)

- Business Criticality (Low / Medium / High / Mission Critical)

- Functional Fit & Technical Fit (1–4)

- TIME (Tolerate / Invest / Migrate / Eliminate)

- Hosting Type (On-premise / SaaS / IaaS / PaaS)

- Annual Cost / Cost Center

**Nyckelattribut på Interface:**

- Integration Pattern (API / Event / Batch / File)

- Frequency, Direction (In / Out / Bi-directional)

- Criticality

## 🟩 Data objects(ws) — Data Objects _(kopplat till integrationer)_

| Komponenttyp    | Beskrivning                                                   |
| --------------- | ------------------------------------------------------------- |
| **Data Domain** | Överordnat område, t.ex. _Kund_, _Order_, _Medarbetare_ |
| **Data Object** | Konkret dataobjekt, t.ex. _Kundavtal_, _Faktura_          |

**Nyckelattribut på Data Object:**

- Classification (Public / Internal / Sensitive / Confidential)

- PII (Ja/Nej) — direkt GDPR-stöd

- Master System (fritext/referens till applikation)

- CRUD-roll per koppling (Create / Read / Update / Delete)

**Relationer:**

```
Data Object  ──[Exchanged Via]──▶  Interface
Application  ──[Is Master Of]──▶  Data Object
Application  ──[Uses]──▶  Data Object  (med CRUD-attribut på referensen)
Data Object  ──[Belongs To]──▶  Data Domain
```

>
>
>
> Kopplingen **Interface → Data Object** är det som gör integrationskartan meningsfull för GDPR och datakvalitetsarbete.
>
>
>

## 🟨 Roadmap(ws) — Portfolio & Investments _(projekt, initiativ, roadmap)_

Inspirerat av LeanIX Initiative Fact Sheet och Ardoqs egna portfolio-metamodell.

| Komponenttyp   | Beskrivning                                                 |
| -------------- | ----------------------------------------------------------- |
| **Portfolio**  | Portfölj / programområde, t.ex. _Digitaliseringsportfölj_ |
| **Initiative** | Strategiskt initiativ eller program                         |
| **Project**    | Konkret projekt med tid, budget och leverabler              |

**Nyckelattribut på Project:**

- Status (Planned / Active / On Hold / Completed / Cancelled)

- Start Date / End Date

- Budget (SEK/TEUR)

- Priority (1–5)

- Project Type (New Development / Replacement / Upgrade / Integration / Retirement)

**Nyckelattribut på Initiative:**

- Strategic Objective (fritext)

- Investment Category (Run / Grow / Transform)

**Relationer:**

```
Project      ──[Belongs To]──▶  Initiative
Initiative   ──[Belongs To]──▶  Portfolio
Project      ──[Affects]──▶  Application        (roadmap-koppling)
Project      ──[Delivers]──▶  Application        (ny app)
Project      ──[Retires]──▶  Application         (avveckling)
Project      ──[Owned By]──▶  Organizational Unit
```

>
>
>
> **Has Successor** på Application (från APM(ws)) kombinerat med Project-kopplingen ger den faktiska roadmapen visuellt i Ardoq.
>
>
>

## 🟧 Organisation(ws) — Organization _(lätt struktur, inte förmågor)_

| Komponenttyp            | Beskrivning                             |
| ----------------------- | --------------------------------------- |
| **Organization**        | Juridisk enhet / bolag                  |
| **Organizational Unit** | Avdelning, team, affärsområde           |
| **Person**              | Namngiven individ med roll i governance |

**Nyckelattribut på Person:**

- Email (används av Ardoq Broadcasts/Surveys)

- Role Type (Business Owner / Technical Owner / Data Steward / Project Manager)

**Nyckelattribut på Organizational Unit:**

- Unit Type (Business / IT / Shared Services)

- Cost Center

**Relationer:**

```
Organizational Unit  ──[Belongs To]──▶  Organization
Person               ──[Belongs To]──▶  Organizational Unit
Person               ──[Reports To]──▶  Person
```

## 🟥 Ansvar(ws) — Governance _(det nya, prioriterade)_

Det här workspacet är _tvärsnittande_ — det binder samman de andra fyra genom ägarskaps- och ansvarsrelationer. Ardoq skiljer på två centrala ägarskapsroller: **Owns** (formellt ansvar) och **Is Expert In** (teknisk expertkunskap) — vilket möjliggör att surveys automatiskt skickas till rätt person. [Ardoq](https://help.ardoq.com/en/articles/44004-application-lifecycle-management-metamodel)

Governance i Ardoq är inte ett eget komponentlager i sig — det är **referenserna och fälten** som utgör governance-nätverket. Inga nya komponenttyper behövs här; istället definieras ett standardiserat set av cross-workspace-relationer:

| Relationstyp           | Från      | Till        | Innebörd                  |
| ---------------------- | --------- | ----------- | ------------------------- |
| **Owns**               | Person    | Application | Business/IT-ägare         |
| **Is Expert In**       | Person    | Application | Teknisk kontaktperson     |
| **Owns**               | Person    | Data Object | Dataägare (GDPR DPO-stöd) |
| **Owns**               | Person    | Interface   | Integrationsansvarig      |
| **Owns**               | Org. Unit | Application | Organisatoriskt ägarskap  |
| **Owns**               | Person    | Project     | Projektägare / sponsor    |
| **Accountable For**    | Org. Unit | Data Object | Dataförvaltning           |
| **Is Responsible For** | Person    | Project     | PM-roll                   |

**Governance-fält som bör finnas på Application:**

- Ownership State _(calculated: Unowned / Nominated / Owned / Managed)_ — ett beräknat fält som automatiskt avgör om en applikation har ägare, om ägaren accepterat ansvaret och om uppgifterna är aktuella. [Ardoq](https://help.ardoq.com/en/articles/44004-application-lifecycle-management-metamodel)

- Last Reviewed Date

- Approved (Yes / No / Pending)

- Compliance Tags (GDPR / NIS2 / ISO27001 etc.)

## Sammantagen bild — relationsöversikt

```
[Organization]
    └── [Org. Unit] ──Owns──▶ [Application] ◀──Affects── [Project]
                                    │                         │
                    [Person]─Owns─▶ │              [Initiative]─Belongs To─▶[Portfolio]
                                    │
                         [Interface]──Exchanged Via──▶ [Data Object]
                                    │                         │
                              [App Module]           [Data Domain]
```

## Vad du nu kan svara på i Ardoq

| Fråga                                                 | Täcks av                                    |
| ----------------------------------------------------- | ------------------------------------------- |
| Vilka applikationer saknar ägare?                     | APM(ws) + Ansvar(ws) (Ownership State) |
| Vilka integrationer hanterar känslig PII-data?        | APM(ws) + Data objects(ws)                   |
| Vilka projekt påverkar en specifik applikation?       | APM(ws) + Roadmap(ws)                   |
| Vad händer med applikation X när projekt Y levereras? | Has Successor + Roadmap(ws)                 |
| Vilken org-enhet ansvarar för vilket dataobjekt?      | Organisation(ws) + Ansvar(ws)                   |
| Vilka applikationer avvecklas inom 18 månader?        | APM(ws) (Lifecycle) + Roadmap(ws)       |

## Diagram 1 — Övergripande workspace-karta

Det första diagrammet visar de fyra workspacen och hur de hänger ihop. **Heldragen pil** = strukturell relation (hierarki, komposition). **Streckad pil** = governance-relation (ägarskap, ansvar).

[🎨 Redigera diagram 1](https://l.mermaid.ai/BkLDLo)

## Diagram 2 — Detaljerad klassmodell med fält

Det andra diagrammet visar alla komponenttyper med sina attribut och multiplicitet på relationerna — användbart som referens vid konfiguration i Ardoq.

[🎨 Redigera diagram 2](https://l.mermaid.ai/YiD7PJ)

## Vad du ser i diagrammen

**Application** är navet — med 11 attribut inkl. TIME-klassificering, Ownership State och complianceTags. Därifrån grenar det ut i tre riktningar: nedåt mot **Interface → DataObject → DataDomain**, uppåt mot **Project → Initiative → Portfolio**, och sidledes mot **Person/OrgUnit** via governance-relationer (streckade).

Det som är lite svårt att se i ett platt diagram är att **Governance inte är ett eget workspace** — det är ett _nät av relationer_ som löper tvärs igenom alla andra. I Ardoq realiseras det via References + Broadcasts + Surveys, inte via en separat komponenttyp.

Vill du att vi går vidare med att modellera ett specifikt scenario — t.ex. hur en applikationsavveckling ser ut i roadmap-vyn, eller hur GDPR-spårning via DataObject och Interface skulle se ut i praktiken?

[Claude is AI and can make mistakes. Please double-check responses.](https://support.anthropic.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on)

## Content

---

### **ChatGPT**

Absolut. Här är en omskriven version där alla referenser till **LeanIX** är borttagna, samtidigt som innehållet och strukturen är bevarade.

---

# Reviderad APM-metamodell för Ardoq

## Fem workspaces — prioriterade enligt dina behov

## 🟦 APM(ws) — Application Portfolio _(kärnan, oförändrad)_

| Komponenttyp           | Beskrivning                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Application**        | Affärsapplikation med livscykel, ägarskap och klassificering |
| **Application Module** | Delsystem eller modul inom en applikation                    |
| **Interface**          | Integrationspunkt mellan applikationer                       |

**Nyckelattribut på Application:**

- Lifecycle (Active / Phase-out / End of Life / Planned)
- Business Criticality (Low / Medium / High / Mission Critical)
- Functional Fit & Technical Fit (1–4)
- TIME (Tolerate / Invest / Migrate / Eliminate)
- Hosting Type (On-premise / SaaS / IaaS / PaaS)
- Annual Cost / Cost Center

**Nyckelattribut på Interface:**

- Integration Pattern (API / Event / Batch / File)
- Frequency
- Direction (In / Out / Bi-directional)
- Criticality

## 🟩 Data objects(ws) — Data Objects _(kopplat till integrationer)_

| Komponenttyp    | Beskrivning                                                    |
| --------------- | -------------------------------------------------------------- |
| **Data Domain** | Överordnat område, till exempel _Kund_, _Order_, _Medarbetare_ |
| **Data Object** | Konkret dataobjekt, till exempel _Kundavtal_, _Faktura_        |

**Nyckelattribut på Data Object:**

- Classification (Public / Internal / Sensitive / Confidential)
- PII (Ja/Nej) — direkt stöd för GDPR
- Master System (fritext eller referens till applikation)
- CRUD-roll per koppling (Create / Read / Update / Delete)

**Relationer:**

```
Data Object  ──[Exchanged Via]──▶  InterfaceApplication  ──[Is Master Of]──▶  Data ObjectApplication  ──[Uses]──▶  Data Object  (med CRUD-attribut på referensen)Data Object  ──[Belongs To]──▶  Data Domain
```

> Kopplingen **Interface → Data Object** är det som gör integrationskartan meningsfull för GDPR- och datakvalitetsarbete.

## 🟨 Roadmap(ws) — Portfolio & Investments _(projekt, initiativ, roadmap)_

Baserat på etablerade arbetssätt för portföljstyrning och Ardoqs egen portföljmetamodell.

| Komponenttyp   | Beskrivning                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Portfolio**  | Portfölj eller programområde, till exempel _Digitaliseringsportfölj_ |
| **Initiative** | Strategiskt initiativ eller program                                  |
| **Project**    | Konkret projekt med tid, budget och leverabler                       |

**Nyckelattribut på Project:**

- Status (Planned / Active / On Hold / Completed / Cancelled)
- Start Date / End Date
- Budget (SEK / TEUR)
- Priority (1–5)
- Project Type (New Development / Replacement / Upgrade / Integration / Retirement)

**Nyckelattribut på Initiative:**

- Strategic Objective (fritext)
- Investment Category (Run / Grow / Transform)

**Relationer:**

```
Project      ──[Belongs To]──▶  InitiativeInitiative   ──[Belongs To]──▶  PortfolioProject      ──[Affects]──▶  ApplicationProject      ──[Delivers]──▶  ApplicationProject      ──[Retires]──▶  ApplicationProject      ──[Owned By]──▶  Organizational Unit
```

> **Has Successor** på Application, i kombination med projektkopplingarna, ger den faktiska roadmapen visuellt i Ardoq.

## 🟧 Organisation(ws) — Organization _(lätt struktur, inte förmågor)_

| Komponenttyp            | Beskrivning                             |
| ----------------------- | --------------------------------------- |
| **Organization**        | Juridisk enhet eller bolag              |
| **Organizational Unit** | Avdelning, team eller affärsområde      |
| **Person**              | Namngiven individ med roll i governance |

**Nyckelattribut på Person:**

- Email (används av Ardoq Broadcasts/Surveys)
- Role Type (Business Owner / Technical Owner / Data Steward / Project Manager)

**Nyckelattribut på Organizational Unit:**

- Unit Type (Business / IT / Shared Services)
- Cost Center

**Relationer:**

```
Organizational Unit  ──[Belongs To]──▶  OrganizationPerson               ──[Belongs To]──▶  Organizational UnitPerson               ──[Reports To]──▶  Person
```

## 🟥 Ansvar(ws) — Governance _(det nya, prioriterade)_

Det här workspacet är _tvärsnittande_ — det binder samman de andra fyra genom ägarskaps- och ansvarsrelationer. Ardoq skiljer på två centrala ägarskapsroller: **Owns** (formellt ansvar) och **Is Expert In** (teknisk expertkunskap), vilket gör det möjligt att styra surveys till rätt person.

Governance i Ardoq är inte ett eget komponentlager i sig — det är **referenserna och fälten** som utgör governance-nätverket. Inga nya komponenttyper behövs här; i stället definieras ett standardiserat set av relationer mellan workspaces:

| Relationstyp           | Från                | Till        | Innebörd                   |
| ---------------------- | ------------------- | ----------- | -------------------------- |
| **Owns**               | Person              | Application | Business- eller IT-ägare   |
| **Is Expert In**       | Person              | Application | Teknisk kontaktperson      |
| **Owns**               | Person              | Data Object | Dataägare                  |
| **Owns**               | Person              | Interface   | Integrationsansvarig       |
| **Owns**               | Organizational Unit | Application | Organisatoriskt ägarskap   |
| **Owns**               | Person              | Project     | Projektägare eller sponsor |
| **Accountable For**    | Organizational Unit | Data Object | Dataförvaltning            |
| **Is Responsible For** | Person              | Project     | PM-roll                    |

**Governance-fält som bör finnas på Application:**

- Ownership State _(calculated: Unowned / Nominated / Owned / Managed)_
- Last Reviewed Date
- Approved (Yes / No / Pending)
- Compliance Tags (GDPR / NIS2 / ISO27001 etc.)

## Sammantagen bild — relationsöversikt

```
[Organization]    └── [Org. Unit] ──Owns──▶ [Application] ◀──Affects── [Project]                                    │                         │                    [Person]─Owns─▶ │              [Initiative]─Belongs To─▶[Portfolio]                                    │                         [Interface]──Exchanged Via──▶ [Data Object]                                    │                         │                              [App Module]           [Data Domain]
```

## Vad du nu kan svara på i Ardoq

| Fråga                                                 | Täcks av                                    |
| ----------------------------------------------------- | ------------------------------------------- |
| Vilka applikationer saknar ägare?                     | APM(ws) + Ansvar(ws) (Ownership State) |
| Vilka integrationer hanterar känslig PII-data?        | APM(ws) + Data objects(ws)                   |
| Vilka projekt påverkar en specifik applikation?       | APM(ws) + Roadmap(ws)                   |
| Vad händer med applikation X när projekt Y levereras? | Has Successor + Roadmap(ws)                 |
| Vilken org-enhet ansvarar för vilket dataobjekt?      | Organisation(ws) + Ansvar(ws)                   |
| Vilka applikationer avvecklas inom 18 månader?        | APM(ws) (Lifecycle) + Roadmap(ws)       |

Vill du att jag också gör en **kortare och mer formell version**, till exempel anpassad för presentation eller beslutsunderlag?

---
