import { useRef, useCallback } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

interface UseRigidBodyTransformProps {
  name: string;
  onSelect?: (name: string) => void;
}

export function useRigidBodyTransform({ name, onSelect }: UseRigidBodyTransformProps) {
  const rigidBodyRef = useRef(null);

  // Memoize click handler to prevent unnecessary re-renders
  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect?.(name);
  }, [name, onSelect]);

  return {
    rigidBodyRef,
    handleClick,
  };
}
