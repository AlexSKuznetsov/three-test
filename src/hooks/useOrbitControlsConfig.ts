

export function useOrbitControlsConfig() {
  return {
    minPolarAngle: Math.PI / 2 - Math.PI / 18, // 80 degrees (90° - 10°)
    maxPolarAngle: Math.PI / 2 + Math.PI / 18, // 100 degrees (90° + 10°)
  };
}
