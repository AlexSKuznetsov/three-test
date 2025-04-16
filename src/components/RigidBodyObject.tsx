import { FC, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RigidBodyAutoCollider } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import { Mesh, Vector3, Quaternion, Euler } from 'three';
import { useEditorStore } from '../store/useEditorStore';
import { GEOMETRY_CONSTANTS } from '../constants/geometry';

interface RigidBodyObjectProps {
  id: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  type: 'box' | 'sphere' | 'cylinder';
  dimensions: [number, number, number];
  isVisible?: boolean;
  opacity?: number;
}

export const RigidBodyObject: FC<RigidBodyObjectProps> = ({ id, position, rotation = [0, 0, 0], type, dimensions, isVisible = true, opacity = 1 }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<Mesh>(null);
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);
  const isSelected = useEditorStore((state) => state.selectedObjectId === id);

  // Constants for position synchronization
  const POSITION_THRESHOLD = 0.001; // Increased threshold to reduce unnecessary updates
  const prevPosition = useRef({ x: 0, y: 0, z: 0 });

  // Sync position immediately when mesh moves
  useFrame(() => {
    if (!rigidBodyRef.current || !meshRef.current) return;

    const rb = rigidBodyRef.current;
    const mesh = meshRef.current;
    // Use world-space position of parent when dragging
    const meshPos = isSelected
      ? (() => { const p = new Vector3(); mesh.getWorldPosition(p); return p; })()
      : mesh.position;
    
    // Check if there's actual movement before updating
    const hasMovement = 
      Math.abs(prevPosition.current.x - meshPos.x) > POSITION_THRESHOLD ||
      Math.abs(prevPosition.current.y - meshPos.y) > POSITION_THRESHOLD ||
      Math.abs(prevPosition.current.z - meshPos.z) > POSITION_THRESHOLD;

    if (isSelected && hasMovement) {
      // During transformation, directly copy mesh position to physics body
      rb.setTranslation(meshPos, true);
      // Also sync rotation from mesh to physics body
      const worldQuat = new Quaternion();
      mesh.getWorldQuaternion(worldQuat);
      rb.setRotation(worldQuat, true);
      rb.resetForces(true);
      rb.resetTorques(true);
      rb.wakeUp();

      // Update previous position
      prevPosition.current = { 
        x: meshPos.x, 
        y: meshPos.y, 
        z: meshPos.z 
      };
    } else if (!isSelected) {
      // When not selected, ensure physics body is at the correct position
      const rbPos = rb.translation();
      
      const needsUpdate = 
        Math.abs(rbPos.x - meshPos.x) > POSITION_THRESHOLD ||
        Math.abs(rbPos.y - meshPos.y) > POSITION_THRESHOLD ||
        Math.abs(rbPos.y - meshPos.z) > POSITION_THRESHOLD;
      
      if (needsUpdate) {
        rb.setTranslation(meshPos, true);
        rb.resetForces(true);
        rb.resetTorques(true);
        rb.wakeUp();
      }
    }
  });

  // Update mesh scale when dimensions prop changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(dimensions[0], dimensions[1], dimensions[2]);
    }
  }, [dimensions]);

  // Sync physics body on prop changes (geometry will auto-update via React)
  useEffect(() => {
    // Sync physics body on prop changes (geometry will auto-update via React)
    if (rigidBodyRef.current) {
      const rb = rigidBodyRef.current;
      rb.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
      const q = new Quaternion().setFromEuler(new Euler(rotation[0], rotation[1], rotation[2]));
      rb.setRotation(q, true);
      rb.resetForces(true);
      rb.resetTorques(true);
    }
  }, [position, rotation, isSelected, id]);

  // Select the RigidBody group so transforms apply to physics body
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (meshRef.current) {
      const parentGroup = meshRef.current.parent;
      setSelectedObject(parentGroup, id);
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
    const { SEGMENTS, SPHERE_RADIUS_SCALE, CYLINDER_RADIUS_SCALE } = GEOMETRY_CONSTANTS;

    switch (type) {
      case 'box':
        return <boxGeometry args={[width, height, depth]} />;
      case 'sphere':
        // Sphere takes (radius, widthSegments, heightSegments)
        const sphereRadius = width * SPHERE_RADIUS_SCALE;
        return <sphereGeometry args={[sphereRadius, SEGMENTS, SEGMENTS]} />;
      case 'cylinder':
        // Cylinder takes (radiusTop, radiusBottom, height, radialSegments)
        const cylinderRadius = width * CYLINDER_RADIUS_SCALE;
        return <cylinderGeometry args={[cylinderRadius, cylinderRadius, height, SEGMENTS]} />;
    }
  };

  const colliderMap: Record<RigidBodyObjectProps['type'], RigidBodyAutoCollider> = {
    box: 'cuboid',
    sphere: 'ball',
    cylinder: 'cuboid',
  };

  return (
    // Remount on dimensions change so auto-collider regenerates
    <RigidBody
      key={`${id}-${dimensions.join('-')}`}
      ref={rigidBodyRef}
      position={position}
      rotation={rotation}
      scale={dimensions}
      colliders={colliderMap[type]}
      type="kinematicPosition"
      name={`rigid-body-${id}`}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerMissed={() => setSelectedObject(null, null)}
        visible={isVisible}
        name={`mesh-${id}`}
        userData={{ isSceneObject: true }} // Mark as our manually added object
      >
        {renderGeometry()}
        <meshStandardMaterial 
          color={isSelected ? '#ffa500' : '#ffffff'}
          transparent={true} // Always set transparent to true to maintain consistent material behavior
          opacity={opacity}
          depthWrite={opacity === 1} // Disable depth writing for transparent objects
        />
      </mesh>
    </RigidBody>
  );
};
