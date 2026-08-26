import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2800;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 45;
      pos[i3 + 1] = (Math.random() - 0.5) * 35;
      pos[i3 + 2] = 25 - Math.random() * 140;

      sc[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { isOverdriveActive, mode } = useScrollStore.getState();
    const time = state.clock.getElapsedTime();

    const speedMultiplier = isOverdriveActive ? 8.0 : mode === 'gamer' ? 1.8 : 1.0;

    // Organic drift + hyperspace rotation
    pointsRef.current.rotation.y = time * 0.02 * speedMultiplier;
    pointsRef.current.rotation.x = Math.sin(time * 0.03 * speedMultiplier) * 0.05;

    // Material color adjustments based on mode & overdrive
    const material = pointsRef.current.material as THREE.PointsMaterial;
    if (isOverdriveActive) {
      material.color.setHex(0xf59e0b);
      material.size = 0.22;
    } else if (mode === 'gamer') {
      material.color.setHex(0xff0077);
      material.size = 0.14;
    } else {
      material.color.setHex(0x00f0ff);
      material.size = 0.12;
    }
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
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
