#  Informationsobjekt Fordon

analysera vilka informationsobjekt som behövs och beskrivs i denna text. 

Skriv en tabell på informationsobjekt och beskrivning baserat på nedanstående:

Man kan strukturera objekten i följande huvudgrupper:

### 1️⃣ Kärnobjekt

-Fordon
-Ägare
-Förare
-Behörighet
-Område

### 2️⃣ Säkerhet & Inpassering

-BehörighetsStatus
-Inpasseringskontroll
-Inpasseringslogg
-Grind
-Beslut

### 3️⃣ Teknisk efterlevnad

-Kontroll
-KontrollTyp
-KontrollResultat
-Verkstad

### 4️⃣ Utrustning & Spårning

-Utrustningstyp
-Installation
-Tagg
-MobilarisEnhet
-Position

### 5️⃣ Organisation & Roller

-Anställd
-Roll

### 6️⃣ Ekonomi & Livscykel

-Asset
-Avregistrering

---


## ER-modell (Mermaid)

```
MermaidDiagram is not supported.
```

---

## Aggregeringar (DDD-perspektiv)

### Förslag på Aggregates (Aggregate Root → ingående entiteter/value objects)

1.**Fordon (AR)**

-Inkluderar: Fordonsstatus, Fordonskategori, ev. koppling till Asset (referens), roller (FordonsRoll)
-Refererar till: Ägare (via id), Installationer (egen aggregate eller child beroende på behov), Kontroller (ofta egen aggregate)

1.**Behörighet (AR)**

-Inkluderar: giltighetsperiod, BehörighetsStatus, kopplingar till Områden (som value-list eller join)
-Refererar till: FordonId, ev. FörareId

1.**Installation (AR)**

-Inkluderar: InstallationsStatus, koppling till Utrustningstyp, Tagg/MobilarisEnhet (antingen child entities eller referenser)
-Refererar till: FordonId, VerkstadId

1.**Kontroll (AR)**

-Inkluderar: KontrollTyp, KontrollResultat, giltigTill
-Refererar till: FordonId, VerkstadId

1.**Inpassering (AR eller event-stream)**

-**Inpasseringslogg** som append-only transaktionsdata (ofta egen bounded context eller logg-service)

1.**Masterdata-aggregat**

-**Område (AR)** med Grind som child
-**Verkstad (AR)**
-**Utrustningstyp (AR)**
-**Ägare (AR)**

**Varför så?**

Det minimerar låsning/konflikter: behörigheter, kontroller, installationer och loggar ändras ofta och parallellt, så de bör kunna uppdateras oberoende av Fordon.

---

## Normaliserad/logisk modell (nycklar & kopplingstabeller)

**Kärntabeller**

-`Fordon(fordonsId PK, ...)`
-`Agare(agareId PK, ...)`
-`Forare(forareId PK, ...)`
-`Anstalld(lkid PK, ...)`
-`Behorighet(behorighetId PK, fordonsId FK, forareId FK NULL, ...)`
-`Installation(installationId PK, fordonsId FK, verkstadId FK, utrustningsTypId FK, ...)`
-`Kontroll(kontrollId PK, fordonsId FK, verkstadId FK, ...)`
-`Omrade(omradeId PK, ...)`
-`Grind(grindId PK, omradeId FK, ...)`
-`Inpasseringslogg(loggId PK, fordonsId FK, grindId FK, forareId FK NULL, ...)`
-`Asset(assetId PK, fordonsId FK UNIQUE NULL, ...)`
-`Avregistrering(avregistreringId PK, fordonsId FK, ...)`

**Kopplingstabeller (M:N)**

-`Behorighet_Omrade(behorighetId FK, omradeId FK, PK(behorighetId, omradeId))`

**Roll-koppling**

-`Fordonsroll(fordonsrollId PK, fordonsId FK, lkid FK, rolltyp, UNIQUE(fordonsId, rolltyp))`

**Tagg/enhet**

-Antingen 1:1 mot Installation:

  -`Tagg(taggId PK, installationId FK UNIQUE, ...)`
  -`MobilarisEnhet(mobilarisId PK, installationId FK UNIQUE, ...)`
-Eller som referenser i `Installation` om ni vill hålla allt i samma aggregate:

  -`Installation(..., taggId NULL, mobilarisId NULL)`

---

## Masterdata vs Transaktionsdata

### Masterdata (långlivat, relativt stabilt)

