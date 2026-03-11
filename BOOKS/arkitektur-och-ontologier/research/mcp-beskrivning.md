# Besvarade frågor om MCP

## 1. VAD ÄR MCP (MODEL CONTEXT PROTOCOL)?

### Grundläggande definition
Model Context Protocol (MCP) är ett öppet protokoll utvecklat av Anthropic som standardiserar hur AI-assistenter (som Claude) kan ansluta till och interagera med externa datakällor, verktyg och tjänster.

### Syfte
- Standardiserad kommunikation mellan LLM:er och externa resurser
- Context-delning från olika källor
- Strukturerad verktygsintegration
- Säker dataåtkomst

### Huvudkomponenter
1. **MCP Hosts** - AI-applikationer som använder externa resurser
2. **MCP Clients** - Protokollklienter som hanterar anslutningar
3. **MCP Servers** - Lättviktsprocesser som exponerar resurser

### Kärnkoncept
- **Resources** - Datakällor med unika URIs
- **Prompts** - Fördefinierade prompt-mallar
- **Tools** - Funktioner som AI kan anropa
- **Sampling** - Servrar kan initiera LLM-förfrågningar

## 2. VARFÖR SKAPADE ANTHROPIC MCP?

### Problemformulering

**Fragmentering före MCP:**
- Ingen standardiserad integrationsmetod
- Varje verktyg krävde unika kopplingar
- Duplicerad integrations-logik
- Svårt att återanvända komponenter

**Konkreta problem:**
- Custom-byggda integrationer för varje tjänst
- Mer tid på "plumbing" än värdeskapande
- Omskrivning vid byte av AI-leverantör
- Säkerhetsrisker från icke-standardiserade lösningar

### Anthropics motivation

**Vision:** Samma som HTTP för webben - ett universellt protokoll

**Strategiska drivkrafter:**
1. **Ekosystem-tillväxt** - Sänka inträdeshinder
2. **Claude-adoption** - Enklare företagsintegration
3. **Ansvarsfull AI** - Bättre säkerhet genom standardisering
4. **Future-proofing** - Protokoll som utvecklas med AI

### Use cases som drev utvecklingen
- Företag ville ge Claude tillgång till interna kunskapsbaser säkert
- Behov av auditerbara spår
- Kontroll över vilka verktyg och data AI har tillgång till
- Frustration över multipla custom integrationer

## 3. HUR FUNGERAR MCP TEKNISKT?

### Arkitektur

**Klient-Server Modell:**