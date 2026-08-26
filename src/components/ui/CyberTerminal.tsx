import { useState, useRef, useEffect } from 'react';
import { Terminal, X, Sparkles, CornerDownLeft } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

export function CyberTerminal() {
  const isOpen = useScrollStore((s) => s.isTerminalOpen);
  const setOpen = useScrollStore((s) => s.setTerminalOpen);
  const mode = useScrollStore((s) => s.mode);
  const setMode = useScrollStore((s) => s.setMode);
  const toggleOverdrive = useScrollStore((s) => s.toggleOverdrive);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', content: 'NEXUS OS [Version 4.2.0-PROD]' },
    { type: 'output', content: 'Type "help" to view available system commands.' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global hotkey `~` to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    audioEngine.playClick();
    const newLogs: LogEntry[] = [...history, { type: 'input', content: `$ ${trimmed}` }];
    const parts = trimmed.toLowerCase().split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          content: `AVAILABLE COMMANDS:
• whoami       - Profile of Shashwat Kale
• skills       - Technical architecture & frameworks
• projects     - Inspect featured production AI & game systems
• certs        - List 7 verified industry certifications
• contact      - Direct email, LinkedIn & GitHub
• gamer        - Morph 3D world into AI Gamer Mode (MSI GF63 / Valorant)
• ai           - Morph 3D world into AI Engineer Mode (TCS / LangGraph)
• warp         - Toggle 3D Hyperspace Overdrive Warp speed
• audio        - Toggle procedural ambient sound engine
• clear        - Clear terminal console
• exit         - Close terminal session`,
        });
        break;

      case 'whoami':
        newLogs.push({
          type: 'success',
          content: `SHASHWAT KALE
• Role: Generative AI Engineer @ Tata Consultancy Services (TCS) Hyderabad
• Education: B.Tech in Artificial Intelligence · G.H. Raisoni College of Engineering, Nagpur
• Rig: MSI GF63 Thin (GTX 1650 Ti Max-Q) · Valorant & Cinematic Story Campaigns`,
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          content: `AI & GENAI: LangGraph, LangChain, MCP Protocol, Gemini 2.5 Flash, Claude API, FastAPI, FAISS, Qdrant, Pydantic, Asyncio
FULL-STACK: Next.js 15, React, ASP.NET Core Web API, C#, EF Core, MS SQL Server, PostgreSQL
CLOUD & DEVOPS: AWS (S3, Rekognition, RDS), GCP Vertex AI, Docker, GitHub Actions CI/CD`,
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          content: `1. JANSETU AI: Civic Complaint AI with Gemini 2.5 Vision + FastAPI + AWS (55 categories, 20+ depts)
2. AI DOC INTELLIGENCE: Enterprise LangChain RAG with FAISS & zero-hallucination JSON extraction
3. AI INTERVIEW PREP: Multi-stage prompt evaluation pipeline in Next.js & MS SQL Server
4. ENTERPRISE MCP TOOLING: Custom Model Context Protocol servers for internal enterprise APIs @ TCS`,
        });
        break;

      case 'certs':
        newLogs.push({
          type: 'success',
          content: `VERIFIED CERTIFICATIONS:
1. AWS Certified Machine Learning Engineer Associate
2. AWS Certified AI Practitioner
3. Databricks Certified Generative AI Engineer Associate
4. Claude Certified Developer – Foundations (CCDV-F) Anthropic
5. Microsoft Certified: Azure AI Fundamentals
6. Microsoft Certified: Azure Fundamentals
7. Databricks Machine Learning Associate`,
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'success',
          content: `EMAIL: shashwat.kale.27@gmail.com
LINKEDIN: linkedin.com/in/shashwatkale27/
GITHUB: github.com/shashwatkale
LOCATION: Hyderabad, India`,
        });
        break;

      case 'gamer':
        setMode('gamer');
        audioEngine.playSceneTransition();
        newLogs.push({
          type: 'success',
          content: '>> 3D ENVIRONMENT MORPHED TO AI GAMER MODE (MSI GF63 / 240 FPS / VALORANT)!',
        });
        break;

      case 'ai':
      case 'engineer':
        setMode('engineer');
        audioEngine.playSceneTransition();
        newLogs.push({
          type: 'success',
          content: '>> 3D ENVIRONMENT MORPHED TO AI ENGINEER MODE (TCS / LANGGRAPH / RAG)!',
        });
        break;

      case 'warp':
      case 'overdrive':
        toggleOverdrive();
        audioEngine.playWarpSound();
        newLogs.push({
          type: 'success',
          content: '>> 3D HYPERSPACE WARP ENGINE ENGAGED!',
        });
        break;

      case 'audio':
        audioEngine.togglePlay();
        newLogs.push({
          type: 'output',
          content: '>> Audio Synthesizer state toggled.',
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        setOpen(false);
        return;

      default:
        newLogs.push({
          type: 'error',
          content: `Command not recognized: "${trimmed}". Type "help" for command list.`,
        });
    }

    setHistory(newLogs);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          audioEngine.playClick();
          setOpen(false);
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Terminal Window */}
      <div className="relative w-full max-w-3xl h-[520px] bg-[#050811]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(0,240,255,0.3)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Titlebar */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400 pl-3">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-bold">nexus@shashwat-kale:~ ({mode.toUpperCase()}_MODE)</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              setOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logs Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2 font-mono-tech text-xs scrollbar-thin">
          {history.map((log, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                log.type === 'input'
                  ? 'text-cyan-300 font-bold'
                  : log.type === 'error'
                  ? 'text-rose-400'
                  : log.type === 'success'
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {log.content}
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Quick Command Suggestion Bar */}
        <div className="py-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[10px] font-mono-tech scrollbar-none">
          <span className="text-slate-500">QUICK:</span>
          {['help', 'whoami', 'skills', 'projects', 'certs', 'contact', 'gamer', 'ai', 'warp'].map(
            (c, idx) => (
              <button
                key={idx}
                onClick={() => handleCommand(c)}
                className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer"
              >
                {c}
              </button>
            )
          )}
        </div>

        {/* Command Input Prompt */}
        <div className="pt-3 border-t border-cyan-500/20 flex items-center gap-3">
          <span className="text-cyan-400 font-mono-tech text-sm font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            placeholder="Type command (e.g. help, skills, certs, gamer, warp)..."
            className="flex-1 bg-transparent text-xs font-mono-tech text-white outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 transition-all cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
