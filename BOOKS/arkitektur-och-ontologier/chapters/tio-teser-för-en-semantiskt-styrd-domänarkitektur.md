# Tio teser för en semantiskt styrd domänarkitektur

## Ett manifest för kontrollerad intelligens

---

### Tes 1 — Domänen är den primära arkitekturenheten

Arkitektur ska organiseras kring suveräna domäner.

Varje domän äger sina dataobjekt, sin interna mekanik och sitt externa kontrakt.

Domängränsen är både teknisk och semantisk.

---

### Tes 2 — Extern interaktion sker endast via systemtjänster

All exponering utanför en domän ska ske genom systemtjänster.

Systemtjänsten är domänens publika kontrakt och den enda legitima ingångspunkten.

---

### Tes 3 — CRUD är intern mekanik, inte ett kontrakt

Resurstjänster som realiserar CRUD-funktionalitet är alltid interna.

De får aldrig exponeras och får aldrig vara beroendepunkter utanför domänen.

---

### Tes 4 — Beroenden är strikt riktade

Alla beroenden ska vara riktade nedåt:

konsument → systemtjänst → resurstjänst.

Tvärdomäninteraktioner får endast ske via systemtjänster.

Direkt åtkomst till en annan domäns interna struktur är arkitekturmässigt ogiltig.

---

### Tes 5 — Systemtjänster uttrycks i verksamhetens språk

Systemtjänster ska namnges och struktureras i verksamhetstermer.

De realiserar capabilities och processer, inte databasoperationer.

---

### Tes 6 — Begrepp måste formaliseras

Begrepp får inte vara implicita.

En formell ontologi ska definiera vad centrala entiteter är, hur de relaterar och vilka restriktioner som gäller.

Semantik är arkitekturens konstitution.

---

### Tes 7 — Arkitekturprinciper måste vara verifierbara

Principer som inte kan kontrolleras maskinellt riskerar att förbli retorik.

Exponeringsregler, beroenden och datavalidering ska kunna testas och verkställas automatiskt.

Governance ska vara exekverbar.

---

### Tes 8 — Autonomi kräver strukturell disciplin

AI-agenter och automatiserade system ska endast ges åtkomst till systemtjänster.

Interna mekanismer och dataoperationer ska vara skyddade.

Autonomi är tillåten inom definierade och verifierbara gränser.

---

### Tes 9 — Semantik och struktur är komplementära

Strukturell disciplin utan semantik leder till begreppsförvirring.

Semantik utan strukturell disciplin leder till operativ instabilitet.

En hållbar arkitektur förenar båda.

---

### Tes 10 — Arkitektur är ett styrsystem för intelligens

I en organisation som använder AI är arkitekturens uppgift att:

- Avgränsa handlingsutrymme
- Skydda domänsuveränitet
- Stabiliserar begrepp
- Verkställa regler

Arkitektur är inte dokumentation.

Den är en mekanism för kontrollerad intelligens.

