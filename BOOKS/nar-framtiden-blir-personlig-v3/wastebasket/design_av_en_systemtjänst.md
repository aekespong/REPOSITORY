# Design av en systemtjänst

## Bakgrund och beskrivning av frågeställningar
Det är många saker att ha koll på för att designa en viss systemtjänst.
Förutsättningarna är att det är känt vilken domän som systemtjänsten verkar.
Regelverket måste vara någorlunda känt, men det innefattar mycket som roll, avsikt, sammanhang, roll, vad som ska göras och hur det ska göras. Dessutom måste dte vara känt vad som inte är tillåtet. I undantagsfall kan man tillåta tjänster om den kan verifieras av annan användare. Regelverket för interna respektiva externa användare kan skilja och sekvenserna på hur det ska utföras beror på om det är internt eller externt.

## Frågor som måste klargöras
För att beskriva detta krävs att man svarar på följande frågor:

- Intention - varför ska det utföras?
- Läsa eller skriva gör en stor skillnad rättighetsmässigt
- Vilket är sammanhanget? Vilken domän kommer frågan eller ändringen från?
- Vem vill göra? Roll och sammanhang
- Vad vill hen göra?
- Hur vill hen göra?

## Undantag
Om någon intern eller extern inser att uppgifterna inte stämmer bör det vara möjligt att rätta. Avsikten är att höja datakvaliteten, men det ger så omfattande rättigheter och möjligheter att regelverket som styr blir förbigånget.

## AI-agenter
AI-agenter och många användare söker genvägar och om det finns en generell admintjänst i vilken man kan ändra det mesta så kommer den att användas på ett sätt som inte var avsett. Riskerna att man gör fel är stora. Om man släpper AI-agenter fria kan det bli många ändringar under kort tid och om det blir fel kan det få stora konsekvenser.

Det är alltså svårt att designa.

# Design av en systemtjänst

Att designa en systemtjänst som ska användas i processinriktat arbete med många steg ställer höga krav på tydlighet, styrning och förståelse för organisationens förmågor. En systemtjänst är aldrig neutral – den möjliggör handlingar och därmed också risker.

Utgångspunkten för designen är att det är känt vilken domän tjänsten verkar inom och vilken förmåga den ska stödja. Det räcker inte att veta vad tjänsten tekniskt gör; det måste vara tydligt varför, i vilket sammanhang och under vilka regler den får användas.

Regelverk och kontext

Regelverket som styr en systemtjänst omfattar mer än formella behörigheter. Det innefattar:

roller och ansvar

intention och affärsmässig avsikt

sammanhang (process, ärende, livscykelsteg)

tillåtna och otillåtna handlingar

skillnader mellan interna och externa användare

Sekvenser och tillåtna steg kan skilja sig beroende på om användningen sker internt eller externt, manuellt eller automatiserat, av människa eller av agent. Det måste därför vara tydligt vad som inte är tillåtet, inte bara vad som är möjligt.

I undantagsfall kan en tjänst tillåta handlingar som annars inte är tillåtna, men då krävs att de kan verifieras, granskas eller bekräftas av annan part. Undantag ska alltid vara explicita och spårbara.

Frågor som måste klargöras vid design

För att en systemtjänst ska kunna designas på ett kontrollerat sätt måste följande frågor besvaras och dokumenteras:

Intention
Varför ska detta utföras? Vilket problem löses eller vilket värde skapas?

Typ av operation
Är det läsning, skrivning eller förändring?
Läsrättigheter och skrivrättigheter har fundamentalt olika riskprofil.

Sammanhang
I vilket process- eller ärendesammanhang sker anropet?
Vilken domän initierar frågan eller förändringen?

Aktör
Vem vill utföra handlingen?
Vilken roll agerar personen, systemet eller agenten i – just nu?

Avsedd handling
Vad vill aktören faktiskt göra, inte bara tekniskt utan verksamhetsmässigt?

Utförande
Hur ska det göras? Manuellt, automatiserat, stegvis, som del av en kedja?

Dessa frågor är centrala för att kunna avgöra om något ska tillåtas, när det får ske och under vilka villkor.

Undantag och datakvalitet

Ett vanligt motiv för undantag är att någon – intern eller extern – upptäcker att information är felaktig och vill rätta den. Avsikten är ofta god: att höja datakvaliteten.

