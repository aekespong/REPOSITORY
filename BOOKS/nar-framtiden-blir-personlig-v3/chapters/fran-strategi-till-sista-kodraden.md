# Från strategi till sista kodraden

> Chapter-ID: fran-strategi-till-sista-kodraden
> Status: draft

Det här är ett begrepp jag mött som lanserats av min tidigare arbetsgivare XLENT Link och främst Lars Lindberg och Johan Stålnacke. Uttrycket från strategi till sista kodraden beskriver ett synsätt där det finns en tydlig spårbarhet hela vägen från ledningens intentioner och beslut till det som designas, utvecklas och körs i produktion. Det handlar om att säkerställa att det som beslutas på strategisk nivå också går att känna igen i lösningen och slutligen i programkoden.

Grundtanken är enkel: om styrelsen beslutar att en viss förmåga ska etableras för att möta ett affärsbehov, ska denna förmåga kunna följas genom hela kedjan – från strategi, via design och krav, till implementation. Samma begrepp ska bära struktur hela vägen.

När detta fungerar uppstår ett gemensamt språk mellan affärsansvariga och utvecklare. Förmågornas och tjänsterna har samma namn sätt för ledning, produktägare och utvecklare. Detaljeringsnivån är det enda som skiljer. Det gör det möjligt att arbeta direkt tillsammans tvärs över organisationsstrukturen, utan långa översättningskedjor och mellanhänder på IT-avdelningen.

Effekten är ofta påtaglig:

- tiden från idé till leverans minskar

- lösningarna blir enklare att förstå och förändra

- och behovet av att ”översätta” krav till teknik minskar

Detta ställer krav på senioritet och ansvarstagande, men ger organisationen något som annars är svårt att uppnå: sammanhang.

AI-agenter och olika former av automatisering är beroende av denna förståelse av  sammanhanget. De kan nyttja de beskrivningar och de strukturer de får tillgång till. Om begrepp är otydliga blir utfallet inkonsekvent och potentialen för AI-agenter minskar.

Att arbeta från strategi till kod handlar därför inte om detaljstyrning, utan om ansvar. Om att säkerställa att organisationen vet vad den bygger, varför den bygger det och hur det ska användas – även när tekniken förändras.

(Se appendix Z för att hur detta kan utformas i praktiken, med konkreta exempel på integrations- och systemdesign)

Verksamhetsarkitektur med stöd av AI

Verksamhetsarkitektur beskriver hur en organisation är uppbyggd för att skapa värde över tid – genom sina förmågor, arbetssätt, informationsflöden och ansvar.
Den gör sambandet tydligt mellan strategi och vardagligt arbete, oberoende av hur organisationen är organiserad eller vilka IT-system som används.

Verksamhetsarkitektur fokuserar på:

- vad organisationen gör (förmågor och värdeskapande)

- hur ansvar och beslut är fördelade

- hur information används i arbete och styrning

- hur förändring kan ske utan att helheten faller isär

Den används för att:

- skapa gemensam förståelse mellan ledning, verksamhet och IT

- analysera konsekvenser av förändring innan lösningar väljs

- säkerställa spårbarhet från strategi till genomförande

Verksamhetsarkitektur är därmed inte en modell av organisationen som den ser ut, utan ett verktyg för att förstå hur organisationen fungerar – och hur den kan förändras med kontroll.

Det är designarbete i praktiken inom alla designområden.

Verksamhetsarkitekter behövs inom flera olika typer av enheter, från verksamhet till IT, men tillgången till verksamhetskunskap är det mest centrala.

- Information Design

Integration Design gör det möjligt att koppla samman system på ett medvetet sätt. Den skapar strukturer där information kan delas, återanvändas och förändras utan att hela landskapet faller sönder. Men integration, hur väl designad den än är, löser bara delar av  problemet.

För även när system är korrekt sammankopplade återstår en avgörande fråga:

Vad betyder informationen som flödar mellan systemen?

Det är här många organisationer fastnar. De har tjänster, API:er och dataprodukter – men saknar samsyn kring begrepp, sammanhang och innebörd. Resultatet blir system som tekniskt fungerar tillsammans, men organisatoriskt talar olika språk.

