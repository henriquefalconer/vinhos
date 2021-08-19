import React, { createContext, useContext, useMemo, useState } from 'react';
import { LayoutRectangle } from 'react-native';
import geometric from 'geometric';

import {
  buildPolygon,
  getIntersectionPolygon,
  getPolygonArea,
} from '../utils/polygon';
import { foodAngles, wineAngles } from '../utils/radar';

export interface PolygonData {
  graphHalfWidth: number;
  graphPosY: number;
  axisSize: number;
  winePolygon: geometric.Polygon;
  foodPolygon: geometric.Polygon;
  inter: geometric.Point[];
  wineArea: number;
  foodArea: number;
  interArea: number;
  unionArea: number;
  harmonization: string;
}

interface HarmonizationContextData {
  wineScores: number[];
  foodScores: number[];
  setWineScores: React.Dispatch<React.SetStateAction<number[]>>;
  setFoodScores: React.Dispatch<React.SetStateAction<number[]>>;
  setGraphLayout: React.Dispatch<
    React.SetStateAction<LayoutRectangle | undefined>
  >;
  polygonData?: PolygonData;
}

const HarmonizationContext = createContext<HarmonizationContextData>(
  {} as HarmonizationContextData
);

export const HarmonizationProvider: React.FC = ({ children }) => {
  const [wineScores, setWineScores] = useState([10, 7, 10]);
  const [foodScores, setFoodScores] = useState([4, 8, 10, 2, 9, 1]);

  const [graphLayout, setGraphLayout] = useState<LayoutRectangle>();

  const polygonData = useMemo(() => {
    if (!graphLayout) return;

    const graphHalfWidth = graphLayout.width / 2;
    const graphPosY = graphLayout.y;
    const axisSize = graphHalfWidth - 20;

    const winePolygon = buildPolygon(
      wineScores,
      wineAngles,
      graphHalfWidth,
      axisSize
    );
    const foodPolygon = buildPolygon(
      foodScores,
      foodAngles,
      graphHalfWidth,
      axisSize
    );

    const inter = getIntersectionPolygon(
      winePolygon,
      foodPolygon,
      graphHalfWidth
    );

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
      graphHalfWidth,
      graphPosY,
      axisSize,
      harmonization: `${((interArea / unionArea) * 100).toFixed(2)}%`,
    };
  }, [wineScores, foodScores, graphLayout]);

  return (
    <HarmonizationContext.Provider
      value={{
        wineScores,
        foodScores,
        setWineScores,
        setFoodScores,
        setGraphLayout,
        polygonData,
      }}
    >
      {children}
    </HarmonizationContext.Provider>
  );
};

export const useHarmonization = () => useContext(HarmonizationContext);
