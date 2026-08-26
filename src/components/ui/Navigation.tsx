import { Volume2, VolumeX, Radio, Sparkles, Bot, Gamepad2 } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function Navigation() {
  const isPlayingAudio = useScrollStore((s) => s.isPlayingAudio);
  const isMuted = useScrollStore((s) => s.isMuted);
  const mode = useScrollStore((s) => s.mode);
  const toggleMode = useScrollStore((s) => s.toggleMode);
  const toggleAudio = useScrollStore((s) => s.toggleAudio);
  const toggleMute = useScrollStore((s) => s.toggleMute);
  const toggleAgentModal = useScrollStore((s) => s.toggleAgentModal);

  const handleToggleSound = () => {
    audioEngine.playClick();
    const playing = audioEngine.togglePlay();
    if (playing !== isPlayingAudio) {
      toggleAudio();
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playClick();
    audioEngine.toggleMute();
    toggleMute();
  };

  const handleSwitchMode = () => {
    audioEngine.playSceneTransition();
    toggleMode();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-auto">
      {/* Brand & Name Monogram */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
            mode === 'gamer'
              ? 'bg-pink-500/10 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
              : 'bg-cyan-500/10 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-sm animate-pulse ${
              mode === 'gamer' ? 'bg-pink-400' : 'bg-cyan-400'
            }`}
          />
        </div>
        <div>
          <span className="font-display font-black text-lg sm:text-xl text-white tracking-wider block leading-tight">
            SHASHWAT KALE
          </span>
          <span
            className={`text-[10px] font-mono-tech tracking-widest uppercase transition-colors ${
              mode === 'gamer' ? 'text-pink-400 font-bold' : 'text-cyan-400'
            }`}
          >
            {mode === 'gamer' ? 'GAMER & 3D SYSTEMS ARCHITECT' : 'GENAI ENGINEER @ TCS'}
          </span>
        </div>
      </div>

      {/* Center/Right HUD Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* 🔥 DUAL MODE SWITCHER: AI ENGINEER ⇄ GAMER MODE */}
        <button
          onClick={handleSwitchMode}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono-tech transition-all cursor-pointer transform hover:scale-105 shadow-lg ${
            mode === 'gamer'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-300 text-white font-bold shadow-[0_0_25px_rgba(236,72,153,0.6)]'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-300 text-slate-950 font-bold shadow-[0_0_25px_rgba(0,240,255,0.5)]'
          }`}
        >
          {mode === 'gamer' ? (
            <>
              <Gamepad2 className="w-3.5 h-3.5 animate-bounce" />
              <span>GAMER MODE: ACTIVE</span>
            </>
          ) : (
            <>
              <Bot className="w-3.5 h-3.5 animate-pulse" />
              <span>AI ENGINEER MODE</span>
            </>
          )}
          <span className="text-[10px] opacity-75 hidden sm:inline">(SWITCH)</span>
        </button>

        {/* Agent Swarm Lab button (in AI mode) */}
        {mode === 'engineer' && (
          <button
            onClick={() => {
              audioEngine.playClick();
              toggleAgentModal();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AGENT LAB</span>
          </button>
        )}

        {/* Social Links */}
        <a
          href="https://github.com/shashwatkale"
          target="_blank"
          rel="noreferrer"
          onClick={() => audioEngine.playClick()}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-tech text-slate-300 hover:text-white transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GITHUB</span>
        </a>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border text-xs font-mono-tech text-white cursor-pointer transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group ${
            mode === 'gamer' ? 'border-pink-500/40 hover:border-pink-400' : 'border-cyan-500/30 hover:border-cyan-400'
          }`}
        >
          <Radio
            className={`w-3.5 h-3.5 ${mode === 'gamer' ? 'text-pink-400' : 'text-cyan-400'} ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          />
          <span className="hidden md:inline">
            {isPlayingAudio ? 'AUDIO: ON' : 'SOUND'}
          </span>
          {isPlayingAudio && <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />}

          {isPlayingAudio && (
            <div
              onClick={handleToggleMute}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
