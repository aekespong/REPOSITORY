
# På vilket sätt skiljer sig  en systemtjänst mot en affärstjänst? Finns affärstjänsterna i Domänen eller ännu högre upp?

---

### **ChatGPT**

Det här är en viktig distinktion, och den blandas ofta ihop eftersom orden används olika i olika arkitekturramverk.

Jag delar upp svaret i tre delar:

1.Skillnaden systemtjänst vs affärstjänst
2.Var affärstjänsten “hör hemma” arkitekturellt
3.Hur det kan appliceras på er fordonsdomän

---

# 1️⃣ Skillnaden mellan systemtjänst och affärstjänst

## Systemtjänst

En **systemtjänst**:

- Exponerar funktionalitet från ett system
- Är tekniskt orienterad
- Hanterar data och enklare domänvalidering
- Är oftast CRUD + enklare regler
- Speglar informationsmodellen

Exempel:

-FordonAPI
-BehörighetAPI
-InstallationAPI
-KontrollAPI

Den svarar på frågan:

>“Hur kan andra system komma åt denna systems data och funktioner?”

---

## Affärstjänst

En **affärstjänst**:

-Realiserar en verksamhetsförmåga eller process
-Orkestrerar flera systemtjänster
-Innehåller affärsregler
-Är use-case-orienterad
-Är processorienterad

Exempel:

-Fordon.Registrering
-Fordon.Inpasseringskontroll
-Fordon.AnsokanBehorighet

Den svarar på frågan:

>“Hur utför vi denna verksamhetsuppgift?”

---

## Kort jämförelse

|Dimension|Systemtjänst|Affärstjänst|
|---|---|---|
|Perspektiv|Tekniskt|Verksamhet|
|Fokus|Data & funktion|Process & beslut|
|Regler|Begränsade|Omfattande|
|Äger process|Nej|Ja|
|Orkestrerar andra tjänster|Nej|Ja|
|Synlig för verksamheten|Sällan|Ja|

---

# 2️⃣ Var finns affärstjänsten?

Det beror på vilken arkitekturmodell man använder, men generellt:

## Arkitekturlager (förenklad modell)

Verksamhetslager

→ Affärstjänster

Domänlager

→ Domänmodeller + domänlogik

Applikationslager

→ Use cases / orkestrering

Tekniskt lager

→ Systemtjänster / API

---

## I DDD-termer

-Domänen innehåller:

  -Entiteter
  -Value objects
  -Domänregler
  -Domänhändelser
-Affärstjänsten motsvarar oftast:

  -Application Service (i DDD)

Det vill säga:

Affärstjänsten ligger **ovanför domänmodellen**, men använder domänen.

Den äger inte datamodellen.

Den äger inte nödvändigtvis persistens.

Den koordinerar.

---

# 3️⃣ Applicerat på er fordonsmodell

Ta exempel:

## Systemtjänster (domännära)

-FordonAPI → hanterar Fordon
-BehörighetAPI → hanterar Behörighet
-InstallationAPI → hanterar Installation
-KontrollAPI → hanterar Kontroll

De är domännära och speglar informationsobjekten.

---

## Affärstjänst: Fordon.Inpasseringskontroll

Den:

1.Hämtar fordon
2.Hämtar aktiv behörighet
3.Kontrollerar utrustning
4.Kontrollerar besiktning
5.Loggar beslut

Den implementerar regelverket:

-“Fordon utan giltig brandkontroll får inte köra in”
-“Fordon utan aktiv behörighet nekas”
-“Extern förare kräver särskild koppling”

Det är tydligt mer än CRUD.

Det är ett verksamhetsbeslut.

---

# 4️⃣ Viktig arkitekturell princip

Systemtjänster bör inte känna till processerna.

Affärstjänster bör inte känna till databasen.

Det ger:

-Tydlig separation
-Lättare förändring av regelverk
-Mindre koppling mellan process och lagring

---

# 5️⃣ En vanlig missuppfattning

Man tror ibland att:

Affärstjänst = ligger ovanför alla domäner

Det stämmer inte riktigt.

En affärstjänst är oftast kopplad till en domän (eller ett bounded context).

Men den ligger ovanför entiteterna inom den domänen.

Exempel:

Fordon.Inpasseringskontroll

hör till Access/Vehicle-domänen

men ligger ovanför entiteterna Behörighet, Kontroll, Installation.

---

# 6️⃣ Förenklad mental modell

Domän = Vad finns?

Systemtjänst = Hur kommer vi åt det?

Affärstjänst = Hur använder vi det för att utföra arbete?

---

# 7️⃣ Direkt svar på din fråga

>Finns affärstjänsterna i domänen eller ännu högre upp?

De hör hemma i domänens applikationslager.

De är inte en del av den rena domänmodellen.

Men de är inte heller ett övergripande enterprise-lager.

De ligger:

-Ovanför entiteterna
-Inom samma bounded context
-Och orkestrerar systemtjänster

---

Om du vill kan jag rita ett enkelt lagerdiagram (Mermaid) som visar exakt var:

-Domänmodell
-Systemtjänst
-Affärstjänst

ligger i förhållande till varandra.

---

### **You**