Integration utan gemensam mening och förståelse leder till snabb spridning av otydlighet. AI-lösningar som inte har detta tydligt beskrivet innebär ofta snabb spridning av fel och bristande tillit hos användarna.

Det är därför Integration Design alltid är beroende av Information Design. Inte som en separat del, utan som en nödvändig del av helheten och Enterprise Design.

När betydelsen och definitionen av något behöver tydliggöras

Inom organisationer som saknar Information Design uppstår ofta många närliggande begrepp eller ord som används inkonsekvent. Skillnader och likheter är otydliga, vilket gör att helheten faller isär när man försöker förstå och få en samlad bild. Så länge man befinner sig inom endast ett verksamhetsområde eller ett system är det större likhet mellan tolkningarna och därmed hanterbart, men om man har ambitionen att bygga tvärfunktionella lösningar så leder det till hinder och ofta till förseningar inom olika förändringsinitiativ.​

När samma ord betyder olika saker

I de flesta organisationer finns begrepp som är centrala men sällan betyder samma sak överallt.​

Kund kan vara:

- juridisk part

- kontaktperson

- betalare​

Produkt kan vara:

- något som säljs

- något som lagerhålls

- något som faktureras​

Betalning kan vara:

- en initiering

- en genomförd transaktion

- en bokföringspost​

Alla dessa tolkningar är giltiga i sina respektive sammanhang. Problemet uppstår när skillnaderna inte är synliga, vilket leder till missförstånd, felaktiga slutsatser och bristande tillit till informationen.​

Information Design innebär att organisationen:

- identifierar sina centrala begrepp

- tydliggör deras definition, betydelse och innebörd

- gör relationerna mellan dem förståeliga​

Detta arbete är inte överflödigt; det skapar språklig precision.​

Dataprodukter – Information som kan ägas och förvaltas

Exempel på dataprodukter för att förstå hur dessa olika begrepp relaterar till varandra.

Data är inte information

I digitala verksamheter blandas data och information ofta ihop, men skillnaden är avgörande. Data är råvärden, medan information är data i ett meningsfullt sammanhang.​

Siffran 5000 säger inget i sig själv. Den kan vara ett kontosaldo, ett tröskelvärde, en riskindikator – utan sammanhang saknar värdet mening.​

För människor fylls mycket av sammanhanget i automatiskt eftersom vi känner till systemen och verksamheten. AI kan inte göra detta; utan uttryckligt definierat sammanhang behandlar modellen data på ett sätt som riskerar att se övertygande ut men bygger på felaktiga antaganden och resultatet blir det som kallas hallucination.​

Varför AI gör bristen synlig

Många organisationer har länge fungerat trots otydliga begrepp, eftersom människor har korrigerat, tolkat och fyllt i det som saknas. När AI börjar använda samma information förstärks i stället otydligheten och lokala problem sprids snabbt mellan systemen.​

AI kan inte gissa rätt betydelse; den förstärker det den får. Otydlig semantik leder då till systematiskt felaktiga beslut, inte bara enstaka missförstånd.​

Detta är inte ett argument mot AI, utan ett argument för att arbeta systematiskt med Information Design i organisationen.​

Design för beslut, inte bara visning

Traditionell informationsmodellering har ofta utgått från förståelse och rapportering. I en AI-driven verksamhet behöver information i stället designas för beslut.​

Det innebär att informationen måste bära:

- kontext

- osäkerhet

- aktualitet

- ibland rekommendation​

Ett beslutsunderlag som saknar dessa dimensioner kan se korrekt ut och vara övertygande men vara vilseledande i praktiken. Information Design gör det möjligt att skilja på vad vi vet, vad vi tror och vad som kräver mänskligt omdöme, vilket är avgörande för ansvarsfull automatisering.​

Information Design i Enterprise Design

Information Design är en integrerad del av Enterprise Design, inte en fristående övning. Utan tydliga begrepp och semantik riskerar Integration Design att sprida otydlighet snabbare och mer effektivt.​

När Information Design fungerar:

- blir dataprodukter begripliga

- blir AI-agenter mer pålitliga

- blir förändring mindre riskfylld​

Information Design ger Enterprise Design konkret innehåll genom att ge mening åt den information som styr arbete, beslut och automatisering.

