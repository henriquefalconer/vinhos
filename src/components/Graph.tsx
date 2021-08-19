import React, { useState } from 'react';
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
  AXIS_SIZE,
  wineAngles,
  foodAngles,
  generatePolygonPath,
  getAxisEnd,
} from '../utils/radar';

import { useHarmonization } from '../hooks/useHarmonization';

import Knob from './Knob';

const Graph: React.FC = () => {
  const [posY, setPosY] = useState<number>();

  const {
    wineScores,
    foodScores,
    setWineScores,
    setFoodScores,
    winePolygon,
    foodPolygon,
    inter,
  } = useHarmonization();

  return (
    <View onLayout={(e) => setPosY(e.nativeEvent.layout.y)}>
      <Svg height="400" width="400">
        {Array.from({ length: 10 }, (_, i) => (
          <Circle
            key={i}
            cx="200"
            cy="200"
            r={`${(AXIS_SIZE / 10) * (i + 1)}`}
            stroke="#aaa"
            strokeWidth="2"
          />
        ))}
        {wineAngles.map((angle, i, _, [x, y] = getAxisEnd(angle, 15)) => (
          <Line
            key={i}
            x1="200"
            y1="200"
            x2={`${x}`}
            y2={`${y}`}
            stroke="white"
            strokeWidth="3.75"
          />
        ))}
        {foodAngles.map((angle, i, _, [x, y] = getAxisEnd(angle, 15)) => (
          <Line
            key={i}
            x1="200"
            y1="200"
            x2={`${x}`}
            y2={`${y}`}
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
        <Path d={generatePolygonPath(inter)} fill="#f003" stroke="red" />
      </Svg>
      {posY && (
        <>
          {wineScores.map((score, i, _, a = wineAngles[i]) => (
            <Knob
              key={i}
              score={score}
              graphYOffset={posY || 0}
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
              graphYOffset={posY || 0}
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
