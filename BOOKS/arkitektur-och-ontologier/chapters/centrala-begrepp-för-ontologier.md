# Centrala begrepp för ontologier 

## Ontologi (OWL)

En **formell, maskinläsbar begreppsmodell** som definierar:

- Klasser (t.ex. `Vehicle`, `Inspection`)
- Relationer (t.ex. `hasInspection`)
- Egenskaper (t.ex. `registrationNumber`)
- Logiska regler och restriktioner
- Möjlighet till inferens (härledning)

Används för semantik och logisk konsistens.

---

## SHACL

Ett regelverk för att **validera data mot en modell**.

- Säkerställer att data följer strukturkrav
- Stoppar fel innan de sprids
- Passar i API-gateways, dataplattformar och integrationer

Används för datakvalitet och governance.

---

## Agentic AI

AI-system som:

- Har mål
- Planerar stegvis
- Använder verktyg (API:er, databaser)
- Fattar beslut

Kräver tydlig semantik för att agera korrekt i komplexa domäner.

---

## MCP-server (Model Context Protocol)

En kontrollerad brygga mellan:

- Agenten
- System/APIs
- Semantiska resurser (t.ex. ontologi)

Säkerställer att agenten använder rätt verktyg på rätt sätt.

---

## Enterprise Architecture (EA)

Strukturerad modellering av:

- Capabilities
- Processer
- Applikationer
- Dataobjekt
- Integrationer

Skapar styrning, spårbarhet och systemöversikt.

---

# 2 Hur begreppen hänger ihop

## Ontologi = Semantisk kärna

Ontologin definierar:

- Vad är ett Vehicle?
- Vad är en Inspection?
- Vad betyder “tillåten i trafik”?

Den kan dessutom härleda nya fakta:

> Vehicle + Approved Inspection ⇒ TrafficAllowedVehicle

Den fungerar som ett **gemensamt semantiskt kontrakt** över system.

---

## SHACL = Datakvalitetskontroll

SHACL säkerställer att:

- En Inspection alltid har exakt ett Vehicle
- Status alltid finns
- Datatyper är korrekta

OWL säger vad som *är logiskt korrekt*.

SHACL ser till att data *faktiskt följer reglerna*.

---

## EA = Strukturell styrning

I EA-verktyg kan man:

- Modellera `Vehicle`, `Inspection` som Data Objects
- Koppla dem till Capabilities (t.ex. Inspection Execution)
- Länka dem till applikationer och API:er

Ontologin ger semantisk precision till EA-modellen.

EA ger organisatorisk och teknisk styrning.

---

## MCP = Kontrollerad exekveringsmiljö

MCP-servern:

- Exponerar API:er
- Exponerar ontologin
- Kan använda SHACL för validering

Den fungerar som ett **governance-lager för AI-agenter**.

---

## Agentic AI = Utföraren

Agenten:

1. Tolkar uppgift
2. Använder ontologin för att förstå begrepp
3. Väljer rätt API via MCP
4. Får data validerad via SHACL
5. Agerar inom EA-godkänd struktur

---

# 3 Helhetsbilden – arkitektur

En sammanhängande struktur:

```
CodeAgent (LLM) ↓MCP-server ↓Semantiskt lager - Ontologi (OWL) - SHACL-regler ↓Affärssystem & Data ↑EA-repository (styrning & spårbarhet)

```

---

# 4 Rollfördelning i korthet

| Lager | Syfte |
| --- | --- |
| OWL | Definierar begrepp och logik |
| SHACL | Validerar data |
| EA | Strukturerar organisationens kapabiliteter och system |
| MCP | Kontrollerar AI:s verktygsåtkomst |
| Agent | Utför uppgifter och fattar beslut |

---

# 5 Varför detta är strategiskt viktigt

I komplexa organisationer:

- Samma begrepp betyder olika saker i olika system
- AI riskerar feltolkningar
- Datakvalitet varierar
- Governance är kritiskt

Den kombinerade modellen ger:

Gemensam semantik

Spårbar AI-autonomi

Regelstyrd exekvering

Systemoberoende begreppshantering

Starkare data governance

---

# 6 Sammanfattning i en mening

- Ontologi definierar vad saker betyder,
- SHACL säkerställer att data följer reglerna,
- EA organiserar och styr landskapet,
- MCP kontrollerar AI:ns åtkomst,
- och agenten agerar inom denna strukturerade och semantiskt säkrade miljö.

---

Om du vill kan jag nu:

- Göra en visualiserad konceptmodell (textdiagram)
- Skriva detta som en executive summary (1–2 sidor för ledning)
- Eller formulera det som en metod/rekommendation för införande i en organisation.

---

### **Prompt**

> generera en bild som en försättsida i A4-format som kan användas på framsidan av boken

---
