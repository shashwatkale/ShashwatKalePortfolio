import { Bot, Sparkles, Cpu, Layers, Gamepad2, Zap, Trophy } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function AgentSwarmOverlay() {
  const progress = useScrollStore((s) => s.progress);
  const mode = useScrollStore((s) => s.mode);
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
        <div
          className={`flex items-center gap-2 text-xs font-mono-tech tracking-widest uppercase ${
            mode === 'gamer' ? 'text-pink-400' : 'text-cyan-400'
          }`}
        >
          {mode === 'gamer' ? (
            <>
              <Gamepad2 className="w-4 h-4" />
              <span>05 // COMPETITIVE ROSTER & REFLEX ARENA</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              <span>05 // AUTONOMOUS MULTI-AGENT SWARMS</span>
            </>
          )}
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-[0.9]">
          {mode === 'gamer' ? (
            <>
              COMPETITIVE ARENA. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300">
                SUB-140MS REFLEXES.
              </span>
            </>
          ) : (
            <>
              AUTONOMOUS AGENTS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300">
                SYSTEMS THAT REASON & ACT.
              </span>
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
          {mode === 'gamer'
            ? 'Controller in tactical FPS, frame-perfect timing in Soulsborne titles, and rigorous reflex training that directly sharpens high-speed engineering focus.'
            : 'Architecting hierarchical LangGraph agent networks that decompose complex objectives, execute deterministic MCP tools, self-correct errors, and output strict structured data.'}
        </p>

        {/* Action Trigger Button */}
        <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              toggleAgentModal();
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs font-mono-tech tracking-wider transition-all shadow-lg cursor-pointer transform hover:scale-105 ${
              mode === 'gamer'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)]'
            }`}
          >
            {mode === 'gamer' ? (
              <>
                <Gamepad2 className="w-4 h-4" />
                <span>OPEN AIM TRAINER & BATTLESTATION LAB</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                <span>DISPATCH AGENT SWARM SIMULATOR</span>
              </>
            )}
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
          {mode === 'gamer' ? (
            <>
              <div className="p-3.5 rounded-2xl bg-[#12071a]/80 border border-pink-500/20 backdrop-blur-md flex items-center gap-3">
                <Zap className="w-5 h-5 text-pink-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono-tech text-slate-400 uppercase">REACTION TIME</div>
                  <div className="text-sm font-mono-tech font-bold text-white">&lt; 140 MS</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#12071a]/80 border border-pink-500/20 backdrop-blur-md flex items-center gap-3">
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono-tech text-slate-400 uppercase">DISCIPLINE</div>
                  <div className="text-sm font-mono-tech font-bold text-white">CONTROLLER / AWP</div>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
