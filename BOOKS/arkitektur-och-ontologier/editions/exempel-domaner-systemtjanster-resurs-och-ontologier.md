# Exempel domäner, systemtjänster, resurs och ontologier

Här kommer ett **konkret, sammanhållet exempel** som visar hur du kan förena:

- Domäner (`Fordon.*`)
- Systemtjänster (exponerade, verksamhetsnära)
- Resurstjänster/CRUD (interna, får inte läcka)
- OWL (begrepp + inferens)
- SHACL (validering + governance av tjänstekatalog/beroenden)

Jag håller det i **svenska termer** och med dina namngivningsmönster.

---

## 1) Domän: Fordon

### Domänindelning (exempel)

- `Fordon.Registrering`
- `Fordon.Besiktning`
- `Fordon.Service`

### Principer (som du beskriver)

1. **Resurstjänster (CRUD) är alltid interna** inom domänen.
2. **All exponering utåt sker via systemtjänster**.
3. **Alla beroenden går nedåt**: Konsument → Systemtjänst → Resurstjänst.
4. **Systemtjänster får anropa andra systemtjänster**, även “resursnära” systemtjänster.

---

## 2) OWL: Domänbegrepp (semantik)

Här är minimal semantik (för att knyta tjänsterna till begreppen):

- `Fordon` (Vehicle)
- `Besiktning` (Inspection)
- `Besiktningsstatus` med `Godkänd` / `Underkänd`
- Härledd klass: **TillåtenITrafik** = fordon som har minst en godkänd besiktning

> OWL-delen är “vad betyder saker och hur kan vi härleda tillstånd”.

---

## 3) Tjänstekatalog (konkret) – systemtjänster vs resurstjänster

### 3.1 Systemtjänster (exponerade)

**Fordon.Besiktning.Planeringsschema(frånDatum, tillDatum, station?) → Schema**

- Beskrivning: returnerar planeringsschema för besiktningar.
- Opererar på: Besiktning, tider, stationer, fordon (indirekt).

**Fordon.Besiktning.BokaTid(fordonId, tidSlotId) → Bokningsbekräftelse**

- Orkestrerar: kontrollerar fordonets status, tillgänglighet, skapar planerad besiktning.

**Fordon.Besiktning.ResultatRegistrera(besiktningId, status, datum, protokollRef) → Resultat**

- Orkestrerar: validerar input, uppdaterar status, triggar ev. notifieringar.

**Fordon.Registrering.HämtaFordon(regnr) → Fordon**

- Resursnära men fortfarande systemtjänst (public) i din modell.

### 3.2 Resurstjänster (interna inom domänen)

**Fordon.Besiktning.InspectionResource.Create/Read/Update/Delete**

- CRUD på dataobjektet “Besiktning”.

**Fordon.Registrering.VehicleResource.Create/Read/Update/Delete**

- CRUD på dataobjektet “Fordon”.

> Poängen: Ingen utanför domänen får se eller använda `*Resource.*`.

---

## 4) Exempel: hur Planeringsschema() fungerar (och vilka beroenden som är tillåtna)

### Systemtjänst: `Fordon.Besiktning.Planeringsschema()`

**Tillåtna interna beroenden (nedåt):**

- `Fordon.Besiktning.ScheduleResource.Read(...)` (om du har schedule som dataobjekt)
- `Fordon.Besiktning.InspectionResource.Read(...)`
- ev. `Fordon.Registrering.HämtaFordon(...)` (systemtjänst i annan subdomän)

**Inte tillåtet:**

- Att en extern konsument anropar `Fordon.Besiktning.InspectionResource.Read(...)` direkt.
- Att annan domän anropar `Fordon.Besiktning.InspectionResource.*`.

---

## 5) SHACL: validera både data *och* governance (tjänsteregler)

Här är ett konkret SHACL-upplägg med **service-metadata**.

### 5.1 Antag en enkel modell för “tjänsteobjekt”

Varje tjänst beskrivs som en resurs med metadata:

- `ex:Service`
- `ex:domain` = `Fordon`
- `ex:serviceType` = `SystemService` eller `ResourceService`
- `ex:exposed` = true/false
- `ex:dependsOn` = lista av andra tjänster

### 5.2 SHACL-regler (Turtle) – governance

