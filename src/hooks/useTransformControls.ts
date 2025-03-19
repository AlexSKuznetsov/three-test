import { useState, useEffect, useCallback } from 'react';

export function useTransformControls() {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  // Handle keyboard shortcuts for transform modes
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!selectedObject) return;

    switch(event.key.toLowerCase()) {
      case 'g':
        setTransformMode('translate');
        break;
      case 'r':
        setTransformMode('rotate');
        break;
      case 's':
        setTransformMode('scale');
        break;
      case 'escape':
        setSelectedObject(null);
        break;
    }
  }, [selectedObject]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleSelect = useCallback((name: string) => {
    setSelectedObject(current => current === name ? null : name);
  }, []);

  return {
    selectedObject,
    transformMode,
    handleSelect,
  };
}
