# 🔧 1. Grundprincip: Allt är PR + allt är spårbart

Du vill ha tre saker som hänger ihop:

- **Kod** (implementation)
- **Krav / policies** (vad ska uppfyllas)
- **Arkitekturbeslut / analyser** (varför)

👉 Lösning: gör allt till **förstaklass-artefakter i Git**

### Struktur (enkelt men kraftfullt)

```
/projects/  /project-a/    /spec/      requirements.md      constraints.md    /architecture/      decisions/        ADR-001.md    /code//enterprise/  /plans/    target-architecture.md  /policies/    security.md    integration.md  /reference-models/
```

---
