import { Physics } from '@react-three/rapier';
import { InteractiveRigidBody } from './InteractiveRigidBody';
import { usePhysicsControls } from '../hooks/usePhysicsControls';
import { useTransformControls } from '../hooks/useTransformControls';

interface PhysicsSceneProps {
  transformRef?: React.RefObject<any>;
}

export function PhysicsScene({ transformRef }: PhysicsSceneProps) {
  // Get physics and transform controls from custom hooks
  const { physics, ground, box } = usePhysicsControls();
  const { selectedObject, transformMode, handleSelect } = useTransformControls();

  return (
    <Physics debug={physics.debug}>
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
      
      {/* Box with configurable physics */}
      <InteractiveRigidBody 
        name="box"
        position={box.position as [number, number, number]}
        rotation={box.rotation.map((angle: number) => angle * Math.PI / 180) as [number, number, number]}
        restitution={box.restitution}
        type={box.isStatic ? 'fixed' : 'dynamic'}
        meshProps={{
          visible: box.visible,
          color: box.color,
          args: box.size as [number, number, number]
        }}
        selected={selectedObject === 'box'}
        onSelect={handleSelect}
        transformMode={transformMode}
        transformControlsRef={transformRef}
      />
    </Physics>
  );
}
