import { useContext } from 'react';
import { LayerVisible, useDrawing } from './context';

/** Part of a drawing shown only at some steps (0-based). */
export function Layer({
  steps,
  className = '',
  children,
}: {
  steps: number[];
  className?: string;
  children: React.ReactNode;
}) {
  const { step } = useDrawing();
  const parentVisible = useContext(LayerVisible);
  const shown = steps.includes(step);
  return (
    <LayerVisible.Provider value={parentVisible && shown}>
      <g
        className={['state-layer', className, shown ? '' : 'layer-hidden'].filter(Boolean).join(' ')}
        data-states={steps.join(' ')}
        aria-hidden={!shown}
      >
        {children}
      </g>
    </LayerVisible.Provider>
  );
}
