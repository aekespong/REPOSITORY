# Ontologi och Agentic AI

> vad är Ontologi och hur kan det användas inom agentic AI och MCP servers

### **ChatGPT**

Det består av tre delar: **ontologi**, **agentic AI** och **MCP-servrar**, och hur de hänger ihop.

# 1 Vad är en Ontologi?

En **ontologi** är en *formell och explicit modell av begrepp i en domän och relationerna mellan dem*.

Den beskriver:

- **Begrepp (klasser)** – t.ex. `Vehicle`, `Inspection`, `Owner`
- **Relationer** – t.ex. `hasOwner`, `undergoesInspection`
- **Egenskaper (attribut)** – t.ex. `registrationNumber`, `inspectionDate`
- **Regler och restriktioner** – t.ex.

- Ett fordon *måste* ha exakt en registreringsskylt
- En inspektion *måste* vara kopplad till ett fordon

Den är alltså mer än en datamodell – den är:

- Maskinläsbar
- Logiskt strikt
- Semantiskt tydlig
- Möjlig att resonera över (reasoning)

Vanliga teknologier:

- RDF
- OWL
- SHACL
- Knowledge graphs

---

# 2 Skillnaden mellan datamodell och ontologi

| Datamodell | Ontologi |
| --- | --- |
| Struktur för lagring | Struktur + betydelse |
| Fokuserar på tabeller | Fokuserar på begrepp |
| Ingen inbyggd logik | Möjliggör logisk inferens |
| DB-driven | Semantik-driven |

En ontologi kan t.ex. automatiskt härleda:

- Om `ElectricVehicle` är en subklass av `Vehicle`,
- och X är en `ElectricVehicle`,
- då är X också en `Vehicle`.

Det är här AI-nyttan börjar bli riktigt intressant.

---

# 3 Vad är Agentic AI?

Agentic AI = AI-system som:

- Har mål
- Planerar
- Resonerar iterativt
- Använder verktyg (API:er, databaser, system)
- Agerar i en miljö

Till skillnad från en vanlig LLM som bara svarar på en prompt, kan en agent:

1. Tolka uppgift
2. Dela upp i steg
3. Anropa verktyg
4. Sammanfoga resultat
5. Fatta beslut

Men här finns ett problem:

> LLM:er förstår språk – men de förstår inte domänens exakta semantik om den inte är explicit definierad.

Det är här ontologier kommer in.

---

# 4 Hur Ontologi används inom Agentic AI

## 1. Ger AI:n en gemensam begreppsmodell

Istället för att AI:n gissar vad “Vehicle Owner” betyder, kan den:

- Slå upp begreppet i ontologin
- Se exakt definition
- Förstå relationer

Det minskar hallucinationer och tvetydighet.

---

## 2. Möjliggör semantisk verktygsanvändning

Om en agent ska välja rätt API:

Utan ontologi:

> “Hm, vilket API verkar passa?”

Med ontologi:

- API:er är annoterade med vilka begrepp de hanterar
- Agenten kan matcha uppgiften mot begreppsmodellen

Exempel:

- Uppgift: “Hämta senaste godkända inspektion”
- Ontologin vet:

- Inspection
- hasStatus
- approved
- Agenten väljer rätt endpoint

---

## 3. Möjliggör logisk reasoning

Med ontologi + reasoner kan agenten:

- Härleda implicita fakta
- Kontrollera konsistens
- Fånga regelbrott

Exempel:

Om ontologin säger:

> Ett fordon får inte vara både “Scrapped” och “Active”

Agenten kan upptäcka datakonflikter automatiskt.

---

## 4. Stabil kontext över flera system

I en enterprise-miljö:

- CRM har sin modell
- ERP har sin modell
- Data warehouse har sin modell

Ontologin fungerar som:

> Ett semantiskt “lager ovanpå systemen”

Agenten kan då resonera över flera system utan att varje integration blir specialkodad.

---

# 5 Vad är MCP Servers?

MCP (Model Context Protocol) är ett sätt att låta LLM:er och agenter:

- Anropa verktyg
- Få strukturerad kontext
- Arbeta med externa resurser

En MCP-server exponerar:

- Verktyg (API-funktioner)
- Resurser (data, dokument)
- Scheman

Den fungerar som en kontrollerad gateway mellan AI och system.

---

# 6 Hur Ontologi + MCP Servers hänger ihop

Här blir det riktigt intressant.

## Ontologi kan fungera som:

### 1 Kontextlager i MCP

MCP-servern kan:

- Exponera ontologin som resurs
- Låta agenten fråga:

- Vilka relationer finns?
- Vad är giltiga statusvärden?
- Vilka regler gäller?

Det ger:

> Semantisk navigation för agenten

---

### 2 Verktygsbeskrivning i ontologin

Istället för:

```json
{ "name": "getInspection"}
```

Kan man semantiskt beskriva verktyget:

- Opererar på: `Inspection`
- Returnerar: `InspectionReport`
- Kräver: `VehicleID`

Agenten kan då logiskt välja rätt verktyg.

---

### 3 Policy och regelkontroll

MCP-servern kan:

- Anropa ontologi + reasoner
- Validera att agentens plan är korrekt
- Stoppa ogiltiga operationer

Exempel:

Agenten försöker skapa:

- En inspektion utan fordon

Ontologin säger:

> Inspection MUST be linked to exactly 1 Vehicle

MCP kan då neka operationen.

---

# 7 Arkitekturmässigt mönster

En modern AI-arkitektur kan se ut så här:

```
CodeLLM / Agent ↓MCP Server 
↓Semantic Layer (Ontologi / Knowledge Graph) 
↓Enterprise Systems (ERP, CRM, DB)

```

Ontologin blir:

- “Enterprise brain”
- Gemensam semantisk kontrakt
- Styrning av agenters beteende

---

# 8 Varför detta är extra relevant i enterprise-miljö

I stora organisationer (som du tidigare jobbat med inom EA):

Problem:

- Begrepp betyder olika saker i olika system
- Svårt att styra AI-agenter
- Risk för felaktiga beslut

Ontologi ger:

- Governance
- Spårbarhet
- Begreppsharmoni
- Kontrollerad AI-autonomi

Det är i praktiken en förlängning av:

- Informationsmodellering
- Enterprise Architecture
- Master Data Management

---

# 9 Sammanfattning

| Ontologi gör | För Agentic AI |
| --- | --- |
| Definierar begrepp | Minskad hallucination |
| Definierar relationer | Bättre planering |
| Definierar regler | Policy enforcement |
| Möjliggör inferens | Smartare beslutsfattande |
| Skapar gemensam semantik | Systemoberoende resonemang |

Och tillsammans med MCP:

- Ontologi = hjärnan
- MCP = nervsystemet
- Agenten = operatören

---

