import keySort from './keySort';

import { getAxisEnd } from './radar';

const geometric = require('geometric');

const getLineIntersection = (
  l1: geometric.Line,
  l2: geometric.Line
): geometric.Point | null => {
  const a = l1[0][0],
    b = l1[0][1],
    c = l1[1][0],
    d = l1[1][1],
    e = l2[0][0],
    f = l2[0][1],
    g = l2[1][0],
    h = l2[1][1],
    det = (c - a) * (f - h) - (d - b) * (e - g);

  if (!det) return null;

  const alpha = ((e - a) * (f - h) + (f - b) * (g - e)) / det;
  const beta = ((e - a) * (b - d) + (f - b) * (c - a)) / det;

  if (alpha <= 0 || alpha >= 1 || beta <= 0 || beta >= 1) return null;

  return [a + alpha * (c - a), b + alpha * (d - b)];
};

const getIntersectionPoints = (
  p1: geometric.Polygon,
  p2: geometric.Polygon
) => {
  const intersections: geometric.Point[] = [];

  for (let i = 0; i < p1.length; i++) {
    for (let j = i; j < p2.length; j++) {
      const line1: geometric.Line = [p1[i], p1[(i + 1) % p1.length]];
      const line2: geometric.Line = [p2[j], p2[(j + 1) % p2.length]];

      const inter = getLineIntersection(line1, line2);

      if (inter) intersections.push(inter);
    }
  }

  return intersections;
};

const getAngle = (p: geometric.Point): number => {
  const angle: number = 90 + geometric.lineAngle([[200, 200], p]);
  return angle < 0 ? 360 + angle : angle;
};

const getPointsInPolygon = (p1: geometric.Polygon, p2: geometric.Polygon) =>
  p1.filter((point) => geometric.pointInPolygon(point, p2));

export const getIntersectionPolygon = (
  p1: geometric.Polygon,
  p2: geometric.Polygon
) => {
  const points1 = getPointsInPolygon(p1, p2);
  const points2 = getPointsInPolygon(p2, p1);

  const inter = getIntersectionPoints(p1, p2);

  return keySort([...points1, ...points2, ...inter], getAngle);
};

export const getPolygonArea = (p: geometric.Polygon) =>
  geometric.polygonArea(p) / 200;

export const buildPolygon = (
  points: number[],
  angles: number[]
): geometric.Polygon =>
  points.map((p, i, _, a = angles[i]) =>
    getAxisEnd(a, 0, Math.max(p, 1e-14) / 10)
  );
