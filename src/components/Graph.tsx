import React from 'react';
import geometric from 'geometric';
import { useWindowDimensions, View } from 'react-native';
import { Svg, Circle, Line, Path } from 'react-native-svg';

import { generatePolygonPath, getWineAxes, getFoodAxes } from '../utils/radar';
import { invertLine, scalePolygon } from '../utils/polygon';

import { AXIS_SIZE, useHarmonization } from '../hooks/useHarmonization';

interface AxisProps {
  line: geometric.Line;
}

const Axis: React.FC<AxisProps> = ({ line: [[x1, y1], [x2, y2]] }) => (
  <Line {...{ x1, y1, x2, y2 }} stroke="white" strokeWidth="2.5" />
);

const Graph: React.FC = () => {
  const { winePolygon, foodPolygon } = useHarmonization().polygonData;

  const { width } = useWindowDimensions();

  const graphCenter = width / 2;
  const newAxisSize = graphCenter - 20;

  const [scaledWinePoly, scaledFoodPoly] = [winePolygon, foodPolygon].map((p) =>
    scalePolygon(p, AXIS_SIZE, graphCenter, newAxisSize)
  );

  return (
    <View style={{ aspectRatio: 1, width: '100%' }}>
      <Svg height="100%" width="100%">
        {Array.from({ length: 10 }, (_, i) => (
          <Circle
            key={i}
            cx="50%"
            cy="50%"
            r={`${(newAxisSize / 10) * (i + 1)}`}
            stroke="#aaa"
            strokeWidth="2"
          />
        ))}
        {getWineAxes(newAxisSize, graphCenter, 15, 0.06).map((line, i) => (
          <Axis key={i} line={invertLine(line, graphCenter)} />
        ))}
        {getFoodAxes(newAxisSize, graphCenter, 15).map((line, i) => (
          <Axis key={i} line={invertLine(line, graphCenter)} />
        ))}
        <Path
          d={generatePolygonPath(scaledWinePoly)}
          fill="#5900ff9b"
          stroke="white"
        />
        <Path
          d={generatePolygonPath(scaledFoodPoly)}
          fill="#ffff0099"
          stroke="white"
        />
      </Svg>
    </View>
  );
};

export default Graph;