```turtle
@prefix ex: <https://example.
com/ea-services
#> .
@prefix sh: <http://www.
w3.org/ns/shacl
#> .
@prefix xsd: <http://www.
w3.org/2001/XMLSchema
#> .
ex:SystemService a ex:ServiceType .
ex:ResourceService a ex:ServiceType .
ex:Fordon a ex:Domain .
### Regel 1: Resurstjänster får inte exponerasex:NoExposedResourceServicesShape a sh:NodeShape ;
 sh:targetClass ex:Service ;
 sh:sparql [ a sh:SPARQLConstraint ;
 sh:message "Resurstjänster (CRUD) får inte exponeras utanför domänen."@sv ;
 sh:select """ SELECT $this WHERE { $this ex:serviceType ex:ResourceService ;
 ex:exposed true .
 } """ ;
 ] .
### Regel 2: Om en tjänst är exponerad måste den vara systemtjänstex:ExposedMustBeSystemServiceShape a sh:NodeShape ;
 sh:targetClass ex:Service ;
 sh:sparql [ a sh:SPARQLConstraint ;
 sh:message "Exponerade tjänster måste vara systemtjänster."@sv ;
 sh:select """ SELECT $this WHERE { $this ex:exposed true .
 FILTER NOT EXISTS { $this ex:serviceType ex:SystemService } } """ ;
 ] .
### Regel 3: Resurstjänster får bara anropas av tjänster i samma domänex:ResourceServiceOnlySameDomainCallerShape a sh:NodeShape ;
 sh:targetClass ex:Service ;
 sh:sparql [ a sh:SPARQLConstraint ;
 sh:message "Resurstjänster får endast vara beroenden från tjänster inom samma domän."@sv ;
 sh:select """ SELECT ?caller WHERE { ?caller ex:dependsOn $this .
 $this ex:serviceType ex:ResourceService ;
 ex:domain ?d .
 ?caller ex:domain ?callerDomain .
 FILTER (?callerDomain != ?d) } """ ;
 ] .
```

### 5.3 Exempeldata för tjänstekatalogen

```turtle
@prefix ex: <https://example.
com/ea-services
#> .
# Systemtjänst (exponerad)ex:Fordon_Besiktning_Planeringsschema a ex:Service ;
 ex:name "Fordon.Besiktning.Planeringsschema()"@sv ;
 ex:domain ex:Fordon ;
 ex:serviceType ex:SystemService ;
 ex:exposed true ;
 ex:dependsOn ex:Fordon_Besiktning_InspectionResource_Read .
# Resurstjänst (intern)ex:Fordon_Besiktning_InspectionResource_Read a ex:Service ;
 ex:name "Fordon.Besiktning.InspectionResource.Read()"@sv ;
 ex:domain ex:Fordon ;
 ex:serviceType ex:ResourceService ;
 ex:exposed false .
```

Om någon råkar sätta `ex:exposed true` på resurstjänsten, eller om en annan domän pekar på den, så failar SHACL-reglerna.

---

## 6) Koppla till OWL/affärsdata: validera payloads till ResultatRegistrera

För affärsdatan (besiktningsresultat) kan du ha SHACL som validerar input:

- Besiktning måste ha exakt ett fordon
- Måste ha exakt en status
- Datum måste finnas

Då kan **MCP-servern** eller API-gatewayen köra SHACL innan den ens släpper igenom en uppdatering.

---

## 7) Hur EA-verktyget binder ihop allt (konkret)

I EA (LeanIX/BizzDesign) kan du modellera detta som:

### Capability-exempel (för Vehicle/Inspection)

- **Besiktning – Planering & Schemaläggning**

- realiseras av systemtjänst: `Fordon.Besiktning.Planeringsschema()`
- **Besiktning – Genomförande**

- realiseras av: `Fordon.Besiktning.BokaTid()`, `Fordon.Besiktning.ResultatRegistrera()`
- **Regel- och datakvalitetsstyrning**

- realiseras av: SHACL-validering + ontologi
- **Roadworthiness / Tillåten i trafik**

- realiseras av: OWL-inferens (TillåtenITrafik)

### Spårbarhet (så du kan visa i EA)

Capability → Systemtjänst → Applikation/API → Dataobjekt → Regler (OWL/SHACL)

Exempel:

- Capability: “Besiktning – Planering”

- Systemtjänst: `Fordon.Besiktning.Planeringsschema()`
- Applikation: “Besiktningssystem”
- Dataobjekt: Besiktning, Schedule
- Policies: “CRUD inte exponerat” (SHACL), “Besiktning måste ha status” (SHACL), begreppsdefinitioner (OWL)

---

## 8) Varför detta förenar ditt sätt att tänka med ontologi/agentic AI

- **Din modell** ger tydliga kontrakt och domängränser (minskar kaos).
- **OWL** ger semantisk stabilitet och inferens (minskar feltolkning).
- **SHACL** gör dina arkitekturprinciper maskin-testbara (minskar “policy på powerpoint”).
- **MCP + agent** kan bara se systemtjänster → agenten kan inte “råka” använda CRUD fel.

---

Om du vill fortsätter jag med en ännu mer “bokvänlig” version:

- en sida med **principer + figur**
- en tabell som visar:

- Systemtjänst → Input/Output-begrepp (OWL) → Valideringsregler (SHACL) → EA-capability
- samt ett exempel på “domän A anropar domän B” korrekt (systemtjänst-till-systemtjänst).

---
