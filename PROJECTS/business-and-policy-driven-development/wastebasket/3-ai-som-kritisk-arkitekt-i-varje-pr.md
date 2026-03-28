# 🤖 3. AI som “kritisk arkitekt” i varje PR

Vid varje PR ska du köra en pipeline som gör tre typer av analys:

---  

##  A. Compliance-check (hård)

-  Uppfyller koden policies?
-  Bryter något mot enterprise-plan?

Exempel:

-  “Denna PR bryter mot POL-INT-02 (ingen direktkoppling mellan system X och Y)”

---  

##  B. Consistency-check (logik)

-  Stämmer kod ↔ krav?
-  Saknas implementation för vissa krav?
-  Implementeras saker som INTE finns i krav?

---  

##  C. Arkitekturkritik (mjuk men viktig)

Här ska AI vara jobbig:

-  “Detta liknar en distributed monolith”
-  “Duplicerad logik jämfört med project-b”
-  “Bryter mot bounded context”

👉 Det här är där värdet verkligen finns.

---
