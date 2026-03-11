> Gör ett förslag till powerpointpresentation till en grupp verksamhetskunniga

---

### **ChatGPT**

Utmärkt. Här är ett **konceptuellt och pedagogiskt upplägg för en PowerPoint-presentation** riktad till en grupp verksamhetskunniga (inte tekniskt specialiserade arkitekter).

Fokus är:

- Varför detta behövs
- Vad det betyder för verksamheten
- Hur det skapar trygg AI och stabil digitalisering
- Minimalt teknikspråk

---

# Presentation:

# En arkitektur för kontrollerad intelligens

## Hur vi strukturerar system, begrepp och AI på ett hållbart sätt

---

## Slide 1 – Titel

**En arkitektur för kontrollerad intelligens**

Domäner, systemtjänster och semantisk styrning

---

## Slide 2 – Varför pratar vi om detta?

Vi står inför en ny situation:

- Fler system än någonsin
- Ökande komplexitet
- AI som börjar fatta beslut
- Högre krav på spårbarhet och kontroll

Frågan är inte längre:

> Hur kopplar vi ihop system?

Utan:

> Hur låter vi system och AI agera – utan att tappa kontrollen?

---

## Slide 3 – Problemet i många organisationer

Typiska symptom:

- Data sprids okontrollerat
- Samma begrepp betyder olika saker
- System anropar varandras databaser direkt
- “Snabba lösningar” blir permanenta beroenden
- AI riskerar att agera på felaktig eller otydlig information

Resultat: instabilitet, risk och svår förändring.

---

## Slide 4 – Lösningen börjar med domäner

Vi organiserar arkitekturen i tydliga **domäner**.

Exempel:

- Fordon
- Kund
- Avtal
- Service

Varje domän:

- Äger sina data
- Ansvarar för sin kvalitet
- Exponerar tydliga tjänster
- Skyddar sin interna struktur

Domänen är en suverän enhet.

---

## Slide 5 – Två typer av tjänster

Inom varje domän skiljer vi mellan:

### 1. Systemtjänster

- Verksamhetsnära
- Exponeras utåt
- Exempel:

`Fordon.Besiktning.BokaTid()`

`Fordon.Besiktning.Planeringsschema()`

### 2. Resurstjänster

- CRUD (skapa, läsa, uppdatera, ta bort)
- Interna
- Får aldrig exponeras

---

## Slide 6 – En enkel men kraftfull princip

> All extern åtkomst går via systemtjänster.

Ingen får:

- Gå direkt på databasen
- Anropa CRUD i annan domän
- Skapa “genvägar”

Detta ger:

- Stabilitet
- Tydligt ansvar
- Mindre beroendekaos

---

## Slide 7 – Varför detta är viktigt för verksamheten

När detta följs:

- Förändringar blir kontrollerade
- Begrepp blir stabila
- Ansvar blir tydligt
- System kan utvecklas utan att allt påverkas

Det minskar både teknisk och verksamhetsmässig risk.

---

## Slide 8 – Vad händer när AI kommer in?

AI-agenter kan:

- Söka information
- Anropa tjänster
- Fatta beslut
- Initiera åtgärder

Utan tydlig struktur kan AI:

- Anropa fel tjänster
- Blanda begrepp
- Skapa inkonsistens

Med rätt struktur:

- AI ser endast systemtjänster
- Domänens inre skyddas
- Regler verkställs automatiskt

---

## Slide 9 – Semantik: vad betyder egentligen ett begrepp?

Exempel:

Vad är ett “Fordon”?

Vad är en “Godkänd besiktning”?

När är ett fordon “Tillåtet i trafik”?

Vi behöver en gemensam begreppsmodell.

Inte bara i dokument.

Utan maskinläsbar.

Detta skapar:

- Entydighet
- Färre feltolkningar
- Stabil AI-användning

---

## Slide 10 – Från princip till verklig styrning

Tidigare:

- “CRUD ska inte exponeras” (PowerPoint-princip)

Nu:

- Systemet kan automatiskt kontrollera att det inte sker.

Tidigare:

- “Domängränser ska respekteras”

Nu:

- Beroenden kan valideras maskinellt.

Arkitektur blir verkställbar.

---

## Slide 11 – Hur allt hänger ihop

Fyra byggstenar:

1. Domäner (ansvar och gränser)
2. Systemtjänster (publika kontrakt)
3. Interna resurstjänster (mekanik)
4. Gemensam begreppsmodell (semantik)

AI och integrationer använder endast systemtjänster.

---

## Slide 12 – Vad detta ger verksamheten

- Stabilare digitalisering
- Mindre beroendekaos
- Förutsägbar förändring
- Kontrollerad AI-användning
- Högre datakvalitet
- Tydligare ansvar

Det är en investering i långsiktig styrbarhet.

---

## Slide 13 – En arkitektur för framtiden

Detta handlar inte om teknikdetaljer.

Det handlar om:

- Hur vi organiserar ansvar
- Hur vi skyddar vår verksamhetslogik
- Hur vi möjliggör intelligens utan att förlora kontroll

Arkitektur blir ett styrsystem – inte bara en ritning.

---

## Slide 14 – Diskussion

- Vilka är våra viktigaste domäner?
- Var exponeras CRUD idag?
- Var finns oklara begrepp?
- Hur redo är vi för AI-autonomi?

---

# Tonalitet i presentationen

För verksamhetskunniga bör du:

- Undvika tekniska termer som OWL/SHACL initialt
- Prata om ansvar, stabilitet, risk och styrbarhet
- Använda konkreta exempel från deras vardag
- Fokusera på konsekvenser, inte implementation

---
