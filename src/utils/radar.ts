import geometric from 'geometric';

const covertAngle = (a: number) => ((a - 90) * Math.PI) / 180;

export const wineAngles = [0, 120, 240].map(covertAngle);
export const foodAngles = [50, 70, 170, 190, 290, 310].map(covertAngle);

export const generatePolygonPath = (points: geometric.Polygon) =>
  'M ' + [...points, points[0]].map(([x, y]) => `${x}, ${y}`);

export const getAxisEnd = (
  angle: number,
  axisSize: number,
  center: number,
  offset = 0,
  multiplier = 1
): geometric.Point => [
  center + (axisSize + offset) * multiplier * Math.cos(angle),
  center + (axisSize + offset) * multiplier * Math.sin(angle),
];
