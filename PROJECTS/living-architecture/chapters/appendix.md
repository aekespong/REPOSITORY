# Appendix

## 📜 “Policy as Code”

Exempel:

- Open Policy Agent
- HashiCorp Sentinel

👉 Gör:

- Policies körbara
- Automatiska kontroller i pipelines

👉 Men:

- Saknar koppling till **krav, arkitektur och kod i helhet**
- Ingen riktig “feedback-loop” i PR på det sätt du beskriver

--- 

## 🏗️ Arkitektur som kod / ADR

Exempel:

- ADR Tools

👉 Gör:

- Beslut dokumenteras i repo

👉 Men:

- Blir ofta passiva dokument
- Kopplas sällan till faktisk kod eller enforcement

--- 

## 🔍 Statisk kodanalys

Exempel:

- SonarQube

👉 Gör:

- Hittar buggar, code smells

👉 Men:

- Förstår inte:

  -verksamhetskrav
  -policies
  -arkitekturintention

--- 

## 🔗 Spårbarhet (ALM/kravverktyg)

Exempel:

- Jira + Confluence

👉 Gör:

- Länkar krav → uppgifter → kod (ibland)

👉 Men:

- Manuellt
- Tappar alltid kvalitet över tid

--- 

## 🤖 AI i kodgranskning (nytt)

Exempel:

- GitHub Copilot
- CodeRabbit

👉 Gör:

- Kommenterar PRs

👉 Men:

- Saknar djup koppling till:

  -enterprise policies
  -arkitekturplan
  -organisationens kunskap

---

# 🔥 2. Det som är nytt i din idé

Det är inte komponenterna – det är **kombinationen + disciplinen**:

--- 

## 1. Enhet: krav + policy + kod + analys

De flesta organisationer har detta:

- Krav → i ett system
- Kod → i Git
- Policies → i PDF

👉 Du säger:

>“Allt ska vara EN modell i Git och analyseras tillsammans”

Det är ovanligt.

--- 

## 2. Tvingande feedback-loop i PR

Många har:

- linting
- tester

Men:

>Att ALL arkitektur- och policy-feedback måste **tas ställning till** innan merge

👉 Det är ovanligt strikt – och kraftfullt.

--- 

## 3. AI som arkitekturgranskare (inte bara kodgranskare)

Detta är ganska nytt.

Du använder AI för att:

- tolka krav
- jämföra mot kod
- hitta arkitekturproblem
- resonera

👉 De flesta använder AI för:

- autocomplete
- enklare review

Inte för **governance + analys på enterprise-nivå**

--- 

## 4. Feedback som kunskapssystem

Det här är nästan ingen som gör:

>Feedback → sparas → analyseras → förbättrar organisationen

De flesta system:

- kastar bort lärandet efter PR

--- 

## 5. Frågemotor över hela arkitekturen

Att kunna fråga:

>“Var bryter vi mot våra policies just nu?”

👉 Det finns nästan inte i praktiken idag.

---

# ⚠️ 3. Varför detta inte redan är standard

Det finns en anledning (flera faktiskt):

--- 

## 1. Kultur slår teknik

Detta kräver:

- disciplin
- transparens
- ansvar

Många organisationer vill inte ha:

>“full synlighet i brister”

--- 

## 2. För komplext (historiskt)

Tidigare:

- svårt att koppla ihop allt
- AI var för svag

👉 Det håller på att förändras nu.

--- 

## 3. Fel incitament

Projekt optimerar för:

- leveranshastighet

Inte:

- långsiktig kvalitet

👉 Din modell tvingar fram kvalitet.

---

# 🧭 4. Närmast du kommer idag

De mest mogna organisationerna (typ stora techbolag) gör något liknande, men:

- internt
- fragmenterat
- utan full transparens

---

# 💡 5. Min ärliga bedömning

Det du beskriver är:

👉 **inte en ny idé i komponenter**

👉 men en ganska ovanlig och ambitiös implementation

Och viktigast:

>Du flyttar arkitektur från dokument → till ett körbart, granskat system

---

# 🚀 6. Det verkligt intressanta

Om du lyckas fullt ut får du:

- En organisation som **lär sig kontinuerligt**
- En arkitektur som **inte kan ignoreras**
- En governance som **inte är beroende av möten**

Det är ganska nära:

>“Continuous Architecture + Continuous Governance + AI”

--- 

## Avgörande om man ska vara brutalt ärlig i nästa steg och:

- peka ut **vad som kommer vara svårast att få att fungera i verkligheten**
- eller jämföra detta med hur t.ex. stora banker / techbolag faktiskt jobbar

Det är där man ser om det här kommer flyga eller krascha.


## Vad är svårast i implementeringen?

Det svåraste är inte tekniken. Du kan få ihop pipelines, AI och Git ganska snabbt.

Det som avgör om det flyger eller dör är **beteenden, incitament och precision i modellen**.

Här är de verkliga knäckpunkterna – utan fluff:

---
