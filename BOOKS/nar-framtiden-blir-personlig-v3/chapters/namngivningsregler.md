# Namngivningsregler

> Chapter-ID: namngivningsregler
> Status: draft

### Grundregel (viktigast)

Domäner, Affärsförmågor och Systemtjänster ska namnges verksamhetsnära – inte som teknisk implementation – som verksamhetskunniga direkt kan relatera till. Oftast på svenska eftersom det är vad som används i verksamheten.

2. Rekommenderat format för Systemtjänster(System Service)

✅ Verb + Objekt

- Verb i infinitiv (engelska) eller grundform (svenska)

- Objekt = affärsbegrepp (inte teknisk term)

Exempel

- Utfärda Faktura

- Skicka Faktura

- Registera Kund

- Validera kund-id

- Hämta betalstatus

3. Vad ska INTE finnas i namnet

❌ Systemnamn
❌ Teknisk lösning
❌ Protokoll eller transport
❌ Intern arkitektur

Undvik

- InvoiceServiceV2

- CRMCustomerAPI

- ESBInvoiceSender

- BillingMicroservice

Allt detta hör hemma i implementation, men inte i service-namnet.

5. En service = ett tydligt ansvar

- Undvik breda, otydliga namn

- Varje System Service ska ha ett primärt syfte

❌ Manage Billing
❌ Customer Operations

✅ Issue Invoice
✅ Register Payment

Exempel: Fakturahantering

1. Affärsförmågor (vad verksamheten behöver kunna göra)

Kundhantering

- Hantera kundrelationer

- Säkerställa korrekt kundinformation

Fakturahantering

- Fakturera kunder korrekt

- Ta emot och följa upp betalningar

Domän (hur vi strukturerar tjänster)

Kunddomän
Samlar alla systemtjänster som rör kundinformation och kundidentitet.

Fordon
Samlar alla systemtjänster som rör fordon i ekonomisystemet, i Accessum och i Mobilaris.

Undvik CRUD-språk i namnsättning

CRUD är ofta implementation.

❌ CreateInvoice
❌ UpdateCustomer

Föredra verksamhetsintention:

✅ Utfärda faktura
✅ Register Customer

(CRUD kan finnas i API-specen, men inte som EA-namn)

7. Konsistens inom en Domän

Inom samma domain ska namn:

- använda samma begrepp

- följa samma verbmönster

Fakturahantering

- Utfärda faktura

- Skicka faktura

- Registrera betalning

- Hämta betalstatus

Kundhantering

- Registera kund

- Godkänn kund

- Hämta kundprofil

Extra regel (valfri men stark)

Händelsestyrda tjänster(services)

Om ni jobbar händelsestyrt:

- Publicera events i dåtid

- FakturaUtfärdad

- BetalningRegistrerad

- Kommandotjänster i verbform

- Utfärda faktura

- Registrera betalning

Detta ger mycket hög tydlighet.

10. Snabb checklista

En bra System Service:

- Är Verb + Objekt

- Är verksamhetsnära

- Är fri från teknik

- Kan versioneras

- Kan användas av flera

- Känns rimlig att visa för verksamheten

Om alla är “ja” → namnet är bra.

Sammanfattning i en mening

Namnge System Services som affärserbjudanden – inte som kod, system eller teknik.

Applikationer (hur det realiseras)

Customer

- CRM-system

- KYC-tjänst

- Kundregister (master data)

Billing

- Faktureringssystem

- Betalningsplattform

- Ekonomisystem

Exempel:

- CRM-systemet realiserar
Register Customer och Get Customer Profile

- Faktureringssystemet realiserar
Issue Invoice och Send Invoice

Sambandet – i text

Affärsförmågan Fakturering stöds av systemtjänsterna Issue Invoice och Send Invoice, som tillhör Billing Domain och realiseras av faktureringssystemet.

Varför detta exempel är viktigt

- “Billing” och “Customer” är inte system

- “Send Invoice” är inte kod

- “Send Invoice” är ett kontrakt som:

- kan versioneras

- kan integreras

- kan användas av flera system

Detta är precis den nivå där EA, integration och styrning möts.

Vanlig fallgrop (och hur du undviker den)

❌ “Send Invoice” = en metod i ett system
✅ “Send Invoice” = ett erbjudande som kan implementeras på olika sätt över tid

- Dataprodukter

“Data Products make data easy to find, consume, share, and govern. And to deliver this value, our job as a practitioner is to make Data Products easy to build, deploy, secure, and manage.”

Eric Broda - The anatomy of a data product, 2022

När information behandlas som en medveten produkt i stället för en bieffekt av systemdrift förändras organisationens syn på data. En dataprodukt är information som packeterats och exponerats med ett tydligt syfte och är designad för att användas, inte bara genereras.​

En dataprodukt har:

- tydligt syfte – löser ett konkret informationsbehov

- definierad ägare – någon ansvarar för kvalitet och utveckling

- känd livscykel – från begreppets skapande till eventuell borttagning

- uttalad kvalitet – krav på aktualitet, precision och tillförlitlighet​

Dataprodukter kan konsumeras av användargränssnitt, verksamhetsprocesser, andra system och AI-agenter, som alla behöver samma stabila och begripliga information. Genom Information Design blir dataprodukter återanvändbara datakällor som håller över tid.

Dataprodukter exponeras via tjänster(services) och både dataprodukter och tjänster och klassificeras som System Services(tjänst).

Exempel på dataprodukter

En dataprodukt är inte masterdata som hämtas ur ett av systemen och det är inte ett API som råkar finnas. Den är en avsiktlig representation av information som är central för organisationen som används av många. För en del organisationer har man utsett en produktansvarig som koordinerar, prioriterar och styr förändringar av dataprodukten, men ytterst är det ett ledningsansvar.

Exempel:

Dataprodukt: Kund

- ägs av verksamheten

- exponeras genom tydliga tjänster

- används av applikationer, användargränsnitt, processer, andra system och AI

Integration Design handlar därför inte om att flytta data snabbare, utan om att göra information pålitlig, begriplig och återanvändbar. Det är här kopplingen till AI blir konkret för dataprodukter är en central byggsten i plattformen för att stödja AI-lösningar.

