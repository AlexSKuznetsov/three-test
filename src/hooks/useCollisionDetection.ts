import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Result of collision detection check
 * @property collision - Whether any collision was detected
 * @property isGround - Whether the collision was with the ground
 */
interface CollisionResult {
  collision: boolean;
  isGround: boolean;
}

/**
 * Hook for detecting collisions between camera and scene objects
 * Uses raycasting to check for objects in multiple directions
 */
// Minimum safe distance from ground and objects
export const MIN_GROUND_DISTANCE = 1.0;
export const MIN_WALL_DISTANCE = 1.0;

export function useCollisionDetection() {
  const { scene } = useThree();
  // Raycaster is used to detect objects in the scene along a ray
  const raycaster = useRef(new THREE.Raycaster());

  /**
   * Check for collisions from a given position
   * @param position - The position to check collisions from (usually camera position)
   * @returns CollisionResult indicating if and what type of collision was detected
   */
  const checkCollision = (position: THREE.Vector3): CollisionResult => {
    // First, check for ground collision by casting a ray downward
    // This is checked separately because ground collisions are handled differently
    raycaster.current.set(position, new THREE.Vector3(0, -1, 0));
    const groundIntersects = raycaster.current.intersectObjects(scene.children, true);
    
    // If we're too close to the ground, report ground collision
    if (groundIntersects.length > 0 && groundIntersects[0].distance < MIN_GROUND_DISTANCE) {
      return { collision: true, isGround: true };
    }

    // Next, check for collisions in horizontal directions (walls, objects)
    const directions = [
      new THREE.Vector3(1, 0, 0),   // Right
      new THREE.Vector3(-1, 0, 0),  // Left
      new THREE.Vector3(0, 0, 1),   // Forward
      new THREE.Vector3(0, 0, -1),  // Back
    ];

    // Cast rays in each direction to check for nearby objects
    for (const dir of directions) {
      raycaster.current.set(position, dir.normalize());
      // Only check collisions with objects we explicitly added to the scene
      const sceneObjects = scene.children.filter(obj => obj.userData?.isSceneObject === true);
      const intersects = raycaster.current.intersectObjects(sceneObjects, true);
      


      if (intersects.length > 0 && intersects[0].distance < MIN_WALL_DISTANCE) {
        return { collision: true, isGround: false };
      }
    }

    // No collisions detected
    return { collision: false, isGround: false };
  };

  return { checkCollision };
}
