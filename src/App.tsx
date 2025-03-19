import { Canvas } from '@react-three/fiber';
import { StatsGl } from '@react-three/drei';
import { useControls, folder } from 'leva';
import { Scene } from './components/Scene';
import { TouchControls } from './components/TouchControls';
import { JoystickUI } from './components/JoystickUI';
import type { Camera } from 'three';
import { useCameraStore } from './store/useCameraStore';
import styles from './App.module.css';

export default function App() {
  // Leva control for camera position
  const { position } = useCameraStore();
  useControls({
    Camera: folder({
      position: {
        value: position,
        onChange: (value) => {
          useCameraStore.getState().setPosition(value as [number, number, number]);
        },
      },
    }),
  });

  // Function to update camera position
  const updateCameraPosition = (camera: Camera) => {
    const { x, y, z } = camera.position;
    const roundedPos: [number, number, number] = [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
      Math.round(z * 100) / 100
    ];
    useCameraStore.getState().setPosition(roundedPos);
  };

  return (
    <>
      <Canvas
        dpr={1.5}
        gl={{ antialias: false }}
        camera={{ position: position, fov: 35 }}
        onCreated={({ camera }) => {
          // Initial camera position sync
          updateCameraPosition(camera);
        }}
      >
        <color attach='background' args={['white']} />
        <StatsGl className={styles.stats} />
        <TouchControls onCameraMove={updateCameraPosition} />
        <Scene />
      </Canvas>
      <JoystickUI />
    </>
  );
}
