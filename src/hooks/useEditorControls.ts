import { useCallback } from 'react';
import { Object3D } from 'three';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Hook for managing editor state and controls
 * Handles object selection, transformation modes, and editor state
 */
export const useEditorControls = () => {
  const selectedObject = useEditorStore((state) => state.selectedObject);
  const transformMode = useEditorStore((state) => state.transformMode);
  const isPanelVisible = useEditorStore((state) => state.isPanelVisible);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);
  const setTransformMode = useEditorStore((state) => state.setTransformMode);
  const togglePanel = useEditorStore((state) => state.togglePanel);

  const selectObject = useCallback((object: Object3D | null, objectId: string | null = null) => {
    setSelectedObject(object, objectId);
  }, [setSelectedObject]);

  const transformControls = {
    mode: transformMode,
    setMode: setTransformMode,
  };

  return {
    selectedObject,
    selectObject,
    transformControls,
    isPanelVisible,
    togglePanel,
  };
};
