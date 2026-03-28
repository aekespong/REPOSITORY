import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Zap, Folder, ArrowRight, BookmarkPlus } from "lucide-react";
import Layout from "../components/Layout";
import { SearchResult, ChunkDetail } from "../types";
import { motion } from "motion/react";

export default function ChunkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chunk, setChunk] = useState<ChunkDetail | null>(null);
  const [similarResults, setSimilarResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [chunkRes, similarRes] = await Promise.all([
          fetch(`/api/chunk/${id}`),
          fetch(`/api/similar/${id}`)
        ]);
        const chunkData = await chunkRes.json();
        const similarData = await similarRes.json();
        setChunk(chunkData);
        setSimilarResults(similarData);
      } catch (error) {
        console.error("Failed to fetch chunk data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Layout title="Loading..."><div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div></Layout>;
  if (!chunk) return <Layout title="Not Found"><div className="text-center py-24">Chunk not found.</div></Layout>;

  return (
    <Layout title="Liknande avsnitt">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Similar Sections List */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
              Resultat ({similarResults.length} matchningar)
            </h2>
            <div className="flex gap-2">
              <button className="text-xs font-medium px-3 py-1.5 bg-white ghost-border rounded-full hover:bg-white/80">Relevans</button>
              <button className="text-xs font-medium px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-low rounded-full">Datum</button>
            </div>
          </div>

          {similarResults.map((result, index) => (
            <motion.article
              key={result.doc_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 ambient-shadow ghost-border group hover:ring-2 hover:ring-primary/10 transition-all cursor-pointer"
              onClick={() => navigate(`/chunk/${result.doc_id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <span className="inline-block bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {result.type}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {result.title}
                  </h3>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-mono text-sm font-bold">
                  {result.score.toFixed(3)}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mb-6 font-medium">
                <Folder size={14} />
                <span className="truncate">{result.path}</span>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-4">
                  {result.text}
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <div className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Similar sections <ArrowRight size={18} />
                </div>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
                  <BookmarkPlus size={20} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Right: Original Section Sidebar */}
        <aside className="md:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Original Section</h2>
            </div>
            <div className="bg-surface-container-low rounded-xl p-8 border-l-4 border-primary ambient-shadow">
              <header className="mb-8">
                <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant mb-3">
                  <FileText size={16} />
                  {chunk.path}
                </div>
                <h3 className="text-2xl font-extrabold text-on-surface leading-tight tracking-tight">
                  {chunk.title}
                </h3>
              </header>
              <div className="prose prose-slate max-w-none">
                <p className="text-on-surface text-base leading-relaxed mb-6 font-medium">
                  {chunk.text.split('. ')[0]}.
                </p>
                <p className="text-on-surface-variant text-sm leading-loose">
                  {chunk.text.split('. ').slice(1).join('. ')}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {chunk.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white text-primary text-[11px] font-bold rounded-full ghost-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 ghost-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">AI Insights</h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Detta avsnitt delar semantiska mönster med 12 andra kapitel inom kategorin "Digital Strategi". Vill du se en sammanfattning av dessa kopplingar?
                </p>
                <button className="mt-3 text-xs font-bold text-primary hover:underline">Generera översikt →</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
