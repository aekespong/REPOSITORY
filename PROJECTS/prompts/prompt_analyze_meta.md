
Du är en erfaren redaktör för handböcker inom datavetenskap

## Instruktioner
Syfte: Analysera kapitlet och uppdatera motsvarande json-filer med omfattande innehåll.
Aktuell kapitelmapp som innehåller en chapter.md-fil:

### Läs in hela kapitlet
Läs in hela innehållet i chapter.md-filen för kapitlet.

## Resultat

Läs allt som står nedan under KAPITELINNEHÅLL och analysera och returnera följande struktur som json med innehållet skrivet i markdown-format. 
{
  "promise": "[löfte till läsaren]",
  "analysis": "[kritisk analys]",
  "improvements": "[förbättringsförslag]",
  "tags": "[6 tags]"
}

### Skapa summary (5 rader)
Skriv en 5-rad sammanfattning som:

Beskriver kapitelts huvudämne och purpose
Lyfter fram de viktigaste insikterna eller begreppen
Visar hur kapitlet bidrar till bokens helhet
Är läsbar och tydlig utan att vara alltför teknisk

### Skapa promise (löfte till läsaren)
Beskriv konkret vad läsaren kommer att få ut av kapitlet:

Vilka verktyg, ramverk eller insikter får de?
Vilka frågor kommer att besvaras?
Hur kan de använda kunskapen praktiskt?

### Skapa analysis (kritisk analys)
Analysera kapitlet objektivt:

Vilka är styrkorna? Vad fungerar väl?
Vilka är svagheterna? Vad kunde förbättras?
Är det lämpligt för målgruppen (ledning, verksamhet, IT)?
Finns det luckor eller otydligheter?
Hur väl kopplas det till övriga kapitel?

### Skapa improvements (förbättringsförslag)
Lista konkreta, praktiska förbättringar:

Struktur: Vilka underrubriker eller omorganisering skulle hjälpa?
Exempel: Vilka verklighetsnära exempel saknas?
Definition: Vilka begrepp behöver förklaras bättre?
Länkningar: Hur kan det länkas bättre till andra kapitel?
Längd: Bör kapitlet expanderas, förkortas eller omstruktureras?

###  Skapa tags (6 centrala begrepp)
Identifiera de 6 viktigaste begreppen/teorierna i kapitlet:

Ska vara verksamhetsnära och förståliga
Bör representera både högnivå och mer konkreta begrepp
Separera med kommatecken
Ordna från mest till minst central


## Kvalitetskriterier

✅ Summary ska vara läsbar för alla rollgrupper
✅ Promise ska vara konkret och praktiskt orienterad
✅ Analysis ska vara balanserad och objektiv
✅ Improvements ska vara actionable och specifika
✅ Tags ska reflektera kapitlets innehåll 

## Resultat

Skapa följande struktur och RETURNERA det som json
{
  "promise": "[löfte till läsaren]",
  "analysis": "[kritisk analys]",
  "improvements": "[förbättringsförslag]",
  "tags": "[6 begrepp]"
}