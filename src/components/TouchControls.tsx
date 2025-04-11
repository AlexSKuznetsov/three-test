import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useJoystickControls } from '../hooks/useJoystickControls';
import { useTransformStore } from '../store/useTransformStore';
import { useCollisionDetection, MIN_GROUND_DISTANCE } from '../hooks/useCollisionDetection';
import { useOrbitControlsConfig } from '../hooks/useOrbitControlsConfig';
import * as THREE from 'three';

interface TouchControlsProps {
  onCameraMove?: (camera: THREE.Camera) => void;
}

/**
 * TouchControls component handles camera movement and collision detection
 * It prevents the camera from passing through objects or going below ground level
 */
export function TouchControls({ onCameraMove }: TouchControlsProps) {
  const { camera } = useThree();
  // Reference to OrbitControls for camera manipulation
  const controlsRef = useRef<any>(null);
  // Track if an object is selected or being transformed
  const selectedObject = useTransformStore((state) => state.selectedObject);
  const isTransforming = useTransformStore((state) => state.isTransforming);
  // Get collision detection from our custom hook
  const { checkCollision } = useCollisionDetection();
  // Store the last valid camera position
  const prevPosition = useRef(camera.position.clone());

  /**
   * Handle collisions every frame
   * Only blocks movement when absolutely necessary and
   * maintains the last valid position for reference
   */
  useFrame(() => {
    // Skip collision checks if controls aren't ready or if interacting with objects
    if (!controlsRef.current || selectedObject || isTransforming) return;

    // Check for collisions at current position
    const collision = checkCollision(camera.position);
    
    if (collision.collision) {
      console.log('Collision detected', collision);
      if (collision.isGround) {
        // For ground collisions, only prevent downward movement
        if (camera.position.y < MIN_GROUND_DISTANCE) {
          return;
        }
      } else {
        // For wall collisions, only revert if we're moving towards the wall
        const movement = new THREE.Vector3().subVectors(camera.position, prevPosition.current);
        if (movement.length() > 0.01) { // Ignore tiny movements
          camera.position.copy(prevPosition.current);
        }
      }
    } else {
      // No collision, update previous position
      prevPosition.current.copy(camera.position);
    }
  });

  // Use joystick controls with configuration
  useJoystickControls({
    minDistance: 1.5,
    speed: 2,
    zoneId: 'joystick-zone',
    onMove: () => {
      onCameraMove?.(camera);
      // Update orbit controls target
      if (controlsRef.current) {
        // @ts-ignore - OrbitControls from drei does have these properties at runtime
        controlsRef.current.target.copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3()));
      }
    }
  });

  const orbitConfig = useOrbitControlsConfig();

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={!selectedObject && !isTransforming}
      enableDamping={false}
      minPolarAngle={orbitConfig.minPolarAngle}
      maxPolarAngle={orbitConfig.maxPolarAngle}
    />
  );
}
