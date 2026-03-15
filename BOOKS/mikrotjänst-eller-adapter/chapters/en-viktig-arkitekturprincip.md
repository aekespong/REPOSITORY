# En viktig arkitekturprincip

Alla lager **kan ha API:er**, men:

>Endast några få ska vara **officiella kontrakt utåt**.

Vanligtvis:

|Lager|Exponeras externt|
|---|---|
|Experience|ja|
|Process|ibland|
|Domain|sällan|
|Integration|nej|
|System|nej|

---
