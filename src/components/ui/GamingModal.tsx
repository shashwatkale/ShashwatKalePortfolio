import { useState, useEffect, useRef } from 'react';
import { X, Gamepad2, Trophy, Target, Zap, Monitor } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function GamingModal() {
  const isOpen = useScrollStore((s) => s.isGamingModalOpen);
  const setOpen = useScrollStore((s) => s.setGamingModalOpen);

  // Interactive Reflex Aim Minigame State
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState<number>(Date.now());
  const [streak, setStreak] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playClick();
    const now = Date.now();
    const rt = now - lastSpawnTime;
    setReactionTime(rt);
    setScore((s) => s + 100);
    setStreak((st) => st + 1);

    // Spawn next target at new random coordinates
    setTargetPos({
      x: Math.floor(Math.random() * 75 + 10),
      y: Math.floor(Math.random() * 65 + 15),
    });
    setLastSpawnTime(Date.now());
  };

  if (!isOpen) return null;

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
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#070914]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(236,72,153,0.25)] overflow-y-auto z-10 animate-in zoom-in-95 duration-300 space-y-8">
        
        {/* Glow ambient patches */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-400 uppercase tracking-widest">
              <Gamepad2 className="w-4 h-4" />
              <span>SHASHWAT KALE // GAMER PROFILE & BATTLESTATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              THE GAMING ARENA
            </h2>
            <p className="text-sm font-mono-tech text-slate-400">
              Where high-precision reflexes meet low-latency AI engineering.
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

        {/* Main Grid: Reflex Aim Trainer & Disciplines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Left Column: Interactive 3D Reflex Trainer */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
                <Target className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                <span>INTERACTIVE REFLEX & AIM TARGET</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono-tech">
                <span className="text-white font-bold">SCORE: {score}</span>
                <span className="text-pink-400">STREAK: {streak}x</span>
              </div>
            </div>

            {/* Target Sandbox Area */}
            <div
              ref={containerRef}
              className="relative w-full h-64 sm:h-72 rounded-xl bg-[#04060c] border border-cyan-500/20 overflow-hidden cursor-crosshair flex items-center justify-center select-none"
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Clickable Target Node */}
              <button
                onClick={handleTargetClick}
                className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 p-[2px] shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-110 active:scale-95 transition-transform duration-100 flex items-center justify-center animate-pulse cursor-pointer"
                style={{
                  left: `${targetPos.x}%`,
                  top: `${targetPos.y}%`,
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-400" />
                </div>
              </button>

              {/* Prompt Text */}
              <div className="absolute bottom-3 left-4 text-[10px] font-mono-tech text-slate-500">
                CLICK THE NEON TARGET TO MEASURE REAL-TIME REACTION TIME
              </div>
            </div>

            {/* Reaction Speed Metric */}
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

          {/* Right Column: Game Titles & Ranks */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono-tech text-pink-400 uppercase tracking-widest">
              COMPETITIVE ROSTER & GENRES
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'VALORANT',
                  role: 'Controller / Initiator (Viper, Omen)',
                  badge: 'TACTICAL FPS',
                  color: 'border-pink-500/30 text-pink-300',
                },
                {
                  title: 'COUNTER-STRIKE 2',
                  role: 'Entry Fragging & Precision Awping',
                  badge: 'COMPETITIVE FPS',
                  color: 'border-amber-500/30 text-amber-300',
                },
                {
                  title: 'ELDEN RING / SOULSBORNE',
                  role: 'No-Summon Challenge Runs, High-Dex Builds',
                  badge: 'ACTION RPG',
                  color: 'border-cyan-500/30 text-cyan-300',
                },
                {
                  title: 'CYBERPUNK 2077 & SIMS',
                  role: 'Max Raytracing, High-Speed Navigation',
                  badge: 'IMMERSIVE WORLDS',
                  color: 'border-purple-500/30 text-purple-300',
                },
              ].map((g, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl bg-white/[0.02] border ${g.color} space-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-white text-sm">
                      {g.title}
                    </span>
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

        {/* Battlestation & Engineering Synergy Grid */}
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

      </div>
    </div>
  );
}

