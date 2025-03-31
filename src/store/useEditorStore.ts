import { create } from 'zustand';
import { Object3D } from 'three';
import { nanoid } from 'nanoid';

export type TransformMode = 'translate' | 'rotate' | 'scale';
export type ObjectType = 'box' | 'sphere' | 'cylinder';

export interface SceneObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  dimensions: [number, number, number];
  rotation?: [number, number, number];
  isStatic?: boolean;
  isVisible?: boolean;
}

interface EditorState {
  selectedObject: Object3D | null;
  selectedObjectId: string | null;
  transformMode: TransformMode;
  isPanelVisible: boolean;
  isDebugMode: boolean;
  objects: SceneObject[];
  setSelectedObject: (object: Object3D | null, objectId: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  togglePanel: () => void;
  toggleDebugMode: () => void;
  addObject: (config: Omit<SceneObject, 'id'> | { type: ObjectType }) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<Omit<SceneObject, 'id'>>) => void;
  setObjects: (objects: SceneObject[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedObject: null,
  selectedObjectId: null,
  transformMode: 'translate',
  isPanelVisible: false,
  isDebugMode: false,
  objects: [],
  setSelectedObject: (object, objectId) => set({ 
    selectedObject: object,
    selectedObjectId: objectId
  }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  togglePanel: () => set((state) => ({ isPanelVisible: !state.isPanelVisible })),
  toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
  addObject: (config) => set((state) => ({
    objects: [
      ...state.objects,
      {
        id: nanoid(),
        type: 'type' in config && typeof config.type === 'string' ? config.type as ObjectType : config.type,
        position: 'position' in config ? config.position : [0, 1, 0],
        dimensions: 'dimensions' in config ? config.dimensions : [1, 1, 1],
        isStatic: 'isStatic' in config ? config.isStatic : false,
        isVisible: 'isVisible' in config ? config.isVisible : true,
      },
    ],
  })),
  removeObject: (id) => set((state) => ({
    objects: state.objects.filter((obj) => obj.id !== id),
    selectedObject: null,
    selectedObjectId: null, // Clear selection when removing object
  })),
  updateObject: (id, updates) => set((state) => ({
    objects: state.objects.map((obj) =>
      obj.id === id ? { ...obj, ...updates } : obj
    ),
  })),
  setObjects: (objects) => set({
    objects,
    selectedObject: null,
    selectedObjectId: null, // Clear selection when loading new scene
  }),
}));
