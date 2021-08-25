const geometric = require('geometric');

export const getPolygonArea = (p: geometric.Polygon) =>
  geometric.polygonArea(p) / 319.5;

const getPolygonEnd = (
  [[x1, y1], [x2, y2]]: geometric.Line,
  multiplier: number
): geometric.Point => [
  x1 + (x2 - x1) * multiplier,
  y1 + (y2 - y1) * multiplier,
];

export const buildPolygon = (
  points: number[],
  axes: geometric.Line[]
): geometric.Polygon =>
  points.map((p, i) => getPolygonEnd(axes[i], Math.max(p, 1e-14) / 10));
