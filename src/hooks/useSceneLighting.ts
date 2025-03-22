import { useMemo } from 'react';
import { useControls, folder } from 'leva';

interface LightingConfig {
  ambient: {
    intensity: number;
  };
  directional: {
    position: [number, number, number];
    intensity: number;
    castShadow: boolean;
  };
}

export function useSceneLighting() {
  // Lighting controls with Leva
  const lighting = useControls('Lighting', {
    Ambient: folder({
      ambientIntensity: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Intensity',
      },
    }),
    Directional: folder({
      position: {
        value: [10, 10, 5],
        step: 1,
      },
      directionalIntensity: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Intensity',
      },
      castShadow: true,
    }),
  });

  // Memoize the config to prevent unnecessary re-renders
  const config = useMemo<LightingConfig>(() => ({
    ambient: {
      intensity: lighting.ambientIntensity,
    },
    directional: {
      position: lighting.position as [number, number, number],
      intensity: lighting.directionalIntensity,
      castShadow: lighting.castShadow,
    },
  }), [lighting]);

  return config;
}
