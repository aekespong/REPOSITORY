# Från tjänstelager till semantik och domäner

Du kan förena dem ganska snyggt genom att låta **din tjänstemodell (domäner + systemtjänster + resurstjänster/CRUD)** vara det *operativa kontraktet*, och låta **ontologi/SHACL** vara det *semantiska och styrande kontraktet* ovanpå. Då får du både:

- verksamhetsnära namngivning och “dependency downwards”
- formell semantik, validering och agent-styrning

Här är en sammanhållen modell.

---

## 1) Tre lager som kompletterar varandra

### A. Tjänstelager (ditt huvudperspektiv)

- **Domän**: t.ex. `Fordon`
- **Systemtjänster** (exponeras): komplexa, verksamhetsnära, orkestrerar

- `Fordon.Besiktning.Planeringsschema()`
- `Fordon.Registrering.RegistreraFordon()`
- **Resurstjänster/bastjänster** (interna): CRUD på data objects, *stannar i domänen*

- `Fordon.VehicleResource.Create/Read/Update/Delete`
- `Fordon.InspectionResource.*`

**Regel:** Alla beroenden går “nedåt”: konsument → systemtjänst → resurstjänster.

### B. Semantiskt lager (OWL)

- Definierar begrepp och relationer: `Vehicle`, `Inspection`, `Owner`, …
- Definierar härledda begrepp: t.ex. “Tillåtet i trafik”
- Är *neutral* mot implementation (API/DB)

### C. Valideringslager (SHACL)

- Validerar payloads och dataset:

- “Inspection måste ha exakt ett Vehicle”
- “registrationNumber måste finnas exakt en gång”
- Är perfekt som **gatekeeper** i MCP, API-gateway, event-buss, ETL.

**Poängen:** OWL/SHACL säger *vad som är sant och giltigt*; tjänstelagret säger *hur man gör saker i verksamheten*.

---

## 2) Mappa dina systemtjänster till ontologi: “Service Ontologi” ovanpå domänontologin

Skapa en *liten* ontologi för tjänster (inte bara data), som refererar till domänontologin.

### Grundidé

- En **Systemtjänst** är en “capability-operationalisering”: den

- tar in vissa domänbegrepp (Input)
- producerar vissa domänbegrepp (Output)
- har pre/postconditions (regler)
- En **Resurstjänst** är CRUD kring ett dataobjekt inom domänen.

Du får då en formell koppling:

- `Fordon.Besiktning.Planeringsschema()`

→ *opererar på* `Inspection` (planering) och ev. `TimeSlot`, `Station`, `Vehicle`
- `Fordon.InspectionResource.Create()`

→ CRUD på `Inspection` (domänintern)

Det här gör att agenten kan välja rätt verktyg utifrån semantik, men fortfarande följa dina domängränser.

---

## 3) Så uttrycker du “domängräns + CRUD får inte läcka” med SHACL (styrning)

Det du beskriver är i praktiken **policy/governance**. SHACL kan användas för att validera *API-katalogen / tjänstekatalogen* (inte bara affärsdata).

### Exempel: metadata för tjänster

Anta att varje tjänst (MCP tool/API) har metadata:

- `ex:domain` = `Fordon`
- `ex:serviceType` = `SystemService` eller `ResourceService`
- `ex:exposedToOutside` = true/false
- `ex:dependsOn` = vilka andra tjänster den anropar

Då kan du skriva SHACL-regler som:

1. **ResourceService får inte exponeras**

- “Om serviceType=ResourceService ⇒ exposedToOutside=false”

1. **Endast systemtjänster får vara entrypoints**

- “Allt som har ‘public=true’ måste vara SystemService”

1. **Resurstjänster får bara anropas inom samma domän**

- “Om en konsument utanför domänen anropar en ResourceService ⇒ violation”

Det gör att din arkitekturprincip blir maskinvaliderbar.

---

## 4) Hur “systemtjänster får anropa systemtjänster (även resursnivå)” passar in

