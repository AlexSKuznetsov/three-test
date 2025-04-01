import { FC } from 'react';
import { PresetType } from '../../hooks/useObjectPresets';
import styles from '../EditorPanel.module.css';

interface SpecialObjectControlsProps {
  onAddPreset: (preset: PresetType) => void;
}

export const SpecialObjectControls: FC<SpecialObjectControlsProps> = ({ onAddPreset }) => (
  <section className={styles.section}>
    <h3>Special Objects</h3>
    <div className={styles.objectTypes}>
      <button
        className={`${styles.addButton} ${styles.presetButton}`}
        onClick={() => onAddPreset('wall')}
        title="Add wall (vertical plane)"
      >
        Wall
      </button>
      <button
        className={`${styles.addButton} ${styles.presetButton}`}
        onClick={() => onAddPreset('floor')}
        title="Add floor (horizontal plane)"
      >
        Floor
      </button>
    </div>
  </section>
);
