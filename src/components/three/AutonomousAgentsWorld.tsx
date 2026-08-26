import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useScrollStore } from '../../stores/scrollStore';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  color: number;
  offset: [number, number, number];
}

export function AutonomousAgentsWorld() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const agents: AgentNode[] = useMemo(
    () => [
      { id: 'a1', name: 'SUPERVISOR', role: 'LangGraph Orchestrator', color: 0x00f0ff, offset: [0, 1.8, 0] },
      { id: 'a2', name: 'RAG AGENT', role: 'Vector Search & Recall', color: 0xa855f7, offset: [-3.2, 0.4, 1.2] },
      { id: 'a3', name: 'TOOL CALLER', role: 'MCP Server Execution', color: 0x10b981, offset: [3.2, 0.4, -1.2] },
      { id: 'a4', name: 'CRITIC', role: 'Self-Correction Loop', color: 0xf59e0b, offset: [-2.2, -1.8, -1.5] },
      { id: 'a5', name: 'SYNTHESIS', role: 'Structured JSON Schema', color: 0xec4899, offset: [2.2, -1.8, 1.5] },
    ],
    []
  );

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (progress > 0.72) {
        groupRef.current.visible = true;

        if (ringRef.current) {
          ringRef.current.rotation.z = time * 0.4;
          ringRef.current.rotation.y = time * 0.2;
        }

        // Floating orbital agent drift
        groupRef.current.children.forEach((child, idx) => {
          if (idx < agents.length) {
            child.position.y += Math.sin(time * 2 + idx) * 0.003;
          }
        });
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -105]}>
      {/* Central LangGraph State Machine Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[4.8, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={0x00f0ff}
          emissive={0x00f0ff}
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Autonomous Agent Nodes & State Badges */}
      {agents.map((agent) => (
        <group key={agent.id} position={agent.offset}>
          {/* Outer Polyhedral Core */}
          <mesh>
            <dodecahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color={agent.color}
              emissive={agent.color}
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.2}
              wireframe
            />
          </mesh>

          {/* Inner Glowing Synapse */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={agent.color}
              emissive={agent.color}
              emissiveIntensity={1.0}
            />
          </mesh>

          {/* 3D Agent HTML Tag */}
          <Html center distanceFactor={20} className="pointer-events-none select-none">
            <div className="px-3 py-1.5 rounded-xl bg-[#060814]/90 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md text-center whitespace-nowrap space-y-0.5">
              <div className="text-[10px] font-mono-tech font-bold text-cyan-300 uppercase tracking-wider">
                {agent.name}
              </div>
              <div className="text-[8px] font-mono-tech text-slate-400">
                {agent.role}
              </div>
            </div>
          </Html>
        </group>
      ))}

      {/* Data Transmission Floor Grid */}
      <primitive
        object={new THREE.GridHelper(50, 30, 0x00f0ff, 0x1e293b)}
        position={[0, -3.5, 0]}
      />
    </group>
  );
}