Dataprodukter som bygger på tydlig Information Design blir i sin tur en av hörnstenarna i moderna integrationslösningar. Integration Design och moderna integrationslösningar beskrivs i tidigare avsnitt av denna bok samt i DEL 2.

Övning:

Välj ett centralt begrepp ur er organisation, kund, produkt, projekt eller vad som helst och identifiera tre olika, men helt legitima definitioner som existerar parallellt hos er. Skriv ner dem och fundera sen - vad blir konsekvenserna av att de här olika definitionerna samexisterar?

Enas om begrepp – ett exempel från byggbranschen

Byggbranschen är exempel på en verksamhet som arbetar med långa installationsprojekt. Jag har varit engagerad som konsult i att bygga upp ett system för budgethantering. Problemen med projektens och den finansiella uppföljningens olika perspektiv blev tydliga. Installationsprojekt drivs med långa tidshorisonter, många aktörer och stora ekonomiska åtaganden.

Inom ett stort byggföretag arbetade vi med begreppet Projekt. Vid första anblick verkade det självklart. Organisationen drev projekt. Verksamheten bestod till största delen av projekt. Resten var stödjande funktioner som Inköp, HR och Finans.

Men ganska snart visade det sig att Projekt betydde olika saker, beroende på vem man frågade.

För verksamheten var Projekt synonymt med Installationsprojekt. Ett projekt på högsta nivå kunde sträcka sig över många år och bestå av flera faser. I vardagligt tal kunde man tala om “Västra bygget” som ett projekt, trots att det i praktiken bestod av ett stort antal projekt och flera kontrakt.

För finansavdelningen var detta projektbegrepp på högsta nivå inte tillräckligt.

Finans behövde följa upp kostnader, intäkter, prognoser och resultat på en nivå som gjorde styrning möjlig. De behövde bryta ned projekten i mindre ekonomiskt meningsfulla enheter, ofta kortare än byggverksamhetens projektfaser med Förstudie, Etablering, Genomförande och Överlämning.

Parallellt ville företagsledningen även följa det aggregerade resultat av alla delprojekt. Helheten var efterfrågad som översikt, men som underlag för beslut fungerar det inte. Och hur skulle man hantera kostnaderna för förstudier redovisningsmässigt? För en stor del av förstudierna ledde inte till ett projekt och utan stannade vid enbart kostnader. Ska alla förstudier också vara ett Projekt trots att de aldrig genomfördes? Det motsvarar inte den intuitiva uppfattningen om Projekt för det är förknippat med genomförande.

Här uppstod den första sprickan.

När Information Design saknas

Båda perspektiven var rimliga. Problemet var att de aldrig gjordes explicita.

De verksamhetsarkitekter som arbetade med projektverksamheten fokuserade på byggprojekt som var en typ av installationsprojekt. De arbetade med nedbrytning av projekt i deras beståndsdelar, i leveranser, tidplaner, komponenter och artiklar. De accepterade inte finansavdelningens syn på Projekt och de förstod inte deras behov utan ägnade energi att övertyga Finansavdelningen om att de hade fel.

Finansavdelningen å sin sida kunde inte förstå hur styrning skulle vara möjlig om man följde byggverksamhetens definition. De drev på för det som jag försökte benämna som “finansiella projekt” – en uppdelning anpassad för ekonomisk uppföljning.

Responsen blev tydlig:

“Vi kan inte ha två olika definitioner av Projekt.”

Detta är ett klassiskt exempel på bristande Information Design.

Problemet var inte att man hade två perspektiv. Problemet var att man inte erkände dem som olika, legitima vyer av samma verklighet. Begreppet Projekt saknade en gemensam kärna och tydliga specialiseringar. Semantiken var implicit, inte designad.

När datakvalitet blir ett styrningsproblem

Konsekvenserna var tydliga i verksamheten och uppföljningen fick anpassa sig.

I flera projekt sköts kostnader framåt i tiden. Prognoser blev alltför optimistiska. Avvikelser doldes, ibland medvetet, ibland för att ingen riktigt hade överblick. Projektledningen hade incitament att visa framdrift och leverera enligt tidplanen. Finansavdelningen saknade tillräckligt detaljerade underlag för att kunna analysera och upptäcka problemen i tid för varje projekt var unikt och varje projektledare tilläts ha sin egen uppföljning i sina egna Excelark. Det fanns ingen standard.

