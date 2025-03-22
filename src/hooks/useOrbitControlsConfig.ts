import { useControls, folder } from 'leva';

export function useOrbitControlsConfig() {
  const config = useControls('Orbit Controls', {
    Vertical: folder({
      minPolarAngle: {
        value: Math.PI / 2 - Math.PI / 18, // Default: 80 degrees (90° - 10°)
        min: 0,
        max: Math.PI,
        step: 0.01,
        label: 'Min Vertical Angle',
      },
      maxPolarAngle: {
        value: Math.PI / 2 + Math.PI / 18, // Default: 100 degrees (90° + 10°)
        min: 0,
        max: Math.PI,
        step: 0.01,
        label: 'Max Vertical Angle',
      },
    }),
  });

  return config;
}
