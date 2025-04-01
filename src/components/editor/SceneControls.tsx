import { FC, useRef } from 'react';
import styles from '../EditorPanel.module.css';

interface SceneControlsProps {
  onSave: () => void;
  onLoad: (file: File) => Promise<boolean>;
}

export const SceneControls: FC<SceneControlsProps> = ({ onSave, onLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className={styles.section}>
      <h3>Scene</h3>
      <div className={styles.sceneControls}>
        <button 
          className={styles.sceneButton}
          onClick={onSave}
          title="Save scene to JSON file"
        >
          Save Scene
        </button>
        <button 
          className={styles.sceneButton}
          onClick={() => fileInputRef.current?.click()}
          title="Load scene from JSON file"
        >
          Load Scene
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onLoad(file).then((success) => {
                if (success) {
                  console.log('Scene loaded successfully');
                } else {
                  console.error('Failed to load scene');
                }
              });
            }
            e.target.value = ''; // Reset input
          }}
        />
      </div>
    </section>
  );
};
