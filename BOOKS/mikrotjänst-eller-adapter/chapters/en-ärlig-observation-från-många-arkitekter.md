# En ärlig observation från många arkitekter

Efter 10–15 år med mikrotjänster börjar många organisationer inse:

>Den största komplexiteten kommer inte från systemen utan från **alla lager vi byggt runt dem**.

Det är därför man nu ser en motrörelse:

- **modular monolith**
- **färre mikrotjänster**
- **tunnare API-lager**

--- 

💡 Min personliga tumregel (som många seniora arkitekter använder):

Man börjar **inte** med fem lager.

Man börjar med **två eller tre**, och lägger bara till lager när ett konkret problem uppstår.

--- 

Om du vill kan jag också visa **varför mikrotjänstarkitektur ofta degenererar till en “distributed monolith”** – det är direkt kopplat till just de här lagren och är en av de största arkitekturproblemen idag.

--- 

### **You**

Varför Distributed monolith?

--- 

### **ChatGPT**

Begreppet **distributed monolith** uppstod när organisationer började använda Microservices Architecture men upptäckte att systemet i praktiken **fortfarande beter sig som en monolit – fast distribuerad över nätverket**.

Det är alltså inte en officiell arkitektur, utan ett **antipattern** i Software Architecture.

---
