import { create } from 'zustand';

export type PortfolioMode = 'engineer' | 'gamer';

export interface ScrollState {
  progress: number;
  activeScene: number;
  sceneName: string;
  isMuted: boolean;
  isPlayingAudio: boolean;
  mode: PortfolioMode;
  isAgentModalOpen: boolean;
  mouse: { x: number; y: number; targetX: number; targetY: number };
  setProgress: (progress: number) => void;
  setActiveScene: (scene: number, name: string) => void;
  toggleMute: () => void;
  toggleAudio: () => void;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  toggleAgentModal: () => void;
  setAgentModalOpen: (open: boolean) => void;
  setMouse: (x: number, y: number) => void;
}

const ENGINEER_SCENE_NAMES = [
  'SYSTEM INITIALIZING // TENSOR AWAKENING',
  'NEURAL SYNAPSE // ATTENTION HEADS',
  'VECTOR SPACE // RAG ARCHITECTURE',
  'PRODUCTION AI // FEATURED SYSTEMS',
  'AUTONOMOUS AGENTS // LANGGRAPH SWARM',
  'NEXUS CONVERGENCE // COLLABORATE',
];

const GAMER_SCENE_NAMES = [
  'GAMER SYSTEM INITIALIZING // 240 FPS',
  'GRAPHICS ENGINE // RAYTRACING & WORLDS',
  'BATTLESTATION RIG // LATENCY OBSESSION',
  '3D GAME EXPERIMENTS // PROCEDURAL ENGINES',
  'COMPETITIVE ROSTER // REFLEX ARENA',
  'NEXUS CONVERGENCE // BUILD & PLAY',
];

export const useScrollStore = create<ScrollState>((set, get) => ({
  progress: 0,
  activeScene: 0,
  sceneName: ENGINEER_SCENE_NAMES[0],
  isMuted: false,
  isPlayingAudio: false,
  mode: 'engineer',
  isAgentModalOpen: false,
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },

  setProgress: (progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const currentMode = get().mode;
    const names = currentMode === 'gamer' ? GAMER_SCENE_NAMES : ENGINEER_SCENE_NAMES;

    let scene = 0;
    if (clamped >= 0.90) scene = 5;
    else if (clamped >= 0.78) scene = 4;
    else if (clamped >= 0.58) scene = 3;
    else if (clamped >= 0.38) scene = 2;
    else if (clamped >= 0.18) scene = 1;

    set({
      progress: clamped,
      activeScene: scene,
      sceneName: names[scene],
    });
  },

  setActiveScene: (activeScene: number, sceneName: string) =>
    set({ activeScene, sceneName }),

  setMode: (mode: PortfolioMode) => {
    const names = mode === 'gamer' ? GAMER_SCENE_NAMES : ENGINEER_SCENE_NAMES;
    const active = get().activeScene;
    set({ mode, sceneName: names[active] });
  },

  toggleMode: () => {
    const newMode: PortfolioMode = get().mode === 'engineer' ? 'gamer' : 'engineer';
    const names = newMode === 'gamer' ? GAMER_SCENE_NAMES : ENGINEER_SCENE_NAMES;
    const active = get().activeScene;
    set({ mode: newMode, sceneName: names[active] });
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  toggleAudio: () => set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),

  toggleAgentModal: () => set((state) => ({ isAgentModalOpen: !state.isAgentModalOpen })),

  setAgentModalOpen: (open: boolean) => set({ isAgentModalOpen: open }),

  setMouse: (targetX: number, targetY: number) =>
    set((state) => ({
      mouse: { ...state.mouse, targetX, targetY },
    })),
}));
