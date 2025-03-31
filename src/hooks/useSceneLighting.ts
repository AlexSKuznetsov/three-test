import { useMemo } from 'react';

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
  // Static lighting configuration
  const config = useMemo<LightingConfig>(() => ({
    ambient: {
      intensity: 0.5,
    },
    directional: {
      position: [10, 10, 5],
      intensity: 1,
      castShadow: true,
    },
  }), []);

  return config;
}
