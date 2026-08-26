import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2400;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across the entire 3D journey tunnel from z = 30 to z = -120
      pos[i3] = (Math.random() - 0.5) * 45;
      pos[i3 + 1] = (Math.random() - 0.5) * 35;
      pos[i3 + 2] = 25 - Math.random() * 140;

      sc[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle organic drift
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={0x00f0ff}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