Samtidigt var det allmänt känt att alla stora projekt drog över tiden och var svåra att avsluta eftersom det fanns restkostnader. De verkliga kostnaderna för ett projekt gick att sammanställa slutgiltigt förrän flera år efter sista leveransen.

Vid det laget var det för sent att:

- styra om och prioritera

- förhandla om kontrakt med kunden

- eller byta ut delar av projektledningen

Detta var inte ett bokföringsfel.
Det var ett datakvalitetsproblem som uppstod ur bristande design och konsekvenserna mer förseningar accepterades av alla för så hade det alltid varit. Den underliggande orsaken var inte analyserad och känd. Allt kan inte hänföras till otydliga begrepp, men tydligare definitioner hade bidragit till att belysa och lösa problemen.

Var Integration Design hade gjort skillnad

Om organisationen hade arbetat med mer med Integration Design och nyckelpersoner förstått de olika perspektiven hade man tidigt kunnat separera:

- byggverksamhetens Projekt (installation, faser, leveranser)

- finansens Projekt (kostnadsbärare, uppföljningsenheter)

Genom tydliga tjänster och dataprodukter hade dessa kunnat samexistera, utan att konkurrera om begreppet. Information hade kunnat exponeras på ett sätt som respekterade båda perspektiven.

I stället tvingades man välja en definition. Och när man gjorde det, förlorade man den andra.

Integration Design handlar just om att möjliggöra detta:
att olika delar av organisationen kan arbeta med samma verklighet, men genom olika, tydligt definierade perspektiv och vyer.

Lärdomar

Detta exempel visar varför:

- datakvalitet inte kan isoleras till IT

- begrepp måste definieras, inte läggas vid sidan och skjutas upp till senare

- verksamhetsstyrning måste bygga förståelse, på samarbete och inte dominans

Hade man tidigt accepterat att Projekt är ett begrepp med flera legitima perspektiv, och designat informationen därefter, hade problemen blivit synliga långt tidigare. Och synliga problem går att hantera. Osynliga gör det inte.

Enterprise Design handlar ytterst om:
att göra konsekvenser synliga i tid.

- Kvalitet – avgörande för resultatet

Om det är något som gång på gång har visat sig avgörande i de projekt och förändringsinitiativ jag deltagit i, så är det detta: kvalitet lönar sig. Inte alltid direkt. Men alltid över tid. Kvalitetstänkande bör byggas in i alla arbetsuppgifter.

Det gäller varje del av det som hittills beskrivits i boken. Integration kräver kvalitet. Information kräver kvalitet. Systemdesign kräver kvalitet. Och när kvalitet saknas i grunden blir konsekvenserna inte synliga förrän långt senare – när det är dyrt, svårt eller omöjligt att rätta till dem.

Det är därför man inte kan slarva med grunden. Inte för att det är “rätt” i teorin, utan för att alternativet alltid blir dyrare.

Vad kvalitet egentligen innebär

Kvalitet handlar i grunden inte om teknik. Den handlar om förståelse.

Hög kvalitet innebär bland annat att:

- begrepp är etablerade och förstådda

- skillnader i perspektiv är synliga och accepterade

- oklarheter hanteras tidigt, inte skjuts på framtiden

Många kvalitetsproblem har sin grund i att olika delar av organisationen ser på samma sak ur olika perspektiv – utan att dessa perspektiv görs explicita. Alla tror att de menar samma sak. Ingen upptäcker motsättningen för det saknas helhetsperspektiv. Detta beskrivs i avsnitten om Information Design.

Det är inte ovanligt att team arbetar hårt, levererar i tid och ändå bygger in kvalitetsbrister – helt enkelt därför att de inte haft ett gemensamt språk för det de bygger.

Detta är ett återkommande mönster, oavsett bransch.

Kvalitet över tid är ett lärande – inte ett beslut

All systemutveckling är i grunden ett lärande. Ändå organiseras mycket förändringsarbete som om allt vore känt från början.

I projektform samlas ofta stora grupper där:

- några få känner verksamheten väl, men informellt

- många är tekniskt skickliga, men saknar verksamhetsdjup

