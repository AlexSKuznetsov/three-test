import { useEffect, useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import styles from './ObjectProperties.module.css';

interface ObjectPropertiesProps {
  onPositionChange: (position: [number, number, number]) => void;
  onDimensionsChange: (dimensions: [number, number, number]) => void;
  onRotationChange: (rotation: [number, number, number]) => void;
}

export function ObjectProperties({ 
  onPositionChange, 
  onDimensionsChange,
  onRotationChange 
}: ObjectPropertiesProps) {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const selectedObjectData = useEditorStore((state) => {
    const id = state.selectedObjectId;
    return id ? state.objects.find(obj => obj.id === id) : null;
  });

  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [dimensions, setDimensions] = useState<[number, number, number]>([1, 1, 1]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Update local state when selected object changes
  useEffect(() => {
    if (selectedObject && selectedObjectData) {
      const pos = selectedObject.position;
      setPosition([pos.x, pos.y, pos.z]);

      const rot = selectedObject.rotation;
      setRotation([
        rot.x * (180 / Math.PI),
        rot.y * (180 / Math.PI),
        rot.z * (180 / Math.PI)
      ]);

      setDimensions(selectedObjectData.dimensions);
    }
  }, [selectedObject, selectedObjectData]);

  const handlePositionChange = (axis: number, value: number) => {
    const newPosition: [number, number, number] = [...position];
    newPosition[axis] = value;
    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  const handleDimensionsChange = (axis: number, value: number) => {
    const newDimensions: [number, number, number] = [...dimensions];
    newDimensions[axis] = value;
    setDimensions(newDimensions);
    onDimensionsChange(newDimensions);
  };

  const handleRotationChange = (axis: number, value: number) => {
    const newRotation: [number, number, number] = [...rotation];
    newRotation[axis] = value;
    setRotation(newRotation);
    onRotationChange(newRotation.map(deg => deg * (Math.PI / 180)) as [number, number, number]);
  };

  if (!selectedObject || !selectedObjectData) {
    return null;
  }

  return (
    <div className={styles.properties}>
      <div className={styles.group}>
        <h4>Position</h4>
        <div className={styles.inputs}>
          <label>
            X
            <input
              type="number"
              value={position[0].toFixed(2)}
              onChange={(e) => handlePositionChange(0, parseFloat(e.target.value))}
              step="0.1"
            />
          </label>
          <label>
            Y
            <input
              type="number"
              value={position[1].toFixed(2)}
              onChange={(e) => handlePositionChange(1, parseFloat(e.target.value))}
              step="0.1"
            />
          </label>
          <label>
            Z
            <input
              type="number"
              value={position[2].toFixed(2)}
              onChange={(e) => handlePositionChange(2, parseFloat(e.target.value))}
              step="0.1"
            />
          </label>
        </div>
      </div>

      <div className={styles.group}>
        <h4>Dimensions</h4>
        <div className={styles.inputs}>
          <label>
            Width
            <input
              type="number"
              value={dimensions[0].toFixed(2)}
              onChange={(e) => handleDimensionsChange(0, parseFloat(e.target.value))}
              step="0.1"
              min="0.1"
            />
          </label>
          <label>
            Height
            <input
              type="number"
              value={dimensions[1].toFixed(2)}
              onChange={(e) => handleDimensionsChange(1, parseFloat(e.target.value))}
              step="0.1"
              min="0.1"
            />
          </label>
          <label>
            Depth
            <input
              type="number"
              value={dimensions[2].toFixed(2)}
              onChange={(e) => handleDimensionsChange(2, parseFloat(e.target.value))}
              step="0.1"
              min="0.1"
            />
          </label>
        </div>
      </div>

      <div className={styles.group}>
        <h4>Rotation (degrees)</h4>
        <div className={styles.inputs}>
          <label>
            X
            <input
              type="number"
              value={rotation[0].toFixed(1)}
              onChange={(e) => handleRotationChange(0, parseFloat(e.target.value))}
              step="1"
            />
          </label>
          <label>
            Y
            <input
              type="number"
              value={rotation[1].toFixed(1)}
              onChange={(e) => handleRotationChange(1, parseFloat(e.target.value))}
              step="1"
            />
          </label>
          <label>
            Z
            <input
              type="number"
              value={rotation[2].toFixed(1)}
              onChange={(e) => handleRotationChange(2, parseFloat(e.target.value))}
              step="1"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
