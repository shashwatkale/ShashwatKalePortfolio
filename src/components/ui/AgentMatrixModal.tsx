import { useState, useEffect, useRef } from 'react';
import {
  X,
  Bot,
  Play,
  CheckCircle2,
  ArrowRight,
  Zap,
  Database,
  Terminal,
  Gamepad2,
  Trophy,
  Target,
  Monitor,
} from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function AgentMatrixModal() {
  const isOpen = useScrollStore((s) => s.isAgentModalOpen);
  const setOpen = useScrollStore((s) => s.setAgentModalOpen);
  const mode = useScrollStore((s) => s.mode);

  // Agent Simulator State
  const [isRunning, setIsRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Gamer Reflex Minigame State
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState<number>(Date.now());
  const [streak, setStreak] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const presets = [
    {
      title: 'Enterprise Document RAG & MCP Extraction',
      description: 'Extracts structured revenue data from financial documents using custom MCP server.',
      steps: [
        { agent: 'SUPERVISOR', action: 'Parsing user objective & building LangGraph DAG...', time: '2ms' },
        { agent: 'RAG AGENT', action: 'FAISS vector search across 100K chunk embeddings (top-k=5)...', time: '8ms' },
        { agent: 'TOOL CALLER', action: 'Invoking MCP tool `extract_structured_fields` with JSON schema...', time: '14ms' },
        { agent: 'CRITIC', action: 'Validating response against Pydantic schema (0 hallucinations)...', time: '5ms' },
        { agent: 'SYNTHESIS', action: 'Output finalized with 100% field confidence.', time: '1ms' },
      ],
    },
    {
      title: 'JanSetu Civic Photo Routing (Gemini 2.5)',
      description: 'Vision API classifies road damage & routes complaint to Municipal Corporation.',
      steps: [
        { agent: 'VISION AGENT', action: 'Sending image bytes to Gemini 2.5 Flash Vision API...', time: '18ms' },
        { agent: 'CLASSIFIER', action: 'Matched 55-category taxonomy: `PWD // Pothole & Road Hazard`', time: '4ms' },
        { agent: 'AWS ROUTER', action: 'Generated S3 pre-signed URL & PostgreSQL complaint ticket', time: '11ms' },
        { agent: 'SYNTHESIS', action: 'Department alert dispatched in < 30 seconds.', time: '2ms' },
      ],
    },
    {
      title: 'Adaptive Mock Interview Evaluation',
      description: 'LangChain pipeline scoring candidate response on clarity, depth, and tech accuracy.',
      steps: [
        { agent: 'PROMPT ENGINE', action: 'Generating role-specific AI Engineer scenario question...', time: '6ms' },
        { agent: 'EVALUATOR', action: 'Scoring response across 5 rubric dimensions via LangChain...', time: '15ms' },
        { agent: 'FEEDBACK GEN', action: 'Compiling actionable improvement tips & follow-up prompts', time: '9ms' },
        { agent: 'SQL STORE', action: 'Persisted session metrics to MS SQL Server database.', time: '4ms' },
      ],
    },
  ];

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  const handleRunWorkflow = () => {
    if (isRunning) return;
    audioEngine.playClick();
    setIsRunning(true);
    setCurrentStepIndex(0);

    const steps = presets[activePreset].steps;
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setCurrentStepIndex(idx + 1);
        audioEngine.playClick();
        if (idx === steps.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playClick();
    const now = Date.now();
    const rt = now - lastSpawnTime;
    setReactionTime(rt);
    setScore((s) => s + 100);
    setStreak((st) => st + 1);

    setTargetPos({
      x: Math.floor(Math.random() * 75 + 10),
      y: Math.floor(Math.random() * 65 + 15),
    });
    setLastSpawnTime(Date.now());
  };

  if (!isOpen) return null;

  const currentPresetData = presets[activePreset];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          audioEngine.playClick();
          setOpen(false);
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] bg-[#070914]/95 border rounded-3xl p-6 sm:p-8 md:p-10 overflow-y-auto z-10 animate-in zoom-in-95 duration-300 space-y-8 ${
          mode === 'gamer'
            ? 'border-pink-500/30 shadow-[0_0_80px_rgba(236,72,153,0.25)]'
            : 'border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.25)]'
        }`}
      >
        {/* Glow */}
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            mode === 'gamer' ? 'bg-pink-600/20' : 'bg-cyan-500/20'
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            mode === 'gamer' ? 'bg-cyan-500/20' : 'bg-fuchsia-500/20'
          }`}
        />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div
              className={`flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest ${
                mode === 'gamer' ? 'text-pink-400' : 'text-cyan-400'
              }`}
            >
              {mode === 'gamer' ? (
                <>
                  <Gamepad2 className="w-4 h-4" />
                  <span>SHASHWAT KALE // GAMER PROFILE & BATTLESTATION LAB</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>SHASHWAT KALE // AUTONOMOUS AGENT ORCHESTRATION LAB</span>
                </>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              {mode === 'gamer' ? 'THE GAMING ARENA' : 'AGENT SWARM & MCP SIMULATOR'}
            </h2>
            <p className="text-sm font-mono-tech text-slate-400">
              {mode === 'gamer'
                ? 'Where sub-140ms tactical reflexes meet 240 FPS rendering physics.'
                : 'Interactive demonstration of LangGraph state machines, MCP tool-calling, and zero-hallucination structured workflows.'}
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              setOpen(false);
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT SWITCH BASED ON MODE */}
        {mode === 'gamer' ? (
          /* GAMER ARENA & REFLEX SANDBOX */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
              {/* Left Column: Interactive Aim Reflex Trainer */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-400">
                    <Target className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>INTERACTIVE REFLEX & AIM TARGET</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono-tech">
                    <span className="text-white font-bold">SCORE: {score}</span>
                    <span className="text-pink-400">STREAK: {streak}x</span>
                  </div>
                </div>

                <div
                  ref={containerRef}
                  className="relative w-full h-64 sm:h-72 rounded-xl bg-[#04060c] border border-pink-500/20 overflow-hidden cursor-crosshair flex items-center justify-center select-none"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff005508_1px,transparent_1px),linear-gradient(to_bottom,#ff005508_1px,transparent_1px)] bg-[size:24px_24px]" />

                  <button
                    onClick={handleTargetClick}
                    className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 p-[2px] shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-110 active:scale-95 transition-transform duration-100 flex items-center justify-center animate-pulse cursor-pointer"
                    style={{
                      left: `${targetPos.x}%`,
                      top: `${targetPos.y}%`,
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-pink-400" />
                    </div>
                  </button>

                  <div className="absolute bottom-3 left-4 text-[10px] font-mono-tech text-slate-500">
                    CLICK THE NEON TARGET TO MEASURE REAL-TIME REACTION TIME
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono-tech">
                  <span className="text-slate-400">LAST REACTION TIME</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {reactionTime ? `${reactionTime} ms` : 'CLICK TARGET TO TEST'}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    {reactionTime && reactionTime < 200 ? '⚡ PRO TIER' : 'ACTIVE'}
                  </span>
                </div>
              </div>

              {/* Right Column: Game Titles */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-tech text-pink-400 uppercase tracking-widest">
                  COMPETITIVE ROSTER & GENRES
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'VALORANT', role: 'Controller / Initiator (Viper, Omen)', badge: 'TACTICAL FPS', color: 'border-pink-500/30 text-pink-300' },
                    { title: 'COUNTER-STRIKE 2', role: 'Entry Fragging & Precision Awping', badge: 'COMPETITIVE FPS', color: 'border-amber-500/30 text-amber-300' },
                    { title: 'ELDEN RING / SOULSBORNE', role: 'No-Summon Challenge Runs, High-Dex', badge: 'ACTION RPG', color: 'border-cyan-500/30 text-cyan-300' },
                    { title: 'CYBERPUNK 2077 & SIMS', role: 'Max Raytracing, High-Speed Navigation', badge: 'IMMERSIVE WORLDS', color: 'border-purple-500/30 text-purple-300' },
                  ].map((g, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl bg-white/[0.02] border ${g.color} space-y-1`}>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-white text-sm">{g.title}</span>
                        <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {g.badge}
                        </span>
                      </div>
                      <p className="text-xs font-mono-tech text-slate-400">{g.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware Loadout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech">
                  <Monitor className="w-4 h-4" />
                  <span>HARDWARE RIG</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  NVIDIA RTX GPU (CUDA Compute & DLSS 3.5), 240Hz Fast-IPS Monitor, Ultralight 8000Hz Polling Mouse, Custom Lubed Mechanical Keyboard.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-pink-400 text-xs font-mono-tech">
                  <Zap className="w-4 h-4" />
                  <span>LATENCY OBSESSION</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  Sub-150ms gaming reflex instincts translate directly into architecting sub-15ms Time-to-First-Token (TTFT) in generative AI backends.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-tech">
                  <Trophy className="w-4 h-4" />
                  <span>THE PHILOSOPHY</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  Tactical communication, fast adaptation under high pressure, and ruthless optimization across both virtual battlegrounds and production AI systems.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* AI AGENT SWARM & MCP SIMULATOR */
          <>
            <div className="space-y-3 relative z-10">
              <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                SELECT AGENTIC ARCHITECTURE PRESET:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioEngine.playClick();
                      setActivePreset(idx);
                      setCurrentStepIndex(0);
                      setIsRunning(false);
                    }}
                    className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                      activePreset === idx
                        ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-display font-bold text-white text-sm mb-1">{p.title}</div>
                    <div className="text-xs font-mono-tech text-slate-400 leading-relaxed">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/20 space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-300">
                  <Terminal className="w-4 h-4" />
                  <span>LIVE LANGGRAPH AGENT STATE MACHINE</span>
                </div>

                <button
                  onClick={handleRunWorkflow}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono-tech tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'EXECUTING DAG...' : 'DISPATCH AGENT SWARM'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {currentPresetData.steps.map((step, idx) => {
                  const isDone = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx && isRunning;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs font-mono-tech ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : isCurrent
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 animate-pulse'
                          : 'bg-white/[0.02] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10 font-bold">
                          [{step.agent}]
                        </span>
                        <span>{step.action}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{step.time}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Zap className="w-4 h-4 text-cyan-400 animate-spin" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/10 relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech">
                  <Bot className="w-4 h-4" />
                  <span>MCP SERVER INTEGRATION</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  Exposing internal APIs and secure file systems to LLM agents via Model Context Protocol for deterministic tool calling.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-mono-tech">
                  <Database className="w-4 h-4" />
                  <span>STRUCTURED SCHEMAS</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  Enforcing Pydantic & JSON response schemas with context reduction to eliminate hallucinations across financial & civic docs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-tech">
                  <Zap className="w-4 h-4" />
                  <span>ENTERPRISE PERFORMANCE</span>
                </div>
                <p className="text-xs font-mono-tech text-slate-300 leading-relaxed">
                  Sub-second retrieval & inference orchestration combining LangGraph state machines with FastAPI async backends.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
