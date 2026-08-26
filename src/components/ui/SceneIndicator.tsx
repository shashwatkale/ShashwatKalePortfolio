import { useScrollStore } from '../../stores/scrollStore';

export function SceneIndicator() {
  const activeScene = useScrollStore((s) => s.activeScene);
  const sceneName = useScrollStore((s) => s.sceneName);
  const progress = useScrollStore((s) => s.progress);

  const formattedIndex = `0${activeScene + 1}`.slice(-2);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-6 sm:p-10 flex flex-col justify-end">
      <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold tracking-wider">{formattedIndex} / 06</span>
          <span className="text-slate-600">•</span>
          <span className="tracking-widest uppercase text-slate-300">{sceneName}</span>
        </div>

        <div className="hidden sm:block text-slate-500">
          {(progress * 100).toFixed(0)}% SYNCHRONIZED
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(2, progress * 100))}%` }}
        />
      </div>
    </div>
  );
}
