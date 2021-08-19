import React from 'react';

import { useHarmonization } from '../../hooks/useHarmonization';

import Graph from '../../components/Graph';

import * as S from './styles';

const GraphScreen: React.FC = () => {
  const { polygonData } = useHarmonization();

  return (
    <S.Container>
      <Graph />
      <S.Space size={34} />
      {polygonData && (
        <S.Text>
          Combinação:{' '}
          <S.Bold>
            {((polygonData.interArea / polygonData.unionArea) * 100).toFixed(2)}
            %
          </S.Bold>
        </S.Text>
      )}
    </S.Container>
  );
};

export default GraphScreen;
