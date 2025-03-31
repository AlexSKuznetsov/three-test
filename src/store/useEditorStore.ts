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
}

interface EditorState {
  selectedObject: Object3D | null;
  selectedObjectId: string | null;
  transformMode: TransformMode;
  isPanelVisible: boolean;
  objects: SceneObject[];
  setSelectedObject: (object: Object3D | null, objectId: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  togglePanel: () => void;
  addObject: (type: ObjectType) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<Omit<SceneObject, 'id'>>) => void;
  setObjects: (objects: SceneObject[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedObject: null,
  selectedObjectId: null,
  transformMode: 'translate',
  isPanelVisible: true,
  objects: [],
  setSelectedObject: (object, objectId) => set({ 
    selectedObject: object,
    selectedObjectId: objectId
  }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  togglePanel: () => set((state) => ({ isPanelVisible: !state.isPanelVisible })),
  addObject: (type) => set((state) => ({
    objects: [
      ...state.objects,
      {
        id: nanoid(),
        type,
        position: [0, 1, 0],
        dimensions: [1, 1, 1],
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
