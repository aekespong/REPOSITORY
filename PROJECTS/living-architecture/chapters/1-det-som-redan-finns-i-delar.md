# 🧠 1. Det som redan finns (i delar)

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
