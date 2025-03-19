import { create } from 'zustand';

interface TransformState {
  isTransforming: boolean;
  selectedObject: string | null;
  transformMode: 'translate' | 'rotate' | 'scale';
  setIsTransforming: (isTransforming: boolean) => void;
  setSelectedObject: (id: string | null) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
}

export const useTransformStore = create<TransformState>((set) => ({
  isTransforming: false,
  selectedObject: null,
  transformMode: 'translate',
  setIsTransforming: (isTransforming) => set({ isTransforming }),
  setSelectedObject: (id) => set({ selectedObject: id }),
  setTransformMode: (mode) => set({ transformMode: mode }),
}));
