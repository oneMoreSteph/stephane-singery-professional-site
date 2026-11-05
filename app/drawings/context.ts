import { createContext, useContext } from 'react';

/** What a drawing needs from its case window: the current step and which element is lit or clicked. */
export interface DrawingState {
  step: number;
  touredId: string | null;
  inspectedId: string | null;
}

export const DrawingContext = createContext<DrawingState>({ step: 0, touredId: null, inspectedId: null });
export const useDrawing = () => useContext(DrawingContext);

/** False inside a layer that the current step hides. */
export const LayerVisible = createContext(true);
