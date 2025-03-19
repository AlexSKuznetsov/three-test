import { Splat } from '@react-three/drei';
import { PhysicsScene } from './PhysicsScene';
import { useRef, memo } from 'react';
import { useSceneLighting } from '../hooks/useSceneLighting';

// Memoized Splat component to prevent unnecessary re-renders
const MemoizedSplat = memo(function MemoizedSplat() {
  return <Splat src={`/model.splat`} position={[0, 0.25, 0]} />;
});

// Memoized Lights component
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
  const transformRef = useRef<any>(null);
  const lighting = useSceneLighting();

  return (
    <>
      <PhysicsScene transformRef={transformRef} />
      <Lights {...lighting} />
      <MemoizedSplat />
    </>
  );
}