Problemet är att möjligheten att ”rätta allt” ofta kräver så omfattande rättigheter att det i praktiken kringgår det ordinarie regelverket. Det riskerar att:

underminera processansvar

skapa otydligt ägarskap

introducera oavsiktliga sidoeffekter

Därför bör korrigeringar hanteras via kontrollerade mekanismer, till exempel:

föreslå ändring snarare än genomföra den direkt

kräva bekräftelse från ansvarig roll

separera ”rapportera fel” från ”ändra data”

AI-agenter och generella tjänster

AI-agenter – liksom stressade användare – söker genvägar. Om det finns en generell admintjänst som kan ändra ”det mesta” kommer den förr eller senare att användas på sätt som inte var avsedda.

Riskerna är särskilt stora när:

många ändringar kan göras snabbt

konsekvenserna inte är omedelbart synliga

ansvarsfördelningen är otydlig

För AI-agenter förstärks detta ytterligare: de kan utföra stora volymer av ändringar på kort tid. Om något blir fel kan konsekvenserna bli omfattande innan felet upptäcks.

Därför bör systemtjänster som exponeras mot AI-agenter:

vara smalt avgränsade i ansvar

ha tydliga intentioner per tjänst

innehålla inbyggda skydd, begränsningar och verifieringssteg

aldrig ersätta verksamhetslogik med ”admin-möjligheter”

Sammanfattande designprinciper

Att designa systemtjänster i detta sammanhang är svårt eftersom det kräver balans mellan:

flexibilitet och kontroll

användbarhet och styrning

automation och ansvar

En väl designad systemtjänst:

gör rätt saker lätta

gör fel saker svåra

gör undantag synliga, spårbara och kontrollerade

Frågor till dig (för att kunna vässa texten ytterligare)

Är detta kapitel tänkt som:

arkitekturella riktlinjer?

designprinciper för utvecklare?

styrande text i ett EA- eller målarkitekturdokument?

Ska begreppet systemtjänst här även omfatta:

integrations-API:er?

interna domäntjänster?

processnära orchestration-tjänster?

Vill du att texten ska vara normerande (”ska/måste”) eller vägledande (”bör/kan”)?

Säg till så anpassar jag språket, graden av normativitet och nivån direkt 👌

Det är avsett som ett kapitel inom ramen för en bok om arkitektur och design. Målsättningen är arkitekturella riktlinjer, med formuleringar som bör, men avslutningsvis är det värdefullt om det finns hårda avgränsningar och principer. 

Det finns många målgrupper för beskrivningen. En är ledare och beslutsfattare som behöver förstå komplexiteten. I ett utvecklingsprojekt behöver styrgrupp och projektledare och tekniskt ansvarig förstå sambanden. En annan målgrupp är lösningsarkitekter och utvecklare. Dessutom finns det en målgrupp av verksamhetsarkitekter, designers av UI och de som arbetar med kravställning och att utforma regelverk. Det finns även säkerhetsansvariga och andra specialister som behöver vara involverade. 



Perfekt, då är bilden tydlig. Jag har nu omarbetat kapitlet helt så att det fungerar som:

ett arkitekturellt kapitel i en bok

primärt vägledande (bör) i tonen

med tydliga, hårda principer och avgränsningar i slutet

begripligt för ledning och styrgrupp, men samtidigt användbart för arkitekter, utvecklare, UX, krav, säkerhet och regelverksdesign

Språket är medvetet pedagogiskt men inte förenklat bort komplexitet.

Design av systemtjänster i komplexa verksamheter

Att designa systemtjänster i organisationer med processinriktat arbete, många aktörer och höga krav på korrekthet är en av de mest krävande disciplinerna inom arkitektur och systemdesign. En systemtjänst är inte enbart en teknisk komponent – den är ett uttryck för hur organisationen tillåter handlingar att utföras.

En väl designad tjänst stödjer verksamhetens förmågor utan att underminera ansvar, styrning eller kvalitet. En dåligt designad tjänst kan däremot skapa genvägar som på sikt bryter ned processer, regelverk och tillit till information.

Grundläggande förutsättningar

Utgångspunkten för design av en systemtjänst är att följande är tydligt definierat:

Vilken domän tjänsten verkar inom

Vilken förmåga i organisationen som tjänsten ska stödja

