import { getAxisEnd } from './radar';

const geometric = require('geometric');

export const getPolygonArea = (p: geometric.Polygon) =>
  geometric.polygonArea(p) / 319.5;

export const buildPolygon = (
  points: number[],
  angles: number[],
  center: number,
  axisSize: number
): geometric.Polygon =>
  points.map((p, i, _, a = angles[i]) =>
    getAxisEnd(a, axisSize, center, 0, Math.max(p, 1e-14) / 10)
  );
