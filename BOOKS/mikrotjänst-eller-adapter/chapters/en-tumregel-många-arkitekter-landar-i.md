# En tumregel många arkitekter landar i

Om en tjänst bara:

- vidarebefordrar anrop
- gör datamappning
- anropar ett annat system

så är den ofta **inte en domäntjänst** utan en **integrationstjänst**.

Den kan vara tekniskt motiverad – men man ska inte lura sig att den är kärnan i mikrotjänstarkitekturen.

--- 

En sak som brukar vara väldigt klargörande i sådana här diskussioner är faktiskt **hur många mikrotjänster stora organisationer verkligen klarar att hantera** innan komplexiteten exploderar. Det finns ganska tydliga erfarenhetstal från branschen. Vill du att jag visar dem?

--- 

### **You**

Stämmer det att flera av nivåerna i femlagermodellen kan exponeras som API:er? 

--- 

### **ChatGPT**

Ja, det stämmer. **Flera av nivåerna kan exponeras som API:er**, men normalt gör man det **av olika skäl och för olika konsumenter**. Det är också därför man ibland får intrycket att “allt är API:er” i moderna arkitekturer.

Det viktiga är att skilja på **vilket API som är externt kontrakt** och vilka som bara är **interna tjänstegränssnitt**.

---
