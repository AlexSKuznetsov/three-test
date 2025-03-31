import { FC, useRef, useEffect } from 'react';
import { RigidBody, RigidBodyAutoCollider, RigidBodyTypeString } from '@react-three/rapier';
import { Mesh, Vector3 } from 'three';
import { useEditorStore } from '../store/useEditorStore';

interface RigidBodyObjectProps {
  id: string;
  position: [number, number, number];
  type: 'box' | 'sphere' | 'cylinder';
  dimensions: [number, number, number];
  isVisible?: boolean;
}

const colliderMap: Record<RigidBodyObjectProps['type'], RigidBodyAutoCollider> = {
  box: 'cuboid',
  sphere: 'ball',
  cylinder: 'cuboid', // Using cuboid for cylinder as it's the closest approximation
};

export const RigidBodyObject: FC<RigidBodyObjectProps> = ({ id, position, type, dimensions, isVisible = true }) => {
  const rigidBodyRef = useRef<any>(null);
  const meshRef = useRef<Mesh>(null);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);

  // Update rigid body position when store position changes
  useEffect(() => {
    if (rigidBodyRef.current) {
      const rb = rigidBodyRef.current;
      rb.setTranslation(new Vector3(...position));
      rb.setLinvel({ x: 0, y: 0, z: 0 }); // Reset velocity
      rb.setAngvel({ x: 0, y: 0, z: 0 }); // Reset angular velocity
    }
  }, [position]);

  const isSelected = useEditorStore((state) => state.selectedObjectId === id);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (meshRef.current) {
      setSelectedObject(meshRef.current, id);
    }
  };

  // Clear selection when component unmounts
  useEffect(() => {
    return () => {
      if (isSelected) {
        setSelectedObject(null, null);
      }
    };
  }, [isSelected, setSelectedObject]);

  const renderGeometry = () => {
    const [width, height, depth] = dimensions;
    switch (type) {
      case 'box':
        return <boxGeometry args={[width, height, depth]} />;
      case 'sphere':
        return <sphereGeometry args={[width / 2, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[width / 2, width / 2, height, 32]} />;
    }
  };

  return (
    <RigidBody 
      ref={rigidBodyRef}
      position={position}
      type={"kinematic" as RigidBodyTypeString} // Use kinematic type for editor control
      colliders={colliderMap[type]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerMissed={() => setSelectedObject(null, null)}
        visible={isVisible}
      >
        {renderGeometry()}
        <meshStandardMaterial 
          color={isSelected ? '#ffa500' : '#ffffff'}
          transparent={!isVisible}
          opacity={isVisible ? 1 : 0.3}
        />
      </mesh>
    </RigidBody>
  );
};
