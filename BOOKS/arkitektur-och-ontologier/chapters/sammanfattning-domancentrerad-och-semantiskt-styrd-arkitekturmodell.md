# Sammanfattning domäncentrerad och semantiskt styrd arkitekturmodell 

Boken presenterar en domäncentrerad och semantiskt styrd arkitekturmodell för att göra AI-drivna system **kontrollerade, spårbara och stabila** – särskilt när autonoma/agentiska AI-komponenter börjar fatta beslut och använda verktyg.

Kärnidén är att organisationer inte längre bara behöver “koppla ihop system”, utan **styra handlingsutrymme**: vilka operationer som får ske, via vilka gränssnitt, med vilka begrepp och under vilka regler. Arkitektur blir därmed inte primärt dokumentation, utan ett **styrsystem för intelligens**.

## Modellens huvuddelar

Boken bygger upp en sammanhållen helhet av fyra kompletterande byggstenar:

1. **Domäner som suveräna enheter**

  Systemlandskapet organiseras i tydliga domäner (t.ex. Fordon, Kund, Avtal). Varje domän äger sina data, sin interna logik och sitt externa kontrakt. Domängränsen är både teknisk och semantisk: den skyddar begrepp, ansvar och förändringsbarhet.
2. **Tjänstelager med två nivåer**

  Inom varje domän skiljs strikt mellan:

- **Systemtjänster**: verksamhetsnära, namngivna i verksamhetens språk, och **de enda tjänster som får exponeras utåt**.
- **Resurstjänster**: CRUD-nära intern mekanik kopplad till dataobjekt och **får aldrig exponeras**.

En bärande princip är att **beroenden alltid går “nedåt”**: konsument → systemtjänst → resurstjänst. Tvärdomäninteraktioner får bara ske via systemtjänster.

1. **Semantiskt lager med ontologi (OWL)**

  För att undvika begreppsförvirring formaliseras centrala begrepp och relationer i en ontologi. Den fungerar som en maskinläsbar begreppsmodell som gör det möjligt att:

- skapa gemensam förståelse över flera system,
- resonera logiskt (inferens),
- minska tvetydighet och hallucinationer i AI-tolkningar.

1. **Governance genom maskinvalidering (SHACL)**

  Boken betonar att arkitekturprinciper måste vara **verifierbara** för att inte stanna vid PowerPoint. SHACL används för att validera både:

- **affärsdata** (t.ex. att payloads följer domänens regler), och
- **arkitekturgovernance** (t.ex. att resurstjänster inte exponeras och att beroenden respekterar domängränser).

## AI och MCP: kontrollerad agentisk exekvering

När AI-agenter kommer in blir modellen extra relevant. Agenten ska inte ha fri åtkomst till “allt”, utan agera inom kontrollerade gränser:

- Agenten ser i praktiken endast **systemtjänster**.
- Ontologin ger stabil semantik och möjlighet till härledning.
- SHACL fungerar som gatekeeper som stoppar ogiltiga anrop.
- En **MCP-server** beskrivs som den kontrollerade bryggan där verktyg, resurser och regler exponeras på ett styrt sätt.

## Konkretion genom exempel och “manifest”

För att göra resonemanget praktiskt presenterar boken:

- ett “manifest” i form av **tio teser** som sammanfattar principerna (domänsuveränitet, systemtjänster som enda kontrakt, CRUD som intern mekanik, riktade beroenden, formaliserade begrepp, verifierbar governance, m.m.),
- en PowerPoint-anpassad berättelse för verksamhetskunniga,
- ett genomgående **fordonsexempel** (Fordon/Besiktning/Registrering) där OWL definierar begrepp och härledningar (t.ex. “Tillåten i trafik”), och SHACL används för att validera både data och tjänsteregler.

## Samlad poäng

Bokens slutsats är att hållbar AI-autonomi kräver mer än “smartare modeller”: den kräver en arkitektur som kan **avgränsa, definiera och verkställa** vad som är tillåtet. Domäner ger ansvar och gränser, systemtjänster ger stabila kontrakt, ontologi stabiliserar betydelse, SHACL gör regler exekverbara, och MCP blir den kontrollerade exekveringsmiljön där agenten får verka.

---
