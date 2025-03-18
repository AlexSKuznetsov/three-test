import { Splat } from '@react-three/drei';
import { PhysicsScene } from './PhysicsScene';

export function Scene() {
  return (
    <>
      <PhysicsScene />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <Splat src={`/model.splat`} position={[0, 0.25, 0]} />
    </>
  );
}
