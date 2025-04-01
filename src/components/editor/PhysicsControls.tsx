import { FC } from 'react';
import styles from '../EditorPanel.module.css';

interface PhysicsControlsProps {
  isDebugMode: boolean;
  useGravity: boolean;
  onToggleDebug: () => void;
  onToggleGravity: () => void;
}

export const PhysicsControls: FC<PhysicsControlsProps> = ({
  isDebugMode,
  useGravity,
  onToggleDebug,
  onToggleGravity
}) => (
  <>
    <div className={styles.debugControl}>
      <input
        type="checkbox"
        id="debug-mode"
        checked={isDebugMode}
        onChange={onToggleDebug}
      />
      <label htmlFor="debug-mode">
        Show physics debug outlines
      </label>
    </div>
    <div className={styles.debugControl}>
      <input
        type="checkbox"
        id="use-gravity"
        checked={useGravity}
        onChange={onToggleGravity}
      />
      <label htmlFor="use-gravity">
        Use gravity
      </label>
    </div>
  </>
);