Jag har valt att kalla lägsta nivån av tjänster för ResursAPI. Jag menar att det räcker med en till nivå som har både affärstjänster samt systemtjänster som är baserade på Use Case oftast och som jag valt att kalla Systemtjänst. 

Anledningen är att det ofta är svårt att skilja på alla olika nivåer och svårt att placera en viss tjänst. På liknande sätt har jag slagit ihop Bounded Context och Domän med betydelsen verksamhetsdomän.

---

### **ChatGPT**

Det du beskriver är ett fullt rimligt arkitekturval — och det är ofta mer praktiskt än att försöka vara strikt teoretisk.

Du har i princip gjort tre förenklingar:

1.Slagit ihop *bounded context* och *domän* → “verksamhetsdomän”
2.Kallat lägsta nivån för **ResursAPI**
3.Slagit ihop affärstjänster och systemtjänster till en gemensam use case-nivå → **Systemtjänst**

Det är inte fel. Det är en medveten abstraktionsreduktion.

Låt oss analysera konsekvenserna strukturerat.

---

# 1️⃣ Din föreslagna struktur

Du har i praktiken detta:

Verksamhetsdomän

→ Systemtjänster (use case-baserade)

→ ResursAPI (CRUD på informationsobjekt)

Det är en tvånivåmodell inom varje domän.

Det är arkitektoniskt konsekvent.

---

# 2️⃣ Vad du vinner

## ✔ Tydligare begrepp

Istället för:

-Domänservice
-Applikationsservice
-Affärstjänst
-Systemtjänst
-Integrationstjänst

…har du två begrepp.

Det minskar begreppsförvirring.

---

## ✔ Enklare styrning

Det blir tydligt:

ResursAPI

→ äger data och informationsobjekt

Systemtjänst

→ realiserar use case

---

## ✔ Mindre teoretisk överlast

I praktiken är det ofta svårt att avgöra om något är:

-“affärstjänst”
-“applikationsservice”
-“domänservice”

Särskilt i enterprise-miljöer där DDD inte är strikt implementerat.

Din modell är mer pragmatisk.

---

# 3️⃣ Vad du måste vara tydlig med

När man förenklar nivåer blir gränserna ännu viktigare.

Det som måste vara konsekvent:

### ResursAPI

-Exponerar enbart ett resursansvar
-Ingen orkestrering
-Inga processflöden
-Begränsad regelmängd
-CRUD + enkel validering

Exempel:

-FordonResursAPI
-BehörighetResursAPI
-InstallationResursAPI

---

### Systemtjänst (i din modell)

-Är use case-orienterad
-Får orkestrera flera ResursAPI
-Får implementera affärsregler
-Är processnära

Exempel:

-RegistreraFordon
-GodkännInpassering
-AnsökBehörighet

Det är här affärslogiken ligger.

---

# 4️⃣ Risk om man inte är tydlig

Det som annars händer är:

-ResursAPI börjar innehålla use case-logik
-Systemtjänster börjar duplicera logik
-Eller man får cirkulära beroenden

Så förenkling fungerar — men kräver disciplin.

---

# 5️⃣ Om att slå ihop Bounded Context och Domän

Det är också vanligt i större organisationer.

Rent DDD-mässigt är:

-Domän = problemområde
-Bounded Context = språklig och modellmässig avgränsning

Men i praktiken sammanfaller de ofta.

Om ni använder:

Verksamhetsdomän = äger:

-Informationsmodell
-ResursAPI
-Systemtjänster

Då är det en fullt fungerande modell.

---

# 6️⃣ Din modell jämfört med “klassisk” DDD

Klassisk modell:

Domänmodell

→ Domänservice

→ Applikationsservice

→ API

Din modell:

ResursAPI

→ Systemtjänst

Du har slagit ihop:

-Applikationsservice
-Affärstjänst
-Domänservice

Till ett begrepp: Systemtjänst.

Det är en medveten förenkling, inte ett misstag.

---

# 7️⃣ När din modell är särskilt bra

Den fungerar mycket bra när:

-Man jobbar API-first
-Man har tydlig informationsmodell
-Man har integrationsfokus
-Man inte kör strikt DDD med aggregates etc.

Den är också lättare att kommunicera i EA-sammanhang.

---

# 8️⃣ En viktig fråga

Det avgörande är egentligen:

👉 Får en Systemtjänst anropa en annan Systemtjänst i samma domän?

Om ja → du har ett orkestreringslager.

Om nej → varje Systemtjänst är ett självständigt use case.

Det påverkar arkitekturens komplexitet.

---

# 9️⃣ Min professionella bedömning

Din modell är:

-Konsekvent
-Förenklad
-Praktiskt användbar
-EA-vänlig
-Lättare att förvalta organisatoriskt

Den är mindre akademiskt ren DDD —

men ofta mer realistisk i enterprise-miljö.

---

Om du vill kan jag:

-Rita din modell i ett tydligt lagerdiagram
-Hjälpa dig formulera en arkitekturprincip som definierar ResursAPI vs Systemtjänst
-Eller hjälpa dig formulera en tydlig definition att använda i styrande dokument

Vad är syftet — metodramverk, styrdokument eller konkret lösningsdesign?

---

### **You**

