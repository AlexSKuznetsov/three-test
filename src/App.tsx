import { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Splat, StatsGl, CameraControls } from '@react-three/drei';
import { useControls } from 'leva';
import nipplejs from 'nipplejs';

// extend({ TAARenderPass, OutputPass });

export default function App() {
  // Leva control for camera position
  const { cameraPosition } = useControls('Camera', {
    cameraPosition: {
      value: [1.8, 1, 1],
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
        {/* Make CameraControls the default so it's stored in state.controls */}
        <CameraControls makeDefault />
        <TouchControls />
        <Default />
      </Canvas>
      {/* This div is the zone for the nipple.js joystick */}
      <div
        id='joystick-zone'
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          width: 150,
          height: 150,
          zIndex: 10,
        }}
      />
    </>
  );
}

// Touch controls using nipple.js integrated with CameraControls
function TouchControls() {
  // Access the controls instance from three state (CameraControls)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useThree((state) => state.controls as any);
  // This ref will hold the joystick direction
  const direction = useRef({ x: 0, y: 0 });

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

      manager.on('move', (_event, data) => {
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
  useFrame((_state, delta) => {
    const speed = 1 * delta;
    if (controls) {
      // Truck moves the camera sideways.
      // Depending on your desired behavior, you may need to invert the x value.
      controls.truck(direction.current.x * speed, 0);
      // Forward moves the camera along its view direction.
      controls.forward(direction.current.y * speed);
    }
  });

  return null;
}

const Default = () => {
  return (
    <>
      <Splat src={`/model.splat`} position={[0, 0.25, 0]} />
    </>
  );
};
