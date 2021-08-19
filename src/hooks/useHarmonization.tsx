import React, { createContext, useContext, useMemo, useState } from 'react';
import geometric from 'geometric';

import {
  buildPolygon,
  getIntersectionPolygon,
  getPolygonArea,
} from '../utils/polygon';
import { foodAngles, wineAngles } from '../utils/radar';

interface HarmonizationContextData {
  winePolygon: geometric.Polygon;
  foodPolygon: geometric.Polygon;
  inter: geometric.Point[];
  wineArea: number;
  foodArea: number;
  interArea: number;
  unionArea: number;
  setWineScores: React.Dispatch<React.SetStateAction<number[]>>;
  setFoodScores: React.Dispatch<React.SetStateAction<number[]>>;
}

const HarmonizationContext = createContext<HarmonizationContextData>(
  {} as HarmonizationContextData
);

export const HarmonizationProvider: React.FC = ({ children }) => {
  const [wineScores, setWineScores] = useState([10, 7, 10]);
  const [foodScores, setFoodScores] = useState([4, 8, 10, 2, 9, 1]);

  const polygonData = useMemo(() => {
    const winePolygon = buildPolygon(wineScores, wineAngles);
    const foodPolygon = buildPolygon(foodScores, foodAngles);

    const inter = getIntersectionPolygon(winePolygon, foodPolygon);

    const [wineArea, foodArea, interArea] = [
      winePolygon,
      foodPolygon,
      inter,
    ].map(getPolygonArea);

    const unionArea = wineArea + foodArea - interArea;

    return {
      winePolygon,
      foodPolygon,
      inter,
      wineArea,
      foodArea,
      interArea,
      unionArea,
    };
  }, [wineScores, foodScores]);

  return (
    <HarmonizationContext.Provider
      value={{ ...polygonData, setWineScores, setFoodScores }}
    >
      {children}
    </HarmonizationContext.Provider>
  );
};

export const useHarmonization = () => useContext(HarmonizationContext);