-**Område**, **Grind**
-**Verkstad**
-**Utrustningstyp**
-**Ägare** (kan vara masterdata-ish; extern ägare kan ändras men är fortfarande grunddata)
-**Anställd/Identitet** (ofta referens mot IAM/HR – ni lagrar ev. cache)

### Transaktions-/händelsedata (hög volym, tidsstämplat)

-**Inpasseringslogg**
-**Kontroll** (besiktningar över tid)
-**Installation** (status över tid)
-**Avregistrering** (ärende-/processdata)
-**Behörighet** (versioneras/förnyas och historik kan behövas)

---

## Livscykelstatus per objekt (förslag)

### Fordon.status

-`SKAPAD` (valfritt, innan komplett)
-`REGISTRERAD_EJ_UTRUSTAD`
-`UTRUSTAD_EJ_BESIKTIGAD`
-`BESIKTIGAD` (ev. “BESIKTIGAD\_OK”)
-`INAKTIV` (tillfälligt avstängd)
-`AVREGISTRERAD`

### Behörighet.status

-`UTKAST/ANSOKT` (om ni vill modellera ansökan separat)
-`AKTIV`
-`SPARRAD`
-`UTLOPT`
-`AVSLUTAD`

>Alternativ: gör **Ansökan** till eget objekt (`Behorighetsansokan`) och håll `Behörighet` bara för beviljad behörighet.

### Installation.status

-`PLANERAD`
-`AKTIV`
-`BORTTAGEN`
-(ev) `AVBRUTEN`, `FELRAPPORTERAD`

### Kontroll.resultat + giltighet

-`GODKAND` / `UNDERKAND`
-`giltigTill` avgör “giltig/utgången” utan extra status
-(ev) `AVBRUTEN`

### Tagg/MobilarisEnhet.status

-`AKTIV`
-`INAKTIV`
-`BORTTAGEN` (för tagg)

### Avregistrering.status

-`INITIERAD`
-`PA_GAR`
-`SLUTFORD`

---

## Extra rekommendation (för att få modellen “ren”)

Om ni vill separera beslutsflöden tydligt:

-Lägg till **Behorighetsansokan** (med beslut, villkor, handläggare)
-Låt **Behörighet** vara “den giltiga rättigheten” som används i grindlogik

Det brukar förenkla både process/spårbarhet och audit.

---

Vill du att jag även gör en **variant av ER-diagrammet uppdelat i bounded contexts** (t.ex. Registrering, Behörighet/Inpassering, Utrustning, Besiktning, Ekonomi/Asset) så det blir tydligare hur microservices/API:er kan delas?

---

### **You**

Ja, gör en domänorienterad ER-diagram

---

### **ChatGPT**

Här är en **domänorienterad ER-modell** (uppdelad i bounded contexts/domäner) i Mermaid. Jag har grupperat objekten så att de matchar era Business Services och “rena” domän-API:er: **Fordon & Ägande**, **Behörighet & Inpassering**, **Kontroll/Besiktning**, **Utrustning & Spårning**, **Områden & Organisation**, samt **Ekonomi/Asset (IFS)**.

```
MermaidDiagram is not supported.
```

### Noteringar (domänorienterade val)

-**Behörighet–Område** är M:N via `BEHORIGHET_OMRADE` (typiskt eftersom en behörighet gäller flera områden).
-**Inpasseringslogg** är separat som transaktionsdata (append-only), kopplad till *Fordon* + *Grind* (+ ev *Förare*).
-**Tagg** och **MobilarisEnhet** är 0..1 per Installation (via “UNIQUE FK”), vilket stämmer med “installation på fordon + ev tagg/macadi”.
-**Asset** är 0..1 per fordon och främst för **internt** fordon (affärsregel, inte FK-regel).

Om du vill kan jag även göra en **version där varje bounded context är “hårdare” isolerad** (dvs endast referenser via id och inga direkta FK-kopplingar mellan domäner), vilket ofta passar microservice-arkitektur bättre.

---

### **You**

Ja, gör en sådan domänorienterad

---

### **ChatGPT**

Här är en **domänorienterad ER-modell med “hård” bounded-context-isolering**: varje domän äger sina tabeller och lagrar bara **referens-id** till andra domäner (inga faktiska FK-relationer kors-domän). Jag visar kors-domän-kopplingar som **streckade relationslinjer** och med etiketten `ref` för att markera att det är en referens, inte en DB-FK.

