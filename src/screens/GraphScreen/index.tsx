import React from 'react';

import { useHarmonization } from '../../hooks/useHarmonization';

import Graph from '../../components/Graph';

import * as S from './styles';

const GraphScreen: React.FC = () => {
  const { polygonData } = useHarmonization();

  return (
    <S.Container>
      <S.Expand flex={1} />
      <Graph />
      <S.Expand flex={2}>
        {polygonData && (
          <S.Text>
            Combinação:{' '}
            <S.Bold>
              {((polygonData.interArea / polygonData.unionArea) * 100).toFixed(
                2
              )}
              %
            </S.Bold>
          </S.Text>
        )}
      </S.Expand>
    </S.Container>
  );
};

export default GraphScreen;
