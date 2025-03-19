import { memo } from 'react';
import { RigidBody } from '@react-three/rapier';
import { TransformControls } from '@react-three/drei';
import type { RigidBodyProps } from '@react-three/rapier';
import type { ThreeEvent } from '@react-three/fiber';
import { useRigidBodyTransform } from '../hooks/useRigidBodyTransform';

interface MeshProps {
  visible?: boolean;
  color?: string;
  args?: [number, number, number];
}

interface InteractiveRigidBodyProps extends RigidBodyProps {
  meshProps?: MeshProps;
  name: string;
  selected?: boolean;
  onSelect?: (name: string) => void;
  transformMode?: 'translate' | 'rotate' | 'scale';
  transformControlsRef?: React.MutableRefObject<any>;
}

// Memoized mesh component to prevent unnecessary re-renders
const RigidMesh = memo(function RigidMesh(
  { meshProps = {}, onClick }: { meshProps: MeshProps; onClick: (event: ThreeEvent<MouseEvent>) => void }
) {
  return (
    <mesh onClick={onClick} visible={meshProps.visible}>
      <boxGeometry args={meshProps.args || [1, 1, 1]} />
      <meshStandardMaterial 
        color={meshProps.color || '#ffffff'}
        transparent
        opacity={meshProps.visible ? 1 : 0}
      />
    </mesh>
  );
});

export const InteractiveRigidBody = memo(function InteractiveRigidBody({ 
  meshProps = {}, 
  name,
  children,
  selected = false,
  onSelect,
  transformMode = 'translate',
  transformControlsRef,
  ...rigidBodyProps 
}: InteractiveRigidBodyProps) {
  const { rigidBodyRef, handleClick } = useRigidBodyTransform({ name, onSelect });

  return (
    <>
      <RigidBody ref={rigidBodyRef} {...rigidBodyProps}>
        <RigidMesh meshProps={meshProps} onClick={handleClick} />
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
});

