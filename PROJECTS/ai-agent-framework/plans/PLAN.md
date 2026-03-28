# PLAN.md inom Model Workspace Protocol (MWP)

Inom Model Workspace Protocol (MWP) fungerar en `PLAN.md` ofta som en förlängning av **Lager 2 (Stage CONTEXT.md)**. Medan kontextfilen definierar de övergripande reglerna och kontrakten för ett steg, fungerar planen som en **exekverbar checklista** eller en "ritning" som agenten skapar för att bryta ner en komplex uppgift i mindre, granskningsbara delar.

Här är ett exempel på hur en `PLAN.md` kan se ut för ett arbetsflöde som skapar en utbildningsmodul:

# PLAN: Produktion av Utbildningsmodul 01

**Status:** 🔄 Pågår
**Ansvarig:** Agent (Granskas av människa)
**Relaterat stadium:** `02_script/`

## 1. Ingångsvärden (Inputs)
Enligt kontraktet i `CONTEXT.md` används följande filer:

| Typ | Källa | Syfte |
| :--- | :--- | :--- |
| **Lager 4** | `../01_research/output/research_summary.md` | Faktaunderlag och källmaterial |
| **Lager 3** | `../../_config/voice.md` | Säkerställa pedagogisk och engagerande ton |
| **Lager 3** | `references/module_structure.md` | Mall för lektionens uppbyggnad |

## 2. Exekveringssteg
Dessa steg följer Unix-principen "gör en sak och gör den väl":

- [x] **Steg 1: Strukturanalys.** Jämför research-materialet med `module_structure.md` för att identifiera kunskapsluckor.
- [ ] **Steg 2: Utkast till manus.** Skapa ett första utkast av lektionsmanuset i `output/draft_v1.md`.
    - *Regel:* Max 1000 ord per modul för att undvika "Lost in the Middle"-effekter.
- [ ] **Steg 3: Tonkontroll.** Justera språket i utkastet baserat på `voice.md`.
- [ ] **Steg 4: Självutvärdering.** Validera att alla lärandemål från researchen finns med.

## 3. Granskningspunkt (Review Gate)
*Innan nästa stadium (`03_production`) påbörjas krävs mänsklig bekräftelse på följande:*
1. Är den pedagogiska tonen korrekt?
2. Täcker manuset de tekniska kraven i researchen?

## 4. Förväntad utdata (Outputs)
- `output/final_script.md` -> Levereras till nästa mapp i hierarkin.

***

### Varför denna struktur är viktig i MWP:
*   **Separation av ansvar:** Planen tydliggör vad som är instruktioner (Lager 2), regler (Lager 3) och faktiskt arbete (Lager 4).
*   **Editering som yta:** Genom att ha planen i en markdown-fil kan du som människa gå in och ändra ordningen på stegen eller lägga till en specifik instruktion mitt i processen.
*   **Spårbarhet:** Om något går fel i slutprodukten kan du spåra felet tillbaka till vilket steg i planen som misslyckades, vilket möjliggör "semantisk felsökning".

Vill du att jag hjälper dig att skräddarsy en specifik `CONTEXT.md` för ett av dina egna arbetsflöden?