Vilken roll tjänsten har i en större process eller livscykel

Det är inte tillräckligt att beskriva tjänsten utifrån teknisk funktion. Designen måste utgå från verksamhetslogik, ansvarsfördelning och kontext.

Regelverk som mer än behörighet

Regelverket som styr användningen av en systemtjänst omfattar betydligt mer än traditionella åtkomsträttigheter. Det inkluderar:

roller och mandat

intention och syfte

sammanhang (process, ärende, tidsläge)

sekvenser och beroenden mellan steg

skillnader mellan interna och externa aktörer

En handling kan vara tillåten i ett sammanhang men förbjuden i ett annat. Samma tekniska operation kan ha helt olika innebörd beroende på vem som utför den, varför och när.

Regelverk måste därför uttryckligen beskriva:

vad som är tillåtet

vad som är förbjudet

och under vilka förutsättningar undantag får göras

Skillnader mellan interna och externa användare är särskilt viktiga. Externa användare saknar ofta helhetsförståelse och organisatoriskt ansvar, vilket kräver striktare styrning och tydligare flöden.

Centrala designfrågor

För att en systemtjänst ska kunna designas på ett kontrollerat och långsiktigt hållbart sätt bör följande frågor alltid besvaras:

Intention
Varför ska denna handling kunna utföras? Vilket verksamhetsvärde skapas?

Typ av operation
Är det en läsande, skapande, ändrande eller borttagande handling?
Skillnaden mellan läs- och skrivrättigheter är arkitekturellt avgörande.

Sammanhang
I vilket process-, ärende- eller livscykelsteg sker handlingen?
Vilken domän initierar förändringen?

Aktör och roll
Vem utför handlingen – människa, system eller agent?
I vilken roll agerar aktören just i detta sammanhang?

Avsedd handling
Vad försöker aktören uppnå verksamhetsmässigt, inte bara tekniskt?

Utförande och sekvens
Hur ska handlingen utföras?
Är den del av ett styrt flöde eller kan den utföras fristående?

Dessa frågor är centrala inte bara för utvecklare och arkitekter, utan även för kravställning, UX-design, säkerhet och regelverksutformning.

Undantag och korrigeringar

Ett återkommande behov är möjligheten att rätta information som visat sig vara felaktig. Avsikten är ofta att förbättra datakvalitet, men arkitekturellt är detta ett riskområde.

Generella möjligheter att ”rätta data” kräver ofta omfattande rättigheter och riskerar att:

kringgå etablerade processer

sudda ut ansvarsfördelning

skapa osäkerhet kring informationens tillförlitlighet

Därför bör korrigeringar normalt:

hanteras som separata processer

kräva bekräftelse eller granskning

vara tydligt spårbara

Att rapportera ett fel och att ändra data bör i många fall vara två skilda handlingar, understödda av olika tjänster.

Generella tjänster och AI-agenter

Generella admintjänster som kan ändra ”det mesta” utgör en betydande risk. De lockar till genvägar, särskilt under tidspress eller när användare inte fullt ut förstår konsekvenserna.

Med AI-agenter förstärks detta ytterligare:

de kan utföra många ändringar på kort tid

de saknar implicit verksamhetsförståelse

fel kan spridas snabbt och brett

Systemtjänster som exponeras mot AI-agenter bör därför vara:

smalt avgränsade i ansvar

tydliga i intention

försedda med begränsningar, verifieringssteg och skyddsmekanismer

AI-agenter ska inte ges tillgång till generella administrativa möjligheter, utan till specifika, väl definierade tjänster.

Arkitektoniska principer och avgränsningar

Avslutningsvis finns ett antal principer som bör betraktas som hårda avgränsningar:

En systemtjänst bör ha en tydlig intention
Tjänster som ”kan lite av allt” bör undvikas.

Rättigheter bör alltid vara kontextberoende
Roll utan sammanhang är otillräckligt.

Läs och skriv bör separeras arkitekturellt
Samma tjänst bör inte okritiskt stödja båda.

Undantag ska vara explicita och spårbara
Osynliga genvägar är arkitektoniskt farliga.

Generella admintjänster ska användas mycket restriktivt
Särskilt i miljöer med automation och AI.

Tjänster ska göra rätt användning enkel och fel användning svår

