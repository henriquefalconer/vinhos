import React, { createContext, useContext, useMemo, useState } from 'react';
import { LayoutRectangle } from 'react-native';
import geometric from 'geometric';

import { buildPolygon, getPolygonArea } from '../utils/polygon';
import { foodAngles, wineAngles } from '../utils/radar';

export interface PolygonData {
  graphCenter: number;
  graphPosY: number;
  axisSize: number;
  winePolygon: geometric.Polygon;
  foodPolygon: geometric.Polygon;
  wineArea: number;
  foodArea: number;
  difference: string;
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
  const [wineScores, setWineScores] = useState([10, 9, 1, 1, 3, 7]);
  const [foodScores, setFoodScores] = useState([4, 3, 4, 10, 6, 5]);

  const [graphLayout, setGraphLayout] = useState<LayoutRectangle>();

  const polygonData = useMemo(() => {
    if (!graphLayout) return;

    const graphCenter = graphLayout.width / 2;
    const graphPosY = graphLayout.y;
    const axisSize = graphCenter - 20;

    const winePolygon = buildPolygon(
      wineScores,
      wineAngles,
      graphCenter,
      axisSize
    );
    const foodPolygon = buildPolygon(
      foodScores,
      foodAngles,
      graphCenter,
      axisSize
    );

    const [wineArea, foodArea] = [winePolygon, foodPolygon].map(getPolygonArea);

    const difference = Math.abs(wineArea - foodArea).toFixed(2);

    return {
      winePolygon,
      foodPolygon,
      wineArea,
      foodArea,
      graphCenter,
      graphPosY,
      axisSize,
      difference,
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
