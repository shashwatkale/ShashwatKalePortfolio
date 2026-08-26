import { Volume2, VolumeX, Radio, Sparkles, Bot } from 'lucide-react';
import { useScrollStore } from '../../stores/scrollStore';
import { audioEngine } from '../../utils/audioEngine';

export function Navigation() {
  const isPlayingAudio = useScrollStore((s) => s.isPlayingAudio);
  const isMuted = useScrollStore((s) => s.isMuted);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-auto">
      {/* Brand & Name Monogram */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400 animate-pulse" />
        </div>
        <div>
          <span className="font-display font-black text-lg sm:text-xl text-white tracking-wider block leading-tight">
            SHASHWAT KALE
          </span>
          <span className="text-[10px] font-mono-tech text-cyan-400 tracking-widest uppercase">
            GENAI ENGINEER @ TCS
          </span>
        </div>
      </div>

      {/* Right HUD Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Agent Swarm Simulator Trigger */}
        <button
          onClick={() => {
            audioEngine.playClick();
            toggleAgentModal();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">AGENT SWARM LAB</span>
        </button>

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

        <a
          href="https://www.linkedin.com/in/shashwatkale27/"
          target="_blank"
          rel="noreferrer"
          onClick={() => audioEngine.playClick()}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-tech text-slate-300 hover:text-cyan-400 transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          <span>LINKEDIN</span>
        </a>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono-tech text-white cursor-pointer transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
        >
          <Radio className={`w-3.5 h-3.5 text-cyan-400 ${isPlayingAudio ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
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
