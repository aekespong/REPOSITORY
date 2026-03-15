# Ett vanligt problem

Om man inte skiljer på detta får man:

- för många exponerade API:er
- svår versionering
- stark koppling mellan klienter och interna system

Därför använder man ofta en gateway eller API-plattform.

--- 

💡 Intressant nog är detta också en anledning till att arkitekturer ibland upplevs **onödigt komplexa**: nästan varje lager använder samma teknik (REST/HTTP), så det ser ut som om de gör samma sak — trots att deras **arkitekturansvar egentligen är helt olika**.

--- 

Om du vill kan jag också visa något som många arkitekter tycker är förvånande:

**varför integrationstjänster nästan alltid växer snabbare än domäntjänster i stora organisationer.** Det säger mycket om hur verkliga arkitekturer utvecklas.

--- 

### **You**

Beskriv 

--- 

### **ChatGPT**

Det är ett ganska välkänt mönster i stora organisationer: **integrationstjänster tenderar att växa mycket snabbare än domäntjänster**. Det beror inte på att arkitekter planerar det så, utan på hur verkliga IT-miljöer fungerar.

Det finns några tydliga mekanismer bakom detta.

--- 

## 1. Antalet system växer snabbare än antalet domäner

En organisation har oftast **relativt få affärsdomäner** men **många system**.

Exempel:

Domäner:

- kund
- order
- faktura
- betalning

Men system kan vara:

- ERP
- CRM
- fakturahantering
- betalningsgateway
- data warehouse
- partnerplattform
- mobilappar
- externa API:er

Varje nytt system skapar nya integrationer.

```
Domain services: 4–10Integration services: 20–200
```

--- 

## 2. Varje system kräver anpassning

Standardsystem är sällan designade för organisationens exakta modell.

Därför behöver man ofta:

- datamappning
- protokollöversättning
- säkerhetsanpassning
- formatkonvertering

Detta implementeras ofta i ett **anti-corruption layer** enligt

Anti-Corruption Layer.

Resultatet blir fler integrationstjänster.

--- 

## 3. Organisationen skapar integrationer snabbare än nya domäner

Affärsdomäner förändras ganska långsamt.

Men organisationer gör ständigt saker som:

- byter leverantörer
- kopplar på nya partners
- inför nya SaaS-system
- bygger nya kanaler

Varje sådan förändring kräver nya integrationer.

--- 

## 4. Integrationer är ofta lokala lösningar

Domäntjänster designas ofta mer noggrant.

Integrationer däremot uppstår ofta som **pragmatiska lösningar**:

>“Vi behöver bara koppla ihop system A och B.”

Det leder till fler små tjänster.

--- 

## 5. API-strategier förstärker detta

När organisationer inför en API-plattform (t.ex. via en

API Gateway) börjar fler system exponeras.

Det skapar snabbt:

- partner-API:er
- interna integrations-API:er
- adaptertjänster

Antalet växer snabbt.

--- 

## Resultatet i många organisationer

Efter några år med Microservices Architecture ser landskapet ofta ut ungefär så här:

```
Experience services: 5–15Process services:    5–10Domain services:     10–30Integration services: 50–200
```

Integrationer dominerar alltså arkitekturen.

--- 

## Varför detta är viktigt för arkitektur

Det leder till en insikt som många arkitekter får efter några år:

>Den verkliga komplexiteten i en modern arkitektur ligger nästan alltid i **integrationerna**, inte i domänlogiken.

Det är också därför som:

- integrationsplattformar
- event-driven arkitektur
- API-management

har blivit så centrala.

--- 

💡 En ganska intressant observation är att många organisationer som säger att de bygger **mikrotjänstarkitektur** i praktiken bygger **en integrationsarkitektur med mikrotjänster som teknik**.

Det är en subtil men viktig skillnad.

--- 

Om du vill kan jag också visa något som ofta förklarar mycket i arkitekturdiskussioner:

**varför många stora organisationer trots mikrotjänster fortfarande i praktiken fungerar som ett stort systemlandskap runt ett centralt ERP.** Det påverkar nästan alla integrationsmönster.

--- 

### **You**

Varför

--- 

### **ChatGPT**

Det beror främst på **hur verksamheter är organiserade och hur affärsdata fungerar i verkligheten**. Även när man inför mikrotjänster försvinner inte den strukturen. Flera mekanismer gör att arkitekturen fortfarande kretsar kring ett centralt affärssystem (ofta ERP).

--- 

## 1. ERP innehåller den ekonomiska sanningen

System som SAP ERP eller Oracle ERP är ofta där organisationens **bokföring och juridiska transaktioner** sker.

Exempel:

- fakturor
- bokföring
- betalningar
- redovisning
- lagerbokföring

Detta är **reglerat och revisionspliktigt**. Därför kan organisationen inte enkelt flytta det till nya tjänster.

Resultatet blir:

```
Många system → måste till slut landa i ERP
```

ERP fungerar som ett **system of record**.

--- 

## 2. Affärsprocesser slutar ofta i ERP

Även moderna digitala tjänster behöver ofta avsluta processen där.

Exempel:

```
Webbshop↓Order service↓Betalning↓Fakturering↓ERP
```

Det gör att många mikrotjänster till slut **måste integrera med ERP**.

--- 

## 3. ERP är svårt att ersätta

Stora ERP-installationer innehåller ofta:

- 10–30 års affärslogik
- specialanpassningar
- regulatoriska regler

Att ersätta dem helt är ett mycket stort projekt.

Därför väljer organisationer ofta istället att:

- bygga nya tjänster **runt** ERP
- inte **ersätta** det.

--- 

## 4. Masterdata ligger ofta där

Många centrala datatyper ligger i affärssystemet:

- kunder
- leverantörer
- produkter
- kontoplan

Det gör att andra system behöver synkronisera mot det.

--- 

## 5. Organisationen är byggd runt affärssystemet

Processer, rapportering och ekonomiavdelningar är ofta organiserade kring ERP.

Det innebär att även om IT bygger nya arkitekturer så fortsätter verksamheten använda ERP som nav.

Detta är ett exempel på hur arkitektur påverkas av

Conway's Law.

--- 

## Hur arkitekturen brukar se ut i verkligheten

Efter några år med mikrotjänster hamnar många organisationer i något som liknar detta:

```
Digital channels      │      ▼Microservices      │      ▼Integration layer      │      ▼ERP / core systems
```

ERP fungerar alltså som ett **stabilt kärnsystem** medan nya tjänster byggs runt det.

--- 

## En vanlig arkitekturstrategi idag

Istället för att försöka ersätta ERP helt försöker många organisationer:

- isolera det bakom integrationer
- gradvis flytta logik utåt
- använda eventdriven integration

Detta kallas ibland **“strangler pattern”** i modernisering.

Strangler Fig Pattern

--- 

💡 En intressant sak är att detta leder till en arkitekturinsikt som många seniora arkitekter delar:

>Mikrotjänster ersätter sällan kärnsystem direkt – de **växer runt dem**.

Det är därför många moderna systemlandskap ser ut som **ett ekosystem runt några få stora kärnsystem**.

--- 

Om du vill kan jag också visa **varför många arkitekter idag börjar tänka i “system of record”, “system of engagement” och “system of insight” istället för lager**. Det perspektivet brukar göra systemlandskap mycket lättare att förstå.

---
