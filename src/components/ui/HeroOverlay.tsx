import { ArrowDown, Cpu, Sparkles, Bot } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';

export function HeroOverlay() {
  const progress = useScrollStore((s) => s.progress);

  // Fade out smoothly as progress moves from 0.00 to 0.18
  const opacity = Math.max(0, 1 - progress * 5.5);
  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="pt-20 sm:pt-24" />

      {/* Hero Typography */}
      <div className="max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono-tech text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>TATA CONSULTANCY SERVICES</span>
          </div>
          <span className="text-xs font-mono-tech text-slate-400">HYDERABAD, INDIA</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white tracking-tighter leading-[0.88]">
          SHASHWAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300">
            KALE.
          </span>
        </h1>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-mono-tech text-slate-300">
            <span className="text-cyan-400 font-bold">GENERATIVE AI ENGINEER</span>
            <span className="text-slate-600">/</span>
            <span>MCP & AGENTIC WORKFLOWS</span>
            <span className="text-slate-600">/</span>
            <span className="text-fuchsia-400 font-bold">ENTERPRISE RAG ARCHITECT</span>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light leading-relaxed">
            Specializing in LangGraph agentic pipelines, custom GitHub Copilot agents, Model Context Protocol (MCP) servers, and production document intelligence.
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 pb-12 sm:pb-8 text-xs font-mono-tech text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-wider">SCROLL VERTICALLY TO ENTER THE AI NEURAL MATRIX</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-cyan-400">
          <Bot className="w-3.5 h-3.5 animate-pulse" />
          <span>CONTINUOUS 3D AI JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce ml-1" />
        </div>
      </div>
    </div>
  );
}
