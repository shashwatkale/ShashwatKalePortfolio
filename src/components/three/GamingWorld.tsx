import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function GamingWorld() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (progress > 0.72) {
        groupRef.current.visible = true;

        if (ringRef.current) {
          ringRef.current.rotation.z = time * 0.8;
          ringRef.current.rotation.x = time * 0.4;
        }

        if (gridRef.current) {
          gridRef.current.position.z = -105 + (time * 2 % 4);
        }
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -105]}>
      {/* Cybernetic Floating Targeting HUD Ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[4.5, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={0x00f0ff}
          emissive={0x00f0ff}
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Futuristic Cyber Arena GPU Core Geometry */}
      <mesh position={[0, 0, -4]}>
        <dodecahedronGeometry args={[2.4, 0]} />
        <meshStandardMaterial
          color={0xff0055}
          emissive={0xaa0033}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Floating Game HUD Diamond Nodes */}
      {[-3, 3].map((x, idx) => (
        <mesh key={idx} position={[x, 2, -2]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color={0x00f0ff} emissive={0x00aacc} emissiveIntensity={0.9} />
        </mesh>
      ))}

      {/* Cyber Neon Floor Grid */}
      <primitive
        object={new THREE.GridHelper(60, 40, 0x00f0ff, 0x1e293b)}
        position={[0, -4, 0]}
        ref={gridRef}
      />
    </group>
  );
}
