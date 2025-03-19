import { Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import { InteractiveRigidBody } from './InteractiveRigidBody';
import { useState, useEffect } from 'react';

interface PhysicsSceneProps {
  transformRef?: React.RefObject<any>;
}

export function PhysicsScene({ transformRef }: PhysicsSceneProps) {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  // Physics debug control
  const physics = useControls('Physics', {
    debug: true
  });

  // Controls for ground plane
  const ground = useControls('Ground', {
    visible: true,
    position: [0, -1.7, 0],
    size: [15, 1, 15],
    color: '#666666',
  });

  // Controls for dynamic box
  const box = useControls('Dynamic Box', {
    visible: true,
    position: [0, -0.5, 0],
    rotation: {
      value: [0, 122, 2],
      step: 0.1,
    },
    size: [0.1, 2, 2],
    color: '#ff0000',
    restitution: { min: 0, max: 1, value: 0.5 },
    isStatic: true,
  });

  // Handle keyboard shortcuts for transform modes
  const handleKeyPress = (event: KeyboardEvent) => {
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
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedObject]);

  const handleSelect = (name: string) => {
    setSelectedObject(current => current === name ? null : name);
  };

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
