import { useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Hook for managing scene persistence
 * Handles saving and loading scene state in JSON format
 */
export const useScenePersistence = () => {
  const objects = useEditorStore((state) => state.objects);
  const setObjects = useEditorStore((state) => state.setObjects);

  const saveScene = useCallback(() => {
    try {
      const sceneData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        objects,
      };
      
      const blob = new Blob([JSON.stringify(sceneData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `scene-${new Date().toISOString().slice(0, 19)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      return false;
    }
  }, [objects]);

  const loadScene = useCallback((file: File) => {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const sceneData = JSON.parse(content);
          
          if (!sceneData.version || !sceneData.objects) {
            throw new Error('Invalid scene file format');
          }
          
          setObjects(sceneData.objects);
          resolve(true);
        } catch (error) {
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        resolve(false);
      };
      
      reader.readAsText(file);
    });
  }, [setObjects]);

  return {
    saveScene,
    loadScene,
  };
};
