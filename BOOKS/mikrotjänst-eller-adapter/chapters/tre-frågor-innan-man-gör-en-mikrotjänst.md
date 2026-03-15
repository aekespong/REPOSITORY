# Tre frågor innan man gör en mikrotjänst

## 1. Kan den deployas oberoende?

Den viktigaste frågan:

>Kan denna tjänst ändras och deployas utan att andra tjänster måste ändras samtidigt?

Om svaret är **nej** är den nästan alltid **inte en riktig mikrotjänst**.

Typiskt varningstecken:

- gemensam versionshantering
- kontrakt som alltid ändras tillsammans
- koordinering mellan flera team vid varje release

Det betyder att tjänsterna i praktiken är **en enda applikation**.

--- 

## 2. Har den en egen datamodell?

En tjänst bör äga sitt data.

Om flera tjänster:

- använder samma databas
- läser varandras tabeller
- delar ORM-modeller

så är de inte verkligt separerade.

Det bryter mot ett centralt mål i mikrotjänster: **datakapsling**.

--- 

## 3. Representerar den ett verkligt ansvar?

Här kommer domäntänkandet in.

Frågan är:

>Finns det ett tydligt ansvar eller domän runt denna tjänst?

Bra exempel:

- Order
- Customer
- Payment
- Inventory

Då speglar tjänsten en **affärsdomän**.

Dåliga exempel:

- CustomerNameService
- AddressValidationService
- SAPCustomerAdapter

De kan vara tekniskt motiverade men är ofta **inte domäntjänster**.

---
