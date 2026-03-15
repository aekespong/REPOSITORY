# 2. Skydda domänmodellen

Detta kommer mycket från **Domain-Driven Design**.

Problemet i många organisationer är att **standardsystemens datamodeller smittar hela arkitekturen**.

Exempel:

```
SAP-tabellstruktur↓API↓Frontend
```

Efter några år pratar hela organisationen i SAP-termer.

Med ett integrationslager skapar man ett **anti-corruption layer**:

Anti-Corruption Layer

Det gör att:

```
Frontend → domänmodell → integration → SAP
```

SAP:s modell sprids inte uppåt.

---
