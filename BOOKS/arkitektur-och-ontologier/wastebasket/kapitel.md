
# Förslag på struktur för boken

Kapitel 1 – Översiktlig arkitekturmodell (detta kapitel)

Kapitel 2 – Domäner och tjänstestruktur i detalj

Kapitel 3 – Ontologi och begreppsmodellering

Kapitel 4 – Validering och arkitekturgovernance (SHACL)

Kapitel 5 – AI och MCP i praktiken

Kapitel 6 – Fullständigt exempel: Fordon-domänen


### **Prompt**

> Ja, jag tänker att det kan vara bra med ett inledande kapitel som på övergripande nivå beskriver detta. I senare kapitel kan man sedan gå ner på djupet.

---

### **ChatGPT**

Det är en mycket bra idé.

Det här lämpar sig perfekt för ett **inledande arkitekturkapitel** som sätter den konceptuella ramen – utan att gå ner i OWL/SHACL/Turtle direkt.

Nedan är ett förslag på ett **inledande kapitel** som du i princip kan använda som grundmanus.

---

# Kapitel 1

# Tjänstelager, domäner och semantisk styrning i en AI-driven arkitektur

## 1.1 Problemet vi försöker lösa

Moderna organisationer präglas av:

- Många system
- Överlappande begrepp
- Otydliga ansvarsförhållanden
- Okontrollerade beroenden
- Växande användning av AI och autonoma agenter

När AI introduceras i en sådan miljö uppstår en ny risk:

> AI kan agera snabbt – men utan tydliga strukturer riskerar den att agera fel.

För att möjliggöra säker och kontrollerad AI-autonomi krävs tre saker:

1. Tydliga domängränser
2. Ett disciplinerat tjänstelager
3. En gemensam semantisk begreppsmodell

Detta kapitel beskriver hur dessa delar samverkar.

---

## 1.2 Domäner som grundstruktur

Arkitekturen organiseras i **domäner** (bounded contexts).

Exempel:

- Fordon
- Kund
- Avtal
- Service

Varje domän:

- Äger sina dataobjekt
- Äger sina interna tjänster
- Ansvarar för sin konsistens
- Exponerar ett tydligt kontrakt utåt

Domänen är den primära organisatoriska och tekniska gränsen.

---

## 1.3 Tjänstelagret – två tydliga nivåer

Inom varje domän finns två typer av tjänster:

### 1. Systemtjänster (System Services)

- Verksamhetsnära
- Namnsatta i verksamhetstermer
- Exponeras utanför domänen
- Kan anropa andra systemtjänster

Exempel:

- `Fordon.Besiktning.Planeringsschema()`
- `Fordon.Besiktning.BokaTid()`
- `Fordon.Registrering.HämtaFordon()`

Systemtjänster realiserar capabilities och processer.

---

### 2. Resurstjänster (Resource Services)

- CRUD-funktionalitet
- Direkt kopplade till dataobjekt
- Alltid interna
- Får aldrig exponeras

Exempel:

- `Fordon.InspectionResource.Create()`
- `Fordon.VehicleResource.Read()`

Resurstjänster är domänens interna mekanik.

---

## 1.4 Arkitekturprincip: Beroenden går alltid nedåt

En central princip är:

> Alla beroenden går nedåt via systemtjänster mot resurstjänster.

Det innebär:

- Ingen får anropa CRUD direkt utanför domänen.
- Tvärdomänanrop sker alltid via systemtjänster.
- Systemtjänster är den enda publika ingången.

Detta skapar:

- Stabilitet
- Lös koppling
- Tydlig ansvarsfördelning
- Kontrollerbar förändring

---

## 1.5 Semantiskt lager – gemensam begreppsmodell

Ovanpå tjänstelagret finns ett semantiskt lager.

Det består av:

- En ontologi (formell begreppsmodell)
- Regler och härledningar
- Datavalidering

Ontologin definierar:

- Vad är ett Fordon?
- Vad är en Besiktning?
- Vad betyder “Tillåten i trafik”?

Den säkerställer att:

- Begrepp är entydiga
- Regler är formella
- Härledningar är konsekventa

Det semantiska lagret styr vad tjänsterna betyder – inte hur de implementeras.

---

## 1.6 Governance genom maskinvalidering

Arkitekturprinciper är ofta dokumenterade – men inte verkställbara.

Genom att använda formella regler kan man:

- Säkerställa att resurstjänster inte exponeras
- Säkerställa att beroenden följer domängränser
- Säkerställa att data är korrekt strukturerad

Detta gör arkitekturprinciper:

- Testbara
- Automatiserbara
- Revisionsbara

---

## 1.7 AI och agentic arkitektur

När AI-agenter införs förändras kraven.

En agent:

- Planerar
- Anropar tjänster
- Fattar beslut

I denna arkitektur:

- Agenten ser endast systemtjänster.
- Resurstjänster är dolda.
- Ontologin ger semantisk förståelse.
- Valideringsregler hindrar ogiltiga operationer.

Resultatet blir:

- Kontrollerad autonomi
- Spårbar exekvering
- Semantiskt korrekt beslutsfattande

---

## 1.8 Sammanfattande arkitekturöversikt

Arkitekturen kan beskrivas i fyra lager:

1. Capability- och processlager
2. Systemtjänstelager (publikt kontrakt)
3. Resurstjänstelager (internt)
4. Dataobjekt

Tvärgående:

- Ontologi (semantik)
- Regler/validering (governance)

AI och integrationer använder endast systemtjänstelagret.

---

## 1.9 Varför denna modell är viktig

Denna modell:

- Skyddar domängränser
- Förhindrar odisciplinerad CRUD-exponering
- Möjliggör maskinell arkitekturstyrning
- Gör AI-samverkan möjlig utan att tappa kontroll

Den kombinerar:

- Domändriven design
- Tjänstearkitektur
- Enterprise Architecture
- Semantisk modellering
- AI-styrning

---
