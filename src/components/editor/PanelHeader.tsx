import { FC, memo } from 'react';
import styles from '../EditorPanel.module.css';

interface PanelHeaderProps {
  onClose: () => void;
}

export const PanelHeader: FC<PanelHeaderProps> = memo(({ onClose }) => (
  <div className={styles.header}>
    <h2>Scene Editor</h2>
    <button 
      className={styles.closeButton}
      onClick={onClose}
      title="Close Editor"
    >
      ✕
    </button>
  </div>
));
