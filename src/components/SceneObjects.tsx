import { FC, useCallback, useEffect } from 'react';
import { TransformControls } from '@react-three/drei';
import { useEditorStore } from '../store/useEditorStore';
import { RigidBodyObject } from './RigidBodyObject';

export const SceneObjects: FC = () => {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const transformMode = useEditorStore((state) => state.transformMode);
  const objects = useEditorStore((state) => state.objects);
  const updateObject = useEditorStore((state) => state.updateObject);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);

  // Debounce transform changes to avoid overwhelming updates
  const handleTransformChange = useCallback(() => {
    if (selectedObject && selectedObjectId) {
      const position = selectedObject.position.toArray() as [number, number, number];
      // Only update if position actually changed
      const currentObject = objects.find(obj => obj.id === selectedObjectId);
      if (currentObject && (
        currentObject.position[0] !== position[0] ||
        currentObject.position[1] !== position[1] ||
        currentObject.position[2] !== position[2]
      )) {
        updateObject(selectedObjectId, { position });
      }
    }
  }, [selectedObject, selectedObjectId, objects, updateObject]);

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
      {objects.map((obj) => (
        <RigidBodyObject
          key={obj.id}
          id={obj.id}
          position={obj.position}
          type={obj.type}
          dimensions={obj.dimensions}
          isVisible={obj.isVisible !== false}
        />
      ))}
      
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          size={0.5}
          onChange={handleTransformChange}
          onObjectChange={handleTransformChange}
        />
      )}
    </>
  );
};
