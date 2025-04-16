import { FC, useCallback } from 'react';
import { useEditorControls } from '../hooks/useEditorControls';
import { useEditorStore } from '../store/useEditorStore';
import { useScenePersistence } from '../hooks/useScenePersistence';
import { useObjectPresets } from '../hooks/useObjectPresets';
import {
  PanelHeader,
  ObjectControls,
  SelectedObjectControls,
  SceneControls,
  AddObjectControls,
  SpecialObjectControls,
  PhysicsControls
} from './editor';
import styles from './EditorPanel.module.css';

export const EditorPanel: FC = () => {
  const { selectedObject, transformControls, isPanelVisible, togglePanel } = useEditorControls();
  const addObject = useEditorStore((state) => state.addObject);
  const removeObject = useEditorStore((state) => state.removeObject);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const updateObject = useEditorStore((state) => state.updateObject);
  const toggleTransparency = useEditorStore((state) => state.toggleTransparency);
  const objects = useEditorStore((state) => state.objects);

  const handleObjectUpdate = useCallback((updates: {
    position?: [number, number, number];
    dimensions?: [number, number, number];
    rotation?: [number, number, number];
  }) => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, updates);
    }
  }, [selectedObjectId, updateObject]);
  const selectedObjectData = selectedObjectId ? objects.find(obj => obj.id === selectedObjectId) ?? null : null;
  const isDebugMode = useEditorStore((state) => state.isDebugMode);
  const toggleDebugMode = useEditorStore((state) => state.toggleDebugMode);
  const useGravity = useEditorStore((state) => state.useGravity);
  const toggleGravity = useEditorStore((state) => state.toggleGravity);
  const { saveScene, loadScene } = useScenePersistence();
  const { addPreset } = useObjectPresets();

  const handleDeleteObject = useCallback(() => {
    if (selectedObjectId) {
      removeObject(selectedObjectId);
    }
  }, [selectedObjectId, removeObject]);

  const handleToggleVisibility = useCallback(() => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, { isVisible: !selectedObjectData?.isVisible });
    }
  }, [selectedObjectId, selectedObjectData?.isVisible, updateObject]);

  const handleToggleTransparency = useCallback(() => {
    if (selectedObjectId) {
      toggleTransparency(selectedObjectId);
    }
  }, [selectedObjectId, toggleTransparency]);

  if (!isPanelVisible) return null;

  return (
    <div className={styles.editorPanel}>
      <PanelHeader onClose={togglePanel} />
      <div className={styles.content}>
        <ObjectControls
          selectedObject={selectedObject}
          transformControls={transformControls}
          onUpdateObject={handleObjectUpdate}
        />

        <SelectedObjectControls
          selectedObjectId={selectedObjectId}
          selectedObjectData={selectedObjectData}
          onDelete={handleDeleteObject}
          onToggleVisibility={handleToggleVisibility}
          onToggleTransparency={handleToggleTransparency}
        />

        <SceneControls
          onSave={saveScene}
          onLoad={loadScene}
        />

        <AddObjectControls
          onAddObject={(type) => addObject({ type })}
        />

        <SpecialObjectControls
          onAddPreset={addPreset}
        />

        <PhysicsControls
          isDebugMode={isDebugMode}
          useGravity={useGravity}
          onToggleDebug={toggleDebugMode}
          onToggleGravity={toggleGravity}
        />
      </div>
    </div>
  );
};
