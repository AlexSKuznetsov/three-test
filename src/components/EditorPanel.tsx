import { FC, useRef, useCallback } from 'react';
import { useEditorControls } from '../hooks/useEditorControls';
import { useEditorStore } from '../store/useEditorStore';
import { useScenePersistence } from '../hooks/useScenePersistence';
import styles from './EditorPanel.module.css';

export const EditorPanel: FC = () => {
  const { selectedObject, transformControls, isPanelVisible, togglePanel } = useEditorControls();
  const addObject = useEditorStore((state) => state.addObject);
  const removeObject = useEditorStore((state) => state.removeObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const { saveScene, loadScene } = useScenePersistence();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteObject = useCallback(() => {
    if (selectedObjectId) {
      removeObject(selectedObjectId);
    }
  }, [selectedObjectId, removeObject]);

  if (!isPanelVisible) return null;

  return (
    <div className={styles.editorPanel}>
      <div className={styles.header}>
        <h2>Scene Editor</h2>
        <button 
          className={styles.closeButton}
          onClick={togglePanel}
          title="Close Editor"
        >
          ✕
        </button>
      </div>
      <div className={styles.content}>
        <section className={styles.section}>
          <h3>Object Controls</h3>
          {selectedObject ? (
            <div className={styles.controls}>
              <div className={styles.transformControls}>
                <button 
                  className={`${styles.controlButton} ${transformControls.mode === 'translate' ? styles.active : ''}`}
                  onClick={() => transformControls.setMode('translate')}
                >
                  Move
                </button>
                <button 
                  className={`${styles.controlButton} ${transformControls.mode === 'rotate' ? styles.active : ''}`}
                  onClick={() => transformControls.setMode('rotate')}
                >
                  Rotate
                </button>
                <button 
                  className={`${styles.controlButton} ${transformControls.mode === 'scale' ? styles.active : ''}`}
                  onClick={() => transformControls.setMode('scale')}
                >
                  Scale
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.noSelection}>No object selected</p>
          )}
        </section>
        {selectedObjectId && (
          <section className={styles.section}>
            <h3>Selected Object</h3>
            <div className={styles.selectedObjectControls}>
              <button 
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={handleDeleteObject}
                title="Delete selected object"
              >
                Delete Object
              </button>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h3>Scene</h3>
          <div className={styles.sceneControls}>
            <button 
              className={styles.sceneButton}
              onClick={saveScene}
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
                  loadScene(file).then((success) => {
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

        <section className={styles.section}>
          <h3>Add Object</h3>
          <div className={styles.objectTypes}>
            <button 
              className={styles.addButton}
              onClick={() => addObject('box')}
            >
              Box
            </button>
            <button 
              className={styles.addButton}
              onClick={() => addObject('sphere')}
            >
              Sphere
            </button>
            <button 
              className={styles.addButton}
              onClick={() => addObject('cylinder')}
            >
              Cylinder
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
