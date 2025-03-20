import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useJoystickControls } from '../hooks/useJoystickControls';
import { useTransformStore } from '../store/useTransformStore';
import { useCollisionDetection } from '../hooks/useCollisionDetection';
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
  // Store the last valid camera position to revert to if needed
  const prevPosition = useRef(new THREE.Vector3());
  // Track if an object is selected or being transformed
  const selectedObject = useTransformStore((state) => state.selectedObject);
  const isTransforming = useTransformStore((state) => state.isTransforming);
  // Get collision detection function from our custom hook
  const { checkCollision } = useCollisionDetection();

  /**
   * Check for collisions every frame and handle camera position accordingly
   * Two types of collisions are handled differently:
   * 1. Ground collisions - only prevent downward movement when too close
   * 2. Wall collisions - prevent all movement by reverting to previous position
   */
  useFrame(() => {
    // Skip collision checks if controls aren't ready or if interacting with objects
    if (!controlsRef.current || selectedObject || isTransforming) return;

    // Check for any collisions at current camera position
    const collision = checkCollision(camera.position);
    const currentY = camera.position.y;
    
    if (collision.collision) {
      if (collision.isGround) {
        // For ground collisions, only block downward movement when too close
        // This creates smoother camera behavior near the ground
        const minGroundDistance = 1.2;
        // Only block downward movement when too close to the ground
        // This creates smoother camera behavior near the ground
        if (currentY < minGroundDistance && currentY < prevPosition.current.y) {
          camera.position.y = prevPosition.current.y;
        }
      } else {
        // For wall collisions, prevent all movement in that direction
        // by reverting to the last known safe position
        camera.position.copy(prevPosition.current);
      }
    }

    // Always store current position as the last valid position
    // This is used as a reference point if we need to revert due to collision
    prevPosition.current.copy(camera.position);
  });

  // Use joystick controls with configuration
  useJoystickControls({
    minDistance: 1.5,
    speed: 1,
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

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={!selectedObject && !isTransforming}
      enableDamping={false}
    />
  );
}
