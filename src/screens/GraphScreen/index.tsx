import React from 'react';
import { View } from 'react-native';

import { useHarmonization } from '../../hooks/useHarmonization';

import Graph from '../../components/Graph';

import * as S from './styles';

const GraphScreen: React.FC = () => {
  const { wineArea, foodArea, areaDiff } = useHarmonization().polygonData;

  return (
    <S.Container>
      <S.Expand flex={1} />
      <Graph />
      <S.Expand flex={2}>
        <S.Text>
          Área vinho: <S.Bold>{wineArea.toFixed(2)}</S.Bold>
        </S.Text>
        <S.Size size={16} />
        <S.Text>
          Área alimento: <S.Bold>{foodArea.toFixed(2)}</S.Bold>
        </S.Text>
        <S.Size size={16} />
        <S.Text>
          Diferença de áreas: <S.Bold>{areaDiff.toFixed(2)}</S.Bold>
        </S.Text>
      </S.Expand>
    </S.Container>
  );
};

export default GraphScreen;
