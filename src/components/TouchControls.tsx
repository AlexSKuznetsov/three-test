import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import nipplejs, { EventData, JoystickOutputData } from 'nipplejs';
import * as THREE from 'three';
import { useTransformStore } from '../store/useTransformStore';

interface TouchControlsProps {
  onCameraMove?: (camera: THREE.Camera) => void;
}

export function TouchControls({ onCameraMove }: TouchControlsProps) {
  const { camera, scene } = useThree();
  const controlsRef = useRef(null);
  const raycaster = useRef(new THREE.Raycaster());
  // This ref will hold the joystick direction
  const direction = useRef({ x: 0, y: 0 });
  const minDistance = 1.5; // Minimum distance to keep from objects

  useEffect(() => {
    const zone = document.getElementById('joystick-zone');
    // Create a static joystick in the given zone.
    if (zone) {
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

      manager.on('move', (_evt: EventData, data: JoystickOutputData) => {
        if (data && data.vector) {
          // data.vector.x and data.vector.y are normalized directional values.
          direction.current.x = data.vector.x;
          direction.current.y = data.vector.y;
        }
      });

      manager.on('end', () => {
        direction.current.x = 0;
        direction.current.y = 0;
      });

      return () => {
        manager.destroy();
      };
    }
  }, []);



  // Use the CameraControls API to move the camera based on joystick input.
  const selectedObject = useTransformStore((state) => state.selectedObject);
  const isTransforming = useTransformStore((state) => state.isTransforming);

  // Check if movement is allowed in the given direction
  const canMove = (position: THREE.Vector3, direction: THREE.Vector3) => {
    raycaster.current.set(position, direction.normalize());
    // Only check for mesh objects (rigid bodies)
    const intersects = raycaster.current.intersectObjects(
      scene.children.filter(child => child.type === 'Mesh'),
      true
    );
    if (!intersects.length) return true;
    
    // Check if we're too close to any object
    for (const hit of intersects) {
      if (hit.distance < minDistance) {
        return false;
      }
    }
    return true;
  };

  useFrame((_state, delta) => {
    if (selectedObject || isTransforming || (!direction.current.x && !direction.current.y)) return;

    const speed = 1 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    // Get camera direction vectors
    camera.getWorldDirection(forward);
    right.copy(forward).cross(camera.up).normalize();
    forward.normalize();

    // Calculate potential movement
    const movement = new THREE.Vector3();
    let canMoveForward = true;
    let canMoveRight = true;

    if (direction.current.y !== 0) {
      const forwardMove = forward.clone().multiplyScalar(direction.current.y);
      canMoveForward = canMove(camera.position, forwardMove);
      if (canMoveForward) {
        movement.addScaledVector(forward, direction.current.y * speed);
      }
    }

    if (direction.current.x !== 0) {
      const rightMove = right.clone().multiplyScalar(direction.current.x);
      canMoveRight = canMove(camera.position, rightMove);
      if (canMoveRight) {
        movement.addScaledVector(right, direction.current.x * speed);
      }
    }

    // Only move if we have some valid movement
    if (movement.lengthSq() > 0) {
      // Move both camera and its target point to maintain orbit
      camera.position.add(movement);
      if (controlsRef.current) {
        // @ts-ignore - OrbitControls from drei does have these properties at runtime
        controlsRef.current.target.add(movement);
      }

      // Notify parent about camera position change
      onCameraMove?.(camera);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      // enableDamping
      // dampingFactor={0.05}
      enabled={!selectedObject && !isTransforming}
    />
  );
}
