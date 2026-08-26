import { ExternalLink, Code2, Sparkles, Gamepad2 } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

interface ProjectInfo {
  id: string;
  num: string;
  title: string;
  category: string;
  subtitle: string;
  tech: string[];
  github: string;
  demo?: string;
}

export function ProjectsOverlay() {
  const progress = useScrollStore((s) => s.progress);
  const mode = useScrollStore((s) => s.mode);

  // Active between 0.58 and 0.80
  let opacity = 0;
  if (progress >= 0.58 && progress <= 0.80) {
    if (progress < 0.62) {
      opacity = (progress - 0.58) / 0.04;
    } else if (progress > 0.76) {
      opacity = (0.80 - progress) / 0.04;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0.01) return null;

  const engineerProjects: ProjectInfo[] = [
    {
      id: 'p1',
      num: '01',
      title: 'JANSETU AI — CIVIC COMPLAINT PLATFORM',
      category: 'GEMINI 2.5 VISION + FASTAPI + AWS',
      subtitle: 'Citizens upload photos of civic issues; Gemini 2.5 Flash Vision classifies across 55 categories & routes to 20+ government departments in under 30 seconds.',
      tech: ['Gemini 2.5 Flash', 'FastAPI', 'AWS S3 / Rekognition', 'PostgreSQL', 'React'],
      github: 'https://github.com/shashwatkale',
      demo: 'https://github.com/shashwatkale',
    },
    {
      id: 'p2',
      num: '02',
      title: 'AI DOCUMENT INTELLIGENCE ASSISTANT',
      category: 'ENTERPRISE RAG & STRUCTURED EXTRACTION',
      subtitle: 'End-to-end RAG pipeline with document chunking, FAISS vector indexing, semantic retrieval, and structured JSON schemas with zero-hallucination guarantees.',
      tech: ['LangChain', 'FAISS Vector DB', 'Python', 'Streamlit', 'JSON Schema'],
      github: 'https://github.com/shashwatkale',
    },
    {
      id: 'p3',
      num: '03',
      title: 'AI INTERVIEW PREPARATION SYSTEM',
      category: 'MULTI-STAGE LLM EVALUATION ENGINE',
      subtitle: 'Adaptive mock interview system generating role-specific questions and evaluating candidate responses across correctness, clarity, and communication depth.',
      tech: ['LangChain', 'Next.js', 'Python', 'MS SQL Server', 'REST API'],
      github: 'https://github.com/shashwatkale',
      demo: 'https://github.com/shashwatkale',
    },
    {
      id: 'p4',
      num: '04',
      title: 'ENTERPRISE MCP TOOLING & COPILOT AGENTS',
      category: 'MODEL CONTEXT PROTOCOL @ TCS',
      subtitle: 'Configured custom MCP servers exposing internal APIs and file systems to AI agents for automated developer workflows and context-aware tool calling.',
      tech: ['Model Context Protocol', 'LangGraph', 'Next.js', 'GitHub Actions'],
      github: 'https://github.com/shashwatkale',
    },
  ];

  const gamerProjects: ProjectInfo[] = [
    {
      id: 'gp1',
      num: '01',
      title: 'CYBER ARENA 3D GAME ENGINE',
      category: 'PROCEDURAL WEBGL & GLSL RAYMARCHING',
      subtitle: 'Real-time 3D arena simulation featuring custom fragment shaders, volumetric particle physics, and responsive camera collision at 240 FPS.',
      tech: ['Three.js', 'GLSL Shaders', 'Web Audio API', 'TypeScript'],
      github: 'https://github.com/shashwatkale',
      demo: 'https://github.com/shashwatkale',
    },
    {
      id: 'gp2',
      num: '02',
      title: 'NEURAL NPC BEHAVIOR & DIALOG ENGINE',
      category: 'LLM-DRIVEN AUTONOMOUS GAME AGENTS',
      subtitle: 'Autonomous game NPCs powered by local SLMs that form dynamic memory, negotiate with players, and adapt tactics in real-time.',
      tech: ['LangChain', 'FastAPI', 'WebSockets', 'Vector DB'],
      github: 'https://github.com/shashwatkale',
    },
    {
      id: 'gp3',
      num: '03',
      title: 'SUB-1MS MULTIPLAYER STATE PROTOCOL',
      category: 'HIGH-TICK STATE SYNCHRONIZATION',
      subtitle: 'Ultra-low-latency state sync protocol using binary ArrayBuffers and client-side prediction for competitive gameplay.',
      tech: ['Node.js', 'WebSockets', 'Binary Pack', 'TypeScript'],
      github: 'https://github.com/shashwatkale',
      demo: 'https://github.com/shashwatkale',
    },
    {
      id: 'gp4',
      num: '04',
      title: 'SPATIAL AIM & REFLEX TELEMETRY',
      category: 'COMPUTER VISION HUD TRACKER',
      subtitle: 'Edge vision model analyzing crosshair flick trajectory, reaction latency, and angular velocity in tactical FPS matches.',
      tech: ['PyTorch', 'OpenCV', 'CUDA', 'Python'],
      github: 'https://github.com/shashwatkale',
    },
  ];

  const activeProjectsList = mode === 'gamer' ? gamerProjects : engineerProjects;
  const subProg = (progress - 0.58) / 0.22;
  const activeProjIdx = Math.min(3, Math.floor(subProg * 4));
  const activeProject = activeProjectsList[activeProjIdx];

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center p-6 sm:p-12 md:p-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          {mode === 'gamer' ? (
            <Gamepad2 className="w-4 h-4 text-pink-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400" />
          )}
          <span
            className={`text-xs font-mono-tech tracking-widest uppercase ${
              mode === 'gamer' ? 'text-pink-400' : 'text-amber-400'
            }`}
          >
            {mode === 'gamer' ? '04 // 3D GRAPHICS & GAMING EXPERIMENTS' : '04 // FEATURED PRODUCTION PROJECTS'}
          </span>
        </div>

        {/* Active Project Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border pointer-events-auto transition-all duration-300 ${
            mode === 'gamer'
              ? 'bg-[#12071a]/90 border-pink-500/30 shadow-[0_20px_60px_rgba(236,72,153,0.3)]'
              : 'bg-[#070b16]/90 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-xs font-mono-tech font-bold tracking-wider ${
                mode === 'gamer' ? 'text-pink-400' : 'text-cyan-400'
              }`}
            >
              PROJECT {activeProject.num} / 04 • {activeProject.category}
            </span>
            <div className="flex gap-2">
              {activeProjectsList.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === activeProjIdx
                      ? mode === 'gamer'
                        ? 'bg-pink-400'
                        : 'bg-cyan-400'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-2">
            {activeProject.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
            {activeProject.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeProject.tech.map((t, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-mono-tech border ${
                  mode === 'gamer'
                    ? 'bg-pink-500/10 border-pink-500/30 text-pink-300'
                    : 'bg-white/[0.04] border-white/10 text-cyan-300'
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <a
              href={activeProject.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => audioEngine.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech tracking-wider transition-all"
            >
              <Code2 className="w-3.5 h-3.5" /> GITHUB REPO
            </a>
            {activeProject.demo && (
              <a
                href={activeProject.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => audioEngine.playClick()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs font-mono-tech tracking-wider transition-all shadow-lg ${
                  mode === 'gamer'
                    ? 'bg-pink-500 hover:bg-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" /> LIVE REPO / DEMO
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