- krav förväntas bli “tydliga” innan arbetet börjar

Men verksamhetskunskap fungerar sällan som fyrkantiga definitioner. Den är levd, erfaren, situationsberoende. Människor som arbetat länge i verksamheten vet vad de menar – men har ofta svårt att uttrycka det exakt, särskilt när de inte själva ser konsekvenserna av otydlighet i tekniska lösningar.

Här uppstår en klassisk spänning:

- Ingenjörer och IT vill ha tydliga, logiska svar för de krävs vid programmering

- Verksamheten arbetar med helheter, avvägningar och undantag och ändrar sig ibland när de möter ingenjörernas krav på tydlighet

Kvalitet uppstår inte genom att ena sidan “vinner”.
Den uppstår när lärandet får fortsätta under arbetets gång.

Varför projektformen ofta motverkar kvalitet

Detta är inte ett argument mot projektformen i sig. Den har tydliga fördelar. Men projektformen tenderar att skapa kortsiktighet.

När tidplanen styr:

- väljer man det som går snabbast

- skjuter man svåra frågor framför sig

- prioriterar man leverans före förståelse

Resultatet blir lösningar som fungerar i stunden, men som saknar den kvalitet som krävs för att hålla över tid.

Min erfarenhet är att hög kvalitet oftare uppstår i kontinuerliga, tvärfunktionella team. Team där:

- verksamhetskompetens och IT-kompetens arbetar tillsammans

- frågor kan besvaras direkt

- konsekvenser kan diskuteras i realtid

Det här är inte en ny insikt utan väl känt. Det är en av hörnstenarna inom Agile.

Jag brukar säga att det finns ett enkelt men avgörande mått på om ett projekt blir framgångsrikt eller ej.

Om en utvecklare kan sträcka sig över bordet och få svar på en detaljfråga från en verksamhetsspecialist inom femton minuter, då ökar chansen dramatiskt att kvalitet byggs in från början och att lärandet ökar i båda riktningarna och tiden för utveckling minskar.

När man inte får svar inte är möjligt händer ofta något av dessa tre:

- Frågan bedöms som för liten och ignoreras

- Svaret kommer sent, filtrerat genom hierarkier, och utan rätt sammanhang

- Utvecklaren gissar vad verksamheten vill

Alla leder till sämre kvalitet – och längre ledtider.

Kvalitet och de stora standardsystemen

Kvaliteten påverkas till det sämre om man ofta byter standardsystem.

Många organisationer känner igen ett återkommande mönster.

När kostnaderna skenar, systemen är svåra att uppgradera och komplexiteten känns ohanterlig, uppstår idén: vi behöver ett nytt standardsystem. Lösningen beskrivs ofta i ljusa färger. Ett integrerat system som löser problemen, sänker kostnaderna och skapar ordning.

Verksamhetens faktiska variation och komplexitet hamnar sällan i fokus. Allt ska införas på en gång. Gärna för alla marknader, alla dotterbolag, alla processer.

Den totala komplexiteten blir enorm och ohanterlig. I alla fall för de som är nya inför den.

Det sker om och om igen och beror på att vi människor underskattar komplexitet inom områden som inte känner till väl. Det så svårt att hantera i nästan alla organisationer jag mött. Konsekvensen är långa projekt över flera år och efter några år börjar projekten skära i funktionalitet. Verksamheten får acceptera en lösning som ibland inte ens är bättre än den gamla – särskilt inte för delar av organisationen som har andra förutsättningar än moderbolaget.

Detta är inte ett misslyckande hos enskilda aktörer. Det är ett strukturellt problem där kvalitet offras för föreställningen om enhetlighet som enda sättet att effektivisera och sänka kostnaderna.

Alternativet: samverkan genom tjänstearkitektur

Alternativet är inte att centralisera allt, utan att designa för samverkan och utbyte av information mellan olika delar av verksamheten.

Tjänstearkitektur leder ofta till högre datakvalitet eftersom utbyte av standardsystem minskar.

Genom tjänsteorientering och Integration Design kan:

- dotterbolag behålla system som fungerar för deras storlek och verklighet

- central ledning få tillgång till den information som behövs via tjänster

- förändring ske gradvis, utan att låsa hela organisationen

