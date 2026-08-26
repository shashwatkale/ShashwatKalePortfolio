import { Bot, Sparkles, Cpu, Layers } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function AgentSwarmOverlay() {
  const progress = useScrollStore((s) => s.progress);
  const toggleAgentModal = useScrollStore((s) => s.toggleAgentModal);

  // Active between 0.78 and 0.92
  let opacity = 0;
  if (progress >= 0.78 && progress <= 0.92) {
    if (progress < 0.81) {
      opacity = (progress - 0.78) / 0.03;
    } else if (progress > 0.89) {
      opacity = (0.92 - progress) / 0.03;
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
          <Bot className="w-4 h-4" />
          05 // AUTONOMOUS MULTI-AGENT SWARMS
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-[0.9]">
          AUTONOMOUS AGENTS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300">
            SYSTEMS THAT REASON & ACT.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
          Architecting hierarchical LangGraph agent networks that decompose complex objectives, execute deterministic MCP tools, self-correct errors, and output strict structured data.
        </p>

        {/* Action Trigger Button */}
        <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              toggleAgentModal();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs font-mono-tech tracking-wider transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer transform hover:scale-105"
          >
            <Bot className="w-4 h-4" />
            <span>DISPATCH AGENT SWARM SIMULATOR</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Agent Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
          <div className="p-3.5 rounded-2xl bg-[#060814]/80 border border-cyan-500/20 backdrop-blur-md flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[9px] font-mono-tech text-slate-400 uppercase">PROTOCOL</div>
              <div className="text-sm font-mono-tech font-bold text-white">MCP SERVERS</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#060814]/80 border border-fuchsia-500/20 backdrop-blur-md flex items-center gap-3">
            <Layers className="w-5 h-5 text-fuchsia-400 shrink-0" />
            <div>
              <div className="text-[9px] font-mono-tech text-slate-400 uppercase">TOPOLOGY</div>
              <div className="text-sm font-mono-tech font-bold text-white">LANGGRAPH DAG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
