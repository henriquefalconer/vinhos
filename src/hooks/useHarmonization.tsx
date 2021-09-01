import React, { createContext, useContext, useMemo, useState } from 'react';
import geometric from 'geometric';

import { buildPolygon, getPolygonArea } from '../utils/polygon';
import { getWineAxes, getFoodAxes } from '../utils/radar';

export interface PolygonData {
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

export const AXIS_SIZE = 10;

export const HarmonizationProvider: React.FC = ({ children }) => {
  const [wineScores, setWineScores] = useState([10, 10, 10, 10, 10, 10]);
  const [foodScores, setFoodScores] = useState([6, 4, 4, 5, 3, 4]);

  const polygonData = useMemo(() => {
    const axesWine = getWineAxes(AXIS_SIZE);
    const axesFood = getFoodAxes(AXIS_SIZE);

    const winePolygon = buildPolygon(wineScores, axesWine);
    const foodPolygon = buildPolygon(foodScores, axesFood);

    const [wineArea, foodArea] = [winePolygon, foodPolygon].map(getPolygonArea);

    const areaDiff = Math.abs(wineArea - foodArea);

    return {
      winePolygon,
      foodPolygon,
      wineArea,
      foodArea,
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