När information exponeras genom tydliga tjänster och dataprodukter kan systemen bakom bytas i respektive verksamhets takt. Kvalitet byggs då i gränssnitten – inte genom total likriktning.

- Datakvalitet – kan vi lita på informationen?

När begrepp är tydliga, perspektiv respekterade och informationsflöden medvetet designade uppstår nästa, oundvikliga fråga:

Hur vet vi att informationen är tillförlitlig?

Det är här datakvalitet blir avgörande. Inte som ett separat teknikområde, utan som en konsekvens av allt som föregått det. Datakvalitet handlar inte bara om korrekthet, utan om aktualitet, fullständighet och förståelse för osäkerhet.

Spårbarhet – en nyckelförmåga vid automatisering

Ett område som också blir viktigare och viktigare med ökad automatisering är spårbarhet. Det innebär att man ska kunna visa exakt hur systemen kommit fram till en siffra eller ett beslut. Vilka system och komponenter har passerats på vägen mellan källa och beslut?

Spårbarhet är nödvändigt att ha stöd för analys och felsökning i en verksamhet där beräkningar sker helt utan mänsklig inblandning. Hur ska man annars kunna spåra felaktigheter i slutresultatet. Det blir nästan helt omöjligt utan system som är designade för spårbarhet. Stöd för spårbarhet lönar sig eftersom tiden för felsökning kan förkortas avsevärt om spårbarhet har införts på ett medvetet sätt från första början av designen.

I kapitel 5 finns ett exempel från byggbranschen som visar vad som händer när kvalitet i begrepp och uppföljning inte tas på allvar – och hur konsekvenserna kan döljas i åratal.

Det är först då man fullt ut ser varför kvalitet aldrig är ett sidospår.
Den är ofta en förutsättning för framgång.

Datakvalitet – när styrning blir delegerad och viktigt

Datakvalitet är ett område som alla pratar om, men som få organisationer lyckas med i praktiken. Det beror sällan på bristande insikt. De flesta vet att dålig kvalitet leder till fel beslut, ineffektivitet och frustration. Ändå prioriteras området ofta ned, särskilt när tempot ökar och nya initiativ krävs och prioriteras högre.

Ett skäl är att datakvalitet ofta behandlas som ett tekniskt problem. Ett annat är att styrningen – governance – reduceras till roller, policydokument och ramverk som inte riktigt får fäste i vardagen.

För att förstå vad fungerande governance faktiskt innebär kan det vara hjälpsamt att titta på ett område där nästan alla organisationer redan lyckas: resultaträkningen.

Resultaträkningen som förebild

Resultatet och resulträkningen är högt prioriterad. Eventuella fel får stora konsekvenser för ägare, för marknad och för förtroende internt och externt. Därför finns också ett tydligt ägandeskap.

Varje enhetschef tar ansvar för sina siffror. Finansavdelningen tar ansvar för helheten. Vid förändringar i redovisningsprinciper eller budgetprocesser genomförs omfattande utbildningsinsatser. Alla förstår varför förändringen sker, vad den innebär och hur den påverkar deras arbete.

Detta är styrning(Data Governance) i praktiken.

Inte för att alla älskar redovisning, utan för att konsekvenserna av fel är så tydliga att organisationen fokuserar på det man kan kalla datakvalitet för dessa uppgifter.

Samma typ av styrning borde finnas även för andra kritiska informationsområden. Produktionen. Prissättningen. Kundrelationerna. Leveransförmågan. Där konsekvenserna av fel kan vara minst lika allvarliga – men ofta mer fördröjda och därför svårare att se.

Börja där konsekvenserna är tydliga

Ett vanligt misstag är att försöka införa datakvalitet överallt samtidigt. Det leder nästan alltid till abstrakta diskussioner och utmattning.

Ett bättre angreppssätt är att börja där konsekvenserna är tydligast:

- Vad händer om produktionen stannar på grund av felaktig information?

- Vad händer om priset till kund och leverantörer blir fel?

- Vad händer om kunder överger oss på grund av brister i datakvalitet?

Där finns samma typ av starka incitament som kring resultaträkningen.

Datakvalitet behöver, precis som redovisning, kopplas till verkliga konsekvenser.

