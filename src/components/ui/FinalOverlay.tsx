import { ArrowUp, Mail, MapPin, GraduationCap, Terminal, Bot } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function FinalOverlay() {
  const progress = useScrollStore((s) => s.progress);

  // Active when progress >= 0.90
  let opacity = 0;
  if (progress >= 0.90) {
    opacity = (progress - 0.90) / 0.08;
  }

  if (opacity <= 0.01) return null;

  const handleScrollToTop = () => {
    audioEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center p-6 sm:p-12 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono-tech text-cyan-400 tracking-widest uppercase">
          <Terminal className="w-4 h-4" />
          06 // NEXUS CONVERGENCE • SHASHWAT KALE
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tech text-slate-400 tracking-[0.3em] uppercase">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>GENERATIVE AI ENGINEER • AGENTIC SYSTEMS • RAG</span>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tight leading-[0.92]">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300">
              INTELLIGENCE.
            </span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
          Open for enterprise GenAI collaborations, production Agentic & RAG pipelines, and innovative AI product engineering.
        </p>

        {/* Location & Degree Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono-tech text-slate-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Hyderabad, India
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> B.Tech in Artificial Intelligence
          </span>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 pointer-events-auto">
          <a
            href="mailto:shashwat.kale.27@gmail.com"
            onClick={() => audioEngine.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono-tech tracking-wider transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            <Mail className="w-4 h-4" /> shashwat.kale.27@gmail.com
          </a>

          <a
            href="https://github.com/shashwatkale"
            target="_blank"
            rel="noreferrer"
            onClick={() => audioEngine.playClick()}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-mono-tech tracking-wider transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GITHUB</span>
          </a>

          <a
            href="https://www.linkedin.com/in/shashwatkale27/"
            target="_blank"
            rel="noreferrer"
            onClick={() => audioEngine.playClick()}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-mono-tech tracking-wider transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Scroll Back To Initialization */}
        <div className="pt-4 pointer-events-auto">
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" /> RESTART CINEMATIC JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
}
