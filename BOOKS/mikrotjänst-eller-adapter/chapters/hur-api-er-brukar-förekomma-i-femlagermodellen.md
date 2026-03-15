# Hur API:er brukar förekomma i femlagermodellen

```
Client  │  ▼Experience API  │  ▼Process API  │  ▼Domain API  │  ▼Integration API  │  ▼System API
```

I praktiken kan **fyra av fem lager exponera API:er**.

--- 

## 1. Experience API

Detta är nästan alltid ett exponerat API.

Konsumenter:

- mobilappar
- webbklienter
- partnerintegrationer

Det ligger ofta bakom en

API Gateway.

Exempel:

```
GET /mobile/orders
```

Detta API är ofta **anpassat för klienten**.

--- 

## 2. Process API

Detta API representerar en **affärsprocess**.

Exempel:

```
POST /place-order
```

Bakom detta kan flera domäntjänster orkestreras.

Det kan exponeras för:

- interna system
- partners
- workflow-motorer

--- 

## 3. Domain API

Detta API representerar **domänfunktioner**.

Exempel:

```
POST /ordersGET /customers
```

Detta är ofta det man menar i klassisk

Microservices Architecture.

Domän-API:er är vanligtvis:

- interna
- stabila
- återanvändbara

--- 

## 4. Integration API

Integrationstjänster har också ofta API:er.

Men dessa är nästan alltid **interna**.

Exempel:

```
POST /sap/customer-sync
```

Syftet är att isolera systemintegrationer.

Här använder man ofta mönster som

Anti-Corruption Layer.

--- 

## 5. System API

Standardsystem exponeras också via API:er.

Exempel:

- SAP OData
- Salesforce REST API
- databastjänster

Dessa API:er är normalt **inte designade för verksamheten** utan för systemåtkomst.

---
