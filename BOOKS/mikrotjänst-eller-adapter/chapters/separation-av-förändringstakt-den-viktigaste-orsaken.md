# 1. Separation av förändringstakt (den viktigaste orsaken)

Olika delar av ett system **förändras i olika takt**.

|Lager|Förändras typiskt|
|---|---|
|Experience|ofta (UI ändras mycket)|
|Process|ibland|
|Domain|relativt stabilt|
|Integration|när system byts|
|System|nästan aldrig|

Om man blandar allt i samma tjänst får man problem:

- en UI-ändring kan kräva ändring i ERP-integration
- ett systembyte påverkar alla klienter
- API:er blir instabila

Genom att separera lagren isolerar man förändring.

Exempel:

```
Mobilapp ändras↓Experience service ändras↓Domain service påverkas inte
```

---
