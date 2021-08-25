import React, { createContext, useContext, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import geometric from 'geometric';

import { buildPolygon, getPolygonArea } from '../utils/polygon';
import { getWineAxes, getFoodAxes } from '../utils/radar';

export interface PolygonData {
  graphCenter: number;
  axisSize: number;
  winePolygon: geometric.Polygon;
  foodPolygon: geometric.Polygon;
  wineArea: number;
  foodArea: number;
  areaDiff: number;
}

interface HarmonizationContextData {
  wineScores: number[];
  foodScores: number[];
  setWineScores: React.Dispatch<React.SetStateAction<number[]>>;
  setFoodScores: React.Dispatch<React.SetStateAction<number[]>>;
  polygonData: PolygonData;
}

const HarmonizationContext = createContext<HarmonizationContextData>(
  {} as HarmonizationContextData
);

export const HarmonizationProvider: React.FC = ({ children }) => {
  const [wineScores, setWineScores] = useState([10, 9, 1, 1, 3, 7]);
  const [foodScores, setFoodScores] = useState([4, 3, 4, 10, 6, 5]);

  const { width } = useWindowDimensions();

  const polygonData = useMemo(() => {
    const graphCenter = width / 2;
    const axisSize = width * (175 / 390);

    const axesWine = getWineAxes(axisSize, graphCenter);
    const axesFood = getFoodAxes(axisSize, graphCenter);

    const winePolygon = buildPolygon(wineScores, axesWine);
    const foodPolygon = buildPolygon(foodScores, axesFood);

    const [wineArea, foodArea] = [winePolygon, foodPolygon].map(
      (p) => getPolygonArea(p) / width ** 2
    );

    const areaDiff = Math.abs(wineArea - foodArea);

    return {
      winePolygon,
      foodPolygon,
      wineArea,
      foodArea,
      graphCenter,
      axisSize,
      areaDiff,
    };
  }, [wineScores, foodScores]);

  return (
    <HarmonizationContext.Provider
      value={{
        wineScores,
        foodScores,
        setWineScores,
        setFoodScores,
        polygonData,
      }}
    >
      {children}
    </HarmonizationContext.Provider>
  );
};

export const useHarmonization = () => useContext(HarmonizationContext);
