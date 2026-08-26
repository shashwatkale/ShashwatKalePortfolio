import { create } from 'zustand';

export interface ScrollState {
  progress: number;
  activeScene: number;
  sceneName: string;
  isMuted: boolean;
  isPlayingAudio: boolean;
  isAgentModalOpen: boolean;
  mouse: { x: number; y: number; targetX: number; targetY: number };
  setProgress: (progress: number) => void;
  setActiveScene: (scene: number, name: string) => void;
  toggleMute: () => void;
  toggleAudio: () => void;
  toggleAgentModal: () => void;
  setAgentModalOpen: (open: boolean) => void;
  setMouse: (x: number, y: number) => void;
}

const SCENE_NAMES = [
  'SYSTEM INITIALIZING // TENSOR AWAKENING',
  'NEURAL SYNAPSE // ATTENTION HEADS',
  'VECTOR SPACE // RAG ARCHITECTURE',
  'PRODUCTION AI // FEATURED SYSTEMS',
  'AUTONOMOUS AGENTS // LANGGRAPH SWARM',
  'NEXUS CONVERGENCE // COLLABORATE',
];

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  activeScene: 0,
  sceneName: SCENE_NAMES[0],
  isMuted: false,
  isPlayingAudio: false,
  isAgentModalOpen: false,
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },

  setProgress: (progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    let scene = 0;
    if (clamped >= 0.90) scene = 5;
    else if (clamped >= 0.78) scene = 4;
    else if (clamped >= 0.58) scene = 3;
    else if (clamped >= 0.38) scene = 2;
    else if (clamped >= 0.18) scene = 1;

    set({
      progress: clamped,
      activeScene: scene,
      sceneName: SCENE_NAMES[scene],
    });
  },

  setActiveScene: (activeScene: number, sceneName: string) =>
    set({ activeScene, sceneName }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  toggleAudio: () => set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),

  toggleAgentModal: () => set((state) => ({ isAgentModalOpen: !state.isAgentModalOpen })),

  setAgentModalOpen: (open: boolean) => set({ isAgentModalOpen: open }),

  setMouse: (targetX: number, targetY: number) =>
    set((state) => ({
      mouse: { ...state.mouse, targetX, targetY },
    })),
}));
