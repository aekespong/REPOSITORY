# Integration Design - för att etablera stödjande tjänster

> Chapter-ID: integration-design-for-att-etablera-stodjande-tjanster
> Status: draft

Integration Design är den del av Enterprise Design där ansvar övergår till något konkret. Det är här organisationens ambitioner möter verkligheten i form av systemkopplingar, informationsflöden och tekniska beroenden.

När integrationsområdet saknar övergripande design blir strukturen olika vid varje tillfälle. Enskilda utvecklare eller projekt gör sin egen variant om det saknas standarder. Integrationer uppstår ofta som svar på lokala behov: ett system behöver data från ett annat. En process behöver automatiseras. Ett nytt verktyg ska kopplas in.

Varje integration är rimlig i sig – men antalet integrationer växer dramatiskt och man tappar översikt över helheten och allt blir snabbt ohanterligt.

Från punkt-till-punkt till förmåge- och tjänsteorientering

I organisationer utan ett gemensamt tankesätt kring integrationer byggs integrationer ofta punkt-till-punkt. Två system kopplas samman för att lösa ett specifikt behov. När nästa behov uppstår byggs en ny integration. Efter ett tag finns det ingen naturlig plats där man kan säga:

”Detta är vår samlade förmåga kring Produkt.”
”Här finns sanningen om Konto.”
”Detta är hur Betalning fungerar i vår organisation.”

Ett sätt att hantera situationen är att etablera standarder och gemensamma arbetssätt, metoder och begrepp. I boken har vi döpt det till Integration Design.

Integration Design bryter det tidigare mönstret genom att flytta fokus:

- från system → till tjänster

- från koppling → till ansvar

- från data → till dataprodukter

Det är inte enbart ett tekniskt skifte. Det är ett nytt sätt att tänka. Det är ett designskifte som krävs för att nya integrationslösningar ska designas på ett bättre sätt.

Varför AI gör Integration Design nödvändig

AI-agenter kan inte navigera i ett landskap av punkt-till-punkt-integrationer. De kan inte tolka specialfall och regelverk som är uttryckt i programkod, i dokumentation eller i människors huvuden. De behöver stabila tjänster med tydlig semantik.

När Integration Design saknas:

- blir AI beroende av skräddarsydd logik

- förstärks inkonsekvenser

- och ansvar löses upp och datakvaliteten sjunker

- och tilliten försvinner

När Integration Design finns:

- kan AI använda samma begrepp som människor gör

- blir automatisering spårbar och lättare att förstå

- och stödjer förändringar som alltid sker

Största vinsterna av Integration Design är flexibilitet och möjligheter att snabbare införa förändringar som nya funktioner, förändrade regelverk och kompletteringar av nuvarande regelverk. Verksamhetslogiken är inte utspridd i alla inblandade system utan samlad på ett fåtal ställen. När designen av integrationstjänsterna blir mer standardiserade blir det också ett löfte om kontroll över och minimering av negativa konsekvenser. Exempel är dålig prestanda och eller bristande säkerhet. Områden som behöver beaktas i varje design.

Integration Design som del av helheten

Integration Design är inte fristående. Den är beroende av:

- Human Design för minskat motstånd vid införande

- Information Design för mening (mer om det i senare kapitel)

- System Design för genomförande av lösningar

- Arkitektur för flexibel och anpassad struktur

Inom branschen är Eric Evans bok Domain Driven Design från 2003 en av de främsta källorna till djup kunskap inom området integrationsdesign. Det är en bok som skrevs för många år sedan, men som håller än, ja den blir mer och mer relevant i takt med utvecklingen och komplexiteten ökar. Domain Driven Design(DDD) handlar om att dela upp i systemlandskapet i olika områden, domäner, som hanteras för sig, men som interagerar med tydliga gränser och explicita kontrakt.

Nedan sammanfattas de viktigaste principerna från Domain-Driven Design, med särskilt fokus på de aspekter som är avgörande för ett robust och förändringsbart integrationslandskap:

- Fokus på domänen före tekniken
Arkitektur och integration ska utgå från verksamhetens begrepp, regler och ansvar – inte från system eller plattformar.

- Tydliga domängränser (Bounded Context)
Varje domän har sitt eget språk, sin egen modell och sitt eget ansvar, vilket minskar kopplingar och otydlighet.

- Väldefinierade kontrakt mellan domäner
Integration sker genom explicita gränssnitt och avtal, inte genom delade databaser eller implicit kunskap.

- Förändring i sin egen takt
Domäner ska kunna utvecklas, byggas i olika releaser och förändras oberoende av varandra.

- Skydd av den interna modellen
Varje domän ansvarar för sin egen informationsmodell och exponerar endast de tjänster som är avsedda för andra.

- Kontrollerad konsistens
Konsistens säkerställs där den är affärskritisk, men i övrigt accepteras asynkrona anrop och fördröjd konsistens(eventual concistency)

- Arkitektur som stöd för lärande
Modeller och gränser justeras över tid i takt med att förståelsen för verksamheten fördjupas.

Att investera i Integration Design är därför inte i första hand en teknisk investering. Det är en investering i organisationens förmåga att förändras på ett kontrollerat och hållbart sätt – även när teknikens utvecklingstakt accelererar.

