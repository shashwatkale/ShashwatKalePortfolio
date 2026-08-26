import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function VectorSpaceWorld() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 180;

  // Generate clustered 3D vector embeddings
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const clusterCenters = [
      [-3, 1.5, 0],
      [3, -1.2, 1],
      [0, 2.5, -2],
      [-2, -2, -1],
    ];

    const clusterColors = [
      [0, 240 / 255, 255 / 255], // Cyan
      [168 / 255, 85 / 255, 247 / 255], // Purple
      [16 / 255, 185 / 255, 129 / 255], // Emerald
      [245 / 255, 158 / 255, 11 / 255], // Amber
    ];

    for (let i = 0; i < count; i++) {
      const cIdx = i % clusterCenters.length;
      const center = clusterCenters[cIdx];
      const i3 = i * 3;

      pos[i3] = center[0] + (Math.random() - 0.5) * 3.2;
      pos[i3 + 1] = center[1] + (Math.random() - 0.5) * 2.8;
      pos[i3 + 2] = center[2] + (Math.random() - 0.5) * 2.8;

      col[i3] = clusterColors[cIdx][0];
      col[i3 + 1] = clusterColors[cIdx][1];
      col[i3 + 2] = clusterColors[cIdx][2];
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (progress > 0.35 && progress < 0.68) {
        groupRef.current.visible = true;
        groupRef.current.rotation.y = time * 0.15;
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -48]}>
      {/* 3D Semantic Vector Point Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Vector Query Search Reticle */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[2.5, 2.55, 48]} />
        <meshStandardMaterial
          color={0x00f0ff}
          emissive={0x00f0ff}
          emissiveIntensity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
