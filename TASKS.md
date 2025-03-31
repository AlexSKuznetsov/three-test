# Project Tasks Backlog

## 1. Scene Editor with Rigid Body Management
**Status**: 🔄 In Progress  
**Priority**: High  
**Estimated Time**: 2-3 weeks

### Description
Create a Blender-like editor interface for adding, resizing, and moving rigid bodies in the scene. The editor should support saving and loading scenes in JSON format.

### Technical Requirements
- ✅ Scene state persistence in JSON format
- ✅ Intuitive UI for object manipulation
- ✅ Support for multiple object types
- 🔲 Undo/Redo functionality
- ✅ Scene export/import

### Implementation Steps

#### 1.1 Editor UI Setup
- [x] Create EditorPanel component
  - ✅ Add side panel with object controls
  - ✅ Implement collapsible sections
  - ✅ Add object type selection
  - ✅ Add animations and transitions
    - Panel slide in/out animation
    - Closed by default
  - 🔲 Fix and implement object properties panel
    - Position sync with transform controls
    - Dimensions editing
    - Real-time updates with physics
- [x] Create toolbar for common actions
  - ✅ Add/Remove objects
  - ✅ Transform mode toggles (Move, Scale, Rotate)
  - ✅ Save/Load scene buttons
- [x] Add keyboard shortcuts system
  - ✅ Delete (Del)
  - ✅ Transform shortcuts (G - move, S - scale, R - rotate)
  - ✅ Selection clear (Esc)
  - 🔲 Undo/Redo (Ctrl+Z, Ctrl+Shift+Z)

#### 1.2 Rigid Body Management
- [x] Create RigidBodyFactory
  - ✅ Support for basic shapes (Box, Sphere, Cylinder)
  - ✅ Configurable physics properties
  - ✅ Unique ID generation for each object
  - ✅ Preset objects (Wall, Floor) with predefined settings
  - ✅ Debug mode toggle for physics outlines
- [x] Implement TransformControls
  - ✅ Position manipulation
  - ✅ Scale adjustment
  - ✅ Rotation control
  - 🔲 Snapping options
- [ ] Add object properties panel
  - 🔲 Physics properties (mass, friction, restitution)
  - 🔲 Visual properties (color, opacity)
  - 🔲 Transform values input fields

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

---

## 2. Dual Mode Application (Editor/Viewer)
**Status**: 🔲 Not Started  
**Priority**: High  
**Estimated Time**: 1-2 weeks

### Description
Implement two distinct modes of operation: Editor mode for scene manipulation and Viewer mode for end-user interaction. Each mode should have its own UI, controls, and feature set.

### Technical Requirements
- Clear mode switching mechanism
- Persistent mode state
- Mode-specific UI components
- Mode-specific controls and interactions

### Implementation Steps

#### 2.1 Application Mode Management
- [ ] Create AppMode enum and store
  ```typescript
  enum AppMode {
    EDITOR = 'editor',
    VIEWER = 'viewer'
  }
  ```
- [ ] Implement mode switching logic
  - Mode persistence in localStorage
  - URL-based mode selection
  - Mode change confirmation dialogs
