# Metamodellen för Enterprise Design

> Chapter-ID: metamodellen-for-enterprise-design
> Status: draft

För att skapa en verkligt användbar arkitektur behöver vi en metamodell - ett språk som beskriver hur ansvar, funktionalitet och struktur hänger ihop. Denna metamodell utgår från verksamhetens behov och arbetar sig nedåt mot implementation.

## Affärsförmåga

En affärsförmåga beskriver vad verksamheten behöver kunna göra för att uppfylla sitt uppdrag, oberoende av organisation, system och teknik.

### Exempel

Leverantörshantering, Fordonshantering och Kundhantering.

#### Anmärkning

Affärsförmågor är stabila över tid och används för att strukturera arkitektur, prioriteringar och ansvar - inte för att beskriva lösningar.

## Domän (Bounded Context)

Definition

En domän är ett avgränsat verksamhetsområde med ett eget språk, tydliga begrepp och egna regler för hur information tolkas och används.

Exempel

Fordon, Personal, Leverantörer.

Anmärkning

En domän utgör en naturlig gräns för ansvar, datamodell och tjänster. Samma begrepp kan förekomma i flera domäner men med olika betydelse. Domänen är inåtvänd och långsiktigt stabil med en tydlig logisk gräns som inte får överträdas fritt.

## Domäntjänst

Definition

En domäntjänst är ett samlat, ägt och versionerat erbjudande av systemtjänster och resurser inom en domän. Domäntjänsten utgör den primära externa referenspunkten för konsumenter, men är inte i sig en anropsbar funktion.

Exempel

Fordon-tjänster, Personal-tjänster, HR-tjänster.

Anmärkning

Hur domäntjänsten exponeras tekniskt - till exempel som ett eller flera API:er - är en implementationsfråga. En domäntjänst är utåtvänd, konsumentdriven och förändras oftare än domänen.

## Systemtjänst (Use case-tjänst / Applikationstjänst)

Definition

En systemtjänst uttrycker ett verksamhetsnära användningsfall och representerar en sammanhängande handling som skapar affärsvärde. Systemtjänster är aktiva, anropsbara och kan vara användningsfall (use case).

Exempel

RegistreraFordon, BesiktigaFordon, TilldelaFordonsansvarig, RegistreraInterntFordon.

Designregel

Namnges efter avsikt och resultat, inte efter tekniska operationer. Orkestrerar logik och samverkan mellan komponenter och domäner. Ska inte reduceras till CRUD-operationer.

Anmärkning

Systemtjänster är ofta det som verksamheten känner igen som “det systemet gör”. De har tydliga kontrakt och versionshantering.

