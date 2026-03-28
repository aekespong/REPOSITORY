# 🧠 5. Gör PLANS och SPEC maskinläsbara (detta är avgörande)

Om du bara har löptext → AI blir svajig.

###  Gör så här istället:

####  Policies (semi-strukturerade)

```
YAMLid: POL-SEC-01title: Authentication requiredrule: "All endpoints must require authentication"applies_to: ["api"]severity: "high"
```

####  Requirements

```
YAMLid: REQ-123description: User must loginlinked_policies:  - POL-SEC-01
```

👉 Nu kan du göra deterministiska + AI-baserade checks.

---
