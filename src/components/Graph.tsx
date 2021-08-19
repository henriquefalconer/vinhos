import React from 'react';
import geometric from 'geometric';
import {
  Svg,
  Circle,
  Line,
  Path,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';

import { wineAngles, foodAngles, generatePolygonPath } from '../utils/radar';

interface GraphProps {
  winePolygon: geometric.Polygon;
  foodPolygon: geometric.Polygon;
  intersection?: geometric.Polygon;
}

const Graph: React.FC<GraphProps> = ({
  winePolygon,
  foodPolygon,
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
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#5900ff" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#66e200" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="rgb(255,255,0)" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="rgb(255,0,0)" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>
      <Path
        d={generatePolygonPath(winePolygon)}
        fill="url(#grad1)"
        stroke="white"
      />
      <Path
        d={generatePolygonPath(foodPolygon)}
        fill="url(#grad2)"
        stroke="white"
      />
      {intersection && (
        <>
          <Path
            d={generatePolygonPath(intersection)}
            fill="#f003"
            stroke="red"
          />
          {intersection.map(([x, y], i) => (
            <Circle
              key={`${x}-${y}-${i}`}
              cx={`${x}`}
              cy={`${y}`}
              r="3"
              stroke="red"
              strokeWidth="2"
            />
          ))}
        </>
      )}
    </Svg>
  );
};

export default Graph;
