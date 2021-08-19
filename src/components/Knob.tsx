import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import geometric from 'geometric';

import Svg, { Circle } from 'react-native-svg';

import { AXIS_SIZE, getAxisEnd } from '../utils/radar';

interface KnobProps {
  graphYOffset: number;
  score: number;
  onChange(value: number): void;
  angle: number;
}

const KNOB_SIZE = 50;

const distanceSquared = (p1: geometric.Point, p2: geometric.Point) =>
  (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;

const Knob: React.FC<KnobProps> = ({
  graphYOffset,
  score,
  onChange,
  angle,
}) => {
  const firstUpdate = useRef(true);

  const [value, setValue] = useState(score);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const pan = useRef(new Animated.ValueXY()).current;

  const [axisEndX, axisEndY] = getAxisEnd(angle);

  const posX = pan.x.interpolate({
    inputRange: [0, 10],
    outputRange: [200, axisEndX],
    extrapolate: 'clamp',
  });
  const posY = pan.y.interpolate({
    inputRange: [0, 10],
    outputRange: [200, axisEndY],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(pan, {
      toValue: value,
      duration: firstUpdate.current ? 400 : 0,
      useNativeDriver: false,
    }).start();
    firstUpdate.current = false;
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const posX = gestureState.moveX;
        const posY = gestureState.moveY - graphYOffset;

        const toCenter = distanceSquared([200, 200], [posX, posY]);
        const toEnd = distanceSquared([axisEndX, axisEndY], [posX, posY]);
        const distance = (toCenter - toEnd + AXIS_SIZE ** 2) / (2 * AXIS_SIZE);

        const treatedValue = Math.round(
          Math.min(Math.max((distance / AXIS_SIZE) * 10, 0), 10)
        );

        setValue(treatedValue);
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: -KNOB_SIZE / 2,
        left: -KNOB_SIZE / 2,
        transform: [{ translateX: posX }, { translateY: posY }],
      }}
      {...panResponder.panHandlers}
    >
      <Svg height={`${KNOB_SIZE}`} width={`${KNOB_SIZE}`}>
        <Circle
          cx={`${KNOB_SIZE / 2}`}
          cy={`${KNOB_SIZE / 2}`}
          r="6"
          stroke="white"
          strokeWidth="3"
        />
      </Svg>
    </Animated.View>
  );
};

export default Knob;