import type { Camera } from 'three';
import { useCameraStore } from '../store/useCameraStore';
import { useCallback } from 'react';

export function useCameraControls() {
  const { position } = useCameraStore();

  // Function to update camera position
  const updateCameraPosition = useCallback((camera: Camera) => {
    const { x, y, z } = camera.position;
    useCameraStore.getState().setPosition([x, y, z]);
  }, []); // Empty deps array since we're using getState() from Zustand

  return {
    position,
    updateCameraPosition,
  };
}