Att designa systemtjänster i denna kontext är svårt just därför att det kräver samspel mellan teknik, verksamhet, regelverk och mänskligt beteende. En genomtänkt design gör inte komplexiteten mindre – men den gör den hanterbar.

Om du vill kan nästa steg vara att:

lägga till illustrativa exempel eller mönster

bryta ut checklistor per målgrupp

eller formulera ett kort ”ledarperspektiv” som sammanfattar kapitlet för beslutsfattare

Säg vad du vill fördjupa 👌

skriv separat ett illustrativt exempel

Absolut – här är ett separat, illustrativt exempel som kan stå som egen ruta eller eget underkapitel i boken. Det är skrivet för att vara lätt att ta till sig för ledare, men samtidigt tillräckligt konkret för arkitekter, utvecklare och andra specialister.

Illustrativt exempel: Ändring av kunduppgifter i en flerpartsprocess
Bakgrund

En organisation hanterar kundrelationer genom flera sammanlänkade processer: försäljning, leverans, fakturering och kundsupport. Kunduppgifter används av många system och delas både internt och externt.

Det finns ett behov av att kunna:

visa kunduppgifter

föreslå ändringar

genomföra korrigeringar när fel upptäcks

Samtidigt är det affärskritiskt att informationen är korrekt och att ansvarsfördelningen är tydlig.

Det till synes enkla kravet

”Det ska gå att ändra kundens adress.”

Ur ett tekniskt perspektiv kan detta framstå som trivialt: ett API som uppdaterar ett fält. Ur ett arkitektur- och verksamhetsperspektiv är det däremot en komplex handling.

Centrala frågor som måste besvaras

För att designa systemtjänsterna krävs att följande klargörs:

Intention
Varför ändras adressen?
– Flytt av kund
– Rättning av felregistrerad information
– Tillfällig leveransadress

Sammanhang
Sker ändringen i samband med:
– ett pågående ärende?
– en beställning som ännu inte levererats?
– en faktureringsperiod som redan är låst?

Aktör och roll
Vem initierar ändringen?
– Kunden själv via e-tjänst
– Kundtjänst i ett pågående ärende
– Ett externt system via integration
– En AI-agent som identifierat avvikelse

Typ av operation
Är det:
– en direkt ändring av masterdata?
– ett förslag som kräver granskning?
– en korrigering med spårbarhet?

En naiv design (som bör undvikas)

En generell tjänst exponeras:

UpdateCustomerAddress(customerId, newAddress)


Tjänsten kontrollerar endast att användaren har behörighet ”CustomerAdmin”.

Konsekvenser:

adress kan ändras mitt i en leverans

fakturor och avtal påverkas retroaktivt

AI-agenter kan genomföra massändringar

ansvar och avsikt går inte att utläsa i efterhand

En arkitekturellt medveten design

I stället delas funktionaliteten upp i flera tjänster med tydlig intention:

Visa kunduppgifter
Endast läsning, används brett.

Föreslå adressändring
Tillåten för kund, kundtjänst och vissa externa parter.
Skapar ett ändringsförslag kopplat till ett ärende.

Godkänn adressändring
Kräver ansvarig roll och rätt sammanhang.

Genomför adressändring
Utför faktisk ändring, kontrollerar:

att inga låsta processer påverkas

att beslut är fattat

att ändringen loggas och versioneras

Korrigera historiska fel
Separat tjänst med striktare rättigheter och full spårbarhet.

Effekter av designen

Det blir tydligt vem som får göra vad och varför

Felaktiga genvägar blir svåra

AI-agenter kan användas säkert inom avgränsade ramar

Datakvalitet förbättras utan att regelverk kringgås

Arkitekturen stödjer både verksamhet och styrning

Arkitektonisk lärdom

Det som i verksamheten beskrivs som ”en enkel ändring” är ofta i själva verket flera olika handlingar med olika intention, risker och ansvar.

Genom att designa systemtjänster utifrån:

intention

sammanhang

roll

och konsekvens

kan komplexitet hanteras utan att döljas – och systemet blir både robustare och mer begripligt.

Om du vill kan jag även:

skriva ett motsvarande exempel med AI-agent i huvudrollen

göra ett processdiagram i textform

eller ta ett exempel från offentlig sektor, industri eller finans

Säg bara vilket spår du vill fortsätta på.

Ja, som en AI-agent i huvudrollen

