# 🏷️ 2. Feedback Item – datamodell

Varje AI- eller manuell kommentar blir ett objekt:

```
YAMLid: FB-00123type: violation | risk | suggestion | questionseverity: critical | high | medium | lowsource: ai | humanstatus: open | accepted | rejected | resolvedconfidence: 0.0–1.0links:  requirements: [REQ-123]  policies: [POL-SEC-01]  adr: [ADR-7]message: "Endpoint saknar autentisering"evidence:  - file: api/user.py    line: 42suggestion: "Använd AuthMiddleware"
```

👉 Viktigt:

- **type + severity + status** styr flödet
- **links** gör allt spårbart

---
