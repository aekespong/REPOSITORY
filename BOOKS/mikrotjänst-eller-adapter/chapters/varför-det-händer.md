# Varför det händer

### 1. Domänerna är fel uppdelade

Man delar efter **tekniska komponenter** istället för domäner.

Det strider mot idéer från Domain-Driven Design.

--- 

### 2. För små tjänster

Organisationer gör tjänster för små.

Exempel:

```
customer-name-servicecustomer-address-servicecustomer-email-service
```

Det händer oftare än man tror.

--- 

### 3. Synkron kommunikation

Om allt är REST-anrop uppstår stark koppling.

Event-baserade mönster minskar ofta detta.

---
