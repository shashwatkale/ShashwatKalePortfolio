import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Experience } from './components/Experience';
import { HTMLOverlay } from './components/HTMLOverlay';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useMouseParallax } from './hooks/useMouseParallax';

export function App() {
  useSmoothScroll();
  useMouseParallax();

  return (
    <div className="relative min-h-screen bg-[#030407] text-[#e2e8f0] overflow-x-hidden select-none">
      {/* Fixed Fullscreen 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 22], fov: 45 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, 2]}
        >
          <Experience />
        </Canvas>
      </div>

      {/* Fixed HTML UI & Storyboard Layers */}
      <HTMLOverlay />

      {/* 600vh Virtual Scroll Track to drive the continuous cinematic camera journey */}
      <div id="scroll-container" className="relative z-10 w-full h-[600vh] pointer-events-none" />
    </div>
  );
}

export default App;
