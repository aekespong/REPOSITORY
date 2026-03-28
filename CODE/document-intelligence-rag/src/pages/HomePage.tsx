import React, { useState } from "react";
import { Search, Folder, ArrowRight, BookmarkPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { SearchResult } from "../types";
import { motion } from "motion/react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Archive Search">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-primary group-focus-within:scale-110 transition-transform" size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a question or search term..."
              className="w-full bg-white rounded-2xl py-6 pl-16 pr-32 text-xl ambient-shadow ghost-border focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder-on-surface-variant/30"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-4 inset-y-4 px-6 primary-gradient text-white rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                Resultat ({results.length} matchningar)
              </h2>
              <div className="flex gap-2">
                <button className="text-xs font-medium px-3 py-1.5 bg-white ghost-border rounded-full hover:bg-white/80">Relevans</button>
                <button className="text-xs font-medium px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-low rounded-full">Datum</button>
              </div>
            </div>

            <div className="grid gap-6">
              {results.map((result, index) => (
                <motion.article
                  key={result.doc_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
          </div>
        )}

        {query && results.length === 0 && !loading && (
          <p className="text-center text-on-surface-variant py-12">No results found.</p>
        )}
      </div>
    </Layout>
  );
}
