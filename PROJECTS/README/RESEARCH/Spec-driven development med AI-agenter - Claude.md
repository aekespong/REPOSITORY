# Spec-driven development med AI-agenter - Claude

## Fråga:
Du är en utvecklare som intresserar dig för det senaste inom AI-stöd för utvecklingsprojekt. 

Det har etablerats metoder de senaste månaderna som kallas Spec-driven development där man skriver en omfattande PRD och utifrån den genererar ett antal uppgifter/tasks.

Dessa  tasks hamnar i en lång json-fil som gör att de kommande programmerar AI-agenter kan göra begränsade uppgifter. De behöver bara lösa sin task.

För att lösa detta och hantera det krävs det att de olika AI-agenterna har följande mönster:
* Hämta in aktuellt "state"
* Gör uppgiften
* Verifiera både maskinellt och man-in-the-loop att uppgiften är godkänd
* Skriv ner status för kommande AI-agenter.

Beskriv detta arbetssätt med Claude Code som verktyg i tio punkter baserat på ovanstående och sökningar på youtube och i skrift som maximalt är två månader gamla.

Show more
10:05 AM
Jag kan ge dig en beskrivning av spec-driven development med Claude Code baserat på min kunskap, men jag måste vara tydlig om en begränsning: Jag har inte möjlighet att söka på YouTube eller läsa färsk dokumentation från de senaste två månaderna, eftersom min kunskapsbas sträcker sig till slutet av januari 2025 och jag har just nu inte aktiverat sökverktyget.

Men jag kan beskriva arbetssättet baserat på vad jag vet om moderna AI-agentbaserade utvecklingsmetoder och Claude Code:

Spec-Driven Development med Claude Code - 10 punkter
1. PRD som källdokument Processen börjar med en Product Requirements Document (PRD) som definierar hela projektet i detalj. Denna omfattande specifikation bryts sedan ner i atomära, välavgränsade uppgifter som varje AI-agent kan hantera isolerat.

2. Task-dekomposition till JSON PRD:n transformeras till en strukturerad JSON-fil där varje task innehåller kontext, beroenden, förväntade resultat och verifieringskriterier. Detta blir arbetskön för AI-agenterna.

3. State management före execution Innan varje agent påbörjar sin uppgift läser den det aktuella projektläget - vilka filer som finns, tidigare ändringar, och outputs från beroende tasks. Detta säkerställer att agenten har fullständig kontext.

4. Claude Code som executor Claude Code fungerar som den agentiska programmeraren som tar en task från kön, analyserar koden, gör nödvändiga ändringar, och hanterar filoperationer autonomt med tillgång till terminalen.

5. Isolerad uppgiftshantering Varje agent fokuserar endast på sin specifika task utan att behöva förstå hela systemet. Detta minskar komplexiteten och risken för oväntade bieffekter i andra delar av koden.

6. Automatisk verifiering Efter implementation kör agenten automatiska tester - enhetstester, integrationstester, linting, och typkontroller. Detta är den maskinella verifieringen som säkerställer grundläggande korrekthet.

7. Human-in-the-loop checkpoints Kritiska tasks eller komplexa implementationer pausar för mänsklig granskning. Utvecklaren kan godkänna, begära ändringar, eller förkasta implementationen innan nästa agent fortsätter.

8. Statusdokumentation När en task är godkänd uppdaterar agenten projektets state-fil med vad som gjordes, vilka filer som modifierades, och eventuella lärdomar eller varningar för kommande tasks.

9. Dependency chain execution Tasks i JSON-filen har explicita beroenden. Nästa agent kan bara starta när alla dess dependencies är markerade som slutförda och godkända, vilket skapar en säker exekveringsordning.

10. Iterativ förbättring av PRD När agents stöter på oklarheter eller motsägelser i specifikationen dokumenteras detta, och PRD:n kan uppdateras. Detta skapar en feedback-loop som förbättrar både spec och implementation över tid.

Om du vill ha mer uppdaterad information: Du kan aktivera sökverktyget här i konversationen för att jag ska kunna leta efter den senaste dokumentationen och YouTube-innehållet om spec-driven development från de senaste två månaderna. Skulle du vilja att jag gör det?

## Svar: ja

Claude Code spec-driven development workflow 2025
10 results

Fråga: "spec-driven development" 
YouTube tutorial 2024 2025
10 results

Perfekt! Nu har jag hämtat färsk information om spec-driven development från de senaste månaderna. Låt mig ge dig en uppdaterad beskrivning baserad på aktuell forskning och verktyg.

