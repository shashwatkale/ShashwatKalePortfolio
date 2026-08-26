import { useState, useEffect } from 'react';
import { Terminal, Zap, Activity, Cpu } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function TelemetryHUD() {
  const toggleTerminal = useScrollStore((s) => s.toggleTerminal);
  const isOverdriveActive = useScrollStore((s) => s.isOverdriveActive);
  const toggleOverdrive = useScrollStore((s) => s.toggleOverdrive);
  const mode = useScrollStore((s) => s.mode);
  const isPlayingAudio = useScrollStore((s) => s.isPlayingAudio);

  const [fps, setFps] = useState(mode === 'gamer' ? 240 : 144);

  useEffect(() => {
    const baseFps = mode === 'gamer' ? 240 : 144;
    const interval = setInterval(() => {
      setFps(baseFps + Math.floor((Math.random() - 0.5) * 3));
    }, 400);
    return () => clearInterval(interval);
  }, [mode]);

  const handleWarp = () => {
    audioEngine.playWarpSound();
    toggleOverdrive();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto flex items-center gap-3">
      {/* 3D Hyperspace Overdrive / Warp Button */}
      <button
        onClick={handleWarp}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-mono-tech transition-all cursor-pointer transform hover:scale-105 shadow-lg ${
          isOverdriveActive
            ? 'bg-gradient-to-r from-amber-500 to-rose-600 border-amber-300 text-slate-950 font-bold shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse'
            : 'bg-black/60 backdrop-blur-xl border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white'
        }`}
        title="Accelerate 3D camera and stretch particle field into hyperspace"
      >
        <Zap
          className={`w-3.5 h-3.5 ${
            isOverdriveActive ? 'text-slate-950 fill-current animate-bounce' : 'text-amber-400'
          }`}
        />
        <span className="hidden sm:inline">
          {isOverdriveActive ? 'WARP: 10X ACTIVE' : 'OVERDRIVE WARP'}
        </span>
      </button>

      {/* Cyber Developer Terminal Prompt */}
      <button
        onClick={() => {
          audioEngine.playClick();
          toggleTerminal();
        }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono-tech transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.2)] group"
        title="Open Interactive Cyber Developer Console (Hotkey: ~)"
      >
        <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-spin" />
        <span className="hidden sm:inline">TERMINAL [~]</span>
      </button>

      {/* Live Performance HUD Telemetry */}
      <div className="hidden xl:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono-tech text-slate-400">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold">{fps} FPS</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>LATENCY &lt; 14MS</span>
        </div>

        {/* Audio Visualizer Waves if sound is on */}
        {isPlayingAudio && (
          <>
            <span className="text-slate-700">|</span>
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] h-3 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <span className="w-[2px] h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="w-[2px] h-3.5 bg-fuchsia-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-[2px] h-1.5 bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
