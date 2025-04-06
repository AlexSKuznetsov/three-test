import { memo, useCallback } from 'react';
import { useObjectProperties } from '../../hooks/useObjectProperties';
import styles from './ObjectProperties.module.css';

interface ObjectPropertiesProps {
  onPositionChange: (position: [number, number, number]) => void;
  onDimensionsChange: (dimensions: [number, number, number]) => void;
  onRotationChange: (rotation: [number, number, number]) => void;
}

export const ObjectProperties = memo<ObjectPropertiesProps>(function ObjectProperties({ 
  onPositionChange, 
  onDimensionsChange,
  onRotationChange 
}) {
  const {
    selectedObject,
    selectedObjectData,
    position,
    dimensions,
    rotation,
    setPosition,
    setDimensions,
    setRotation,
  } = useObjectProperties();

  const handlePositionChange = useCallback((axis: number, value: number) => {
    const newPosition: [number, number, number] = [...position];
    newPosition[axis] = value;
    setPosition(newPosition);
    onPositionChange(newPosition);
  }, [position, onPositionChange]);

  const handleDimensionsChange = useCallback((axis: number, value: number) => {
    const newDimensions: [number, number, number] = [...dimensions];
    newDimensions[axis] = value;
    setDimensions(newDimensions);
    onDimensionsChange(newDimensions);
  }, [dimensions, onDimensionsChange]);

  const handleRotationChange = useCallback((axis: number, value: number) => {
    const newRotation: [number, number, number] = [...rotation];
    newRotation[axis] = value;
    setRotation(newRotation);
    onRotationChange(newRotation.map(deg => deg * (Math.PI / 180)) as [number, number, number]);
  }, [rotation, onRotationChange]);

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
});