Ja, i min modell får en systemtjänst anropa inte bara systemtjänster i sin egen domän utan även systemtjänster inom andra domäner. Den har ett tydligt ansvar för orkestrering.

---

### **ChatGPT**

Det är en tydlig och konsekvent modell: dina **Systemtjänster** är i praktiken ett **orkestrerings-/use-case-lager** som kan koordinera flera domäner. Det funkar bra, men då behöver du några enkla “guardrails” så att det inte glider över i spagetti eller hård koppling mellan domäner.

## Konsekvenser av att Systemtjänster får anropa andra domäner

### Vad det innebär

-En Systemtjänst blir en *process-/use-case-realiserare* (typ “application service/orchestrator”).
-ResursAPI blir era *domän-resurser* (CRUD + enkel invariants).
-Domängränserna blir mer *organisatoriska* än strikt modellmässiga, eftersom orkestreringen korsar dem.

### Vanliga risker

-För stark synkron koppling mellan domäner (kedjor av REST-anrop).
-Dubblerad logik (samma regel implementeras i flera orkestratörer).
-Oklara ansvar: “var ska regeln ligga?”.
-Svårare att förändra kontrakt mellan domäner utan dominoeffekt.

Det går att hantera med ett par tydliga principer.

---

## Rekommenderade principer för din modell

### 1) Ett “äge”-ansvar per informationsobjekt

Varje informationsobjekt har **en ägande domän** och **ett ResursAPI** som är “source of truth”.

-Andra domäner får inte skriva direkt i din databas (självklart), och helst inte heller “spegel-CRUD:a” samma objekt.

**Regel:** *All mutation av en domäns data sker via dess ResursAPI.*

---

### 2) Orkestrering ligger i Systemtjänst – men invariants ligger i ResursAPI

För att slippa att affärregler sprids okontrollerat:

-**ResursAPI**: äger domänens *invariansregler* (sånt som alltid måste vara sant).

  -ex: “Behörighet måste ha giltigTill \> giltigFrom”
  -ex: “Fordon kan inte aktiveras om status=AVREGISTRERAD”
-**Systemtjänst**: äger *processregler och flöden* (use case).

  -ex: “Vid registrering av internt fordon: skapa asset + sätt roller + synka”
  -ex: “Vid inpassering: kontrollera behörighet + kontroll + installation + logga”

**Tumregel:** om regeln gäller oavsett use case → ResursAPI. Om regeln gäller ett specifikt flöde → Systemtjänst.

---

### 3) “Upstream/Downstream”-styrning mellan domäner

När Systemtjänster korsar domäner behöver ni bestämma vilka domäner som är:

-**Upstream (äger begrepp/kontrakt)**
-**Downstream (konsumerar kontrakt)**

**Regel:** *Downstream anpassar sig. Upstream hålls stabilt och versionshanteras.*

Det här är extra viktigt om Systemtjänster anropar varandra ofta.

---

### 4) Begränsa anropskedjor (max 1–2 hopp)

När en Systemtjänst kan anropa andra Systemtjänster finns en risk att det blir långa kedjor.

**Praktisk regel:**

-Tillåt orkestrering, men undvik mer än 1–2 synkrona hopp i samma request.
-För längre kedjor: använd event/async eller “saga”-mönster.

---

### 5) Två typer av Systemtjänster (samma nivå, men olika roll)

Du kan behålla *en nivå* och ändå få tydlighet genom att typa dem:

1.**Domän-Systemtjänst (Use Case inom domänen)**

-t.ex. `Fordon.Registrering`, `Fordon.Besiktning`

1.**Orkestrerande Systemtjänst (Cross-domain / end-to-end)**

-t.ex. `Tillstand.InpasseringBeslut` eller `Grind.Beslut`
-Koordinerar Fordon + Behörighet + Utrustning + Kontroll

De är fortfarande “Systemtjänster” hos dig, men du märker dem som *Domän* vs *Orkestrering* för att undvika otydliga gränser.

---

## Var “hör” då orkestreringen hemma?

I din modell kan orkestrering ligga:

-i **en domän** som har end-to-end-ansvaret (t.ex. “Inpassering” som egen verksamhetsdomän), eller
-i en **tvärdomänsdomän** (en ren “Process/Case”-domän), ibland kallad *Journey/Flow-domän*.

### Bra tumregel

Om ett flöde:

-har eget vokabulär,
-har egen livscykel (logg, beslut, regler),
-och involverar många domäner,

…då är det ofta värt att göra **en egen domän** för orkestreringen (t.ex. “Inpassering”).

---

## Konkret exempel i ert fordonscase

`Fordon.Inpasseringskontroll` (din Systemtjänst) anropar:

-`FordonResursAPI` (fordonsstatus, kategori)
-`BehörighetResursAPI` (aktiv behörighet för område)
-`InstallationResursAPI` (tagg aktiv)
-`KontrollResursAPI` (brand/avgas giltig)
-`InpasseringsloggResursAPI` (append log)

Det är klassisk orkestrering. Bra.

Om detta flöde blir centralt och växer (många grindtyper, undantag, realtid, externa system), kan du senare bryta ut en domän “Inpassering” utan att ändra grundprinciperna.

---

## Förslag på korta definitioner (så ni kan skriva in i styrning)

