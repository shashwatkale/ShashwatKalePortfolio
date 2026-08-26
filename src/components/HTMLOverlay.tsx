import { Navigation } from './ui/Navigation';
import { SceneIndicator } from './ui/SceneIndicator';
import { HeroOverlay } from './ui/HeroOverlay';
import { IntelligenceOverlay } from './ui/IntelligenceOverlay';
import { EngineeringOverlay } from './ui/EngineeringOverlay';
import { ProjectsOverlay } from './ui/ProjectsOverlay';
import { GamingOverlay } from './ui/GamingOverlay';
import { FinalOverlay } from './ui/FinalOverlay';
import { GamingModal } from './ui/GamingModal';
import { NoiseOverlay } from './ui/NoiseOverlay';

export function HTMLOverlay() {
  return (
    <div className="relative z-20 pointer-events-none w-full h-full">
      <NoiseOverlay />
      <Navigation />
      <SceneIndicator />

      {/* Cinematic Scene Overlays synchronized to scroll */}
      <HeroOverlay />
      <IntelligenceOverlay />
      <EngineeringOverlay />
      <ProjectsOverlay />
      <GamingOverlay />
      <FinalOverlay />

      {/* Dedicated Interactive Gaming Arena Hub Modal */}
      <GamingModal />
    </div>
  );
}
