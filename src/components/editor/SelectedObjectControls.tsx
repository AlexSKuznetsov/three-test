import { FC, memo } from 'react';
import { SceneObject } from '../../store/useEditorStore';
import styles from '../EditorPanel.module.css';

interface SelectedObjectControlsProps {
  selectedObjectId: string | null;
  selectedObjectData: SceneObject | null;
  onDelete: () => void;
  onToggleVisibility: () => void;
}

export const SelectedObjectControls: FC<SelectedObjectControlsProps> = memo(({
  selectedObjectId,
  selectedObjectData,
  onDelete,
  onToggleVisibility
}) => {
  if (!selectedObjectId) return null;

  return (
    <section className={styles.section}>
      <h3>Selected Object</h3>
      <div className={styles.selectedObjectControls}>
        <button 
          className={`${styles.actionButton}`}
          onClick={onToggleVisibility}
          title={selectedObjectData?.isVisible ? 'Hide object' : 'Show object'}
        >
          {selectedObjectData?.isVisible ? 'Hide Object' : 'Show Object'}
        </button>
        <button 
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={onDelete}
          title="Delete selected object (Del)"
        >
          Delete Object
          <span className={styles.shortcut}>Del</span>
        </button>
      </div>
    </section>
  );
});
