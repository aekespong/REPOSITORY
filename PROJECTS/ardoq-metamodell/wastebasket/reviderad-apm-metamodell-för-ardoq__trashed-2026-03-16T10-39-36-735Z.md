# APM-metamodell för Ardoq

## Fem workspaces — prioriterade enligt dina behov

## 🟦 WS 1 — Application Portfolio *(kärnan, oförändrad)*

|Komponenttyp|Beskrivning|
|---|---|
|**Application**|Affärsapplikation med livscykel, ägarskap och klassificering|
|**Application Module**|Delsystem eller modul inom en applikation|
|**Interface**|Integrationspunkt mellan applikationer|

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

## 🟩 WS 2 — Data Objects *(kopplat till integrationer)*

|Komponenttyp|Beskrivning|
|---|---|
|**Data Domain**|Överordnat område, till exempel *Kund*, *Order*, *Medarbetare*|
|**Data Object**|Konkret dataobjekt, till exempel *Kundavtal*, *Faktura*|

**Nyckelattribut på Data Object:**

- Classification (Public / Internal / Sensitive / Confidential)
- PII (Ja/Nej) — direkt stöd för GDPR
- Master System (fritext eller referens till applikation)
- CRUD-roll per koppling (Create / Read / Update / Delete)

**Relationer:**

```
Data Object  ──[Exchanged Via]──▶  InterfaceApplication  ──[Is Master Of]──▶  Data ObjectApplication  ──[Uses]──▶  Data Object  (med CRUD-attribut på referensen)Data Object  ──[Belongs To]──▶  Data Domain
```

>Kopplingen **Interface → Data Object** är det som gör integrationskartan meningsfull för GDPR- och datakvalitetsarbete.

## 🟨 WS 3 — Portfolio & Investments *(projekt, initiativ, roadmap)*

Baserat på etablerade arbetssätt för portföljstyrning och Ardoqs egen portföljmetamodell.

|Komponenttyp|Beskrivning|
|---|---|
|**Portfolio**|Portfölj eller programområde, till exempel *Digitaliseringsportfölj*|
|**Initiative**|Strategiskt initiativ eller program|
|**Project**|Konkret projekt med tid, budget och leverabler|

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

>**Has Successor** på Application, i kombination med projektkopplingarna, ger den faktiska roadmapen visuellt i Ardoq.

## 🟧 WS 4 — Organization *(lätt struktur, inte förmågor)*

|Komponenttyp|Beskrivning|
|---|---|
|**Organization**|Juridisk enhet eller bolag|
|**Organizational Unit**|Avdelning, team eller affärsområde|
|**Person**|Namngiven individ med roll i governance|

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

## 🟥 WS 5 — Governance *(det nya, prioriterade)*

Det här workspacet är *tvärsnittande* — det binder samman de andra fyra genom ägarskaps- och ansvarsrelationer. Ardoq skiljer på två centrala ägarskapsroller: **Owns** (formellt ansvar) och **Is Expert In** (teknisk expertkunskap), vilket gör det möjligt att styra surveys till rätt person.

Governance i Ardoq är inte ett eget komponentlager i sig — det är **referenserna och fälten** som utgör governance-nätverket. Inga nya komponenttyper behövs här; i stället definieras ett standardiserat set av relationer mellan workspaces:

|Relationstyp|Från|Till|Innebörd|
|---|---|---|---|
|**Owns**|Person|Application|Business- eller IT-ägare|
|**Is Expert In**|Person|Application|Teknisk kontaktperson|
|**Owns**|Person|Data Object|Dataägare|
|**Owns**|Person|Interface|Integrationsansvarig|
|**Owns**|Organizational Unit|Application|Organisatoriskt ägarskap|
|**Owns**|Person|Project|Projektägare eller sponsor|
|**Accountable For**|Organizational Unit|Data Object|Dataförvaltning|
|**Is Responsible For**|Person|Project|PM-roll|

**Governance-fält som bör finnas på Application:**

- Ownership State *(calculated: Unowned / Nominated / Owned / Managed)*
- Last Reviewed Date
- Approved (Yes / No / Pending)
- Compliance Tags (GDPR / NIS2 / ISO27001 etc.)

## Sammantagen bild — relationsöversikt

```
[Organization]    └── [Org. Unit] ──Owns──▶ [Application] ◀──Affects── [Project]                                    │                         │                    [Person]─Owns─▶ │              [Initiative]─Belongs To─▶[Portfolio]                                    │                         [Interface]──Exchanged Via──▶ [Data Object]                                    │                         │                              [App Module]           [Data Domain]
```

## Vad du nu kan svara på i Ardoq

|Fråga|Täcks av|
|---|---|
|Vilka applikationer saknar ägare?|WS 1 + WS 5 (Ownership State)|
|Vilka integrationer hanterar känslig PII-data?|WS 1 + WS 2|
|Vilka projekt påverkar en specifik applikation?|WS 1 + WS 3|
|Vad händer med applikation X när projekt Y levereras?|Has Successor + WS 3|
|Vilken org-enhet ansvarar för vilket dataobjekt?|WS 4 + WS 5|
|Vilka applikationer avvecklas inom 18 månader?|WS 1 (Lifecycle) + WS 3|