Det du beskriver är viktigt: systemtjänster kan samverka tvärdomän, men du vill undvika att någon hoppar över systemtjänstlagret och går direkt på CRUD i fel domän.

Så här förenar du det med ontologi-tänket:

- **Tvärdomän-samverkan sker alltid via systemtjänster** (public kontrakt).
- En systemtjänst kan i sin tur anropa en annan domäns systemtjänst som internt anropar sin resursnivå.
- Om du vill tillåta “resursnivå” tvärdomän *så måste det vara via systemtjänstkontrakt som representerar en resursoperation* (dvs “resursnära systemtjänst”, inte CRUD-endpointen).

I praktiken:

- “resursnivå” i din mening = *fin-granulär systemtjänst* (fortfarande public), inte intern CRUD.

Exempel:

- `Fordon.Besiktning.Planeringsschema()` = systemtjänst (public)
- `Fordon.Besiktning.HämtaBesiktningar(vehicleId)` = systemtjänst (public, resursnära)
- `Fordon.InspectionResource.Read(id)` = resurstjänst (internal)

Det här bevarar din princip men ger flexibilitet.

---

## 5) Kopplingen till EA-verktyg: så modellerar du det utan att tappa semantiken

I LeanIX/BizzDesign kan du representera detta som:

### A. Domän = Business/Data Domain + bounded context

- `Fordon` som domänobjekt (context)

### B. Systemtjänster = “Business Services / Application Services”

- Gruppas i domänen: `Fordon.Besiktning.*`
- Dessa länkas till:

- capabilities (t.ex. “Inspection Planning”)
- processer
- applikationer/API:er

### C. Resurstjänster = “Internal Application Services” / “Data Services”

- Markeras som **internal** och kopplas endast inom domänen
- Länkas direkt till data objects (`Vehicle`, `Inspection`)

### D. Ontologi/SHACL = “Governance artifacts”

- Som arkitekturprinciper, standarder, policies
- Länkas till:

- domänobjekt (data objects)
- API-katalog
- capability-modell
- kvalitetskontroller

Resultat: EA-verktyget blir “kartan”, ontologin blir “betydelsen”, SHACL blir “vakten”.

---

## 6) Hur agentic AI + MCP passar in i din modell

Din modell är faktiskt idealisk för agenter, eftersom den skapar:

- tydliga entrypoints (systemtjänster)
- tydliga domängränser
- minimerad “verktygsflora” (agenten ska inte se CRUD)

**MCP-servern** blir då naturligt:

- Exponera endast systemtjänster som tools
- Hålla resurstjänster privata
- Köra SHACL-validering på input/output
- Använda OWL för begreppsförståelse och härledning

Det minskar risken att agenten gör “fel saker på rätt data”.

---

## 7) En enkel förenad “regelbok” (som du kan skriva i boken)

1. **Domänontologi** definierar begrepp och regler (OWL).
2. **Resurstjänster** implementerar CRUD för domänens dataobjekt, är alltid interna.
3. **Systemtjänster** uttrycker verksamhetsfunktioner, är domänens publika kontrakt.
4. **Endast systemtjänster exponeras**; tvärdomänanrop går via systemtjänster.
5. **SHACL validerar** både affärsdata och tjänstekatalogens governance (exponering, beroenden, domängränser).
6. **EA-verktyget** visar spårbarhet: capability → systemtjänster → applikationer → data objects, med ontologi/SHACL som styrande artefakter.

---

Om du vill kan jag skriva ett konkret exempel med dina namn:

- `Fordon.Besiktning.Planeringsschema()` (systemtjänst)
- interna `Fordon.InspectionResource.*` (CRUD)
- samt SHACL-regler som *maskinellt* förbjuder att någon exponerar `InspectionResource` utanför `Fordon`-domänen.

Säg bara om du vill att jag ska hålla exemplet helt i Turtle eller om du vill ha det även som “EA-notation” (t.ex. tabell: Capability ↔ Systemtjänst ↔ Data Object ↔ Applikation).
