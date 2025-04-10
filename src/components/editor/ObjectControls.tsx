import { FC, memo } from 'react';
import { TransformMode } from '../../store/useEditorStore';
import { ObjectProperties } from './ObjectProperties';
import styles from './ObjectControls.module.css';

interface TransformControls {
  mode: TransformMode;
  setMode: (mode: TransformMode) => void;
}

interface ObjectControlsProps {
  selectedObject: any | null;
  transformControls: TransformControls;
  onUpdateObject?: (updates: {
    position?: [number, number, number];
    dimensions?: [number, number, number];
    rotation?: [number, number, number];
  }) => void;
}

export const ObjectControls: FC<ObjectControlsProps> = memo(({ selectedObject, transformControls, onUpdateObject }) => {
  if (!selectedObject) {
    return (
      <section className={styles.section}>
        <h3>Object Controls</h3>
        <p className={styles.noSelection}>No object selected</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h3>Object Controls</h3>
      <div className={styles.controls}>
        <div className={styles.transformControls}>
          <button 
            className={`${styles.controlButton} ${transformControls.mode === 'translate' ? styles.active : ''}`}
            onClick={() => transformControls.setMode('translate')}
            title="Move object (G)"
          >
            Move
            <span className={styles.shortcut}>G</span>
          </button>
          <button 
            className={`${styles.controlButton} ${transformControls.mode === 'scale' ? styles.active : ''}`}
            onClick={() => transformControls.setMode('scale')}
            title="Scale object (S)"
          >
            Scale
            <span className={styles.shortcut}>S</span>
          </button>
          <button 
            className={`${styles.controlButton} ${transformControls.mode === 'rotate' ? styles.active : ''}`}
            onClick={() => transformControls.setMode('rotate')}
            title="Rotate object (R)"
          >
            Rotate
            <span className={styles.shortcut}>R</span>
          </button>
        </div>
      </div>
      {onUpdateObject && (
        <ObjectProperties
          onPositionChange={(position) => onUpdateObject({ position })}
          onDimensionsChange={(dimensions) => onUpdateObject({ dimensions })}
          onRotationChange={(rotation) => onUpdateObject({ rotation })}
        />
      )}
    </section>
  );
});
