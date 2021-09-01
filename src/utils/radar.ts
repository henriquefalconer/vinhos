import geometric from 'geometric';

const covertAngle = (a: number) => ((90 - a) * Math.PI) / 180;

const wineAngles = [0, 120, 240].map(covertAngle);
const foodAngles = [49, 71, 169, 191, 289, 311].map(covertAngle);

export const generatePolygonPath = (points: geometric.Polygon) =>
  'M ' + [...points, points[0]].map(([x, y]) => `${x}, ${y}`);

const getAxisEnd = (
  angle: number,
  axisSize: number,
  center: number,
  offset = 0
): geometric.Point => [
  center + (axisSize + offset) * Math.cos(angle),
  center + (axisSize + offset) * Math.sin(angle),
];

const PARALLEL_DISTANCE = 14 / 390;

const getParallelAxes = (line: geometric.Line, width: number, offset = 0) => {
  const a = line[0][0],
    b = line[0][1],
    c = line[1][0],
    d = line[1][1],
    offA = a + (c - a) * offset,
    offB = b + (d - b) * offset,
    size = Math.sqrt((c - a) ** 2 + (d - b) ** 2),
    nx = ((b - d) / size) * PARALLEL_DISTANCE * width,
    ny = ((c - a) / size) * PARALLEL_DISTANCE * width,
    p1 = [
      [offA + nx, offB + ny],
      [c + nx, d + ny],
    ],
    p2 = [
      [offA - nx, offB - ny],
      [c - nx, d - ny],
    ];

  return [p1, p2] as [geometric.Line, geometric.Line];
};

export const getWineAxes = (
  axisSize: number,
  center = axisSize,
  offsetOut = 0,
  offsetIn = 0
) =>
  wineAngles.flatMap((angle) =>
    getParallelAxes(
      [[center, center], getAxisEnd(angle, axisSize, center, offsetOut)],
      2 * center,
      offsetIn
    )
  );

export const getFoodAxes = (axisSize: number, center = axisSize, offset = 0) =>
  foodAngles.map(
    (angle) =>
      [
        [center, center],
        getAxisEnd(angle, axisSize, center, offset),
      ] as geometric.Line
  );
