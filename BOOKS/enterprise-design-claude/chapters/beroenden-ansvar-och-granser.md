# Beroenden, ansvar och gränser

> Chapter-ID: beroenden-ansvar-och-granser
> Status: draft


Arkitektur handlar lika mycket om vad som inte är tillåtet som om vad som är möjligt. Utan tydliga gränser blir arkitektur snabbt en efterhandsbeskrivning. I detta kapitel beskrivs de beroenderegelverk som styr hur domäner och domäntjänster får användas - av människor, system och AI.

## Externa beroenden - avsikt före struktur

Externa konsumenter, oavsett om de är system, användargränssnitt eller AI-agenter, ska aldrig behöva förstå intern struktur. Grundregeln är enkel:

Externa konsumenter använder domäntjänster - inte domäner.

I praktiken innebär detta att systemtjänster är primär ingång, resurs-API:er är undantag och interna komponenter är aldrig tillgängliga. Syftet är att säkerställa att ansvar alltid kan knytas till handling.

## Interna beroenden - frihet med disciplin

Inom en domän råder större frihet. Systemtjänster och resurs-API:er delar interna komponenter, domänlogik och persistenslager. Men även internt gäller tydliga riktningar: resurser uttrycker vad, systemtjänster uttrycker varför och interna komponenter exponeras inte.

Detta gör det möjligt att utveckla och refaktorera utan att påverka konsumenter.

## AI som konsument

När AI introduceras i arkitekturen måste gränserna bli ännu tydligare. AI får anropa systemtjänster och fatta beslut inom tydligt definierade ramar. AI får inte kombinera resurs-API:er till egna användningsfall, manipulera data direkt eller kringgå verksamhetsavsikt.

Ju mer autonom aktören är, desto striktare måste gränserna vara.

## Beroendematris - Komplett översikt

Denna matris visar alla tillåtna och förbjudna beroenden i arkitekturen. Den omfattar externa konsumenter (andra system, integrationer, frontend, rapportering, AI-agenter) samt interna beroenden inom och mellan domäner.

| Från \ Till | Systemtjänst | Resurs-API | Intern komponent | Domänlogik | Persistenslager |
|-------------|--------------|------------|------------------|------------|-----------------|
| **Extern konsument** | ✓ Tillåtet | ⚠ Särskilda villkor | ✗ Förbjudet | ✗ Förbjudet | ✗ Förbjudet |
| **Systemtjänst (samma domän)** | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet |
| **Systemtjänst (annan domän)** | ✓ Tillåtet | ⚠ Särskilda villkor | ✗ Förbjudet | ✗ Förbjudet | ✗ Förbjudet |
| **Resurs-API (samma domän)** | ✗ Förbjudet | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet |
| **Resurs-API (annan domän)** | ✗ Förbjudet | ✓ Tillåtet | ✗ Förbjudet | ✗ Förbjudet | ✗ Förbjudet |
| **Intern komponent** | ✗ Förbjudet | ✗ Förbjudet | ✓ Tillåtet | ✓ Tillåtet | ✓ Tillåtet |

### Extern konsument → Systemtjänst: ✓ Tillåtet

Detta är huvudvägen in i domänen. Systemtjänster uttrycker verksamhetsavsikt och säkerställer att alla anrop sker i ett användningsfallskontext. Detta gör det möjligt att spåra ansvar, logga beslut och upprätthålla verksamhetsregler. Externa konsumenter - oavsett om det är ett annat system, en frontend-applikation eller en AI-agent - får alltid anropa systemtjänster. Konsekvensen av att bryta denna regel är att verksamhetslogik riskerar att dupliceras hos konsumenten och att spårbarhet går förlorad.

### Extern konsument → Resurs-API: ⚠ Särskilda villkor

Resurs-API:er tillåts för externa konsumenter endast när de används för läsning, rapportering eller som komplement till systemtjänster. De får aldrig användas för att skapa egna användningsfall genom att kombinera resurser. Anledningen är att resurs-API:er saknar verksamhetskontext - de beskriver "vad" men inte "varför". Om externa konsumenter börjar kombinera resurser uppstår implicit verksamhetslogik utanför domänen, vilket leder till oupptäckta beroenden och svårigheter att förstå systemets verkliga beteende.

### Extern konsument → Intern komponent / Domänlogik / Persistenslager: ✗ Förbjudet

Externa konsumenter får aldrig komma åt interna komponenter, domänlogik eller persistenslager. Dessa är implementation details som måste kunna ändras utan att påverka konsumenter. Att exponera dessa skapar hårt kopplade system där refaktorering blir omöjlig. Konsekvensen är att arkitekturen fryser i sin nuvarande form och att verksamhetsutveckling hämmas av teknisk skuld.

### Systemtjänst (samma domän) → Alla komponenter: ✓ Tillåtet

