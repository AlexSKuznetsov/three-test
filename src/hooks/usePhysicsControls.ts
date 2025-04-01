import { useEditorStore } from '../store/useEditorStore';

export function usePhysicsControls() {
  const useGravity = useEditorStore((state) => state.useGravity);
  
  return {
    physics: {
      debug: false,
      gravity: useGravity ? [0, -9.81, 0] as [number, number, number] : [0, 0, 0] as [number, number, number]
    },
    ground: {
      visible: true,
      position: [0, -1.7, 0] as [number, number, number],
      size: [15, 1, 15] as [number, number, number],
      color: '#666666',
    },
  };
}
