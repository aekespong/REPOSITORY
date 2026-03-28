import React from "react";
import { ArrowLeft, Search, History, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Document Intelligence" }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-header flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary hover:bg-surface-container-low px-3 py-1.5 rounded-xl transition-colors active:scale-95 font-semibold"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Tillbaka</span>
            </button>
          )}
          {!isHome && <div className="h-6 w-[1px] bg-outline-variant/20"></div>}
          <h1 className="text-xl font-bold tracking-tight text-on-surface">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full ghost-border">
            <Search size={18} className="text-primary" />
            <input 
              className="bg-transparent border-none text-sm focus:ring-0 placeholder-on-surface-variant/50 w-48 outline-none" 
              placeholder="Sök i analys..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
              <History size={20} />
            </button>
            <button className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-secondary-fixed-dim overflow-hidden">
              <img 
                alt="User profile" 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/user/100/100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}
