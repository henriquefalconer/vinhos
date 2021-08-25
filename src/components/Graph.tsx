import React from 'react';
import geometric from 'geometric';
import { View } from 'react-native';
import { Svg, Circle, Line, Path } from 'react-native-svg';

import { generatePolygonPath, getWineAxes, getFoodAxes } from '../utils/radar';

import { useHarmonization } from '../hooks/useHarmonization';

interface AxisProps {
  line: geometric.Line;
}

const Axis: React.FC<AxisProps> = ({ line: [[x1, y1], [x2, y2]] }) => (
  <Line
    x1={`${x1}`}
    y1={`${y1}`}
    x2={`${x2}`}
    y2={`${y2}`}
    stroke="white"
    strokeWidth="2.5"
  />
);

const Graph: React.FC = () => {
  const { setGraphLayout, polygonData } = useHarmonization();

  return (
    <View
      style={{ aspectRatio: 1, width: '100%' }}
      onLayout={(e) => setGraphLayout(e.nativeEvent.layout)}
    >
      {polygonData && (
        <>
          <Svg height="100%" width="100%">
            {Array.from({ length: 10 }, (_, i) => (
              <Circle
                key={i}
                cx="50%"
                cy="50%"
                r={`${(polygonData.axisSize / 10) * (i + 1)}`}
                stroke="#aaa"
                strokeWidth="2"
              />
            ))}
            {getWineAxes(
              polygonData.axisSize,
              polygonData.graphCenter,
              0.05,
              15
            ).map((line, i) => (
              <Axis key={i} line={line} />
            ))}
            {getFoodAxes(polygonData.axisSize, polygonData.graphCenter, 15).map(
              (line, i) => (
                <Axis key={i} line={line} />
              )
            )}
            <Path
              d={generatePolygonPath(polygonData.winePolygon)}
              fill="#5900ff9b"
              stroke="white"
            />
            <Path
              d={generatePolygonPath(polygonData.foodPolygon)}
              fill="#ffff0099"
              stroke="white"
            />
          </Svg>
        </>
      )}
    </View>
  );
};

export default Graph;
