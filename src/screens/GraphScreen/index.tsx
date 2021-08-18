import React from 'react';

import { getIntersectionPolygon, getPolygonArea } from '../../utils/polygon';
import { buildPolygon, wineAngles, foodAngles } from '../../utils/radar';

import Graph from '../../components/Graph';

import * as S from './styles';

const wineScores = [10, 7, 10];
const foodScores = [1, 4, 8, 10, 7, 9];

const winePolygon = buildPolygon(wineScores, wineAngles);
const foodPolygon = buildPolygon(foodScores, foodAngles);

const inter = getIntersectionPolygon(winePolygon, foodPolygon);

const [wineArea, foodArea, interArea] = [winePolygon, foodPolygon, inter].map(
  getPolygonArea
);

const unionArea = wineArea + foodArea - interArea;

const GraphScreen: React.FC = () => {
  return (
    <S.Container>
      <S.Text>Vinho: {wineArea.toFixed(2)}</S.Text>
      <S.Space size={20} />
      <S.Text>Alimento: {foodArea.toFixed(2)}</S.Text>
      <S.Space size={20} />
      <S.Text>Área combinada: {unionArea.toFixed(2)}</S.Text>
      <S.Space size={34} />
      <Graph wineScores={wineScores} foodScores={foodScores} />
      <S.Space size={34} />
      <S.Text>Combinação: {((interArea / unionArea) * 100).toFixed(2)}%</S.Text>
    </S.Container>
  );
};

export default GraphScreen;
