import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function Lighting() {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const { progress, mode } = useScrollStore.getState();

    if (keyLightRef.current && fillLightRef.current && rimLightRef.current) {
      if (mode === 'gamer') {
        // High-energy Cyberpunk Gamer Lighting Scheme
        keyLightRef.current.color.setHex(0xff0055);
        keyLightRef.current.intensity = 5.5;
        fillLightRef.current.color.setHex(0x8b5cf6);
        fillLightRef.current.intensity = 4.5;
        rimLightRef.current.color.setHex(0x00ff66);
        rimLightRef.current.intensity = 4.0;
        return;
      }

      // Refined Generative AI Engineering Lighting Scheme
      if (progress < 0.2) {
        keyLightRef.current.color.setHex(0x00f0ff);
        keyLightRef.current.intensity = 2.5 + progress * 2;
        fillLightRef.current.color.setHex(0x3b82f6);
        rimLightRef.current.color.setHex(0x9333ea);
      } else if (progress < 0.4) {
        keyLightRef.current.color.setHex(0xa855f7);
        keyLightRef.current.intensity = 3.5;
        fillLightRef.current.color.setHex(0x00f0ff);
        rimLightRef.current.color.setHex(0xec4899);
      } else if (progress < 0.6) {
        keyLightRef.current.color.setHex(0x10b981);
        keyLightRef.current.intensity = 4.0;
        fillLightRef.current.color.setHex(0x06b6d4);
        rimLightRef.current.color.setHex(0x3b82f6);
      } else if (progress < 0.8) {
        keyLightRef.current.color.setHex(0xf59e0b);
        keyLightRef.current.intensity = 4.2;
        fillLightRef.current.color.setHex(0xff007a);
        rimLightRef.current.color.setHex(0x8b5cf6);
      } else {
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
