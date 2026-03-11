# Sammanfattning ett arkitekturellt synsätt  

Texten beskriver ett arkitekturellt synsätt som syftar till att skapa ordning i organisatorisk och teknisk komplexitet genom ett gemensamt språk, tydliga ansvar och skarpa gränser – snarare än fler tekniska modeller.

Utgångspunkten är att många problem mellan verksamhet och IT inte beror på bristande kompetens, utan på att samma ord används med olika betydelser. Verksamheten tänker i ansvar och beslut, medan system ofta byggs kring funktioner och teknik, vilket skapar friktion och svårföränderliga lösningar.

Kärnan i modellen är:

Affärsförmågor beskriver vad organisationen behöver kunna göra och är stabila över tid.

Domäner är avgränsade verksamhetsområden med eget språk, egna regler och tydligt ansvar.

Domäntjänster är domänens externa erbjudande och den nivå där ägarskap, versionering och kommunikation hör hemma.

Systemtjänster uttrycker verksamhetsavsikt (”varför”) och representerar användningsfall som skapar affärsvärde.

Resurs-API:er hanterar information (”vad”) och dess livscykel, och ska inte bära verksamhetslogik.

Arkitektur ses lika mycket som ett regelverk för vad som inte är tillåtet som för vad som är möjligt. Externa konsumenter – inklusive AI – ska alltid använda domäntjänster och aldrig intern struktur eller råa resurser. Ju mer autonom konsumenten är, desto striktare måste gränserna vara.

Standardsystem som SAP ska behandlas som implementation, inte som organisationens domänmodell. Organisationens egna domäner äger begrepp och ansvar, medan integration mot standardsystem sker via domänspecifika adaptrar.

Ett begränsat antal begrepp måste vara gemensamma för alla i ett projekt. Alla behöver inte kunna allt – men alla behöver förstå ansvar, handlingar, aktörer och gränser. Det gemensamma språket är inte det minsta gemensamma, utan det mest nödvändiga.

För ledningen innebär modellen:

Tydligare ansvar och spårbarhet, även vid automatisering

Bättre kontroll över förändring

Medveten och styrbar användning av AI

Effektivare samarbete mellan verksamhet och IT

Slutsatsen är att kontroll och förändringsförmåga inte skapas av mer teknik, utan av tydligare ansvar, gemensamt språk och konsekventa arkitektoniska gränser. Arkitektur blir då ett verktyg för samsyn, bättre beslut och verklig förändring.