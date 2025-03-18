import { Physics, RigidBody } from '@react-three/rapier';
import { useControls } from 'leva';

export function PhysicsScene() {
  // Physics debug control
  const physics = useControls('Physics', {
    debug: false
  });

  // Controls for ground plane
  const ground = useControls('Ground', {
    visible: true,
    position: {
      value: [0, -0.5, 0],
      step: 0.1,
    },
    size: {
      value: [10, 1, 10],
      step: 0.1,
    },
    color: '#666666',
  });

  // Controls for dynamic box
  const box = useControls('Dynamic Box', {
    visible: true,
    position: {
      value: [0, 2, 0],
      step: 0.1,
    },
    size: {
      value: [1, 1, 1],
      step: 0.1,
    },
    color: '#ff0000',
    restitution: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
  });

  return (
    <Physics debug={physics.debug}>
      {/* Ground plane - static physics body */}
      <RigidBody type="fixed" position={ground.position as [number, number, number]}>
        <mesh receiveShadow visible={ground.visible}>
          <boxGeometry args={ground.size as [number, number, number]} />
          <meshStandardMaterial color={ground.color} transparent opacity={ground.visible ? 1 : 0} />
        </mesh>
      </RigidBody>
      
      {/* Dynamic box - affected by physics */}
      <RigidBody 
        position={box.position as [number, number, number]} 
        restitution={box.restitution}
      >
        <mesh castShadow visible={box.visible}>
          <boxGeometry args={box.size as [number, number, number]} />
          <meshStandardMaterial color={box.color} transparent opacity={box.visible ? 1 : 0} />
        </mesh>
      </RigidBody>
    </Physics>
  );
}
