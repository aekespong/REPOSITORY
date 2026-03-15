# De flesta system **behöver inte alla fem lager**.

De flesta organisationer **behöver inte alla fem lager**.

I många projekt räcker:

```
Client  
↓
Domain service  
↓
Backend system
```

Eller:

```
Client  ↓API gateway  ↓Backend
```

De fem lagren uppstår främst när man har:

- många klienter
- många backend-system
- komplexa affärsprocesser
- flera team

---
