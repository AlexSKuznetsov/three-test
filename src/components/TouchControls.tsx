import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import type { CameraControls } from '@react-three/drei';
import nipplejs, { EventData, JoystickOutputData } from 'nipplejs';
import * as THREE from 'three';

export function TouchControls() {
  const { camera, scene, controls } = useThree((state) => ({
    camera: state.camera,
    scene: state.scene,
    controls: state.controls as CameraControls
  }));
  // This ref will hold the joystick direction
  const direction = useRef({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());
  const collisionDistance = 1; // Minimum distance to keep from objects

  useEffect(() => {
    const zone = document.getElementById('joystick-zone');
    // Create a static joystick in the given zone.
    if (zone) {
      const manager = nipplejs.create({
        zone,
        mode: 'static',
        position: { left: '50%', bottom: '50%' },
        color: 'blue',
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

  // Check if movement is allowed in the given direction
  const canMove = (moveDirection: THREE.Vector3) => {
    raycaster.current.set(camera.position, moveDirection.normalize());
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    return !intersects.length || intersects[0].distance > collisionDistance;
  };

  // Use the CameraControls API to move the camera based on joystick input.
  useFrame((_state, delta) => {
    if (!controls) return;

    const speed = 1 * delta;
    const cameraDirection = new THREE.Vector3();
    const sidewaysDirection = new THREE.Vector3();

    // Get forward and sideways directions
    camera.getWorldDirection(cameraDirection);
    camera.getWorldDirection(sidewaysDirection);
    sidewaysDirection.cross(camera.up).normalize();

    // Scale directions by input
    if (direction.current.x !== 0 && canMove(sidewaysDirection.multiplyScalar(Math.sign(direction.current.x)))) {
      controls.truck(direction.current.x * speed, 0);
    }
    if (direction.current.y !== 0 && canMove(cameraDirection.multiplyScalar(Math.sign(direction.current.y)))) {
      controls.forward(direction.current.y * speed);
    }
  });

  return null;
}
