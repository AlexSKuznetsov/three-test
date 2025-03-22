# Project Tasks Backlog

## 1. Scene Editor with Rigid Body Management
**Status**: 🔲 Not Started  
**Priority**: High  
**Estimated Time**: 2-3 weeks

### Description
Create a Blender-like editor interface for adding, resizing, and moving rigid bodies in the scene. The editor should support saving and loading scenes in JSON format.

### Technical Requirements
- Scene state persistence in JSON format
- Intuitive UI for object manipulation
- Support for multiple object types
- Undo/Redo functionality
- Scene export/import

### Implementation Steps

#### 1.1 Editor UI Setup
- [ ] Create EditorPanel component
  - Add side panel with object controls
  - Implement collapsible sections
  - Add object type selection
- [ ] Create toolbar for common actions
  - Add/Remove objects
  - Transform mode toggles (Move, Scale, Rotate)
  - Save/Load scene buttons
- [ ] Add keyboard shortcuts system
  - Delete (Del)
  - Transform shortcuts (G - move, S - scale, R - rotate)
  - Undo/Redo (Ctrl+Z, Ctrl+Shift+Z)

#### 1.2 Rigid Body Management
- [ ] Create RigidBodyFactory
  - Support for basic shapes (Box, Sphere, Cylinder)
  - Configurable physics properties
  - Unique ID generation for each object
- [ ] Implement TransformControls
  - Position manipulation
  - Scale adjustment
  - Rotation control
  - Snapping options
- [ ] Add object properties panel
  - Physics properties (mass, friction, restitution)
  - Visual properties (color, opacity)
  - Transform values input fields

#### 1.3 Scene State Management
- [ ] Design scene state structure
  ```typescript
  interface SceneState {
    version: string;
    objects: {
      id: string;
      type: 'box' | 'sphere' | 'cylinder';
      position: [number, number, number];
      rotation: [number, number, number];
      scale: [number, number, number];
      physics: {
        mass: number;
        friction: number;
        restitution: number;
      };
      visual: {
        color: string;
        opacity: number;
      };
    }[];
    camera: {
      position: [number, number, number];
      target: [number, number, number];
    };
  }
  ```
- [ ] Create scene state store using Zustand
  - Add/remove objects
  - Update object properties
  - Undo/Redo stack
- [ ] Implement JSON export/import
  - Save scene to file
  - Load scene from file
  - Version compatibility check

#### 1.4 Physics Integration
- [ ] Update physics system for editor mode
  - Pause physics during editing
  - Preview physics in real-time
  - Apply changes to running simulation
- [ ] Add collision visualization
  - Show collision bounds
  - Highlight intersecting objects
- [ ] Implement physics properties testing
  - Quick test button
  - Reset to initial state

#### 1.5 Testing and Documentation
- [ ] Write unit tests
  - State management
  - Physics calculations
  - JSON conversion
- [ ] Add integration tests
  - UI interactions
  - Scene save/load
  - Physics simulation
- [ ] Create user documentation
  - Interface guide
  - Keyboard shortcuts
  - Best practices

### Acceptance Criteria
1. Users can add, remove, and modify rigid bodies in the scene
2. Transform controls work smoothly with proper snapping
3. Scene state can be saved to and loaded from JSON files
4. Physics properties can be adjusted and tested in real-time
5. UI is intuitive and responsive
6. All keyboard shortcuts work as expected
7. Undo/Redo system works reliably
8. Scene loads correctly on application restart

### Dependencies
- @react-three/drei for transform controls
- @react-three/rapier for physics
- Zustand for state management
- JSON schema validation library

### Notes
- Consider adding templates for common object configurations
- Plan for future multi-user collaboration
- Consider WebSocket integration for real-time updates