Inom samma domän har systemtjänster full frihet att använda alla interna byggblock: andra systemtjänster, resurs-API:er, interna komponenter, domänlogik och persistenslager. Detta är en medveten designprincip som möjliggör komposition och återanvändning. Systemtjänster orkestrerar användningsfall och får därför använda alla verktyg som behövs. Denna frihet är grund för att domänen ska kunna utvecklas effektivt utan onödig ceremony.

### Systemtjänst (annan domän) → Systemtjänst: ✓ Tillåtet

Systemtjänster får anropa systemtjänster i andra domäner. Detta är den rekommenderade formen för domän-till-domän-kommunikation eftersom båda sidor uttrycker verksamhetsavsikt. Varje domän behåller sin autonomi och kan utvecklas oberoende. Denna regel uppmuntrar till att bygga väldefinierade användningsfall istället för generiska datadelningsmekanismer.

### Systemtjänst (annan domän) → Resurs-API: ⚠ Särskilda villkor

Systemtjänster i en domän får använda resurs-API:er i en annan domän, men endast som läskälla eller referensdata. De får inte kombinera resurser till nya användningsfall - då ska mottagande domän istället exponera en systemtjänst. Anledningen är att om domän A börjar skapa affärslogik baserat på domän B:s resurser, uppstår ett dolt beroende som inte syns i arkitekturen. Konsekvensen är att ändringar i domän B kan bryta funktionalitet i domän A utan att det är tydligt varför.

### Systemtjänst (annan domän) → Intern komponent / Domänlogik / Persistenslager: ✗ Förbjudet

Systemtjänster från andra domäner får aldrig komma åt interna komponenter, domänlogik eller persistenslager. Detta skulle bryta domänens autonomi och skapa direkta tekniska beroenden mellan domäner. Domäner ska kunna refaktorera interna strukturer fritt. Konsekvensen av att bryta denna regel är att domäner blir låsta till varandra på implementationsnivå, vilket förhindrar oberoende utveckling och skapar en distribuerad monolit.

### Resurs-API (samma domän) → Systemtjänst: ✗ Förbjudet

Resurs-API:er får inte anropa systemtjänster, varken i samma domän eller andra domäner. Anledningen är att resurs-API:er representerar data och tillstånd - de ska vara passiva och inte utföra användningsfall. Om ett resurs-API behöver trigga verksamhetslogik är det ett tecken på att gränsdragningen är fel. Konsekvensen av att tillåta detta skulle vara cirkulära beroenden och en suddig gräns mellan representation och beteende.

### Resurs-API (samma domän) → Resurs-API / Intern komponent / Domänlogik / Persistenslager: ✓ Tillåtet

Resurs-API:er inom samma domän har tillgång till andra resurs-API:er, interna komponenter, domänlogik och persistenslager. Detta gör det möjligt att bygga sammansatta vyer, berika data och optimera läsprestanda. Resurs-API:er får transformera och komponera data, men ska inte implementera användningsfallslogik. Denna frihet är nödvändig för att resurs-API:er ska kunna ge konsumenter rätt representation av domänens tillstånd.

### Resurs-API (annan domän) → Resurs-API: ✓ Tillåtet

Resurs-API:er får läsa från resurs-API:er i andra domäner. Detta är användbart för att skapa sammansatta vyer som korsar domängränser, exempelvis för rapportering eller dashboard-vyer. Begränsningen är att detta endast ska användas för läsning och presentation - aldrig för att implementera verksamhetslogik. Konsekvensen om detta missbrukas är att verksamhetsregler hamnar i representationsskiktet, vilket gör dem osynliga och omöjliga att testa isolerat.

### Resurs-API (annan domän) → Intern komponent / Domänlogik / Persistenslager: ✗ Förbjudet

Resurs-API:er i andra domäner får aldrig komma åt interna komponenter, domänlogik eller persistenslager. Samma princip som för externa konsumenter gäller: interna strukturer är implementation details. Konsekvensen av att bryta denna regel är att domänens interna utveckling blir beroende av andra domäners representation, vilket skapar oväntade och svårupptäckta kopplingar.

### Intern komponent → Systemtjänst / Resurs-API: ✗ Förbjudet

Interna komponenter får inte anropa systemtjänster eller resurs-API:er. Beroendet ska gå åt andra hållet - systemtjänster och resurs-API:er använder interna komponenter, inte tvärtom. Anledningen är att interna komponenter representerar byggstenar på lägre abstraktionsnivå. Om de börjar anropa högre nivåer skapas cirkulära beroenden och arkitekturen blir svår att förstå och testa. Konsekvensen är att ändringar får oförutsägbara effekter och testbarhet försämras dramatiskt.

### Intern komponent → Intern komponent / Domänlogik / Persistenslager: ✓ Tillåtet

Interna komponenter får fritt använda andra interna komponenter, domänlogik och persistenslager inom samma domän. Detta är implementationsfriheten som gör det möjligt att strukturera kod effektivt, återanvända logik och optimera teknisk design. Dessa beroenden är interna och påverkar inte externa konsumenter, vilket innebär att de kan ändras när som helst utan att bryta kontrakt.