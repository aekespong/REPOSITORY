# Typiska kännetecken på bristande arkitektur

### 1. Synkrona beroenden överallt

Varje tjänst anropar flera andra tjänster.

```
Order Service   
     ↓
Customer Service   
     ↓
Account Service   
     ↓
Payment Service
```

Konsekvensn blir att om en tjänst är nere fungerar inget.

Det bryter mot grundidén i mikrotjänster: **lös koppling**.

--- 

### 2. Gemensam datamodell

Alla tjänster använder samma datamodell eller delar databas.

```
service A → customer tableservice B → customer tableservice C → customer table
```

Då är de i praktiken **inte separata system**.

--- 

### 3. Samordnad deployment

Man kan inte uppdatera en tjänst utan att uppdatera andra.

Detta bryter mot principen:

>“independently deployable services”

--- 

### 4. API som speglar databas

Tjänsterna blir bara CRUD-API:er.

Exempel:

```
customer-serviceorder-serviceinvoice-service
```

Men varje operation kräver anrop till flera tjänster.

---
