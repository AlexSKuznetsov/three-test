import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useJoystickControls } from '../hooks/useJoystickControls';
import { useTransformStore } from '../store/useTransformStore';
import * as THREE from 'three';

interface TouchControlsProps {
  onCameraMove?: (camera: THREE.Camera) => void;
}

export function TouchControls({ onCameraMove }: TouchControlsProps) {
  const { camera } = useThree();
  const controlsRef = useRef(null);
  const selectedObject = useTransformStore((state) => state.selectedObject);
  const isTransforming = useTransformStore((state) => state.isTransforming);

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
    />
  );
}
