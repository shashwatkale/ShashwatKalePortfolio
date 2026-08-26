import { ArrowDown, Cpu, Gamepad2, Zap } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';

export function HeroOverlay() {
  const progress = useScrollStore((s) => s.progress);
  const mode = useScrollStore((s) => s.mode);

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
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono-tech ${
              mode === 'gamer'
                ? 'bg-pink-500/10 border-pink-400/40 text-pink-300'
                : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
            }`}
          >
            {mode === 'gamer' ? (
              <>
                <Gamepad2 className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>GAMER BATTLESTATION ONLINE</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>TATA CONSULTANCY SERVICES</span>
              </>
            )}
          </div>
          <span className="text-xs font-mono-tech text-slate-400">
            {mode === 'gamer' ? 'SUB-140MS REFLEXES' : 'HYDERABAD, INDIA'}
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white tracking-tighter leading-[0.88]">
          SHASHWAT <br />
          <span
            className={`text-transparent bg-clip-text ${
              mode === 'gamer'
                ? 'bg-gradient-to-r from-pink-500 via-purple-400 to-amber-300'
                : 'bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300'
            }`}
          >
            KALE.
          </span>
        </h1>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-mono-tech text-slate-300">
            {mode === 'gamer' ? (
              <>
                <span className="text-pink-400 font-bold">COMPETITIVE GAMER</span>
                <span className="text-slate-600">/</span>
                <span>3D GAME ENGINE ARCHITECT</span>
                <span className="text-slate-600">/</span>
                <span className="text-amber-300 font-bold">240 FPS OPTIMIZATION</span>
              </>
            ) : (
              <>
                <span className="text-cyan-400 font-bold">GENERATIVE AI ENGINEER</span>
                <span className="text-slate-600">/</span>
                <span>MCP & AGENTIC WORKFLOWS</span>
                <span className="text-slate-600">/</span>
                <span className="text-fuchsia-400 font-bold">ENTERPRISE RAG ARCHITECT</span>
              </>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-light leading-relaxed">
            {mode === 'gamer'
              ? 'Exploring procedural 3D worlds, shader raymarching, competitive tactical FPS, and ultra-low-latency real-time rendering physics.'
              : 'Specializing in LangGraph agentic pipelines, custom GitHub Copilot agents, Model Context Protocol (MCP) servers, and production document intelligence.'}
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 pb-12 sm:pb-8 text-xs font-mono-tech text-slate-400">
        <div className="flex items-center gap-3">
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              mode === 'gamer' ? 'bg-pink-400' : 'bg-cyan-400'
            }`}
          />
          <span className="tracking-wider">
            {mode === 'gamer'
              ? 'SCROLL VERTICALLY TO ENTER THE GAMING BATTLEGROUND'
              : 'SCROLL VERTICALLY TO ENTER THE AI NEURAL MATRIX'}
          </span>
        </div>
        <div
          className={`hidden sm:flex items-center gap-2 ${
            mode === 'gamer' ? 'text-pink-400' : 'text-cyan-400'
          }`}
        >
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>{mode === 'gamer' ? 'GAMING 3D JOURNEY' : 'CONTINUOUS 3D AI JOURNEY'}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce ml-1" />
        </div>
      </div>
    </div>
  );
}
