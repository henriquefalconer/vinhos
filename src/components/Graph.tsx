import React from 'react';
import { View } from 'react-native';
import { Svg, Circle, Line, Path } from 'react-native-svg';

import {
  wineAngles,
  foodAngles,
  generatePolygonPath,
  getAxisEnd,
} from '../utils/radar';

import { useHarmonization } from '../hooks/useHarmonization';

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
            {[...wineAngles, ...foodAngles].map(
              (
                angle,
                i,
                _,
                [x, y] = getAxisEnd(
                  angle,
                  polygonData.axisSize,
                  polygonData.graphCenter,
                  15
                )
              ) => (
                <Line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x}`}
                  y2={`${y}`}
                  stroke="white"
                  strokeWidth="2.5"
                />
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
