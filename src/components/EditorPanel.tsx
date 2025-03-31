import { FC, useRef, useCallback } from 'react';
import { useEditorControls } from '../hooks/useEditorControls';
import { useEditorStore } from '../store/useEditorStore';
import { useScenePersistence } from '../hooks/useScenePersistence';
import { useObjectPresets } from '../hooks/useObjectPresets';
import styles from './EditorPanel.module.css';

export const EditorPanel: FC = () => {
  const { selectedObject, transformControls, isPanelVisible, togglePanel } = useEditorControls();
  const addObject = useEditorStore((state) => state.addObject);
  const removeObject = useEditorStore((state) => state.removeObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const updateObject = useEditorStore((state) => state.updateObject);
  const objects = useEditorStore((state) => state.objects);
  const selectedObjectData = selectedObjectId ? objects.find(obj => obj.id === selectedObjectId) : null;
  const isDebugMode = useEditorStore((state) => state.isDebugMode);
  const toggleDebugMode = useEditorStore((state) => state.toggleDebugMode);
  const { saveScene, loadScene } = useScenePersistence();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPreset } = useObjectPresets();

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
          ) : (
            <p className={styles.noSelection}>No object selected</p>
          )}
        </section>
        {selectedObjectId && (
          <section className={styles.section}>
            <h3>Selected Object</h3>
            <div className={styles.selectedObjectControls}>
              <button 
                className={`${styles.actionButton}`}
                onClick={() => selectedObjectId && updateObject(selectedObjectId, { 
                  isVisible: !selectedObjectData?.isVisible 
                })}
                title={selectedObjectData?.isVisible ? 'Hide object' : 'Show object'}
              >
                {selectedObjectData?.isVisible ? 'Hide Object' : 'Show Object'}
              </button>
              <button 
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={handleDeleteObject}
                title="Delete selected object (Del)"
              >
                Delete Object
                <span className={styles.shortcut}>Del</span>
              </button>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h3>Scene</h3>
          <div className={styles.sceneControls}>
            <button 
              className={`${styles.sceneButton} ${isDebugMode ? styles.active : ''}`}
              onClick={toggleDebugMode}
              title="Toggle physics debug mode"
            >
              {isDebugMode ? 'Hide Debug' : 'Show Debug'}
            </button>
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
              onClick={() => addObject({ type: 'box' })}
            >
              Box
            </button>
            <button 
              className={styles.addButton}
              onClick={() => addObject({ type: 'sphere' })}
            >
              Sphere
            </button>
            <button 
              className={styles.addButton}
              onClick={() => addObject({ type: 'cylinder' })}
            >
              Cylinder
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Special Objects</h3>
          <div className={styles.objectTypes}>
            <button
              className={`${styles.addButton} ${styles.presetButton}`}
              onClick={() => addPreset('wall')}
              title="Add wall (vertical plane)"
            >
              Wall
            </button>
            <button
              className={`${styles.addButton} ${styles.presetButton}`}
              onClick={() => addPreset('floor')}
              title="Add floor (horizontal plane)"
            >
              Floor
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
