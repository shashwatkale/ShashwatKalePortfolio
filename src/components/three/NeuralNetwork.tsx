import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useScrollStore } from '../../stores/scrollStore';

interface NodeData {
  pos: [number, number, number];
  layer: number;
  label?: string;
}

export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate 40 3D neural nodes arranged in layers along Z = -12 to -40
  const { nodes, linePositions } = useMemo(() => {
    const nodeData: NodeData[] = [];
    const techLabels = [
      'LangGraph',
      'Model Context Protocol',
      'Gemini 2.5 Flash',
      'Enterprise RAG',
      'FastAPI & Python',
      'Claude API',
      'FAISS Vector DB',
      'Next.js & React',
      'AWS / GCP Vertex AI',
    ];

    const layers = 5;
    const nodesPerLayer = [6, 8, 10, 8, 6];
    let labelIndex = 0;

    for (let l = 0; l < layers; l++) {
      const count = nodesPerLayer[l];
      const zPos = -12 - l * 7; // z = -12, -19, -26, -33, -40

      for (let n = 0; n < count; n++) {
        const angle = (n / count) * Math.PI * 2;
        const radius = 3.2 + (l % 2 === 0 ? 0.6 : -0.4);
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.8;
        const z = zPos + (Math.random() - 0.5) * 1.5;

        const hasLabel = n % 3 === 0 && labelIndex < techLabels.length;
        const label = hasLabel ? techLabels[labelIndex++] : undefined;

        nodeData.push({ pos: [x, y, z], layer: l, label });
      }
    }

    // Connect adjacent layer nodes with line segments
    const lines: number[] = [];
    for (let i = 0; i < nodeData.length; i++) {
      for (let j = i + 1; j < nodeData.length; j++) {
        if (Math.abs(nodeData[i].layer - nodeData[j].layer) === 1) {
          const [x1, y1, z1] = nodeData[i].pos;
          const [x2, y2, z2] = nodeData[j].pos;
          const dist = Math.hypot(x2 - x1, y2 - y1, z2 - z1);

          if (dist < 8.5 && Math.random() > 0.4) {
            lines.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }
    }

    return {
      nodes: nodeData,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle neural pulse & slight axial rotation
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;

      // Visibility control: neural net is active between 0.12 and 0.65
      if (progress > 0.12 && progress < 0.65) {
        groupRef.current.visible = true;
        const fadeIn = Math.min(1, (progress - 0.12) * 8);
        const fadeOut = Math.min(1, (0.65 - progress) * 8);
        const opacity = Math.min(fadeIn, fadeOut);

        if (linesRef.current) {
          (linesRef.current.material as THREE.LineBasicMaterial).opacity = opacity * 0.55;
        }
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Synaptic Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={0x00f0ff}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Neural Synapse Nodes & Floating 3D Labels */}
      {nodes.map((node, idx) => (
        <group key={idx} position={node.pos}>
          {/* Node Sphere */}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={node.label ? 0x00f0ff : 0xa855f7}
              emissive={node.label ? 0x00aacc : 0x7e22ce}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Integrated 3D Tech Label */}
          {node.label && (
            <Html
              center
              distanceFactor={18}
              className="pointer-events-none select-none transition-all duration-300"
            >
              <div className="px-2.5 py-1 rounded-full bg-[#050914]/85 border border-cyan-400/40 text-[11px] font-mono-tech font-bold text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] whitespace-nowrap backdrop-blur-md">
                {node.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
