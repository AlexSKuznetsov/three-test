import { Splat } from '@react-three/drei';
import { PhysicsScene } from './PhysicsScene';
import { memo } from 'react';
import { useSceneLighting } from '../hooks/useSceneLighting';

// Memoized Splat component to prevent unnecessary re-renders
const MemoizedSplat = memo(function MemoizedSplat() {
  return <Splat src="/model.splat" position={[0, 0.25, 0]} />;
});

// // Memoized Lights component
const Lights = memo(function Lights(
  { ambient, directional }: ReturnType<typeof useSceneLighting>
) {
  return (
    <>
      <ambientLight intensity={ambient.intensity} />
      <directionalLight 
        position={directional.position}
        intensity={directional.intensity}
        castShadow={directional.castShadow}
      />
    </>
  );
});

export function Scene() {
  const lighting = useSceneLighting();

  return (
    <>
      <PhysicsScene />
      <Lights {...lighting} />
      <MemoizedSplat />
    </>
  );
}
