import { useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';

export const useObjectProperties = () => {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const selectedObjectData = useEditorStore((state) => {
    const id = state.selectedObjectId;
    return id ? state.objects.find(obj => obj.id === id) : null;
  });
  const updateObject = useEditorStore((state) => state.updateObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);

  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [dimensions, setDimensions] = useState<[number, number, number]>([1, 1, 1]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Sync local state with store
  useEffect(() => {
    if (selectedObject && selectedObjectData) {
      const pos = selectedObject.position;
      setPosition([pos.x, pos.y, pos.z]);

      const rot = selectedObject.rotation;
      setRotation([
        (rot.x * 180) / Math.PI,
        (rot.y * 180) / Math.PI,
        (rot.z * 180) / Math.PI
      ]);

      setDimensions(selectedObjectData.dimensions);
    }
  }, [selectedObject, selectedObjectData]);

  // Sync rotation from object to local state
  useEffect(() => {
    if (selectedObject) {
      const rot = selectedObject.rotation;
      setRotation([
        (rot.x * 180) / Math.PI,
        (rot.y * 180) / Math.PI,
        (rot.z * 180) / Math.PI
      ]);
    }
  }, [selectedObject?.rotation.x, selectedObject?.rotation.y, selectedObject?.rotation.z]);

  // Update store when local state changes
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
    setPosition,
    setDimensions,
    setRotation: (newRotation: [number, number, number]) => {
      setRotation(newRotation);
      handleRotationChange(newRotation);
    },
  };
};
