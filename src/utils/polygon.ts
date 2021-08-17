import keySort from './keySort';

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
    det = c * f - b * g - a * f - c * h + b * e + a * h + d * g - d * e;

  if (!det) return null;

  const alpha = ((e - a) * (f - h) + (f - b) * (g - e)) / det;
  const beta = ((e - a) * (b - d) + (f - b) * (c - a)) / det;

  if (alpha <= 0 || alpha >= 1 || beta <= 0 || beta >= 1) return null;

  return [a + alpha * (c - a), b + alpha * (d - b)];
};

const getAngle = (p: geometric.Point): number | null => {
  if (!p) return null;
  const angle: number = 90 + geometric.lineAngle([[200, 200], p]);
  return angle < 0 ? 360 + angle : angle;
};

const getPointsInPolygon = (p1: geometric.Polygon, p2: geometric.Polygon) =>
  keySort(
    p1.filter((point) => geometric.pointInPolygon(point, p2)),
    (p) => getAngle(p) as number
  );

export const getIntersectionPolygon = (
  p1: geometric.Polygon,
  p2: geometric.Polygon
) => {
  const intersections: geometric.Point[] = [];

  const points = getPointsInPolygon(p2, p1);

  let intersectionAngle = 0;
  let interiorPointAngle = getAngle(points?.[0]);

  // Sequencialmente adicionar pontos internos de p2 a intersections.
  const addP2InternalPoints = () => {
    if (!interiorPointAngle || interiorPointAngle >= intersectionAngle)
      return false;

    const newPoint = points.shift() as geometric.Point;

    intersections.push(newPoint);

    interiorPointAngle = getAngle(points?.[0]);

    return true;
  };

  // Sequencialmente adicionar pontos internos de p2 ao polígono.
  const addNextPoints = (i: number, j: number) => {
    const line1: geometric.Line = [p1[i], p1[(i + 1) % p1.length]];
    const line2: geometric.Line = [p2[j], p2[(j + 1) % p2.length]];

    const inter = getLineIntersection(line1, line2);

    if (inter) {
      intersectionAngle = getAngle(inter) as number;

      while (addP2InternalPoints()) {}

      intersections.push(inter);
    }
  };

  for (let i = 0; i < p1.length; i++) {
    if (geometric.pointInPolygon(p1[i], p2)) intersections.push(p1[i]);

    for (let j = i; j < p2.length; j++) addNextPoints(i, j);
  }

  addNextPoints(p1.length - 1, 0);

  intersectionAngle = 360;

  while (addP2InternalPoints()) {}

  return intersections;
};

export const getPolygonArea = (p: geometric.Polygon) =>
  geometric.polygonArea(p) / 200;