Spec-Driven Development med Claude Code - 10 Punkter (Uppdaterad 2025)
1. Specifikationen som källdokument och kontrakt Specifikationen fungerar som ett kontrakt för hur koden ska bete sig och blir sanningskällan som verktyg och AI-agenter använder för att generera, testa och validera kod 
GitHub
. Detta är inte en statisk PRD utan ett levande dokument som utvecklas med projektet och används för att säkerställa att alla AI-agenter arbetar mot samma mål.

2. Fyra-fas workflow: Specify → Plan → Tasks → Implement Modern spec-driven development följer en strukturerad fyrfasprocess: Specify (beskriv mål och användarresor), Plan (teknisk arkitektur och begränsningar), Tasks (uppdelning i små, testbara enheter), och Implement (systematisk exekvering) 
Augment Code
. Varje fas har tydliga checkpoints för mänsklig granskning.

3. Claude Code som terminal-baserad agentisk executor Claude Code är en terminal-baserad kodningsassistent som omfamnat agentisk utveckling där människan inte förväntas editera kod alls - Claude Code kan planera, orkestrera arbetsflöden och ställa uppföljningsfrågor autonomt 
Ainativedev
. Verktyget kan arbeta självständigt i flera timmar åt gången när det har rätt kontext.

4. State management genom specification och context files Moderna verktyg använder "steering files" och projektminne som gör att AI-agenter kommer ihåg arkitektur, mönster och standarder över sessioner 
GitHub
. Detta inkluderar filer som architecture.md, requirements.md, design.md och tasks.md som ger kontinuerlig kontext.

5. Atomära, isolerade tasks med beroendehantering Tasks ska vara något du kan implementera och testa isolerat, vilket ger kodningsagenten ett sätt att validera sitt arbete, nästan som en test-driven utvecklingsprocess för din AI-agent 
GitHub
. Istället för "bygg autentisering" får du konkreta uppgifter som "skapa en användarregistreringsendpoint som validerar e-postformat".

6. Automatisk och maskinell verifiering med tester Testbara krav är hörnstenen i ett pålitligt SDD-arbetsflöde, där EARS-mönstret (Easy Approach to Requirements Syntax) används för att skriva krav som lätt kan översättas till handlingsbara tester 
PromptLayer
. Testerna körs automatiskt efter varje implementation för att säkerställa att koden matchar specifikationen.

7. Human-in-the-loop via checklistor och code reviews Spec-kit använder checklistor inuti filerna för att spåra nödvändiga användarförtydliganden, konstitutionsöverträdelser och forskningsuppgifter - de fungerar som en "definition of done" för varje arbetsflödessteg 
Martin Fowler
. Utvecklaren granskar fokuserade ändringar som löser specifika problem istället för tusentalsraders kod-dumps.

8. MCP (Model Context Protocol) för verktygsintegration MCP är en öppen standard som kopplar AI-system till externa datakällor och verktyg, vilket möjliggör realtidsdashboard, live dataintegration, och anslutning till testramverk och utvecklingsverktyg 
Joshua Opolko
. Detta ger äkta autonom exekvering med koordinering mellan olika system.

9. Statusdokumentation och continuous feedback loop Flera "how"-specifikationer kan fungera harmoniskt tillsammans - en för arkitektur, en annan för dokumentation, och andra för testning eller säkerhet, medan en "lessons learned"-fil skapar en feedback-loop som minskar AI-kodningsagentfel över tid 
Red Hat
. Detta dokumenterar både framgång och misslyckanden för kommande tasks.

10. Iterativ förbättring och versionshantering av specs Den iterativa naturen ger kraft till arbetssättet - där traditionell utveckling låser dig till tidiga beslut, gör spec-driven det enkelt att ändra kurs: uppdatera bara specifikationen, regenerera planen, och låt kodningsagenten hantera resten 
GitHub
. Specs versionshanteras i Git precis som kod, vilket gör tekniska beslut explicita, granskningsbara och utvecklingsbara.

Viktiga verktyg och ekosystem 2025:

GitHub Spec Kit (öppen källkod, september 2024)
AWS Kiro (enterprise-fokuserad IDE)
Claude Code Spec Workflow (NPM-paket för automatiserade workflows)
cc-sdd (stödjer 7 olika agenter: Claude, Cursor, Gemini CLI, Codex, Copilot, Qwen, Windsurf)
Praktiska erfarenheter från fältet: McKinseys studie från maj 2024 över 50+ företag dokumenterar 30-40% minskning i time-to-market när man implementerar omfattande produktivitetssystem med spec-driven development 
Augment Code
, även om vissa studier noterar en 41% ökning av buggar i pull requests när AI-kodningsverktyg används utan rigorös kod-granskning.

Detta arbetssätt representerar en paradigmskift från "vibe-coding" till strukturerad, verifierbar AI-assisterad utveckling där utvecklaren blir en orkestrator snarare än en kodare.