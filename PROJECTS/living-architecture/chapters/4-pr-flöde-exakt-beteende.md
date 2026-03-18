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
