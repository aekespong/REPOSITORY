# Standardsystem som en del av lösningsarkitekturen

> Chapter-ID: standardsystem-som-en-del-av-losningsarkitekturen
> Status: draft

När ett standardsystem som SAP har API:er som spänner över flera domäner och affärsförmågor är det precis då metamodellen behövs som “skyddsnät”. Nyckeln är att behandla SAP som en extern leverantörsmodell som du inte låter bli din organisations domänmodell - även om SAP råkar ha färdiga resurser och funktioner.

## Princip: SAP är implementation - era domäner är arkitektur

Era domäner (Fordon, Personal, Inköp) äger begrepp, semantik och ansvar. Era domäntjänster (systemtjänster + resurs-API:er) är det andra får använda. SAP:s API:er används bakom era domäntjänster, som interna integrationer/komponenter.

Det betyder: även om SAP exponerar “resurser” och “funktioner/actions”, så blir de inte automatiskt era domäntjänster.

## Så gör du en strikt arkitektur i linje med metamodellen

### 1) Bestäm domänägarskap först - inte SAP-strukturen

Gör en enkel klassning för varje SAP-API ni vill använda: Vilken domän är “system-of-record” för betydelsen? Vilken affärsförmåga realiseras? Är det främst avsikt (systemtjänst) eller information (resurs)? SAP kan ligga “fel” ur ert perspektiv (blanddomän) - men ni väljer ändå en hemvist i er modell.

### 2) Inför ett SAP-ACL per domän

Undvik en stor “SAP-integrationstjänst” som alla domäner använder. Det brukar snabbt bli en ny monolit. I stället: varje domän har sin egen ACL/adaptrar mot SAP för just de use case/resurser domänen behöver. Samma SAP-endpoint kan konsumeras av flera domäner - men via separata domänspecifika översättningar.

Detta hindrar SAP:s begrepp (t.ex. “Business Partner”, “Plant”, “Company Code”) från att bli ert gemensamma språk.