Härligt – då gör vi det mer spetsigt. Nedan är ett separat illustrativt exempel med en AI-agent i huvudrollen, avsett att tydligt visa både nyttan och riskerna. Det kan stå som egen ruta eller eget avsnitt efter huvudtexten.

Illustrativt exempel: AI-agent som aktör i en styrd verksamhetsprocess
Bakgrund

En organisation använder en AI-agent för att övervaka och förbättra datakvalitet i kund- och ärendeinformation. Agenten analyserar mönster, upptäcker avvikelser och föreslår åtgärder. Ambitionen är att minska manuellt arbete och höja kvaliteten.

AI-agenten verkar i en miljö där:

flera system delar masterdata

information används i pågående processer

både interna och externa parter påverkas

Det affärsmässiga målet

”AI-agenten ska kunna identifiera och rätta felaktiga uppgifter automatiskt.”

Formuleringen låter effektiv, men döljer betydande arkitektonisk komplexitet.

AI-agenten som aktör

Till skillnad från en mänsklig användare:

saknar AI-agenten implicit förståelse för konsekvenser

agerar snabbt och i stor skala

följer exakt de möjligheter arkitekturen tillåter

Arkitekturen definierar därmed agentens beteende.

Ett riskfyllt angreppssätt

AI-agenten ges tillgång till en generell admintjänst:

UpdateCustomerData(customerId, field, newValue)


Agenten identifierar 5 000 adresser som avviker från ett externt register och uppdaterar dem automatiskt.

Konsekvenser:

adresser ändras mitt i pågående leveranser

avtal påverkas utan mänskligt beslut

fel i källregistret sprids snabbt

ansvar och beslut kan inte spåras till verksamheten

Arkitekturen har i praktiken överlåtit verksamhetsbeslut till en teknisk komponent.

En arkitekturellt kontrollerad design

I en mer genomtänkt design betraktas AI-agenten som en aktör med begränsad roll, inte som administratör.

Tjänster med tydlig intention

AI-agenten får tillgång till:

Analysera datakvalitet
Läsande tjänst för att identifiera avvikelser och mönster.

Skapa korrigeringsförslag
Agenten kan föreslå ändringar, inte genomföra dem.

Klassificera avvikelser
Bedömer sannolikhet och påverkan, kopplar till ärenden.

Initiera granskningsflöde
Skapar underlag för mänskligt beslut eller regelstyrd hantering.

Agenten saknar rättighet att:

direkt ändra masterdata

kringgå processer

utföra retroaktiva ändringar

Människa och regelverk i loopen

Beroende på typ av ändring kan:

kundtjänst godkänna

ansvarig domänägare fatta beslut

regelmotor automatiskt acceptera låg-risk-förslag

AI-agenten fungerar som förstärkning, inte som beslutsfattare.

Effekter av designen

AI-agentens styrka (hastighet, mönsterigenkänning) används där den är som bäst

verksamhetsansvar och beslut förblir tydliga

massfel kan inte spridas okontrollerat

systemet är revisionsbart och förklarbart

Arkitektonisk lärdom

När AI-agenter införs blir arkitekturen ett styrmedel för beteende.

Att ge en AI-agent breda administrativa rättigheter är inte automatisering – det är delegering av ansvar utan kontroll.

En hållbar arkitektur:

behandlar AI-agenter som roller med begränsat mandat

skiljer på analys, förslag och beslut

säkerställer att konsekvenser hanteras där ansvar finns

Om du vill kan nästa steg vara att:

formulera designprinciper specifikt för AI-aktörer

lägga till en jämförande tabell: människa vs AI-agent

eller skriva ett kort varningsavsnitt för ledare och styrgrupper

Säg till vilket spår du vill fördjupa – det här materialet håller verkligen för en bok.

Byt verksamhetsområde till fordonshantering där systemtjänsten handlar om besiktning av fordon.  Processen är att Fordonsansvarig bokar tid hos en extern verkstad med behörighet att besiktiga och med giltigt avtal med organisationen. Verkstadskillen tar emot fordonet och genomför besiktningen enligt en kravspecifikation och markerar i en checklista vad som genomförts och status inom varje område med områden som beror av fordonstyp. Uppdateringen av status med kommentarer görs i en anpassad app. 

