# Prompt för att uppdatera meta.json-filer för alla kapitel

Syfte: Analysera alla chapter.md-filer under /YOUR_REPO och uppdatera motsvarande meta.json-filer med omfattande innehåll.

## Instruktioner
För varje kapitelmapp under /YOUR_REPO som innehåller en chapter.md-fil:

1. Läs chapter.md
Läs in hela innehållet i chapter.md-filen för kapitlet.

2. Skapa summary (5 rader)
Skriv en 5-rad sammanfattning som:

Beskriver kapitelts huvudämne och purpose
Lyfter fram de viktigaste insikterna eller begreppen
Visar hur kapitlet bidrar till bokens helhet
Är läsbar och tydlig utan att vara alltför teknisk

4. Skapa promise (löfte till läsaren)
Beskriv konkret vad läsaren kommer att få ut av kapitlet:

Vilka verktyg, ramverk eller insikter får de?
Vilka frågor kommer att besvaras?
Hur kan de använda kunskapen praktiskt?

5. Skapa analysis (kritisk analys)
Analysera kapitlet objektivt:

Vilka är styrkorna? Vad fungerar väl?
Vilka är svagheterna? Vad kunde förbättras?
Är det lämpligt för målgruppen (ledning, verksamhet, IT)?
Finns det luckor eller otydligheter?
Hur väl kopplas det till övriga kapitel?

6. Skapa improvements (förbättringsförslag)
Lista konkreta, praktiska förbättringar:

Struktur: Vilka underrubriker eller omorganisering skulle hjälpa?
Exempel: Vilka verklighetsnära exempel saknas?
Definition: Vilka begrepp behöver förklaras bättre?
Länkningar: Hur kan det länkas bättre till andra kapitel?
Längd: Bör kapitlet expanderas, förkortas eller omstruktureras?

7. Skapa tags (10 centrala begrepp)
Identifiera de 10 viktigaste begreppen/teorierna i kapitlet:

Ska vara verksamhetsnära och förståliga
Bör representera både högnivå och mer konkreta begrepp
Separera med kommatecken
Ordna från mest till minst central

8. Uppdatera meta.json

{
  "slug": "[mappnamn]",
  "title": "[från status.json]",
  "summary": "[5-rad sammanfattning]",
  "message": "[huvudbudskap]",
  "promise": "[löfte till läsaren]",
  "analysis": "[kritisk analys]",
  "improvements": "[förbättringsförslag]",
  "tags": "[10 begrepp]"
}

Uppdatera filen med följande struktur:

## Kvalitetskriterier

✅ Summary ska vara läsbar för alla rollgrupper
✅ Message ska kunna citeras direkt från boken
✅ Promise ska vara konkret och praktiskt orienterad
✅ Analysis ska vara balanserad och objektiv
✅ Improvements ska vara actionable och specifika
✅ Tags ska reflektera kapitelts innehåll autentiskt

## Resultat

Efter genomförandet ska varje meta.json innehålla fullständiga analyser som möjliggör:

- Snabb orientering om vad varje kapitel handlar om
- Identifiering av styrkor och utvecklingsområden
- Planering av bokens vidare utveckling
- Navigation och sökning i bokinnehåll
- Kommunikation om bokens värde till olika målgrupper
