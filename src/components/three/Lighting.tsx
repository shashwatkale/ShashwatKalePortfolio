import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function Lighting() {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const progress = useScrollStore.getState().progress;

    if (keyLightRef.current && fillLightRef.current && rimLightRef.current) {
      // Dynamic lighting intensity & color transitions across scroll stages
      if (progress < 0.2) {
        // Stage 0: Deep void awakening
        keyLightRef.current.color.setHex(0x00f0ff);
        keyLightRef.current.intensity = 2.5 + progress * 2;
        fillLightRef.current.color.setHex(0x3b82f6);
        rimLightRef.current.color.setHex(0x9333ea);
      } else if (progress < 0.4) {
        // Stage 1: Neural Network activation (Cyan + Purple)
        keyLightRef.current.color.setHex(0xa855f7);
        keyLightRef.current.intensity = 3.5;
        fillLightRef.current.color.setHex(0x00f0ff);
        rimLightRef.current.color.setHex(0xec4899);
      } else if (progress < 0.6) {
        // Stage 2: Code & Systems (Emerald + Ice Cyan)
        keyLightRef.current.color.setHex(0x10b981);
        keyLightRef.current.intensity = 4.0;
        fillLightRef.current.color.setHex(0x06b6d4);
        rimLightRef.current.color.setHex(0x3b82f6);
      } else if (progress < 0.8) {
        // Stage 3: Projects (Solar Gold + Magenta)
        keyLightRef.current.color.setHex(0xf59e0b);
        keyLightRef.current.intensity = 4.2;
        fillLightRef.current.color.setHex(0xff007a);
        rimLightRef.current.color.setHex(0x8b5cf6);
      } else {
        // Stage 4-5: Gaming & Convergence (High-energy Prismatic)
        keyLightRef.current.color.setHex(0x00f0ff);
        keyLightRef.current.intensity = 5.0;
        fillLightRef.current.color.setHex(0xff0055);
        rimLightRef.current.color.setHex(0x38bdf8);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={keyLightRef} position={[8, 8, 12]} distance={40} decay={2} />
      <pointLight ref={fillLightRef} position={[-8, -6, 6]} distance={35} decay={2} />
      <pointLight ref={rimLightRef} position={[0, 10, -10]} distance={40} decay={2} />
      <directionalLight position={[0, 15, 5]} intensity={0.8} />
    </>
  );
}
