/** Shared gradients, grid and glow used by every drawing. */
export function Palette() {
  return (
    <defs>
      <linearGradient id="sceneLand" x2=".6" y2="1">
        <stop stopColor="#274c58" />
        <stop offset="1" stopColor="#102b39" />
      </linearGradient>
      <linearGradient id="sceneFloor" x2="1" y2="1">
        <stop stopColor="#143847" />
        <stop offset="1" stopColor="#071722" />
      </linearGradient>
      <pattern id="sceneGrid" width="42" height="42" patternUnits="userSpaceOnUse">
        <path d="M42 0H0V42" fill="none" stroke="#87c9d6" strokeOpacity=".045" />
      </pattern>
      <filter id="sceneGlow">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}
