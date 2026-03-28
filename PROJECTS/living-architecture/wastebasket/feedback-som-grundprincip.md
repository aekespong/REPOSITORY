# Feedback som grundprincip

>**All feedback är ett ärende som måste hanteras – inte en kommentar man kan ignorera.**

Varje PR genererar en uppsättning **Feedback Items**.

---

# 🏷️ 2. Feedback Item – datamodell

Varje AI- eller manuell kommentar blir ett objekt:

```
YAMLid: FB-00123type: violation | risk | suggestion | questionseverity: critical | high | medium | lowsource: ai | humanstatus: open | accepted | rejected | resolvedconfidence: 0.0–1.0links:  requirements: [REQ-123]  policies: [POL-SEC-01]  adr: [ADR-7]message: "Endpoint saknar autentisering"evidence:  - file: api/user.py    line: 42suggestion: "Använd AuthMiddleware"
```

👉 Viktigt:

- **type + severity + status** styr flödet
- **links** gör allt spårbart

---

# 🚦 3. Statusmodell (kärnan)

### Tillstånd:

- **open** → ny feedback
- **accepted** → vi håller med, ska åtgärdas
- **rejected** → vi håller inte med
- **resolved** → åtgärdat i kod

---

# 🔁 4. PR-flöde (exakt beteende)

När PR öppnas:

### 1. AI skapar feedback

→ Alla items = `open`

--- 

### 2. Teamet måste ta ställning

För varje item:

- ✅ Acceptera
- ❌ Avvisa
- 🔧 Lösa (via kodändring)

--- 

### 3. Merge-regler

PR får **inte mergas om:**

- ❗ Något `critical` eller `high` är:

  -`open`
  -eller `accepted` men inte `resolved`

PR får mergas om:

- Alla kritiska issues är:

  -`resolved` eller `rejected`

👉 Detta är din “governance engine”.

---

# 🧠 5. Skillnad på AI vs människa

Du måste designa detta tydligt:

### AI-feedback:

- Måste alltid **bekräftas**
- Har “confidence score”
- Kan avvisas

### Mänsklig feedback:

- Kan sätta:

  -högre severity
  -override

👉 Viktigt:

>AI föreslår – människor beslutar.

---

# ⚖️ 6. “Rejection kräver ansvar”

Om någon avvisar feedback:

Måste de ange:

```
YAMLrejection_reason: "False positive – endpoint skyddas via gateway"approved_by: "tech lead"
```

👉 Detta skapar:

- ansvar
- spårbarhet
- lärande för AI (senare)

---

# 🔍 7. Transparens för alla

Alla ska kunna se:

- Alla feedback items
- Status
- Beslut
- Motiveringar

### Dashboard-exempel:

- 🔴 12 kritiska issues öppna
- 🟡 8 avvisade (med motivering)
- 🟢 25 lösta

👉 Management + team ser samma verklighet.

---

# 📊 8. Aggregering (detta ger management-värde)

Du kan nu mäta:

### Per projekt:

- Antal policy-brott
- Andel avvisad AI-feedback
- Tid till resolution

### Per organisation:

- Vanligaste policy-brott
- Svagaste kravområden
- “risk hotspots”

👉 Detta är guld för styrning.

---

# 🤖 9. AI-feedback – struktur (så den blir användbar)

Varje feedback ska alltid innehålla:

1.❗ Problem (kort)
2.📚 Referens (policy/krav)
3.🔍 Evidence (kod)
4.💡 Förslag (lösning)
5.📈 Konsekvens (varför viktigt)

### Exempel:

>❗ Saknar autentisering
>
>📚 POL-SEC-01
>
>🔍 `/api/user.py:42`
>
>💡 Lägg till AuthMiddleware
>
>📈 Risk för obehörig åtkomst

👉 Då förstår ALLA – inte bara devs.

---

# 🧪 10. Självläkande system (nästa nivå)

När feedback avvisas ofta:

→ flagga:

>“Denna regel ger många false positives”

När samma issue upprepas:

→ flagga:

>“Detta är ett systematiskt problem”

👉 Systemet förbättrar sig självt.

---

# 🧑‍🏫 11. Feedback = utbildning

Varje feedback item är också:

- en förklaring
- ett exempel
- en regel

👉 Du bygger ett “learning system” automatiskt.

---
