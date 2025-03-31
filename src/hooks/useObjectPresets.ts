import { useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';


export type PresetType = 'wall' | 'floor';

interface PresetConfig {
  type: 'box';
  dimensions: [number, number, number];
  position: [number, number, number];
  isStatic?: boolean;
}

const PRESET_CONFIGS: Record<PresetType, PresetConfig> = {
  wall: {
    type: 'box',
    dimensions: [0.1, 2, 2], // very thin, moderately tall and wide
    position: [0, 1, 0], // at eye level
    isStatic: true
  },
  floor: {
    type: 'box',
    dimensions: [4, 0.1, 10], // moderately wide, very thin, deep
    position: [0, -0.05, 0], // just barely submerged
    isStatic: true
  }
};

/**
 * Hook for managing predefined object presets like walls and floors
 */
export const useObjectPresets = () => {
  const addObject = useEditorStore((state) => state.addObject);

  const addPreset = useCallback((preset: PresetType) => {
    const config = PRESET_CONFIGS[preset];
    addObject({
      type: config.type,
      position: config.position,
      dimensions: config.dimensions,
      isStatic: config.isStatic
    });
  }, [addObject]);

  return { addPreset };
};