- [ ] Add mode-specific routing
  - /editor/* routes
  - /viewer/* routes
  - Mode-specific parameters

#### 2.2 Editor Mode Features
- [ ] Create EditorLayout component
  - Full editing toolbar
  - Property panels
  - Scene hierarchy view
- [ ] Implement editor-specific controls
  - Transform controls
  - Camera controls with no restrictions
  - Keyboard shortcuts
- [ ] Add editor UI components
  - Mode switch button
  - Save/Publish buttons
  - Preview in Viewer mode button

#### 2.3 Viewer Mode Features
- [ ] Create ViewerLayout component
  - Clean, minimal interface
  - Information overlay system
  - Interactive hotspots
- [ ] Implement viewer-specific controls
  - Restricted camera movement
  - Object interaction controls
  - Touch-friendly navigation
- [ ] Add viewer UI components
  - Information panels
  - Navigation aids
  - Interactive elements

#### 2.4 Mode-Specific State Management
- [ ] Create mode-specific stores
  ```typescript
  interface EditorState {
    selectedObjects: string[];
    activeTools: string[];
    unsavedChanges: boolean;
  }

  interface ViewerState {
    activeHotspots: string[];
    visibleInfo: string[];
    navigationHistory: string[];
  }
  ```
- [ ] Implement state isolation
  - Separate editor and viewer states
  - Mode-specific actions
  - State persistence rules

#### 2.5 Scene Publishing System
- [ ] Create publishing workflow
  - Scene validation
  - Asset optimization
  - Version management
- [ ] Implement preview system
  - Live preview in viewer mode
  - Preview sharing
  - Version comparison

### Acceptance Criteria
1. Users can switch between modes seamlessly
2. Editor mode provides full scene manipulation capabilities
3. Viewer mode offers a clean, focused experience
4. Mode-specific controls work as expected
5. Scene state is properly preserved between mode switches
6. Publishing workflow ensures scene validity
7. Performance is optimized for each mode
8. Mobile experience is fully functional in viewer mode

### Dependencies
- React Router for mode-based routing
- Zustand for mode-specific state management
- Local storage for mode persistence

### Notes
- Consider adding a presentation mode for guided tours
- Plan for offline support in viewer mode
- Consider adding analytics for viewer interactions

---

## 3. Interactive Scene Annotations
**Status**: 🔲 Not Started  
**Priority**: High  
**Estimated Time**: 2-3 weeks

### Description
Implement a system for adding and displaying interactive annotation points in the scene, featuring multiple content types and a modern Vision Pro-inspired UI. Annotations should be easily placeable in editor mode and provide an immersive viewing experience.

### Technical Requirements
- Pulsing 3D annotation markers
- Multiple content types support
- Modern, floating UI panels
- Smooth animations and transitions
- Responsive layout for all screen sizes

### Implementation Steps

#### 3.1 Annotation System Core
- [ ] Create annotation data structure
  ```typescript
  interface Annotation {
    id: string;
    type: 'text' | 'video' | 'audio';
    position: THREE.Vector3;
    rotation: THREE.Euler;
    content: AnnotationContent;
    style: AnnotationStyle;
  }

  interface AnnotationContent {
    title: string;
    description?: string;
    media?: {
      url: string;
      type: string;
      spatialAudio?: boolean;
    };
    richText?: string;
    images?: string[];
  }

  interface AnnotationStyle {
    color: string;
    size: number;
    pulseSpeed: number;
    visibility: number;
  }
  ```
- [ ] Implement annotation marker component
  - Pulsing effect shader
  - Hover interactions
  - Distance-based scaling
- [ ] Add annotation placement system
  - Raycasting for position
  - Surface snapping
  - Rotation controls

#### 3.2 Content Types Implementation
- [ ] Rich Text + Image Annotations
  - Implement rich text editor
  - Image upload and management
  - Layout customization
  - Typography system
- [ ] Video Annotations
  - Standard video player
  - Spatial video support
  - Custom video controls
  - Picture-in-picture mode
- [ ] Audio Annotations
  - 3D audio positioning
  - Real-time equalizer visualization
  - Waveform display
  - Playback controls

#### 3.3 Vision Pro-Inspired UI
- [ ] Design floating UI system
  - Glassmorphism effects
  - Depth-based blur
  - Dynamic shadows
  - Smooth transitions
- [ ] Implement interaction gestures
  - Swipe navigation
  - Pinch-to-zoom
  - Rotation gestures
  - Multi-touch support
- [ ] Create UI components
  - Floating panels
  - Content cards
  - Media players
  - Navigation controls

#### 3.4 Editor Integration
- [ ] Add annotation tools to editor
  - Type selection
  - Content editor
  - Position adjustment
  - Style customization
- [ ] Implement annotation management
  - List view
  - Bulk operations
  - Categories/Tags
  - Search functionality

#### 3.5 Viewer Experience
- [ ] Create annotation viewer
  - Content display modes
  - Transition animations
  - Navigation between annotations
- [ ] Add interaction features
  - Auto-focus camera
  - Content scaling
  - Audio/Video controls
  - Touch gestures

### Acceptance Criteria
1. Annotations can be easily placed and edited in the scene
2. All content types (text, video, audio) work correctly
3. UI matches Vision Pro design aesthetic
4. Animations and transitions are smooth
5. Audio visualizer works in real-time
6. Mobile experience is fully functional
7. Editor tools are intuitive
8. Viewer mode provides immersive experience

### Dependencies
- Three.js for 3D markers and effects
- Draft.js or TipTap for rich text editing
- Web Audio API for audio visualization
- GSAP for animations
- React Spring for physics-based animations

### Notes
- Consider WebXR support for VR viewing
- Plan for spatial audio integration
- Consider adding annotation templates
- Add support for annotation sequences/tours