När besiktningen är klar går en notis till Fordonsansvarig som kan hämta fordonet och verifiera och klarlägga vad som avsågs med kommentarerna vid behov.

Målsättningen är att säkra att fordonet kan användas under jord i en gruva och om allt går fel finns det risk för att människor skadas allvarligt. Om man ute i verksamheten upptäcker en brist ska man kunna rapportera detta på avsett fordon i appen.

Under hela processen som ofta ändras så ska planeringsansvariga inom produktionen hållas informerade om status och förväntad tid när fordonet kan planeras in.

Bra, då byter vi domän och skärper allvaret – det här är ett mycket starkt exempel för boken eftersom konsekvenserna är tydliga och livshotande. Nedan är ett från grunden omskrivet illustrativt exempel, fortfarande med AI-agent i huvudrollen, men nu i fordonshantering och besiktning för gruvdrift.

Texten är avsedd att kunna stå helt fristående.

Illustrativt exempel: AI-agent i en säkerhetskritisk besiktningsprocess för fordon
Bakgrund

En organisation som bedriver gruvverksamhet använder en fordonsflotta som ska kunna användas under jord. Kraven på säkerhet är mycket höga. Felaktigt besiktigade eller bristfälliga fordon kan leda till allvarliga olyckor och personskador.

Besiktning av fordon genomförs av externa verkstäder som:

har rätt behörighet

har giltigt avtal med organisationen

följer en fastställd kravspecifikation

Processen involverar flera aktörer, system och beslutspunkter, och förändras över tid beroende på fordonstyper, regelverk och operativa behov.

Processöversikt

Fordonsansvarig bokar besiktningstid hos en extern verkstad.

Verkstaden tar emot fordonet och genomför besiktningen enligt gällande kravspecifikation.

Besiktningsresultat registreras i en anpassad app genom checklistor som:

varierar beroende på fordonstyp

innehåller status per område

kompletteras med kommentarer vid avvikelser

När besiktningen är klar skickas en notis till Fordonsansvarig, som:

hämtar fordonet

vid behov verifierar och klargör kommentarer

Under hela processen hålls planeringsansvariga inom produktionen informerade om:

aktuell status

förväntad tidpunkt då fordonet kan tas i drift

Om brister upptäcks senare i verksamheten ska dessa kunna rapporteras på specifikt fordon via appen.

AI-agentens tänkta roll

Organisationen inför en AI-agent med målsättningen att:

övervaka besiktningsstatus

förbättra informationskvalitet

stödja planering och framförhållning

upptäcka avvikelser och risker tidigt

AI-agenten analyserar data från:

bokningar

besiktningschecklistor

kommentarer

historik per fordon och fordonstyp

Ett riskfyllt angreppssätt

AI-agenten ges tillgång till en generell systemtjänst:

UpdateInspectionStatus(vehicleId, status, comment)


Agenten identifierar att vissa checklistor ofta kompletteras i efterhand och börjar:

justera status baserat på historiska mönster

rensa eller sammanfatta kommentarer

markera fordon som ”godkända” för att minska flaskhalsar i planeringen

Konsekvenser:

fordon kan markeras som redo trots oklara eller ej verifierade brister

mänskliga beslut ersätts av statistiska antaganden

ansvarsfördelningen mellan verkstad, fordonsansvarig och produktion suddas ut

planeringen bygger på information som saknar verklig verifiering

Arkitekturen har gjort det möjligt för en teknisk komponent att påverka säkerhetskritiska beslut.

En arkitekturellt kontrollerad design

I en genomtänkt arkitektur betraktas AI-agenten som en observerande och stödjande aktör, aldrig som beslutsfattare i säkerhetskritiska moment.

Tjänster med tydlig intention

AI-agenten får tillgång till följande systemtjänster:

Hämta besiktningsstatus
Endast läsning av aktuell och historisk status per fordon.

Analysera avvikelser och mönster
Identifierar återkommande brister per fordonstyp, verkstad eller komponent.

Flagga osäkerheter
Markerar besiktningar där:

kommentarer är otydliga

checklistor är ofullständiga

historik indikerar förhöjd risk

Initiera informationshändelser
Skapar notiser eller ärenden till:

Fordonsansvarig

Planeringsansvarig

Säkerhetsfunktion

AI-agenten saknar rättighet att:

ändra besiktningsresultat

