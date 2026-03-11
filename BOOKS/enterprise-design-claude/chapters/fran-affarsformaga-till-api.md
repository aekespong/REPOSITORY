# Från affärsförmåga till API

> Chapter-ID: fran-affarsformaga-till-api
> Status: draft

Digitalisering misslyckas sällan på grund av teknik. Den misslyckas när kopplingen mellan verksamhetens behov och systemens utformning är otydlig. För att bygga system som håller över tid krävs ett gemensamt språk - från affärsförmåga till API.

Detta kapitel beskriver hur den kopplingen kan göras tydlig, konsekvent och skalbar.

## Affärsförmågan är startpunkten - inte systemet

All arkitektur börjar i verksamheten. En affärsförmåga beskriver vad organisationen behöver kunna göra för att fungera och utvecklas, oberoende av hur det realiseras tekniskt.

Affärsförmågor är stabila. System, teknik och organisation förändras - men förmågorna består. Därför används de som ankare för arkitektur, prioritering och ansvar.

## Från affärsförmåga till domän

Nästa steg är att avgränsa domäner. En domän samlar ett verksamhetsområde, ett gemensamt språk, en sammanhängande informationsmodell och ett tydligt ansvar.

Domäner är inte organisatoriska rutor eller systemdiagram. De är språkliga och semantiska gränser. De avgör vad som hör ihop - och vad som inte gör det.

## Domänen realiseras som en domäntjänst

En domän blir användbar när den görs tillgänglig. Det sker genom en domäntjänst. En domäntjänst är inte bara ett tekniskt API. Den är ett samlat erbjudande som har ett syfte, ett ägarskap, ett livscykelansvar och tydliga konsumenter.

Domäntjänsten är den nivå där ansvar, versionering och kommunikation hör hemma. Det är också här som arkitektur möter verklig användning.

## Två typer av domäntjänster - med olika ansvar

Inom en domäntjänst finns två fundamentalt olika typer av tjänster. Att blanda ihop dem är en av de vanligaste orsakerna till svårbegripliga API:er.

### Systemtjänster - uttrycker verksamhetsavsikt

Systemtjänster representerar verksamhetsnära användningsfall. De uttrycker varför något görs. En systemtjänst har ett tydligt syfte, orkestrerar regler och logik, kapslar komplexitet och skapar affärsvärde i ett sammanhang. Den är det som verksamheten upplever att “systemet gör”.

### Resurs-API:er - hanterar information

Resurs-API:er tillhandahåller åtkomst till information och dess livscykel. De uttrycker vad som hanteras. Resurs-API:er namnges som substantiv, använder standardoperationer och är generiska och återanvändbara. CRUD hör hemma här - inte som arkitektur, utan som implementation.

