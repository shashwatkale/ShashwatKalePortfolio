import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function AICore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  // Satellite node coordinates
  const satellitePositions = useMemo(() => {
    const coords: [number, number, number][] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.2;
      coords.push([
        Math.cos(angle) * radius,
        (i % 2 === 0 ? 1 : -1) * 0.8,
        Math.sin(angle) * radius,
      ]);
    }
    return coords;
  }, []);

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    // 1. Idle + Scroll-accelerated rotation
    const baseSpeed = 0.5 + progress * 2.5;

    if (coreRef.current && wireframeCoreRef.current) {
      coreRef.current.rotation.x = time * 0.4 * baseSpeed;
      coreRef.current.rotation.y = time * 0.6 * baseSpeed;
      wireframeCoreRef.current.rotation.x = -time * 0.3 * baseSpeed;
      wireframeCoreRef.current.rotation.y = -time * 0.5 * baseSpeed;

      // Core pulse
      const pulse = 1 + Math.sin(time * 3) * 0.05 + progress * 0.3;
      coreRef.current.scale.setScalar(pulse);
      wireframeCoreRef.current.scale.setScalar(pulse * 1.18);
    }

    // 2. Gyroscopic Rings Rotation
    if (ring1Ref.current && ring2Ref.current && ring3Ref.current) {
      ring1Ref.current.rotation.x = time * 0.6 * baseSpeed;
      ring1Ref.current.rotation.y = time * 0.3 * baseSpeed;

      ring2Ref.current.rotation.y = time * 0.5 * baseSpeed;
      ring2Ref.current.rotation.z = time * 0.4 * baseSpeed;

      ring3Ref.current.rotation.z = time * 0.7 * baseSpeed;
      ring3Ref.current.rotation.x = time * 0.2 * baseSpeed;

      // Exploded View Expansion as scroll increases (0.00 to 0.35)
      const explode = Math.min(1, Math.max(0, (progress - 0.05) * 3.5));
      ring1Ref.current.scale.setScalar(1 + explode * 0.8);
      ring2Ref.current.scale.setScalar(1 + explode * 1.2);
      ring3Ref.current.scale.setScalar(1 + explode * 1.6);
    }

    // 3. Orbiting satellites expand outward into neural net
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = time * 0.3 * baseSpeed;
      const satExpand = Math.min(1, Math.max(0, (progress - 0.1) * 3.0));
      satellitesRef.current.scale.setScalar(1 + satExpand * 1.5);
    }

    // Fade out AI core when flying deep into subsequent worlds (after progress 0.40)
    if (groupRef.current) {
      if (progress > 0.45 && progress < 0.88) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Inner Glowing Multifaceted Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color={0x00f0ff}
          emissive={0x0088cc}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Holographic Wireframe Shell */}
      <mesh ref={wireframeCoreRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshStandardMaterial
          color={0x38bdf8}
          emissive={0x0284c7}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Gyroscopic Titanium Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.04, 16, 80]} />
        <meshStandardMaterial color={0x00f0ff} metalness={0.95} roughness={0.15} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.6, 0.035, 16, 80]} />
        <meshStandardMaterial color={0xa855f7} metalness={0.95} roughness={0.15} />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.0, 0.03, 16, 80]} />
        <meshStandardMaterial color={0x38bdf8} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={satellitesRef}>
        {satellitePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? 0x00f0ff : 0xa855f7}
              emissive={idx % 2 === 0 ? 0x005577 : 0x440066}
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