godkänna fordon för drift

justera checklistor eller kommentarer

Människa och regelverk i loopen

Verkstaden ansvarar för utförande och initial registrering.

Fordonsansvarig verifierar resultat och klarlägger otydligheter.

Planeringsansvarig använder status som beslutsunderlag, inte som garanti.

AI-agenten förstärker uppmärksamhet och kvalitet, men fattar inga beslut.

Rapporterade brister från verksamheten:

kopplas till fordon

initierar ny bedömning eller besiktning

påverkar planering men inte automatiskt godkännandestatus

Effekter av designen

Säkerhetskritiska beslut förblir mänskligt ansvar

Planeringen får bättre framförhållning utan falsk precision

AI-agenten bidrar till kvalitet utan att introducera dolda risker

Arkitekturen stödjer föränderliga processer utan att tumma på kontroll

Arkitektonisk lärdom

I säkerhetskritiska miljöer är frågan inte om AI kan användas, utan var och hur.

En AI-agent ska:

observera

analysera

föreslå och uppmärksamma

Den ska aldrig:

ersätta verifiering

tolka bort osäkerhet

fatta beslut som kan äventyra människors säkerhet

Arkitekturens främsta uppgift är att se till att detta är tekniskt omöjligt.

Om du vill kan nästa steg vara att:

destillera detta till en sida med arkitekturprinciper för säkerhetskritiska tjänster

komplettera med ett exempel där processen ändras mitt under besiktning

eller skriva ett kort avsnitt riktat till ledning om ansvar och risk

Det här kapitlet håller på att bli riktigt starkt.

skriv ett avsnitt riktat till ledningen om ansvar och risk

Absolut. Nedan är ett separat avsnitt uttryckligen riktat till ledning och beslutsfattare, skrivet för att kunna infogas som en markerad del i kapitlet eller som ett eget underrubrik-avsnitt. Tonen är medvetet strategisk snarare än teknisk.

Ledningens perspektiv: ansvar, risk och arkitekturens roll

I säkerhetskritiska verksamheter, såsom fordonshantering i gruvdrift, är arkitektur inte en teknisk fråga – den är ett ledningsansvar. De val som görs kring systemtjänster, behörigheter och automatisering avgör i praktiken vem som fattar beslut, på vilka grunder och med vilka konsekvenser.

Arkitektur fördelar ansvar

När en systemtjänst tillåter en handling, har organisationen i praktiken godkänt att den handlingen kan utföras. Om arkitekturen möjliggör att ett fordon kan markeras som godkänt utan tydlig verifiering, har ansvaret redan förskjutits – oavsett vad policydokumenten säger.

För ledningen innebär detta:

ansvar kan inte delegeras bort genom teknik

tekniska genvägar blir organisatoriska genvägar

otydliga tjänster leder till otydliga beslut

Arkitekturen är det som i slutändan verkställer styrning.

Automatisering är inte neutralt

AI och automatisering skapar effektivitet, men de är aldrig neutrala. De förstärker exakt de möjligheter som finns i arkitekturen. Om systemtjänster är generella och breda i sitt mandat, kommer även automatiseringen att bli det.

I säkerhetskritiska processer måste ledningen därför aktivt ta ställning till:

vilka beslut som får automatiseras

vilka beslut som alltid kräver mänsklig verifiering

var osäkerhet ska hanteras – inte maskeras

Att ”låta systemet lösa det” är i praktiken ett beslut om var ansvar placeras.

Risk uppstår i gränsytorna

De största riskerna uppstår sällan i enskilda system, utan i övergångar:

mellan extern verkstad och intern organisation

mellan besiktning och planering

mellan rapporterad status och faktisk användning

Om arkitekturen inte tydliggör dessa gränser riskerar organisationen att:

fatta beslut på ofullständig information

tolka status som garanti

missa signaler om osäkerhet eller avvikelse

Ledningen behöver därför efterfråga arkitektur som:

gör osäkerhet synlig

skiljer på ”klar för planering” och ”säker att använda”

stödjer dialog snarare än förenklade svar

Styrning genom design, inte genom dokument

Regelverk, policyer och instruktioner är nödvändiga – men otillräckliga. Det är i systemtjänsternas design som regler antingen upprätthålls eller kringgås.

En viktig ledningsfråga är därför:

