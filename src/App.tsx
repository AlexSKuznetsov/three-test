import { Canvas } from '@react-three/fiber';
import { StatsGl, CameraControls as DreiCameraControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Scene } from './components/Scene';
import { TouchControls } from './components/TouchControls';
import { JoystickUI } from './components/JoystickUI';

export default function App() {
  // Leva control for camera position
  const { cameraPosition } = useControls('Camera', {
    cameraPosition: {
      value: [1.8, 1, 1] as [number, number, number],
      step: 0.1,
    },
  });

  return (
    <>
      <Canvas
        dpr={1.5}
        gl={{ antialias: false }}
        camera={{ position: cameraPosition, fov: 35 }}
      >
        <color attach='background' args={['white']} />
        <StatsGl />
        <DreiCameraControls makeDefault />
        <TouchControls />
        <Scene />
      </Canvas>
      <JoystickUI />
    </>
  );
}