**ResursAPI**

>Äger ett informationsobjekt och exponerar CRUD + invariansregler. Ingen orkestrering.

**Systemtjänst**

>Use case-/processorienterad tjänst som orkestrerar ResursAPI och andra Systemtjänster (även över domängränser) för att realisera ett end-to-end-flöde och dess affärsregler.

---

Om du vill kan jag rita ett litet Mermaid-diagram som visar **dina två nivåer** samt hur en orkestrerande Systemtjänst korsar 3 domäner (med pilar och ansvar).

---

### **You**

Jag gillar delar av det du skriver. Jag kan tänka mig ytterligare en typ av systemtjänst som heter Orkestrering. Det är den enda typen av tjänst som får gå Cross-Domain. 

---

### **ChatGPT**

Det är en bra skärpning. Om du inför **Orkestrering** som en *specialtyp* av systemtjänst och gör den till **enda** tillåtna cross-domain-konsumenten så får du:

-tydliga domängränser
-kontrollerad koppling mellan domäner
-enklare governance (“vem får prata med vem?”)
-mindre risk för kedjor av anrop

Här är ett konkret sätt att definiera modellen så den blir lätt att använda.

## 1) Dina tjänstetyper och ansvar

### A) ResursAPI (lägsta nivån)

**Ansvar**

-Äga informationsobjekt (source of truth)
-CRUD + invariants (regler som alltid gäller för objektet)

**Får anropa**

-Endast egna databaser/komponenter, ev. tekniska plattformstjänster

**Får INTE**

-Orkestrera processer
-Kalla andra domäner

---

### B) Systemtjänst (use case inom domänen)

**Ansvar**

-Realisera use cases *inom* en verksamhetsdomän
-Orkestrera **ResursAPI inom samma domän**
-Innehålla processregler för domänens use cases

**Får anropa**

-ResursAPI i samma domän
-(ev.) tekniska plattformstjänster (logg, IAM, köer)

**Får INTE**

-Anropa andra domäners ResursAPI eller Systemtjänster

---

### C) Orkestrering (cross-domain use case)

**Ansvar**

-End-to-end-flöden som spänner över flera domäner
-Koordinera *domänernas* Systemtjänster (eller ResursAPI om ni tillåter det, men jag rekommenderar Systemtjänst)

**Får anropa**

-Systemtjänster i flera domäner (och ev. vissa ResursAPI om ni vill)
-Publicera events / starta sagas

**Får INTE**

-Äga masterdata för domänerna (den ligger kvar i ResursAPI)
-“Smita runt” domänens regler genom att skriva direkt i data (ska gå via domänens tjänster)

---

## 2) Nyckelprincip: Cross-domain sker via stabila kontrakt

Om Orkestrering ska vara enda cross-domain-aktören, blir det viktigt att den pratar med domänerna via **stabila use case-kontrakt**.

**Rekommendation**

-Orkestrering anropar **Systemtjänster** (use case-API)
-Systemtjänster anropar sina **ResursAPI** internt

Så Orkestrering slipper känna till interna entiteter och CRUD-detaljer.

---

## 3) Vem ska Orkestrering prata med: Systemtjänst eller ResursAPI?

Det finns två varianter:

### Variant 1 (striktast, oftast bäst)

**Orkestrering → Systemtjänst (per domän) → ResursAPI**

- -Minst coupling
- -Domänen skyddar sina regler
- -Lättare versionshantering
-– Kräver att domänerna har bra use case-API:er

### Variant 2 (mer “EA-pragmatisk”)

**Orkestrering → ResursAPI i flera domäner**

- -Färre lager i små lösningar
-– Orkestrering blir snabbt för “insatt” i intern data
-– Risk att invariants/processlogik hamnar fel

Om du inför Orkestrering-typen just för att få ordning, skulle jag välja Variant 1 som default.

---

## 4) Mermaid: enkel relationsbild av din modell

```
Mermaid
```

---

## 5) Praktiska “guardrails” (enkla regler att sätta i styrning)

1.**Endast Orkestrering får vara cross-domain.**
2.**Systemtjänst får bara prata inom egen domän.**
3.**ResursAPI får inte orkestrera.**
4.**Orkestrering får inte äga domänens data** (bara koordinera).
5.**Max 1 synkront “hopp” från Orkestrering per domän** (undvik kedjor). För längre flöden: events/saga.

---

## 6) Exempel i ert fordonscase

-**ResursAPI**: FordonResursAPI, BehörighetResursAPI, InstallationResursAPI, KontrollResursAPI, OmrådeResursAPI
-**Systemtjänster (inom domän)**: Fordon.Registrering, Fordon.Besiktning, Behörighet.Ansokan, Utrustning.Installation
-**Orkestrering (cross-domain)**: Inpassering.Beslut (koordinerar Fordon + Behörighet + Kontroll + Utrustning + Logg)

---

Om du vill kan jag hjälpa dig skriva en kort **klassificeringsguide** (“om tjänsten gör X → den är ResursAPI/Systemtjänst/Orkestrering”) + namngivningsstandard som passar din terminologi.

---

### **You**

