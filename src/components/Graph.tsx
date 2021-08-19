import React from 'react';
import { View } from 'react-native';
import {
  Svg,
  Circle,
  Line,
  Path,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';

import {
  wineAngles,
  foodAngles,
  generatePolygonPath,
  getAxisEnd,
} from '../utils/radar';

import { useHarmonization } from '../hooks/useHarmonization';

import Knob from './Knob';

const Graph: React.FC = () => {
  const {
    wineScores,
    foodScores,
    setWineScores,
    setFoodScores,
    setGraphLayout,
    polygonData,
  } = useHarmonization();

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
            {wineAngles.map(
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
                  strokeWidth="3.75"
                />
              )
            )}
            {foodAngles.map(
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
            <Defs>
              <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#5900ff" stopOpacity="0.6" />
                <Stop offset="100%" stopColor="#66e200" stopOpacity="0.6" />
              </LinearGradient>
              <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop
                  offset="0%"
                  stopColor="rgb(255,255,0)"
                  stopOpacity="0.6"
                />
                <Stop
                  offset="100%"
                  stopColor="rgb(255,0,0)"
                  stopOpacity="0.6"
                />
              </LinearGradient>
            </Defs>
            <>
              <Path
                d={generatePolygonPath(polygonData.winePolygon)}
                fill="url(#grad1)"
                stroke="white"
              />
              <Path
                d={generatePolygonPath(polygonData.foodPolygon)}
                fill="url(#grad2)"
                stroke="white"
              />
              <Path
                d={generatePolygonPath(polygonData.inter)}
                fill="#f003"
                stroke="red"
              />
            </>
          </Svg>
          {wineScores.map((score, i, _, a = wineAngles[i]) => (
            <Knob
              key={i}
              score={score}
              onChange={(v) =>
                setWineScores((scores) => {
                  scores[i] = v;
                  return [...scores];
                })
              }
              angle={a}
            />
          ))}

          {foodScores.map((score, i, _, a = foodAngles[i]) => (
            <Knob
              key={i}
              score={score}
              onChange={(v) =>
                setFoodScores((scores) => {
                  scores[i] = v;
                  return [...scores];
                })
              }
              angle={a}
            />
          ))}
        </>
      )}
    </View>
  );
};

export default Graph;
