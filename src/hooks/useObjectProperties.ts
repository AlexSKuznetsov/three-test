import { useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Hook for accessing and modifying selected object properties
 * Uses Zustand store directly without local state
 */
export const useObjectProperties = () => {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const selectedObjectData = useEditorStore((state) => {
    const id = state.selectedObjectId;
    return id ? state.objects.find(obj => obj.id === id) : null;
  });
  const updateObject = useEditorStore((state) => state.updateObject);

  // Calculate derived values directly from store
  const position = selectedObject 
    ? [selectedObject.position.x, selectedObject.position.y, selectedObject.position.z] as [number, number, number]
    : [0, 0, 0];

  const dimensions = selectedObjectData?.dimensions || [1, 1, 1];

  const rotation = selectedObject 
    ? [
        (selectedObject.rotation.x * 180) / Math.PI,
        (selectedObject.rotation.y * 180) / Math.PI,
        (selectedObject.rotation.z * 180) / Math.PI
      ] as [number, number, number]
    : [0, 0, 0];

  const handlePositionChange = useCallback((newPosition: [number, number, number]) => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, { position: newPosition });
    }
  }, [selectedObjectId, updateObject]);

  const handleDimensionsChange = useCallback((newDimensions: [number, number, number]) => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, { dimensions: newDimensions });
    }
  }, [selectedObjectId, updateObject]);

  const handleRotationChange = useCallback((newRotation: [number, number, number]) => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, {
        rotation: newRotation.map(deg => (deg * Math.PI) / 180) as [number, number, number]
      });
    }
  }, [selectedObjectId, updateObject]);

  return {
    selectedObject,
    selectedObjectData,
    position,
    dimensions,
    rotation,
    setPosition: handlePositionChange,
    setDimensions: handleDimensionsChange,
    setRotation: handleRotationChange
  };
};