Jag har ett tillägg som kallas om Intention.  När man bestämmer Use Case för en viss roll och vill ha full kontroll så kan det behövas flera olika tjänster som är snarlika. Om man tänker sig tjänsten HämtaAnställda() är inte tillräcklig. Den är ett slags Use Case, men den uttrycker inte intentionen, dvs Varför ska du hämta Anställda?

---

### **ChatGPT**

Det du är ute efter är i praktiken “**intention-revealing APIs**”: samma underliggande data (Anställda) kan behöva exponeras via flera snarlika use cases som skiljer sig i **syfte**, **policy**, **filter**, **behörighet**, **fälturval**, **auditing** och **SLA**. Då räcker inte ett generiskt `HämtaAnställda()`.

## Varför “intention” är en bra idé

Ett generellt use case som “hämta” blir snabbt otydligt:

-Vem frågar? (roll)
-Varför? (syfte)
-Vilka regler gäller? (policy)
-Vilken minsta data behövs? (data-minimering)
-Vilket filter är tillåtet? (risk för dataläckage)
-Ska det loggas extra? (audit)
-Är det batch eller realtid? (prestanda)

Genom att uttrycka intention i tjänstekontraktet kan du få **full kontroll** och samtidigt göra tjänsten lättare att styra och förvalta.

---

## Hur du kan modellera “Intention” i din tjänstestruktur

### Alternativ A: Intention i tjänstens namn (rekommenderat för tydlighet)

I stället för:

-`HämtaAnställda(filter)`

Gör:

-`HämtaAnställdaFörRollTilldelning(...)`
-`HämtaAnställdaFörBehörighetsgranskning(...)`
-`HämtaAnställdaFörKontaktVidBesöksfordon(...)`

Då blir intentionen del av kontraktet och styrning blir enkel.

**Bra när:** du vill ha tydliga, separata use cases och tydlig governance.

---

### Alternativ B: Intention som parameter (flexibelt men risk)

-`HämtaAnställda(intention="RollTilldelning", ...)`

**Fördel:** färre endpoints/metoder

**Nackdel:** intentionen blir “soft”, kan missbrukas, och implementationen blir ofta en stor switch-sats.

**Bra när:** du måste hålla nere API-ytan, men vill fortfarande styra policy.

---

### Alternativ C: Intention som resurs/kontrakt (för hård styrning)

Skapa egna “query-resurser” per intention, typ:

-`GET /anstallda/rollkandidater?...`
-`GET /anstallda/behorighetsgranskare?...`
-`GET /anstallda/kontaktpersoner?...`

Det gör att varje endpoint kan ha egen policy och eget fälturval.

**Bra när:** säkerhet, audit och data-minimering är viktiga.

---

## Hur detta passar i din modell (ResursAPI / Systemtjänst / Orkestrering)

-**ResursAPI (Anställd)** ska vara generiskt och domännära (CRUD/query), men helst inte exponeras brett om det riskerar dataläckage.
-**Systemtjänst** är rätt nivå för intention: den är use case-orienterad och kopplad till roll/process.
-**Orkestrering** kan använda intentionella systemtjänster från flera domäner, men bör inte själv “uppfinna” nya läsvarianter av Anställd om de är domänspecifika.

Så ja: *Intention hör hemma på Systemtjänst-nivån (och ibland Orkestrering), inte i ResursAPI.*

---

## Konkreta mönster för “intention” (praktiskt)

### 1) Namnstandard som gör intention synlig

Exempel:

-`Anstalld.HamtaKandidaterForFordonsRoll(...)`
-`Anstalld.HamtaSakerhetsansvarigaForOmrade(omradeId)`
-`Anstalld.HamtaKontaktpersonForBesok(kontaktLkid)` (eller validera kontakt)

Det är tydligt *varför*.

---

### 2) Kontrakt per intention = policy per intention

Varje intention styr:

-Tillåtna filter (ex. bara prefix-sök på namn)
-Max antal resultat
-Fältmask (ex. visa inte personnummer)
-Behörighetskrav
-Auditnivå

Det blir lätt att granska: “den här use caset exponerar bara X”.

---

### 3) Output som “View Model”, inte domänobjekt

Returnera inte “Anställd full”. Returnera en vy:

-`RollKandidat { lkid, displayName, enhet, ansvarstyp }`
-`KontaktVy { lkid, displayName, telefon }`

Det är ofta den viktigaste effekten av intention: du styr *vilken data* som får lämna tjänsten.

---

## Exempel: från otydligt till intentionellt

**Otydligt**

-`HämtaAnställda(searchText) -> Anställd[]`

**Intentionellt**

-`HämtaKandidaterFörUnderhållsansvar(fordonId, searchText) -> RollKandidat[]`

  -filtrerar till tillåtna organisatoriska enheter
  -returnerar bara lkid + visningsnamn + enhet
  -loggar audit “tilldelning av ansvar”

---

## Min rekommendation (om du vill ha “full kontroll”)

Gör intention till **första klassens begrepp** och driv det genom:

1.**Systemtjänst-namn och kontrakt** är intentionella
2.**Varje intention har egen output-vy**
3.**Policy per intention** (fält, filter, audit, behörighet)

Det ger maximal styrbarhet utan att behöva fler abstraktionsnivåer.

---

