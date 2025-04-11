import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import nipplejs, { EventData, JoystickOutputData } from 'nipplejs';
import * as THREE from 'three';
import { useTransformStore } from '../store/useTransformStore';

interface JoystickConfig {
  minDistance: number;
  speed: number;
  zoneId: string;
  onMove?: () => void;
}

export function useJoystickControls({ minDistance = 1.5, speed = 1, zoneId, onMove }: JoystickConfig) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const direction = useRef({ x: 0, y: 0 });

  const selectedObject = useTransformStore((state) => state.selectedObject);
  const isTransforming = useTransformStore((state) => state.isTransforming);

  // Initialize joystick
  useEffect(() => {
    const zone = document.getElementById(zoneId);
    if (!zone) return;

    const manager = nipplejs.create({
      zone,
      mode: 'static',
      position: { left: '60px', bottom: '60px' },
      size: 80,
      color: 'rgba(0, 0, 255, 0.5)',
      fadeTime: 0,
      multitouch: false,
      maxNumberOfNipples: 1,
      dataOnly: false,
    });

    const handleMove = (_evt: EventData, data: JoystickOutputData) => {
      if (data?.vector) {
        direction.current.x = data.vector.x;
        direction.current.y = data.vector.y;
      }
    };

    const handleEnd = () => {
      direction.current.x = 0;
      direction.current.y = 0;
    };

    manager.on('move', handleMove);
    manager.on('end', handleEnd);

    return () => {
      manager.destroy();
    };
  }, [zoneId]);

  // Collision detection helper
  const canMove = (position: THREE.Vector3, direction: THREE.Vector3) => {
    raycaster.current.set(position, direction.normalize());
    // Only check collisions with objects we explicitly added to the scene
    const sceneObjects = scene.children.filter(obj => obj.userData?.isSceneObject === true);
    const intersects = raycaster.current.intersectObjects(sceneObjects,
      true
    );
    
    if (!intersects.length) return true;
    
    return !intersects.some(hit => hit.distance < minDistance);
  };

  // Camera movement frame update
  useFrame((_state, delta) => {
    if (selectedObject || isTransforming || (!direction.current.x && !direction.current.y)) return;

    const currentSpeed = speed * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    // Get camera direction vectors
    camera.getWorldDirection(forward);
    right.copy(forward).cross(camera.up).normalize();
    forward.normalize();

    // Calculate potential movement
    const movement = new THREE.Vector3();

    // Forward/backward movement
    if (direction.current.y !== 0) {
      const forwardMove = forward.clone().multiplyScalar(direction.current.y);
      if (canMove(camera.position, forwardMove)) {
        movement.addScaledVector(forward, direction.current.y * currentSpeed);
      }
    }

    // Left/right movement
    if (direction.current.x !== 0) {
      const rightMove = right.clone().multiplyScalar(direction.current.x);
      if (canMove(camera.position, rightMove)) {
        movement.addScaledVector(right, direction.current.x * currentSpeed);
      }
    }

    // Apply movement
    if (!movement.equals(new THREE.Vector3(0, 0, 0))) {
      camera.position.add(movement);
      onMove?.();
      return true; // Camera was moved
    }

    return false; // Camera was not moved
  });

  return {
    isMoving: direction.current.x !== 0 || direction.current.y !== 0,
  };
}
