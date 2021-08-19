import React from 'react';

import { useHarmonization } from '../../hooks/useHarmonization';

import Graph from '../../components/Graph';

import * as S from './styles';

const GraphScreen: React.FC = () => {
  const { wineArea, foodArea, interArea, unionArea } = useHarmonization();

  return (
    <S.Container>
      <S.Text>
        Área vinho: <S.Bold>{wineArea.toFixed(2)}</S.Bold>
      </S.Text>
      <S.Space size={20} />
      <S.Text>
        Área alimento: <S.Bold>{foodArea.toFixed(2)}</S.Bold>
      </S.Text>
      <S.Space size={20} />
      <S.Text>
        Área intersecção: <S.Bold>{interArea.toFixed(2)}</S.Bold>
      </S.Text>
      <S.Space size={20} />
      <S.Text>
        Área combinada: <S.Bold>{unionArea.toFixed(2)}</S.Bold>
      </S.Text>
      <S.Space size={34} />
      <Graph />
      <S.Space size={34} />
      <S.Text>
        Combinação:{' '}
        <S.Bold>{((interArea / unionArea) * 100).toFixed(2)}%</S.Bold>
      </S.Text>
    </S.Container>
  );
};

export default GraphScreen;