Vill du att jag hjälper dig formulera en **namnstandard** för intention, typ:

`<Domän>.<Intention/UseCase>` + operationer som verb

och en mall för hur ni dokumenterar intention (syfte, roll, policy, fältmask, audit, SLA)?

---

### **You**

Ytterligare en nivå under tjänstenivån är "endpoints". De kan också namnsättas bra. Vad är rekommendationen kring den? Det finns risk för överlappning med tjänsternas namn

---

### **ChatGPT**

Bra uppdelning. Det vanligaste problemet när man både har **tjänster** (logiska use cases) och **endpoints** (HTTP/tech-kontrakt) är att man råkar döpa dem så lika att de ser ut som samma sak – eller att man låter endpoint-namn styra designen.

Här är en praktisk rekommendation som minimerar överlappning och ändå ger tydliga endpoint-namn.

## Grundprincip

-**Tjänstnamn**: uttrycker *use case + intention* (verksamhetsspråk).
-**Endpoint**: uttrycker *API-kontrakt* (resurs, action, query) och ska vara konsekvent, versionsbar och klientvänlig.

Det är okej att de liknar varandra semantiskt, men de ska inte vara identiska “på radnivå”.

---

## Rekommendation 1: Namnge tjänster som “verb/intention” – endpoints som “substantiv/resurs”

Det här är den mest robusta separationen.

### Exempel

**Tjänst (Systemtjänst/Orkestrering)**

-`Inpassering.BeslutaInpassering`
-`Fordon.RegistreraInterntFordon`
-`Behorighet.GranskaOchBesluta`

**Endpoints**

-`POST /inpassering/beslut`
-`POST /fordon/registrering/internt`
-`POST /behorigheter/{id}/beslut`

Du får:

-Tjänst = intentionellt verb
-Endpoint = API-stil

---

## Rekommendation 2: Ha två endpoint-stilar beroende på typ av tjänst

### A) ResursAPI endpoints (RESTiga)

Här är det normalt att vara “ren” REST:

-`POST /fordon`
-`PATCH /fordon/{id}`
-`GET /fordon?registreringsnummer=...`

### B) Systemtjänst/Orkestrering endpoints (use case endpoints)

För dessa är “RPC-ish” ofta bättre, eftersom det är *aktioner*:

-`POST /fordon/registrering:registrera-internt`
-`POST /inpassering:besluta`
-`POST /behorighet:ansok`
-`POST /behorighet/{id}:fornya`

**Varför?** Du undviker att låtsas att use cases är resurser. Du gör dem till kommandon.

Om ni inte gillar kolon-syntax kan ni köra:

-`POST /inpassering/beslut`
-`POST /fordon/registrering/internt`

---

## Rekommendation 3: Gör endpoint-namn kortare än tjänstnamn

Tjänstnamnet kan vara “pedantiskt tydligt”, endpointen ska vara *praktisk*.

Exempel:

-Tjänst: `Anstalld.HamtaKandidaterForUnderhallsansvar`
-Endpoint: `GET /anstallda/kandidater/underhall?fordonsId=...&q=...`

Tydligt, men inte överdrivet långt.

---

## Rekommendation 4: Separera “service identity” från “operation”

Om du har risk för krockar mellan namn:

-Tjänstidentitet: `Fordon.Registrering`
-Operation: `registreraInterntFordon`

Endpoint:

-Bas: `/fordon/registrering`
-Operation: `/internt` eller `:registrera-internt`

Så endpointen matchar tjänstens “namespace”, men operationen hålls i en annan del av URL:en.

---

## Rekommendation 5: Konsekvent mappning (en enkel regel)

Välj en mappningsregel och håll den:

### För Systemtjänst/Orkestrering

`/<domän>/<capability>/<action>`

Ex:

-`/fordon/registrering/internt`
-`/fordon/avregistrering/initiera`
-`/inpassering/beslut`
-`/behorighet/ansokan/internt`
-`/behorighet/{id}/fornyelse`

### För ResursAPI

`/<resurs>` + standard-CRUD

Ex:

-`/fordon`
-`/behorigheter`
-`/installationer`
-`/kontroller`

Det gör att man *ser* på URL:en om det är ResursAPI eller “use case”.

---

## Överlappning: när är den okej?

Det är helt okej att endpointen “liknar” tjänsten eftersom den representerar samma sak.

Det du vill undvika är:

-att endpointen **exakt duplicerar** tjänstnamnet i samma form (t.ex. `/Fordon.Registrering/registreraInterntFordon`)
-att endpointen blir “intern kod” istället för publik API-design

---

## Praktiskt förslag för er terminologi (som policy)

1.**Tjänster** namnges alltid: `<Domän>.<Intention/Capability>`
2.**Endpoints** namnges alltid i URL-form:

  -ResursAPI: `/resurser...`
  -Systemtjänst: `/domän/capability/action...`
  -Orkestrering: `/orkestrering/<journey>/<action>...` eller `/journeys/<journey>/<action>...`

Så kan du göra “cross-domain” synligt även på endpointnivå.

---

## Exempel: tydlig skillnad i praktiken

-Tjänst: `Orkestrering.Inpassering.Besluta`

  -Endpoint: `POST /orkestrering/inpassering/beslut`
