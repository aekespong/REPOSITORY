# Olika begrepp hos olika Enterprise Architects

Håller du med om att nuläget bland enterprise architects är väldigt olika beroende på vilken bakgrund man har. Metamodellen och definitionen för vad en Förmåga, en tjänst, en domän, ett event är oklar.

Håller du med? Kan du utveckla?

---

### **ChatGPT**

Ja – jag håller i hög grad med. Nuläget bland enterprise architects (EA) är ofta spretigt, och mycket av det beror på bakgrund, skolning och organisatorisk kontext.

Här är en strukturerad utveckling av varför det ser ut så – och vad det innebär.

---

## 1. Bakgrund formar begreppsvärlden

Enterprise architects kommer ofta från olika håll:

- **IT-arkitektur / lösningsarkitektur**
- **Verksamhetsutveckling / management consulting**
- **Processutveckling (BPM, Lean, Six Sigma)**
- **Informationsarkitektur / data**
- **Agil produktutveckling**
- **Integration / eventdriven arkitektur**

Varje tradition har sin egen begreppsapparat.

Exempel:

| Bakgrund | Förmåga | Tjänst | Domän | Event |
| --- | --- | --- | --- | --- |
| TOGAF | Business Capability | Business Service | Architecture Domain | Event (svagt definierat) |
| BPM | Förmåga ≈ processförmåga | Tjänst = process | Domän sällan centralt | Händelse = start/slut |
| DDD | Ej centralt | Application Service | Bounded Context | Domain Event |
| SAFe | Capability (portfolio) | Solution | ART/Value Stream | Event (PI event etc.) |
| Integration | Sällan | API | Systemlandskap | Event = meddelande |

Det är alltså inte konstigt att det blir otydligt.

---

## 2. Metamodellen är ofta implicit – inte explicit

I många organisationer:

- Verktyget (LeanIX, BizzDesign etc.) **definierar begreppen indirekt**
- Metamodellen är en teknisk konfiguration – inte en gemensam semantisk överenskommelse
- Definitioner är dokumenterade men inte förankrade

Resultatet:

> Samma ord används – men betyder olika saker för olika personer.

---

## 3. Typiska begreppsförvirringar

### Förmåga (Capability)

Vanliga tolkningar:

1. **Stabil förmåga oberoende av organisation** (klassisk EA)
2. Något en viss avdelning gör
3. En process
4. En kompetens
5. En teknisk capability (t.ex. “real-time analytics”)

Kärnproblemet:

- Är förmågan *vad* man kan göra?
- Eller *hur* man gör det?
- Eller *vem* som gör det?

Strikt EA-definition:

> En stabil beskrivning av vad organisationen måste kunna göra för att uppnå sitt syfte – oberoende av organisation, process och system.

Men den hålls sällan konsekvent.

---

### Tjänst (Service)

Här är förvirringen ännu större:

- Business Service
- Application Service
- API
- Microservice
- Shared Service
- Customer-facing service

Ibland betyder tjänst:

- Ett värdeerbjudande
- Ett gränssnitt
- En funktion
- En organisation
- Ett IT-system

Det finns ofta ingen tydlig separation mellan:

- **Förmåga (intern förmåga)**
- **Tjänst (värde som exponeras)**
- **Funktion (konkret beteende)**

---

### Domän

Tre vanliga betydelser:

1. **Verksamhetsområde** (HR, Sales, Finance)
2. **DDD Bounded Context**
3. **Arkitekturdomän** (Business / Application / Technology)

När någon säger “domän” vet man ofta inte vilken nivå de menar.

---

### Event

Extremt kontextberoende:

- BPM: processhändelse
- Integration: meddelande på en kö
- DDD: domänhändelse
- Verksamhet: affärshändelse
- SAFe: ceremonier

Event kan vara:

- Ett faktum som inträffat
- Ett tekniskt meddelande
- En notifiering
- En tillståndsförändring

Sällan definieras skillnaden mellan:

- Business Event
- Domain Event
- Technical Event

---

## 4. Varför är det så här?

### 1. EA är ett paraplydisciplin

Enterprise Architecture är inte en homogen disciplin – det är en sammansmältning av flera.

### 2. Ramverk är vaga

TOGAF, ArchiMate m.fl.:

- Ger struktur
- Men lämnar semantisk tolkning relativt öppen

### 3. Verktyg styr mer än teori

Metamodellen formas ofta av:

- Vad verktyget råkar ha för objekttyper
- Vad man började med i implementationen

### 4. Organisationens mognad

I låg mognad:

- Begrepp är lösa
- Arkitektur är dokumentation

I hög mognad:

- Begrepp är styrande
- Metamodellen är medvetet designad
- Semantik är förankrad

---

## 5. Konsekvenser

När begreppen är oklara:

- Svårt att jämföra förmågor mellan enheter
- Svårt att göra capability-based planning
- Svårt att koppla strategi → förmåga → tjänst → system
- Svårt att etablera domänansvar
- Eventdriven arkitektur blir inkonsekvent

Arkitekturarbetet riskerar bli:

> Kartläggning istället för styrning.

---

## 6. Vad kännetecknar mogna organisationer?

Mogna EA-miljöer gör ofta detta:

1. Definierar begrepp strikt och pedagogiskt
2. Dokumenterar ontologi/metamodell explicit
3. Skiljer tydligt på nivåer:

    - Strategi
    - Förmåga
    - Värdeström
    - Tjänst
    - Funktion
    - Process
    - System
    - Informationsobjekt
4. Förankrar begreppen brett – inte bara i EA-teamet

---

## 7. Min bedömning

Ja – variationen är stor.

Men det är inte bara ett problem. Det är ett symptom på att:

- EA är en syntesdisciplin
- Organisationer är olika mogna
- Transformation (digital, data, AI) pressar begreppsapparaten

Den verkliga mognadsskillnaden ligger inte i vilket ramverk man använder –

utan i hur tydlig och konsekvent den interna ontologin är.

---

Om du vill kan vi:

- Resonera kring hur man borde definiera dessa begrepp strikt
- Eller diskutera hur man etablerar en gemensam metamodell i en organisation
- Eller analysera hur LeanIX/BizzDesign tenderar att forma begreppen

Vad är din vinkel – mer filosofisk, praktisk implementering, eller kopplat till ett konkret verktyg/uppdrag?

---
