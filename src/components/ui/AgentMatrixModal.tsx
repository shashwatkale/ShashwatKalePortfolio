import { useState, useEffect } from 'react';
import { X, Bot, Play, CheckCircle2, ArrowRight, Zap, Database, Terminal } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

interface AgentStep {
  agent: string;
  action: string;
  status: 'pending' | 'running' | 'completed';
  time: string;
}

export function AgentMatrixModal() {
  const isOpen = useScrollStore((s) => s.isAgentModalOpen);
  const setOpen = useScrollStore((s) => s.setAgentModalOpen);

  const [isRunning, setIsRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#070914]/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-y-auto z-10 animate-in zoom-in-95 duration-300 space-y-8">
        
        {/* Ambient glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400 uppercase tracking-widest">
              <Bot className="w-4 h-4" />
              <span>SHASHWAT KALE // AUTONOMOUS AGENT ORCHESTRATION LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              AGENT SWARM & MCP SIMULATOR
            </h2>
            <p className="text-sm font-mono-tech text-slate-400">
              Interactive demonstration of LangGraph state machines, MCP tool-calling, and zero-hallucination structured workflows.
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

        {/* Workflow Presets */}
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

        {/* Execution Visualizer Sandbox */}
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

          {/* Steps Sequence */}
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

        {/* Technical Architecture Highlights */}
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

      </div>
    </div>
  );
}