-Tjänst: `Fordon.Registrering`

  -Endpoint: `POST /fordon/registrering/internt`
-ResursAPI: `FordonResursAPI`

  -Endpoint: `POST /fordon`

Det överlappar semantiskt, men inte formmässigt.

---

Om du vill kan jag ta 5–7 av era konkreta tjänster (Registrering, Inpassering, AnsökanBehörighet, Besiktning, Utrustning, Avregistrering) och föreslå en komplett **endpoint-karta** med konsekvent namnsättning enligt din modell.

---

### **You**

ja

---

### **ChatGPT**

Här är en komplett **endpoint-karta** för 7 av era tjänster, enligt din modell:

-**ResursAPI** = domänobjekt/CRUD (lägsta nivån)
-**Systemtjänst** = use case *inom* domänen
-**Orkestrering** = enda typen som får vara cross-domain

Jag använder en konsekvent URL-standard så att man direkt ser “vilken nivå” man anropar.

---

# 1) Rekommenderad URL-standard

## ResursAPI (CRUD)

**Bas:** `/api/v1/<resurs>`

-Substantiv i plural
-Standard-HTTP verb

Ex: `/api/v1/fordon`, `/api/v1/behorigheter`

## Systemtjänst (use case inom domän)

**Bas:** `/api/v1/<doman>/<capability>/<action>`

-Domän + capability som “namespace”
-Action = verb (kebab-case)

Ex: `/api/v1/fordon/registrering/registrera-internt`

## Orkestrering (cross-domain)

**Bas:** `/api/v1/orkestrering/<journey>/<action>`

-Gör cross-domain synligt i URL:en (bra för styrning)

Ex: `/api/v1/orkestrering/inpassering/besluta`

>Alternativ (om ni hellre vill undvika ordet orkestrering): `/api/v1/journeys/<journey>/<action>`

---

# 2) ResursAPI – endpointkarta (domän-CRUD)

### Fordon & ägande

|ResursAPI|Endpoints (exempel)|
|---|---|
|Fordon|`POST /api/v1/fordon` • `GET /api/v1/fordon/{id}` • `GET /api/v1/fordon?registreringsnummer=` • `PATCH /api/v1/fordon/{id}` • `POST /api/v1/fordon/{id}:aktivera` • `POST /api/v1/fordon/{id}:inaktivera`|
|Ägare|`POST /api/v1/agare` • `GET /api/v1/agare/{id}` • `GET /api/v1/agare?orgEllerPersonNr=` • `PATCH /api/v1/agare/{id}`|
|Förare|`POST /api/v1/forare` • `GET /api/v1/forare/{id}` • `GET /api/v1/forare?lkid=` • `PATCH /api/v1/forare/{id}`|

### Behörighet & inpassering

|ResursAPI|Endpoints (exempel)|
|---|---|
|Behörighet|`POST /api/v1/behorigheter` • `GET /api/v1/behorigheter/{id}` • `GET /api/v1/behorigheter?fordonsId=` • `PATCH /api/v1/behorigheter/{id}`|
|Inpasseringslogg|`POST /api/v1/inpassering/loggar` • `GET /api/v1/inpassering/loggar?fordonsId=`|

### Kontroll & verkstad

|ResursAPI|Endpoints (exempel)|
|---|---|
|Kontroll|`POST /api/v1/kontroller` • `GET /api/v1/kontroller/{id}` • `GET /api/v1/kontroller?fordonsId=&typ=` • `GET /api/v1/kontroller/nastautgang?fordonsId=`|
|Verkstad|`GET /api/v1/verkstader` • `GET /api/v1/verkstader/{id}` • (ev) `POST /api/v1/verkstader` • `PATCH /api/v1/verkstader/{id}`|

### Utrustning & spårning

|ResursAPI|Endpoints (exempel)|
|---|---|
|Utrustningstyp|`GET /api/v1/utrustningstyper` • `GET /api/v1/utrustningstyper/{id}`|
|Installation|`POST /api/v1/installationer` • `PATCH /api/v1/installationer/{id}` • `GET /api/v1/installationer?fordonsId=`|
|Tagg|`GET /api/v1/taggar/{id}` • `GET /api/v1/taggar?taggKod=`|
|MobilarisEnhet|`GET /api/v1/mobilaris-enheter/{id}` • `GET /api/v1/mobilaris-enheter?macadiAdress=`|

### Områden & organisation

|ResursAPI|Endpoints (exempel)|
|---|---|
|Område|`GET /api/v1/omraden` • `GET /api/v1/omraden/{id}`|
|Anställd/Identitet|`GET /api/v1/anstallda?lkid=` • `GET /api/v1/anstallda/{lkid}`|

### Integrationer

|ResursAPI / Integration|Endpoints (exempel)|
|---|---|
|AssetIntegration (IFS)|`POST /api/v1/assets` • `PATCH /api/v1/assets/{id}:avveckla`|
|MobilarisIntegration|`POST /api/v1/mobilaris:sync-enhet` • `GET /api/v1/mobilaris/position?fordonsId=`|

---

# 3) Systemtjänster – endpointkarta (use case inom domän)

