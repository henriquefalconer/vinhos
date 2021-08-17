import React from 'react';
import geometric from 'geometric';
import { Svg, Circle, Line, Path } from 'react-native-svg';

import {
  wineAngles,
  foodAngles,
  generatePointsPath,
  generatePolygonPath,
} from '../utils/radar';

interface GraphProps {
  wineScores: number[];
  foodScores: number[];
  intersection: geometric.Polygon;
}

const Graph: React.FC<GraphProps> = ({
  wineScores,
  foodScores,
  intersection,
}) => {
  return (
    <Svg height="400" width="400">
      {Array.from({ length: 10 }, (_, i) => (
        <Circle
          key={i}
          cx="200"
          cy="200"
          r={`${18 * (i + 1)}`}
          stroke="#aaa"
          strokeWidth="2"
        />
      ))}
      {wineAngles.map((angle, i) => (
        <Line
          key={i}
          x1="200"
          y1="200"
          x2={`${200 + 195 * Math.cos(angle)}`}
          y2={`${200 + 195 * Math.sin(angle)}`}
          stroke="white"
          strokeWidth="3.75"
        />
      ))}
      {foodAngles.map((angle, i) => (
        <Line
          key={i}
          x1="200"
          y1="200"
          x2={`${200 + 195 * Math.cos(angle)}`}
          y2={`${200 + 195 * Math.sin(angle)}`}
          stroke="white"
          strokeWidth="2.5"
        />
      ))}
      <Path
        d={generatePointsPath(wineScores, wineAngles)}
        fill="#f0f5"
        stroke="purple"
      />
      <Path
        d={generatePointsPath(foodScores, foodAngles)}
        fill="#ff05"
        stroke="yellow"
      />
      <Path d={generatePolygonPath(intersection)} fill="#f005" stroke="red" />
      {intersection.map(([x, y]) => (
        <Circle
          key={`${x}-${y}`}
          cx={`${x}`}
          cy={`${y}`}
          r="3"
          stroke="red"
          strokeWidth="2"
        />
      ))}
    </Svg>
  );
};

export default Graph;
