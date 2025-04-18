import { FC, useCallback, useEffect } from 'react';
import { TransformControls } from '@react-three/drei';
import { Vector3, Quaternion, Euler } from 'three';
import { useEditorStore } from '../store/useEditorStore';
import { RigidBodyObject } from './RigidBodyObject';

export const SceneObjects: FC = () => {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const transformMode = useEditorStore((state) => state.transformMode);
  const objects = useEditorStore((state) => state.objects);
  const updateObject = useEditorStore((state) => state.updateObject);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);

  // Handle transform changes
  const handleTransformChange = useCallback(() => {
    if (selectedObject && selectedObjectId) {
      // Use world-space transform values
      const worldPos = new Vector3();
      selectedObject.getWorldPosition(worldPos);
      const worldQuat = new Quaternion();
      selectedObject.getWorldQuaternion(worldQuat);
      const worldEuler = new Euler().setFromQuaternion(worldQuat);

      if (transformMode === 'translate') {
        updateObject(selectedObjectId, {
          position: [worldPos.x, worldPos.y, worldPos.z]
        });
      } else if (transformMode === 'rotate') {
        updateObject(selectedObjectId, {
          rotation: [worldEuler.x, worldEuler.y, worldEuler.z]
        });
      } else if (transformMode === 'scale') {
        // Update dimensions based on world scale
        const worldScale = new Vector3();
        selectedObject.getWorldScale(worldScale);
        updateObject(selectedObjectId, {
          dimensions: [worldScale.x, worldScale.y, worldScale.z]
        });
      }
    }
  }, [selectedObject, selectedObjectId, updateObject, transformMode]);

  // Reset transform controls when selection changes
  useEffect(() => {
    if (!selectedObject) {
      // Small delay to ensure clean transition
      const timeout = setTimeout(() => {
        setSelectedObject(null, null);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [selectedObject, setSelectedObject]);

  return (
    <>
      {objects.map(({ id, position, rotation, type, dimensions, isVisible, opacity }) => (
        <RigidBodyObject
          key={id}
          id={id}
          position={position}
          rotation={rotation}
          type={type}
          dimensions={dimensions}
          isVisible={isVisible !== false}
          opacity={opacity ?? 1}
        />
      ))}
      
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          size={0.8}
          space="world"
          onObjectChange={handleTransformChange}
          // Only update on mouse up to avoid jitter
          onChange={() => {}}
        />
      )}
    </>
  );
};
