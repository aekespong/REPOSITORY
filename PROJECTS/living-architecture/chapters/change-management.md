# Change management

## Att få människor att acceptera “tvingande transparens”

Det här är den största risken.

Din modell innebär:

- Alla brister blir synliga
- Alla beslut loggas
- Alla avvikelser måste motiveras

👉 Det låter bra – men i praktiken:

- Tech leads kan känna sig ifrågasatta
- Projektledare vill inte exponera risker
- Devs vill inte blockeras i PR

### Typiskt utfall:

Folk börjar:

- avvisa AI-feedback slentrianmässigt
- skriva vaga motiveringar
- försöka “komma runt” systemet

👉 **Problem:** systemet urholkas snabbt

### Lösning:

- Börja med **synlighet utan tvång**
- Inför “blocking rules” gradvis
- Gör det socialt accepterat att ha fel

---

# Rätt nivå på policies (detta är extremt svårt)

Om policies är:

- för vaga → AI kan inte använda dem
- för detaljerade → blir byråkrati

### Exempel på dålig policy:

>“System ska vara säkra”

### För hård:

>“Alla endpoints ska använda exakt denna klass”

👉 Du behöver:

- regler som är **tolkningsbara men testbara**

### Den verkliga utmaningen:

Att skriva policies som:

- funkar i flera projekt
- inte blir irrelevanta efter 3 månader

👉 Detta är svårare än att bygga AI-delen.

---

# AI som ger fel feedback (och tappar förtroende)

Det räcker med att AI har fel några gånger:

- “Detta bryter mot policy” (men gör det inte)
- “Detta saknas” (fast det finns)

👉 Då händer detta:

- folk slutar lyssna
- börjar auto-avvisa

### Kritisk punkt:

>Förtroende \> precision i början

### Lösning:

- Visa **confidence score**
- Tillåt enkel “reject”
- Lär av avvisningar

---

# Att få spårbarheten att faktiskt fungera

ID-system (REQ, POL, ADR) låter enkelt.

I verkligheten:

- folk glömmer länka
- länkar blir fel
- krav ändras utan uppdatering

👉 Efter ett tag:

- modellen blir inkonsistent

### Lösning:

- auto-suggestion (AI hittar länkar)
- varningar vid saknade kopplingar
- aldrig kräva perfekt struktur från dag 1

---

# Att inte göra det för tungt

Det här är en klassiker:

Du tänker:

>“Lite mer struktur → ännu bättre kvalitet”

Resultat:

- PR tar 3x längre tid
- folk blir frustrerade

👉 Då väljer organisationen:

>hastighet \> systemet

### Regel:

>Om det känns tungt i vardagen → det är fel design

---

# Management som inte använder datan

Du kan bygga världens bästa system.

Men om ingen:

- tittar på dashboards
- agerar på avvikelser
- följer upp

👉 Då dör det.

### Vanligt problem:

- ledning vill ha “kontroll”
- men inte “konsekvens”

### Lösning:

- koppla till riktiga beslut:

  -prioritering
  -risk
  -budget

---

# Olika projekt – olika verkligheter

En policy som funkar i ett projekt:

- passar inte i ett annat

AI säger:

>“Detta är fel”

Teamet säger:

>“Nej, i vårt fall är det rätt”

👉 Konflikt uppstår.

### Lösning:

- stöd för:

  -“policy overrides”
  -kontext (projekt, system, legacy)

---

# Latens i feedback

Om analysen tar:

- 10–20 minuter

👉 Då tappar du dev-flow.

### Måste vara:

- snabbt (helst \< 2–3 min)
- eller stegvis:

  -snabb check först
  -djup analys senare

---

# Att hålla kunskapen levande

Din idé bygger på att:

- policies
- krav
- ADR

är uppdaterade

👉 I verkligheten:

- de blir snabbt inaktuella

### Konsekvens:

AI börjar ge:

- irrelevanta råd
- felaktig kritik

### Lösning:

- feedback-loop:

  -“denna policy används inte”
  -“denna regel avvisas ofta”

---

# Den obekväma sanningen

Det svåraste är detta:

>Du bygger ett system som avslöjar organisatoriska svagheter.

Och organisationer brukar:

- hellre dölja problem än exponera dem

---

# Så vad är *det* svåraste egentligen?

Om man kokar ner allt:

### #1 Kultur & beteende

→ accepterar vi transparens och ansvar?

### #2 Policy-design

→ går reglerna att använda i verkligheten?

### #3 Förtroende för AI

→ tror folk på feedbacken?

---

# Min rekommendation (för att lyckas)

Gör inte detta “perfekt” från början.

### Fas 1:

- Synlighet (ingen blocking)
- AI-feedback som stöd

### Fas 2:

- Inför krav på att svara på feedback

### Fas 3:

- Blockera endast **critical issues**

👉 Det är så du får adoption.

--- 

Vill du kan vi nästa steg:

- simulera ett **verkligt PR-exempel med feedback**
- eller designa **exakt vilka policies du ska börja med (5–10 st)**

Det är där man ser om detta faktiskt håller i praktiken.

---
