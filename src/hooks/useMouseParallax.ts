import { useEffect } from 'react';
import { useScrollStore } from '../stores/scrollStore';

export function useMouseParallax() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = (e.clientX / window.innerWidth) * 2 - 1;
      const targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      useScrollStore.getState().setMouse(targetX, targetY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
