import { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { TransformControls } from '@react-three/drei';
import type { RigidBodyProps } from '@react-three/rapier';
import type { ThreeEvent } from '@react-three/fiber';

interface InteractiveRigidBodyProps extends RigidBodyProps {
  meshProps?: {
    visible?: boolean;
    color?: string;
    args?: [number, number, number];
  };
  name: string;
  selected?: boolean;
  onSelect?: (name: string) => void;
  transformMode?: 'translate' | 'rotate' | 'scale';
  transformControlsRef?: React.MutableRefObject<any>;
}

export function InteractiveRigidBody({ 
  meshProps = {}, 
  name,
  children,
  selected = false,
  onSelect,
  transformMode = 'translate',
  transformControlsRef,
  ...rigidBodyProps 
}: InteractiveRigidBodyProps) {
  const rigidBodyRef = useRef(null);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (onSelect) {
      onSelect(name);
    }
  };

  return (
    <>
      <RigidBody ref={rigidBodyRef} {...rigidBodyProps}>
        <mesh
          onClick={handleClick}
          // castShadow
          // receiveShadow
          visible={meshProps.visible}
        >
          <boxGeometry args={meshProps.args || [1, 1, 1]} />
          <meshStandardMaterial 
            color={meshProps.color || '#ffffff'}
            transparent
            opacity={meshProps.visible ? 1 : 0}
          />
        </mesh>
        {children}
      </RigidBody>
      
      {selected && rigidBodyRef.current && (
        <TransformControls
          ref={transformControlsRef}
          object={rigidBodyRef.current}
          mode={transformMode}
          size={0.5}
        />
      )}
    </>
  );
}
