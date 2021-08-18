import React from 'react';
import { Svg, Circle, Line, Path } from 'react-native-svg';

import { wineAngles, foodAngles, generatePointsPath } from '../utils/radar';

interface GraphProps {
  wineScores: number[];
  foodScores: number[];
}

const Graph: React.FC<GraphProps> = ({ wineScores, foodScores }) => {
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
        fill="#a262f552"
        stroke="white"
      />
      <Path
        d={generatePointsPath(foodScores, foodAngles)}
        fill="#1ed44552"
        stroke="white"
      />
    </Svg>
  );
};

export default Graph;
