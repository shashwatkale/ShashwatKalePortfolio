import { CameraRig } from './three/CameraRig';
import { Lighting } from './three/Lighting';
import { Particles } from './three/Particles';
import { AICore } from './three/AICore';
import { NeuralNetwork } from './three/NeuralNetwork';
import { ProjectsWorld } from './three/ProjectsWorld';
import { GamingWorld } from './three/GamingWorld';

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
      <ProjectsWorld />
      <GamingWorld />
    </>
  );
}
