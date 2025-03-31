import { useEffect, useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Hook for handling editor keyboard shortcuts
 * G - Move mode
 * S - Scale mode
 * R - Rotate mode
 * Del - Delete selected object
 */
export const useEditorShortcuts = () => {
  const setTransformMode = useEditorStore((state) => state.setTransformMode);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const removeObject = useEditorStore((state) => state.removeObject);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle shortcuts if not typing in an input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 'g':
        setTransformMode('translate');
        break;
      case 's':
        setTransformMode('scale');
        break;
      case 'r':
        setTransformMode('rotate');
        break;
      case 'delete':
        if (selectedObjectId) {
          removeObject(selectedObjectId);
          setSelectedObject(null, null);
        }
        break;
      case 'escape':
        setSelectedObject(null, null);
        break;
    }
  }, [selectedObjectId, removeObject, setTransformMode, setSelectedObject]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
