import type { Camera } from 'three';
import { useCameraStore } from '../store/useCameraStore';
import { useCallback } from 'react';

export function useCameraControls() {
  const { position } = useCameraStore();

  // Function to update camera position
  const updateCameraPosition = useCallback((camera: Camera) => {
    const { x, y, z } = camera.position;
    const roundedPos: [number, number, number] = [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
      Math.round(z * 100) / 100
    ];
    useCameraStore.getState().setPosition(roundedPos);
  }, []); // Empty deps array since we're using getState() from Zustand

  return {
    position,
    updateCameraPosition,
  };
}
