import { Physics } from '@react-three/rapier';
import { InteractiveRigidBody } from './InteractiveRigidBody';
import { usePhysicsControls } from '../hooks/usePhysicsControls';
import { useTransformControls } from '../hooks/useTransformControls';
import { useEditorShortcuts } from '../hooks/useEditorShortcuts';
import { useEditorStore } from '../store/useEditorStore';
import { SceneObjects } from './SceneObjects';

interface PhysicsSceneProps {
  transformRef?: React.RefObject<any>;
}

export function PhysicsScene({ transformRef }: PhysicsSceneProps) {
  // Get physics and transform controls from custom hooks
  const { ground, physics } = usePhysicsControls();
  const { selectedObject, transformMode, handleSelect } = useTransformControls();
  const isDebugMode = useEditorStore((state) => state.isDebugMode);

  // Initialize keyboard shortcuts
  useEditorShortcuts();

  return (
    <Physics debug={isDebugMode} gravity={physics.gravity}>
      <SceneObjects />
      {/* Ground plane - static physics body */}
      <InteractiveRigidBody 
        name="ground"
        type="fixed" 
        position={ground.position as [number, number, number]}
        meshProps={{
          visible: ground.visible,
          color: ground.color,
          args: ground.size as [number, number, number]
        }}
        selected={selectedObject === 'ground'}
        onSelect={handleSelect}
        transformMode={transformMode}
        transformControlsRef={transformRef}
      />
    </Physics>
  );
}