```
Mermaid
```

### Hur du läser modellen

-**Prefixen** (`VEHICLE_`, `ACCESS_`, `COMPLIANCE_`, `EQUIP_`, `ORG_`, `FIN_`) representerar **ägarskap per domän/bounded context**.
-Endast relationer **inom samma context** är “riktiga” databasrelationer (`local FK`).
-Alla korskopplingar är via `*_ref` och visas med etiketten `ref_*` för att markera att det är **id-referenser**, inte FK.

### Typiska domänregler som modellen stödjer

-Grindlogik (ACCESS) kan fatta beslut genom att slå upp:

  -Fordon (VEHICLE) via `fordonsId_ref`
  -Behörighet (ACCESS) + Område (ORG) via ref-tabell
  -Installation/Tagg (EQUIP) via `fordonsId_ref`
  -Kontroller/besiktning (COMPLIANCE) via `fordonsId_ref`

Om du vill kan jag direkt efter detta lägga in en **”Context Map”** (Mermaid flowchart) som visar vilka domäner som är *upstream/downstream* och vilka integrationstyper som passar (sync API vs event).

---

### **You**

Vad är definitionen på en Systemtjänst

---

### **ChatGPT**

En **systemtjänst** är en teknisk tjänst som tillhandahåller funktionalitet till andra system eller tjänster, utan att i sig representera en verksamhetsprocess eller ett verksamhetsansvar.

Den skiljer sig från en **affärstjänst (business service)** genom att den:

-är **teknikorienterad**, inte processorienterad
-exponerar **generiska funktioner**
-saknar eget verksamhetsansvar
-inte äger affärsregler, utan stödjer dem

---

## Definition

>**En systemtjänst är en teknisk tjänst som kapslar in ett systems funktionalitet och gör den åtkomlig via ett definierat gränssnitt för andra system eller tjänster.**

---

## Centrala kännetecken

|Egenskap|Systemtjänst|
|---|---|
|Perspektiv|Tekniskt|
|Syfte|Tillgängliggöra funktionalitet|
|Äger affärsregler|Nej (eller minimalt)|
|Processkoppling|Indirekt|
|Konsumenter|Andra system/tjänster|
|Typiskt gränssnitt|API (REST, event, gRPC etc.)|

---

## Exempel i er fordonsdomän

### Systemtjänster (domännära)

-`FordonAPI`
-`BehörighetAPI`
-`InstallationAPI`
-`KontrollAPI`
-`OmrådeAPI`
-`AssetIntegrationAPI`

Dessa:

-Hanterar CRUD
-Upprätthåller dataintegritet
-Innehåller enklare domänvalidering
-Exponeras som API:er

---

### Affärstjänster (för jämförelse)

-`Fordon.Registrering`
-`Fordon.Inpasseringskontroll`
-`Fordon.AnsokanBehorighet`

Dessa:

-Orkestrerar flera systemtjänster
-Implementerar affärsregler
-Följer verksamhetsprocesser
-Representerar use cases

---

## Relation mellan dem

Förenklat:

Affärstjänst

→ anropar flera Systemtjänster

→ som i sin tur hanterar sina egna domänobjekt

Exempel:

`Fordon.Inpasseringskontroll`

anropar:

-FordonAPI
-BehörighetAPI
-KontrollAPI
-InstallationAPI
-InpasseringsloggAPI

---

## Systemtjänst i arkitekturtermer

Beroende på arkitekturstil kan en systemtjänst vara:

-En mikroservice
-Ett domän-API i en monolit
-En integrationstjänst mot externt system
-En teknisk plattformstjänst (ex: loggning, identitet)

---

## Viktig distinktion

En systemtjänst är **inte samma sak som en teknisk infrastrukturkomponent**.

Exempel:

|Typ|Exempel|
|---|---|
|Systemtjänst|BehörighetAPI|
|Infrastruktur|Databas, Kafka, API Gateway|

---

## Sammanfattning

En systemtjänst:

-Exponerar systemets funktioner
-Äger data inom sin kontext
-Implementerar teknisk logik och enklare domänvalidering
-Konsumeras av affärstjänster eller andra system

Om du vill kan jag även ge:

-En strikt definition enligt TOGAF
-En definition enligt SOA-principer
-Eller hur begreppet bör användas i en EA-modell (capability vs service vs system service)

Vilket perspektiv är mest relevant för dig?

---