import { useScrollStore } from '../../stores/scrollStore';

export function EngineeringOverlay() {
  const progress = useScrollStore((s) => s.progress);

  // Active between 0.38 and 0.60
  let opacity = 0;
  if (progress >= 0.38 && progress <= 0.60) {
    if (progress < 0.44) {
      opacity = (progress - 0.38) / 0.06;
    } else if (progress > 0.54) {
      opacity = (0.60 - progress) / 0.06;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center items-end text-right p-6 sm:p-12 md:p-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-3xl space-y-6">
        <div className="text-xs font-mono-tech text-emerald-400 tracking-widest uppercase">
          03 // FULL-STACK & CLOUD SYSTEMS
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-[0.9]">
          BUILDING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            SYSTEMS
          </span> <br />
          THAT THINK.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl ml-auto font-light leading-relaxed">
          Bridging cutting-edge LLMs with high-throughput backends (<span className="text-white font-medium">FastAPI, Next.js, ASP.NET Core, C#</span>), scalable databases (<span className="text-white font-medium">PostgreSQL, MS SQL, FAISS</span>), and cloud architectures (<span className="text-white font-medium">AWS & GCP</span>).
        </p>

        {/* 7 Industry Certifications Showcase */}
        <div className="space-y-2 pt-2 max-w-xl ml-auto">
          <div className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest">
            VERIFIED INDUSTRY CERTIFICATIONS
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {[
              'AWS CERTIFIED ML ENGINEER',
              'AWS AI PRACTITIONER',
              'DATABRICKS GENAI ENGINEER',
              'CLAUDE CERTIFIED (CCDV-F)',
              'AZURE AI FUNDAMENTALS',
              'AZURE FUNDAMENTALS',
            ].map((cert, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono-tech text-emerald-300 backdrop-blur-md"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
