import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { StatsGl } from '@react-three/drei';
import { Scene } from './components/Scene';
import { TouchControls } from './components/TouchControls';
import { JoystickUI } from './components/JoystickUI';
import { EditorPanel } from './components/EditorPanel';
import { ToggleEditorButton } from './components/ToggleEditorButton';
import { useCameraControls } from './hooks/useCameraControls';
import styles from './App.module.css';

export default function App() {
  const { position, updateCameraPosition } = useCameraControls();

  return (
    <>

      <Canvas
        dpr={1.5} // Set device pixel ratio for better quality
        gl={{ antialias: false }}
        camera={{ position: position, fov: 60 }}
        onCreated={({ camera }) => {
          // Initial camera position sync
          updateCameraPosition(camera);
        }}
      >
        <Suspense fallback={null}>
          <color attach='background' args={['white']} />
          <StatsGl className={styles.stats} />
          <TouchControls onCameraMove={updateCameraPosition} />
          <Scene />
        </Suspense>
      </Canvas>
      <JoystickUI />
      <ToggleEditorButton />
      <EditorPanel />
    </>
  );
}
