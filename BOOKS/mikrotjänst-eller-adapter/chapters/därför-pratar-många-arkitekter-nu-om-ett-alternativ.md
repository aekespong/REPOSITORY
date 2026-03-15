# Därför pratar många arkitekter nu om ett alternativ

Istället för mikrotjänster från början:

**Modular Monolith**

Det betyder:

- en deploybar applikation
- men tydliga moduler internt

Man får:

- mindre driftkomplexitet
- men ändå bra struktur

--- 

💡 En intressant sak är att flera stora företag som en gång drev mikrotjänster hårt (Netflix, Amazon m.fl.) faktiskt har **arkitekturteam som aktivt bekämpar distributed monoliths internt**.

--- 

Om du vill kan jag också visa **ett mycket enkelt arkitekturtänk som många seniora arkitekter använder för att avgöra om en tjänst verkligen ska vara en mikrotjänst eller inte**. Det är ofta bara **tre frågor**.

--- 

### **You**

Ja

--- 

### **ChatGPT**

Många erfarna arkitekter använder i praktiken ett mycket enkelt test innan de bryter ut något till en mikrotjänst. Det är inte en formell standard, men det bygger på principer från t.ex. Domain-Driven Design och erfarenheter från system byggda med Microservices Architecture.

Tanken är att undvika att skapa tjänster som bara leder till en **distributed monolith**.

---
