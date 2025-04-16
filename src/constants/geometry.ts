/**
 * Constants for 3D geometry configuration
 */
export const GEOMETRY_CONSTANTS = {
  // Number of segments for curved surfaces (spheres, cylinders)
  // Higher values = smoother curves but more polygons
  SEGMENTS: 32,
  
  // Sphere specific
  SPHERE_RADIUS_SCALE: 0.5, // Divide width by 2 to get radius
  
  // Cylinder specific
  CYLINDER_RADIUS_SCALE: 0.5, // Divide width by 2 to get radius
} as const;
