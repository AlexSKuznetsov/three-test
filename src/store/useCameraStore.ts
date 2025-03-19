import { create } from 'zustand';

interface CameraStore {
  position: [number, number, number];
  setPosition: (pos: [number, number, number]) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  position: [1.8, 1, 1],
  setPosition: (pos) => set({ position: pos }),
}));
