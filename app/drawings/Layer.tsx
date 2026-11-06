import { useContext } from 'react';
import { LayerVisible, useDrawing } from './context';

/** Part of a drawing shown only at some steps (0-based). `bare` leaves out the standard layer styling. */
export function Layer({
  steps,
  className = '',
  bare = false,
  transform,
  children,
}: {
  steps: number[];
  className?: string;
  bare?: boolean;
  transform?: string;
  children: React.ReactNode;
}) {
  const { step } = useDrawing();
  const parentVisible = useContext(LayerVisible);
  const shown = steps.includes(step);
  return (
    <LayerVisible.Provider value={parentVisible && shown}>
      <g
        className={[bare ? '' : 'state-layer', className, shown ? '' : 'layer-hidden']
          .filter(Boolean)
          .join(' ')}
        data-states={steps.join(' ')}
        transform={transform}
        aria-hidden={!shown}
      >
        {children}
      </g>
    </LayerVisible.Provider>
  );
}
