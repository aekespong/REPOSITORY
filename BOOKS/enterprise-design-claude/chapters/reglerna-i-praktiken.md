# Reglerna i praktiken

> Chapter-ID: reglerna-i-praktiken
> Status: draft

Arkitekturens uppgift är inte att beskriva allt som är möjligt, utan att begränsa det som är farligt. I denna modell gäller:

- Domänen äger begrepp och regler

- Domäntjänster är domänens externa erbjudanden

- Systemtjänster uttrycker avsikt

- Resurs-API:er tillhandahåller information

- Interna komponenter är fria men dolda

- AI behandlas som en kraftfull extern konsument

Beroenden är inte symmetriska. Alla nivåer får inte använda alla andra nivåer - och det är precis därför modellen fungerar.

## Slutlig kärnprincip

God arkitektur uppstår inte av fler valmöjligheter, utan av tydligare gränser.

