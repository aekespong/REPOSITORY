# Regelverk för identifiering och design av domäntjänster

> Chapter-ID: regelverk-for-identifiering-och-design-av-domantjanster
> Status: draft

Detta regelverk beskriver hur affärsförmågor, domäner, domäntjänster, systemtjänster och resurs-API:er ska identifieras och struktureras vid analys av verksamhetsdokumentation, Product Requirement Documents (PRD), processbeskrivningar, befintlig kod eller API:er samt standardsystem och integrationer.

## Grundläggande principer

- Verksamhet före teknik - Identifiera alltid affärsförmågor och domäner innan tekniska strukturer analyseras

- Avsikt före struktur - Handlingar (systemtjänster) ska identifieras innan information (resurs-API:er)

- Exponering är ett medvetet val - Allt i en domän är inte tillgängligt externt. Endast domäntjänster utgör kontrakt

- Ansvar måste vara tydligt - Varje domän, domäntjänst och systemtjänst ska kunna kopplas till ett verksamhetsansvar

## Steg 1 - Identifiera affärsförmågor

Vid analys ska följande identifieras först: Vilka förmågor beskriver dokumentet eller koden? Vad måste organisationen kunna, oberoende av lösning?

Regler:

Affärsförmågor är stabila, beskrivande och inte aktiva. De ska kunna formuleras som “Hantera X”.