När begreppen Data Owner och Data Steward inte speglar organisationens verklighet

Begrepp som Data Owner, Data Steward och liknande används ofta i Data governance-modeller. De har sitt ursprung i USA och propageras av konsultföretag som Gartner. I teorin är de tydliga. I praktiken fungerar de ofta dåligt i svenska organisationer.

I många kulturer är det naturligt att någon räcker upp handen och säger:
“Jag tar rollen som Data Owner för begreppet Leverantör.”

I Sverige är det sällan så enkelt. Ingen är beredd att stå upp och ta det verkliga ansvaret för vad innebär ansvaret egentligen? Vilket mandat följer med? Hur relaterar det till linjeorganisationen? Ofta blir svaren otydliga. Resultatet blir att roller finns på pappret, men saknar verklig verkan. Rollen prioriteras ned som följd av detta. Ibland utser man ansvariga, men följer inte upp och har ingen tydlig förväntan på de som utsetts till ansvariga och det får ingen konsekvens om man inte tar sitt ansvar.

Detta är ett av de stora skälen till att datakvalitetsinitiativ misslyckas. Ansvar krävs – men hur ansvaret organiseras måste passa den existerande kulturen.

En mer grupporienterad styrning

Varje organisation är unik, men min erfarenhet är att datakvalitet i svenska organisationer ofta fungerar bättre när ansvaret är kollektivt och tvärfunktionellt, snarare än individuellt och hierarkiskt.

Ett alternativt sätt att börja arbeta med Data Governance är:

- Identifiera ett begränsat antal centrala begrepp eller dataprodukter

- Samla de personer som faktiskt arbetar med dessa begrepp i vardagen

- Avsätt tid i kalendern för möten med jämna mellanrum

Det kan vara:

- varje vecka under stora förändringar

- varannan månad i en mer stabil verksamhet

Det viktiga är inte frekvensen, utan kontinuiteten.

Det är inte chefer som ska sitta i dessa möten. Det är de som:

- matar in data

- korrigerar fel

- använder informationen dagligen

Det är bara de som kan se var kvaliteten brister i praktiken och påverka den konkret.

I dessa möten fattas beslut om gemensamt om vad som ska genomföras för att höja kvaliteten. Inte stora strategiska beslut, utan vardagsnära:

- Vad är rimligt att förvänta sig på sikt?

- Vad är orealistiskt på kort sikt?

Att kunna säga “det där går inte” och bli bemött med respekt är avgörande. Förändring tar tid.

Ledningens roll inom Data Governance

Ledningens roll är inte att detaljstyra datakvalitet. Den är att skapa förutsättningar.

Det innebär att:

- bryta stuprör genom mål och anpassa KPI:er och mätetal så att de stödjer tvärfunktionellt arbetssätt och ansvar

- tydliggöra varför kvalitet är viktig och prioritera kvalitet bland andra krav

- acceptera att förbättring sker gradvis och visa intresse genom att följa upp

I en svensk organisation kan någon ha en samordnande roll – kalla det dataansvarig, informationsansvarig eller något annat. Det viktiga är inte titeln, utan att någon ser till att möten sker, att beslut följs upp och att arbetet hålls levande. Jag tror det räcker med en sådan roll och då slipper vi inlånade begrepp och arbetssätt.

Från projekt till långsiktig förmåga

Många organisationer fortsätter att angripa datakvalitet i projektform. Ett initiativ startas. Konsulter anlitas. Dokument tas fram. När projektet avslutas faller ansvaret tillbaka i organisationen – ofta utan tydlig förvaltning.

Alternativet är att se datakvalitet som en kontinuerlig förmåga. Något som byggs, underhålls och utvecklas över tid. Precis som redovisning. Precis som produktion.

Denna förflyttning tar tid. Det nuvarande arbetssättet är djupt rotat och sättet att styra organisationen likaså. Inom Enterprise Design försöker man belysa konsekvenserna och göra potentialen tydlig: hur kvalitet, integration och information tillsammans kan skapa verklig effektivisering – och möjliggöra AI-lösningar som bidrar med underlag som faktiskt går att lita på.

Datakvalitet är därför inte ett tekniskt område. Det är ett uttryck för hur en organisation tar ansvar för sin egen verklighetsbild.

