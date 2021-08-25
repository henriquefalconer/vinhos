import geometric from 'geometric';

const covertAngle = (a: number) => ((a - 90) * Math.PI) / 180;

const wineAngles = [0, 120, 240].map(covertAngle);
const foodAngles = [49, 71, 169, 191, 289, 311].map(covertAngle);

export const generatePolygonPath = (points: geometric.Polygon) =>
  'M ' + [...points, points[0]].map(([x, y]) => `${x}, ${y}`);

const getAxisEnd = (
  angle: number,
  axisSize: number,
  center: number,
  offset = 0,
  multiplier = 1
): geometric.Point => [
  center + (axisSize + offset) * multiplier * Math.cos(angle),
  center + (axisSize + offset) * multiplier * Math.sin(angle),
];

const PARALLEL_DISTANCE = 14;

const getParallelAxes = (line: geometric.Line, offset = 0) => {
  const a = line[0][0],
    b = line[0][1],
    c = line[1][0],
    d = line[1][1],
    offX = (c - a) * offset,
    offY = (d - b) * offset,
    size = Math.sqrt((c - a) ** 2 + (d - b) ** 2),
    nx = ((b - d) / size) * PARALLEL_DISTANCE,
    ny = ((c - a) / size) * PARALLEL_DISTANCE,
    p1 = [
      [a - nx + offX, b - ny + offY],
      [c - nx, d - ny],
    ],
    p2 = [
      [a + nx + offX, b + ny + offY],
      [c + nx, d + ny],
    ];

  return [p1, p2] as [geometric.Line, geometric.Line];
};

export const getWineAxes = (
  axisSize: number,
  center: number,
  offsetOut = 0,
  offsetIn = 0
) =>
  wineAngles.flatMap((angle) =>
    getParallelAxes(
      [[center, center], getAxisEnd(angle, axisSize, center, offsetOut)],
      offsetIn
    )
  );

export const getFoodAxes = (axisSize: number, center: number, offset = 0) =>
  foodAngles.map(
    (a) =>
      [
        [center, center],
        getAxisEnd(a, axisSize, center, offset),
      ] as geometric.Line
  );