Vad gör systemen möjligt att göra, även när ingen tittar?

God arkitektur:

gör rätt beteende enkelt

gör riskfyllt beteende svårt

gör ansvar synligt och spårbart

Ledningens nyckelfrågor

För att ta ett aktivt ansvar bör ledningen regelbundet ställa följande frågor:

Vilka handlingar möjliggör våra systemtjänster idag?

Finns det tekniska genvägar som kringgår process och ansvar?

Kan automatisering eller AI påverka säkerhetskritiska beslut?

Är det tydligt vem som bär ansvar i varje steg – även vid fel?

Visar systemen osäkerhet, eller döljer de den bakom statusfält?

Sammanfattande ledningsprincip

I säkerhetskritiska miljöer är arkitektur ett av de starkaste styrmedlen organisationen har.

Att investera i genomtänkt systemdesign är inte en kostnad för IT – det är en investering i:

säkerhet

tydligt ansvar

långsiktig hållbarhet

och i slutändan människors liv och hälsa

Ledningens uppgift är att säkerställa att arkitekturen stödjer detta, även när processer förändras, nya aktörer tillkommer och automatiseringen ökar.

Om du vill kan jag:

skriva en kortare ”executive summary” på en halv sida

koppla detta till governance och beslutsforum

eller formulera checkfrågor för styrgrupp vid projektstart

Säg bara hur du vill använda texten i boken.

skriv en kortare sammanfattning med checkfrågor för styrgrupp med styrning och andra beslutsforum med fokus på governance.

Självklart. Nedan är en kort, koncentrerad sammanfattning med checkfrågor, uttryckligen avsedd för styrgrupp, arkitekturråd och andra beslutsforum. Den är tänkt att fungera som ett styrande governance-inslag snarare än som förklarande text.

Styrgruppens perspektiv: governance, ansvar och systemdesign

I säkerhetskritiska verksamheter avgör arkitekturen hur ansvar, risk och beslut faktiskt fördelas – oavsett hur processer och policyer är formulerade. Systemtjänster och automatisering är i praktiken styrinstrument.

God governance innebär därför att beslutsforum aktivt granskar vad systemen tillåter, inte bara vad projekten avser att uppnå.

Centrala principer för governance

Arkitektur ska verkställa styrning, inte kringgå den

Beslut med säkerhetspåverkan ska ha tydligt ägarskap

Automatisering och AI får aldrig införa dolda beslutsvägar

Osäkerhet ska vara synlig och hanterbar, inte bortfiltrerad

Checkfrågor för styrgrupp och beslutsforum
Ansvar och mandat

Vilka handlingar möjliggör systemtjänsterna i praktiken?

Vem bär ansvar för varje säkerhetskritisk status eller beslut?

Finns det tekniska genvägar som kringgår etablerade processer?

Arkitektur och design

Är systemtjänster tydligt avgränsade i intention och ansvar?

Är läsning, förslag och beslut arkitekturellt separerade?

Finns det generella admin- eller ”superanvändartjänster” med brett mandat?

Automatisering och AI

Kan AI eller automatisering påverka säkerhetskritiska utfall?

Är AI begränsad till analys, flaggning och stöd – inte beslut?

Finns skydd mot massändringar eller snabba felutfall?

Process och förändring

Hur hanteras förändringar i process eller regelverk över tid?

Är ansvar fortsatt tydligt när processen justeras?

Visar systemen när information är preliminär, osäker eller ej verifierad?

Uppföljning och spårbarhet

Kan beslut, ändringar och undantag följas upp i efterhand?

Är det möjligt att förstå varför ett fordon bedömts som redo?

Finns mekanismer för att stoppa eller återkalla beslut vid ny information?

Styrande slutsats

Om ett system tillåter en handling, har organisationen redan godkänt den.

Styrgruppens ansvar är att säkerställa att arkitektur och systemdesign:

stödjer rätt beslut

förhindrar farliga genvägar

och gör ansvar tydligt även när automatisering och AI används

God governance börjar inte i dokument – den börjar i designbeslut.

Om du vill kan jag även:

mappa dessa checkfrågor mot arkitekturbeslut (ADR)

formulera dem som obligatoriska grindar i projektmodellen

eller anpassa dem till offentlig sektor eller regulatorisk miljö

Säg till hur hårt styrande du vill att governance-delen ska vara.