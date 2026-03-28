import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock RAG API
  // In a real app, this would connect to a vector DB or search engine.
  app.post("/api/search", (req, res) => {
    const { q } = req.body;
    // We'll return mock data for now that matches the user's provided UI.
    res.json([
      {
        score: 0.770,
        doc_id: "forord-1",
        text: "Min bakgrund är ingenjörens, men min passion har alltid legat i skärningspunkten mellan människa och teknik. I detta förord utforskar vi hur de digitala sprången vi nu ser inte bara förändrar våra verktyg, utan själva kärnan i hur vi interagerar med omvärlden. Framtiden är inte längre en avlägsen destination...",
        path: "REPOSITORY/BOOKS/nar-framtiden-blir-personlig-v3/chapters/forord.md",
        title: "1. nar-framtiden-blir-personlig-v3/chapters/forord",
        type: "CHAPTER"
      },
      {
        score: 0.712,
        doc_id: "intro-2",
        text: "För att förstå den pågående transformationen måste vi först förstå komplexiteten. Vi lever i en tid där informationsflödet har ersatt det fysiska kapitalet som den främsta tillväxtmotorn. Detta kräver nya sätt att läsa organisationens behov...",
        path: "REPOSITORY/BOOKS/digital-transformation/sections/intro.md",
        title: "2. digital-transformation/sections/intro",
        type: "CHAPTER"
      }
    ]);
  });

  app.get("/api/chunk/:id", (req, res) => {
    const { id } = req.params;
    // Mock data for the specific chunk
    res.json({
      text: "I dagens snabbföränderliga affärslandskap drunknar ledningsgrupper ofta i data men svälter efter insikt. Den stora utmaningen är inte bristen på information, utan bristen på kontextuellt sammanhang som gör informationen agerbar. När vi bygger system för Document Intelligence måste vi prioritera den redaktionella linsen — förmågan att inte bara lagra dokument, utan att kurera dem genom intelligent analys. Utan detta filter blir varje ny datapunkt bara ytterligare ett lager av brus i en redan överväldigande miljö.",
      path: "enterprise-design-claude/chapters/sammanfattning-till-ledningen",
      title: "Utmaningen: komplexitet utan sammanhang",
      tags: ["STRATEGY", "MANAGEMENT", "AI-INSIGHT"]
    });
  });

  app.get("/api/similar/:id", (req, res) => {
    res.json([
      {
        score: 0.770,
        doc_id: "forord-1",
        text: "Min bakgrund är ingenjörens, men min passion har alltid legat i skärningspunkten mellan människa och teknik. I detta förord utforskar vi hur de digitala sprången vi nu ser inte bara förändrar våra verktyg, utan själva kärnan i hur vi interagerar med omvärlden. Framtiden är inte längre en avlägsen destination...",
        path: "REPOSITORY/BOOKS/nar-framtiden-blir-personlig-v3/chapters/forord.md",
        title: "1. nar-framtiden-blir-personlig-v3/chapters/forord",
        type: "CHAPTER"
      },
      {
        score: 0.712,
        doc_id: "intro-2",
        text: "För att förstå den pågående transformationen måste vi först förstå komplexiteten. Vi lever i en tid där informationsflödet har ersatt det fysiska kapitalet som den främsta tillväxtmotorn. Detta kräver nya sätt att läsa organisationens behov...",
        path: "REPOSITORY/BOOKS/digital-transformation/sections/intro.md",
        title: "2. digital-transformation/sections/intro",
        type: "CHAPTER"
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