Här tar jag era sju business services och gör dem till **Systemtjänst-endpoints** (inom domänen “fordon”, “behorighet”, “utrustning”, “besiktning”).

## S-01 Fordon.Registrering

|Operation|Endpoint|
|---|---|
|Registrera internt fordon|`POST /api/v1/fordon/registrering/registrera-internt`|
|Registrera externt fordon|`POST /api/v1/fordon/registrering/registrera-externt`|
|Komplettera uppgifter|`PATCH /api/v1/fordon/registrering/{fordonsId}/komplettera`|

## S-02 Fordon.Utrustningsinstallation

|Operation|Endpoint|
|---|---|
|Planera installation|`POST /api/v1/utrustning/installation/planera`|
|Registrera genomförd installation|`POST /api/v1/utrustning/installation/registrera-genomford`|
|Markera utrustning borttagen|`POST /api/v1/utrustning/installation/{installationId}/markera-borttagen`|

## S-03 Fordon.Besiktning

|Operation|Endpoint|
|---|---|
|Boka besiktning|`POST /api/v1/besiktning/bokning/boka`|
|Registrera genomförd besiktning|`POST /api/v1/besiktning/registrering/registrera-genomford`|
|Hämta besiktningsstatus|`GET /api/v1/besiktning/status?fordonsId=`|

## S-04 Fordon.AnsokanBehorighet

|Operation|Endpoint|
|---|---|
|Ansök behörighet internt fordon|`POST /api/v1/behorighet/ansokan/ansok-internt`|
|Ansök behörighet externt fordon|`POST /api/v1/behorighet/ansokan/ansok-externt`|
|Granska & besluta|`POST /api/v1/behorighet/beslut/{behorighetId}/besluta`|
|Förnya behörighet|`POST /api/v1/behorighet/fornyelse/{behorighetId}/fornya`|

## S-05 Fordon.Inpasseringskontroll (OBS: om du vill hålla cross-domain borta från Systemtjänst, se Orkestrering nedan)

Om ni vill ha den som **domänintern systemtjänst** (t.ex. om “Inpassering” är en egen verksamhetsdomän):

|Operation|Endpoint|
|---|---|
|Kontrollera inpassering|`POST /api/v1/inpassering/kontroll/besluta`|

## S-06 Fordon.Besoksfordon

|Operation|Endpoint|
|---|---|
|Registrera besöksfordon & ansök|`POST /api/v1/besok/fordon/registrera-och-ansok`|
|Avsluta besöksbehörighet|`POST /api/v1/besok/behorighet/{behorighetId}/avsluta`|

## S-07 Fordon.Avregistrering

|Operation|Endpoint|
|---|---|
|Initiera avregistrering|`POST /api/v1/fordon/avregistrering/{fordonsId}/initiera`|
|Slutför avregistrering|`POST /api/v1/fordon/avregistrering/{fordonsId}/slutfor`|

---

# 4) Orkestrering – endpointkarta (cross-domain)

Om du inför tjänstetypen **Orkestrering** som enda cross-domain-nivå, rekommenderar jag att ni lyfter de verkligt tvärgående flödena hit.

## Journey: Inpassering

|Orkestrerat use case|Endpoint|
|---|---|
|Besluta inpassering (E2E)|`POST /api/v1/orkestrering/inpassering/besluta`|
|Logga passage (om separat)|`POST /api/v1/orkestrering/inpassering/logga`|

**Denna orkestrering koordinerar typiskt:**

-Fordon (status/kategori)
-Behörighet (aktiv för område)
-Utrustning (tagg aktiv)
-Besiktning/Kontroll (giltighet)
-Inpasseringslogg

## Journey: Registrering av internt fordon (E2E)

Om ni vill inkludera IFS/Asset, roller, mm:

|Orkestrerat use case|Endpoint|
|---|---|
|Registrera internt fordon E2E|`POST /api/v1/orkestrering/fordon/registrera-internt`|

(Orkestrering anropar `Fordon.Registrering` + `AssetIntegration` + ev. `Anstalld`-lookup.)

## Journey: Avregistrering (E2E)

|Orkestrerat use case|Endpoint|
|---|---|
|Avregistrera fordon E2E|`POST /api/v1/orkestrering/fordon/avregistrera`|

---

# 5) Så undviker du krock mellan tjänstnamn och endpointnamn

**Regel som brukar fungera:**

-Tjänstens namn får vara “långt och exakt” (för modellstyrning).
-Endpointen är “kort och konsekvent”.

Exempel:

-Tjänst: `Behorighet.GranskaOchBeslutaBehorighet`
-Endpoint: `POST /api/v1/behorighet/beslut/{id}/besluta`

Semantiskt nära, men inte samma sträng.

---

# 6) En snabb checklista för namngivning

**Endpoints ska:**

-använda **kebab-case** för actions
-hålla **substantiv för resurser**, **verb för actions**
-undvika att läcka intern struktur (klassnamn, paket, punktnotation)
-ha ett konsekvent “namespace” per domän/capability

---

Om du vill kan jag nästa steg göra en **”routing-tabell”** som mappar:

**Orkestrering → Systemtjänster → ResursAPI**

för ett specifikt flöde (t.ex. Inpassering eller Registrering internt), så man tydligt ser vem som anropar vad.

---
