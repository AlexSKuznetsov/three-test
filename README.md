# 3D Scene Viewer with React Three Fiber

An interactive 3D scene viewer built with React, Three.js, and React Three Fiber. Features smooth camera controls, physics interactions, and support for Gaussian Splatting models.

## Features

- **Interactive 3D Viewing**: Smooth camera controls with collision detection
- **Physics Integration**: Full physics simulation for interactive objects
- **Gaussian Splatting**: Support for loading and viewing .splat models
- **Touch Controls**: Mobile-friendly with joystick navigation
- **Lighting Controls**: Adjustable ambient and directional lighting via Leva UI
- **Transform Controls**: Object manipulation (translate, rotate, scale)

## Tech Stack

- React + TypeScript + Vite
- Three.js and React Three Fiber
- @react-three/drei for enhanced Three.js components
- @react-three/rapier for physics
- Leva for debug controls
- Zustand for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Project Structure

- `/src/components`: React components for the 3D scene
- `/src/hooks`: Custom hooks for camera, physics, and lighting controls
- `/src/store`: Zustand stores for state management
- `/public`: Static assets including .splat models

## Code Guidelines

- Custom hooks are used to encapsulate complex logic
- Components focus on presentation/rendering
- TypeScript is used throughout with strict type checking
- CSS modules for styling to avoid conflicts
- Constants are defined in separate files
- Tests are written using Vitest
