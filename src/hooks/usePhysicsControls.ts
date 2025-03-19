import { useControls } from 'leva';

export function usePhysicsControls() {
  // Physics debug control
  const physics = useControls('Physics', {
    debug: true
  });

  // Controls for ground plane
  const ground = useControls('Ground', {
    visible: true,
    position: [0, -1.7, 0],
    size: [15, 1, 15],
    color: '#666666',
  });

  // Controls for dynamic box
  const box = useControls('Dynamic Box', {
    visible: true,
    position: [0, -0.5, 0],
    rotation: {
      value: [0, 122, 2],
      step: 0.1,
    },
    size: [0.1, 2, 2],
    color: '#ff0000',
    restitution: { min: 0, max: 1, value: 0.5 },
    isStatic: true,
  });

  return {
    physics,
    ground,
    box,
  };
}
