import evidence from '../../../../projects/nyc-taxi/data/analysis.json';

export const data = evidence;
export const number = (n: number, digits = 0) =>
  n.toLocaleString('en-GB', { maximumFractionDigits: digits, minimumFractionDigits: digits });
export const percent = (n: number, digits = 1) => `${number(n, digits)}%`;
export const palette = ['#a9e7f1', '#f6d77a', '#9ba5ed', '#75d3ae', '#e5b0ca', '#b8c6cf', '#d8a775'];
export const bands = ['0–1.6', '1.6–3.2', '3.2–4.8', '4.8–8', '8–16', '16–32', '32+'];

export function gridPoints(endpoint = 'pickup', hour = -1) {
  const points = new Map<string, { lon: number; lat: number; trips: number }>();
  for (const row of data.spatial.grid) {
    if (row[0] !== endpoint || (hour >= 0 && row[1] !== hour)) continue;
    const lon = Number(row[2]);
    const lat = Number(row[3]);
    const key = `${lon},${lat}`;
    const found = points.get(key);
    if (found) found.trips += Number(row[4]);
    else points.set(key, { lon, lat, trips: Number(row[4]) });
  }
  return [...points.values()];
}
