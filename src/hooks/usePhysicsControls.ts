export function usePhysicsControls() {
  return {
    physics: {
      debug: false
    },
    ground: {
      visible: true,
      position: [0, -1.7, 0] as [number, number, number],
      size: [15, 1, 15] as [number, number, number],
      color: '#666666',
    },
    box: {
      visible: true,
      position: [0, -0.5, 0] as [number, number, number],
      rotation: [0, 122, 2] as [number, number, number],
      size: [0.1, 2, 2] as [number, number, number],
      color: '#ff0000',
      restitution: 0.5,
      isStatic: true,
    },
  };
}
