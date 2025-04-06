import clsx from 'clsx';
import { FC } from 'react';
import { useEditorControls } from '../hooks/useEditorControls';
import styles from './ToggleEditorButton.module.css';

export const ToggleEditorButton: FC = () => {
  const { isPanelVisible, togglePanel } = useEditorControls();

  return (
    <button 
      className={clsx(styles.toggleButton, { [styles.active]: isPanelVisible })}
      onClick={togglePanel}
      title={isPanelVisible ? 'Hide Editor' : 'Show Editor'}
    >
      {isPanelVisible ? '✕' : '⚙️'}
    </button>
  );
};
