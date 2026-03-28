# Viktiga val för implmentation (här avgör du allt)

### Var hård på:

- critical/high → måste hanteras

### Var flexibel på:

- low/suggestions → får passera

### Tillåt override:

- annars blir det byråkrati

---

# Minimal implementation (MVP)

Börja så här:

1.AI genererar feedback i PR (GitHub comments)
2.Lägg label/tag:

  -`critical`, `high`, etc.
3.Kräv:

  -kommentar + reaktion (👍/👎) = accept/reject
4.Blockera merge via GitHub Action

👉 Enkelt – men kraftfullt.

---

# Essensen

Du bygger inte bara feedback.

Du bygger:

>Ett system där varje förändring granskas, förstås och förbättras – innan den når produktion.

Och:

>Ett system där kunskap inte tappas – den ackumuleras.

--- 

Vill du ta nästa steg kan vi:

- designa **exakt GitHub Action + status checks**
- eller definiera **UI (dashboard + PR-vy)**
- eller skriva **konkreta AI-prompter som genererar rätt typ av feedback**

Det är där det går från idé → fungerande system.

--- 

### You**

Har detta gjorts förr? 

--- 

### ChatGPT**

Kort svar: **delar av detta har gjorts – men inte helheten så konsekvent och “no-bullshit” som du beskriver**.

Det du bygger är egentligen en kombination av flera etablerade idéer, men ihopkopplade hårdare än vad de normalt är i praktiken.

---
