import { useScrollStore } from '../../stores/scrollStore';

export function IntelligenceOverlay() {
  const progress = useScrollStore((s) => s.progress);

  // Active between 0.18 and 0.40
  let opacity = 0;
  if (progress >= 0.18 && progress <= 0.40) {
    if (progress < 0.24) {
      opacity = (progress - 0.18) / 0.06;
    } else if (progress > 0.34) {
      opacity = (0.40 - progress) / 0.06;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center p-6 sm:p-12 md:p-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400 tracking-widest uppercase">
          <span>02 // PRODUCTION AI & MCP FRAMEWORKS</span>
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-[0.9]">
          I BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300">
            INTELLIGENCE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
          At <strong className="text-white font-semibold">TCS</strong>, I build enterprise Agentic AI + RAG document intelligence platforms, custom GitHub Copilot agents, and Model Context Protocol (MCP) servers with structured JSON schemas for zero-hallucination extraction.
        </p>

        {/* Core AI Competency Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
          <div className="p-3.5 rounded-2xl bg-[#070b16]/80 border border-cyan-500/20 backdrop-blur-md">
            <div className="text-[10px] font-mono-tech text-slate-400 uppercase">FRAMEWORKS</div>
            <div className="text-sm font-mono-tech font-bold text-cyan-400">LANGGRAPH · MCP</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#070b16]/80 border border-cyan-500/20 backdrop-blur-md">
            <div className="text-[10px] font-mono-tech text-slate-400 uppercase">PIPELINES</div>
            <div className="text-sm font-mono-tech font-bold text-fuchsia-400">ENTERPRISE RAG</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#070b16]/80 border border-cyan-500/20 backdrop-blur-md">
            <div className="text-[10px] font-mono-tech text-slate-400 uppercase">FOUNDATION MODELS</div>
            <div className="text-sm font-mono-tech font-bold text-emerald-400">GEMINI · CLAUDE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
