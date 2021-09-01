const geometric = require('geometric');

export const getPolygonArea = (p: geometric.Polygon): number =>
  geometric.polygonArea(p);

export const getPolygonCentroid = (p: geometric.Polygon): number =>
  geometric.polygonCentroid(p);

const getPolygonPoint = (
  [[x1, y1], [x2, y2]]: geometric.Line,
  multiplier: number
): geometric.Point => [
  x1 + (x2 - x1) * multiplier,
  y1 + (y2 - y1) * multiplier,
];

export const buildPolygon = (
  scores: number[],
  axes: geometric.Line[]
): geometric.Polygon => scores.map((s, i) => getPolygonPoint(axes[i], s / 10));

export const scalePolygon = (
  polygon: geometric.Polygon,
  oldAxisSize: number,
  center: number,
  axisSize: number
): geometric.Polygon =>
  polygon.map(([x, y]) => [
    ((x - oldAxisSize) / oldAxisSize) * axisSize + center,
    -((y - oldAxisSize) / oldAxisSize) * axisSize + center,
  ]);

export const invertLine = (line: geometric.Line, center: number) =>
  line.map(([x, y]) => [x, 2 * center - y]) as geometric.Line;
