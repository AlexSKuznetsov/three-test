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
        dpr={1.5}
        gl={{ antialias: false }}
        camera={{ position: position, fov: 60 }}
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
      <ToggleEditorButton />
      <EditorPanel />
    </>
  );
}
