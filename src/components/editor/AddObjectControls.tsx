import { FC } from 'react';
import { ObjectType } from '../../store/useEditorStore';
import styles from '../EditorPanel.module.css';

interface AddObjectControlsProps {
  onAddObject: (type: ObjectType) => void;
}

export const AddObjectControls: FC<AddObjectControlsProps> = ({ onAddObject }) => (
  <section className={styles.section}>
    <h3>Add Object</h3>
    <div className={styles.objectTypes}>
      <button 
        className={styles.addButton}
        onClick={() => onAddObject('box')}
      >
        Box
      </button>
      <button 
        className={styles.addButton}
        onClick={() => onAddObject('sphere')}
      >
        Sphere
      </button>
      <button 
        className={styles.addButton}
        onClick={() => onAddObject('cylinder')}
      >
        Cylinder
      </button>
    </div>
  </section>
);
