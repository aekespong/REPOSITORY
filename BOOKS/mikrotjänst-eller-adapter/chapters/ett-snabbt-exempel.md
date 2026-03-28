# Ett snabbt exempel

### Dålig uppdelning

```
Order API   ↓Customer API   ↓Address API   ↓Tax API
```

Här kräver varje order flera synkrona anrop.

Risk: **distributed monolith**.

--- 

### Bättre uppdelning

```
Order Service   ├─ customer logic   ├─ address logic   └─ tax logic
```

En tjänst, tydligt ansvar.

---
