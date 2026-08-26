import { CameraRig } from './three/CameraRig';
import { Lighting } from './three/Lighting';
import { Particles } from './three/Particles';
import { AICore } from './three/AICore';
import { NeuralNetwork } from './three/NeuralNetwork';
import { VectorSpaceWorld } from './three/VectorSpaceWorld';
import { ProjectsWorld } from './three/ProjectsWorld';
import { AutonomousAgentsWorld } from './three/AutonomousAgentsWorld';

export function Experience() {
  return (
    <>
      <color attach="background" args={['#030407']} />
      <fogExp2 attach="fog" args={['#030407', 0.025]} />

      <CameraRig />
      <Lighting />
      <Particles />
      <AICore />
      <NeuralNetwork />
      <VectorSpaceWorld />
      <ProjectsWorld />
      <AutonomousAgentsWorld />
    </>
  );
}
