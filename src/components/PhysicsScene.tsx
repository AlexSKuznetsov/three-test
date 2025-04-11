import { Physics } from '@react-three/rapier';
import { usePhysicsControls } from '../hooks/usePhysicsControls';
import { useEditorShortcuts } from '../hooks/useEditorShortcuts';
import { useEditorStore } from '../store/useEditorStore';
import { SceneObjects } from './SceneObjects';

export function PhysicsScene() {
  // Get physics and transform controls from custom hooks
  const { physics } = usePhysicsControls();
  const isDebugMode = useEditorStore((state) => state.isDebugMode);

  // Initialize keyboard shortcuts
  useEditorShortcuts();

  return (
    <Physics debug={isDebugMode} gravity={physics.gravity}>
      <SceneObjects />
    </Physics>
  );
}
