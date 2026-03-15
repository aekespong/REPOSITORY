# Hur många moderna arkitekturer landar idag

I många organisationer (särskilt efter 2020) ser man en hybrid:

```
Client  │  ▼API Gateway  │  ▼Domain Microservices  │  ▼Integration services  │  ▼Enterprise systems
```

Principer:

- Mikrotjänster = **domänlogik**
- Integration = **systemkoppling**
- Gateway = **exponering**

--- 

💡 **En tumregel många seniora arkitekter använder idag:**

>En mikrotjänst ska representera **en affärskapabilitet**, inte ett backend-API.

--- 

Eftersom du jobbar med **lösningsarkitektur** kan jag också visa något som många arkitekter börjar prata om nu:

**“Microservice vs API facade vs integration service” — tre olika typer av tjänster som ofta blandas ihop.**

Den distinktionen brukar faktiskt lösa många arkitekturdebatter.

--- 

### **You**

Jag tänker att affärskapabilitet är en högre abstraktion som används vid analys av verksamheten, medan en sådan här tjänst i tjänstelagret som stödjer allt mellan appar till systemintegrationer är något annat. Det är en slags förmåga, men man kan knappast att verksamhetsförmågan ”ta emot fakturor” är samma sak som en integration från en API-gateway till det du kallar affärsförmåga ovan

--- 

### **ChatGPT**

Du är inne på en viktig distinktion som många arkitekturer blandar ihop: **verksamhetsförmåga (business capability)** är normalt **inte samma sak som en tjänst i tjänstelagret**.

I många arkitekturmodeller (t.ex. inom TOGAF) ligger de på **olika abstraktionsnivåer**.

--- 

## 1. Verksamhetsförmåga (business capability)

En verksamhetsförmåga beskriver **vad organisationen kan göra**, oberoende av processer och system.

Exempel:

- Ta emot fakturor
- Hantera kundrelationer
- Hantera betalningar

Den är **stabil över tid** och förändras sällan när system byts.

Det är alltså en **analysmodell av verksamheten**, inte en teknisk komponent.

--- 

## 2. Applikations- eller domäntjänst

Här börjar man realisera förmågan i IT.

Exempel:

```
Capability: Ta emot fakturor        │        ▼Invoice Management Service
```

Den här tjänsten kan:

- validera fakturor
- lagra dem
- starta workflows
- koppla till ekonomisystem

Här finns **domänlogik**.

--- 

## 3. Integrations- eller adaptertjänster

Det du beskriver hamnar ofta **ett lager längre ner**.

Exempel:

```
API Gateway   │   ▼Invoice API   │   ▼ERP Adapter   │   ▼ERP System
```

Adaptern gör t.ex.:

- protokollöversättning
- datamappning
- autentisering mot backend

Den representerar **inte en verksamhetsförmåga** utan en **teknisk integration**.

--- 

## Varför begreppen blandas ihop

När man pratar om mikrotjänster i **Microservices Architecture** säger man ofta:

>“A service should map to a business capability.”

Det är egentligen en **förenkling**.

I praktiken finns ofta **minst tre typer av tjänster**:

|Typ|Syfte|
|---|---|
|Domäntjänst|Implementerar affärslogik|
|Integrations-/adaptertjänst|Kopplar till system|
|API/BFF-tjänst|Anpassar API för klienter|

Alla kan tekniskt vara **mikrotjänster**, men de representerar **olika nivåer i arkitekturen**.

--- 

## Ett mer realistiskt lagerperspektiv

```
Business capability        │        ▼Domain service (microservice)        │        ▼Integration service / adapter        │        ▼Enterprise system
```

Så din intuition är helt rimlig:

>En integrationstjänst mellan gateway och backend är inte samma sak som verksamhetsförmågan.

Den är snarare en **teknisk realisering eller möjliggörare** av den.

--- 

💡 En sak som många seniora arkitekter upptäcker efter ett tag är att organisationer ofta råkar skapa **mikrotjänster på integrationsnivån istället för domännivån**. Då får man massor av små API-wrappers men väldigt lite verklig domänlogik i tjänstelagret.

Om du vill kan jag också visa **en modell med fem olika typer av tjänster i en modern API-baserad arkitektur**. Den brukar göra det mycket tydligare vad som egentligen är en “mikrotjänst”.

--- 

### **You**

Visa de fem nivåerna 

--- 

### **ChatGPT**

En modell som många arkitekter använder idag är att skilja på **fem typer av tjänster** i en modern API-baserad arkitektur. De ligger på olika abstraktionsnivåer och har olika ansvar. Det gör att man slipper försöka pressa in allt i begreppet *mikrotjänst*.

---
