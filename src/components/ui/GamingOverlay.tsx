import { Gamepad2, Trophy, Zap, Sparkles } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function GamingOverlay() {
  const progress = useScrollStore((s) => s.progress);
  const toggleGamingModal = useScrollStore((s) => s.toggleGamingModal);

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
        <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-400 tracking-widest uppercase">
          <Gamepad2 className="w-4 h-4" />
          05 // GAMING ENVIRONMENT
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-[0.9]">
          I DON'T JUST <br />
          BUILD WORLDS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400">
            I PLAY IN THEM.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-lg font-light leading-relaxed">
          Competitive gaming instincts fuel my approach to low-latency architectures, real-time physics engines, and high-performance system design.
        </p>

        {/* Gaming Specs & Trigger Button */}
        <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              toggleGamingModal();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs font-mono-tech tracking-wider transition-all shadow-[0_0_25px_rgba(236,72,153,0.5)] cursor-pointer transform hover:scale-105"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>ENTER GAMING ARENA & REFLEX LAB</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
          <div className="p-3.5 rounded-2xl bg-[#0b0714]/80 border border-pink-500/20 backdrop-blur-md flex items-center gap-3">
            <Zap className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <div className="text-[9px] font-mono-tech text-slate-400 uppercase">RESPONSE</div>
              <div className="text-sm font-mono-tech font-bold text-white">&lt; 140 MS</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0b0714]/80 border border-pink-500/20 backdrop-blur-md flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-[9px] font-mono-tech text-slate-400 uppercase">DISCIPLINE</div>
              <div className="text-sm font-mono-tech font-bold text-white">COMPETITIVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
