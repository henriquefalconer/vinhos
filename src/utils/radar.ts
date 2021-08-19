import geometric from 'geometric';

const covertAngle = (a: number) => ((a - 90) * Math.PI) / 180;

export const wineAngles = [0, 120, 240].map(covertAngle);
export const foodAngles = [50, 70, 170, 190, 290, 310].map(covertAngle);

export const buildPolygon = (
  points: number[],
  angles: number[]
): geometric.Polygon =>
  points.map((p, i, _, a = angles[i]) => [
    200 + Math.max(p, 1e-14) * 18 * Math.cos(a),
    200 + Math.max(p, 1e-14) * 18 * Math.sin(a),
  ]);

export const generatePolygonPath = (points: geometric.Polygon) =>
  'M ' + [...points, points[0]].map(([x, y]) => `${x}, ${y}`);

export const generatePointsPath = (points: number[], angles: number[]) =>
  generatePolygonPath(buildPolygon(points, angles));
