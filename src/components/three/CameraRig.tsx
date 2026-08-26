import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '../../stores/scrollStore';

export function CameraRig() {
  const { camera } = useThree();
  const currentMouse = useRef({ x: 0, y: 0 });
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const { progress, mouse } = useScrollStore.getState();

    // Smooth mouse lerp for subtle parallax
    currentMouse.current.x += (mouse.targetX - currentMouse.current.x) * 0.05;
    currentMouse.current.y += (mouse.targetY - currentMouse.current.y) * 0.05;

    // Master Cinematic Trajectory: Continuous single-shot camera curve
    let targetX = 0;
    let targetY = 0;
    let targetZ = 22;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (progress < 0.20) {
      // 1. System Initializing & AI Core Approach (0.00 -> 0.20)
      const t = progress / 0.20;
      targetX = Math.sin(t * Math.PI * 0.5) * 1.5;
      targetY = Math.cos(t * Math.PI * 0.5) * 0.8;
      targetZ = 22 - t * 14; // 22 -> 8
      lookX = 0;
      lookY = 0;
      lookZ = 0;
    } else if (progress < 0.40) {
      // 2. AI Core Orbit & Neural Net Fly-Through Entry (0.20 -> 0.40)
      const t = (progress - 0.20) / 0.20;
      targetX = Math.sin(t * Math.PI) * 3.5;
      targetY = 0.8 - t * 0.4;
      targetZ = 8 - t * 24; // 8 -> -16
      lookX = 0;
      lookY = 0;
      lookZ = -16 - t * 15;
    } else if (progress < 0.60) {
      // 3. Deep Neural Net & Systems Architecture (0.40 -> 0.60)
      const t = (progress - 0.40) / 0.20;
      targetX = Math.cos(t * Math.PI * 1.5) * 2.8;
      targetY = Math.sin(t * Math.PI) * 1.5;
      targetZ = -16 - t * 36; // -16 -> -52
      lookX = 0;
      lookY = 0;
      lookZ = -52 - t * 15;
    } else if (progress < 0.80) {
      // 4. Projects World Showcase (0.60 -> 0.80)
      const t = (progress - 0.60) / 0.20;
      targetX = (t % 2 === 0 ? -1.8 : 1.8) * Math.sin(t * Math.PI);
      targetY = 0.5 - t * 0.8;
      targetZ = -52 - t * 36; // -52 -> -88
      lookX = targetX * 0.5;
      lookY = 0;
      lookZ = -88 - t * 15;
    } else if (progress < 0.92) {
      // 5. Gaming Cyber Arena (0.80 -> 0.92)
      const t = (progress - 0.80) / 0.12;
      targetX = Math.sin(t * Math.PI * 2) * 2.5;
      targetY = -0.5 + Math.sin(t * Math.PI) * 1.8;
      targetZ = -88 - t * 18; // -88 -> -106
      lookX = 0;
      lookY = -1;
      lookZ = -106;
    } else {
      // 6. Final Nexus: Pulls backward into epic panoramic convergence (0.92 -> 1.00)
      const t = (progress - 0.92) / 0.08;
      targetX = 0;
      targetY = 2 + t * 6; // 2 -> 8
      targetZ = -106 + t * 128; // -106 -> 22 (returns back to full system overview)
      lookX = 0;
      lookY = 0;
      lookZ = 0;
    }

    // Add smooth mouse parallax
    const finalCamX = targetX + currentMouse.current.x * 0.8;
    const finalCamY = targetY + currentMouse.current.y * 0.8;
    const finalCamZ = targetZ;

    // Smoothly interpolate camera position & lookAt
    camera.position.x += (finalCamX - camera.position.x) * 0.08;
    camera.position.y += (finalCamY - camera.position.y) * 0.08;
    camera.position.z += (finalCamZ - camera.position.z) * 0.08;

    lookTarget.current.x += (lookX - lookTarget.current.x) * 0.08;
    lookTarget.current.y += (lookY - lookTarget.current.y) * 0.08;
    lookTarget.current.z += (lookZ - lookTarget.current.z) * 0.08;

    camera.lookAt(lookTarget.current);
  });

  return null;
}
