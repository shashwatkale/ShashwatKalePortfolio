import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

interface ProjectMatrix {
  id: string;
  pos: [number, number, number];
  rotation: [number, number, number];
  color: number;
}

export function ProjectsWorld() {
  const groupRef = useRef<THREE.Group>(null);

  const matrices: ProjectMatrix[] = [
    { id: 'p1', pos: [-3.8, 1.2, -58], rotation: [0.2, 0.4, 0], color: 0x00f0ff },
    { id: 'p2', pos: [3.8, -1.0, -68], rotation: [-0.2, -0.4, 0], color: 0xa855f7 },
    { id: 'p3', pos: [-3.5, 0.8, -78], rotation: [0.15, 0.3, 0], color: 0xf59e0b },
    { id: 'p4', pos: [3.5, -0.5, -88], rotation: [-0.15, -0.3, 0], color: 0x10b981 },
  ];

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (progress > 0.50 && progress < 0.90) {
        groupRef.current.visible = true;
        // Subtle floating movement
        groupRef.current.children.forEach((child, idx) => {
          child.position.y += Math.sin(time * 2 + idx) * 0.003;
          child.rotation.y += 0.004;
        });
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {matrices.map((item) => (
        <group key={item.id} position={item.pos} rotation={item.rotation}>
          {/* Glass / Holographic Display Panel */}
          <mesh>
            <boxGeometry args={[4.2, 2.6, 0.12]} />
            <meshPhysicalMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.1}
              transmission={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Glowing Outer Wireframe Trim */}
          <mesh>
            <boxGeometry args={[4.3, 2.7, 0.14]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.6}
              wireframe
            />
          </mesh>

          {/* Corner Quantum Node */}
          <mesh position={[2.1, 1.3, 0.1]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
