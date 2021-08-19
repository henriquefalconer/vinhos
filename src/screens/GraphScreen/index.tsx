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
          <>
            <S.Text>Harmonização:</S.Text>
            <S.Bold>{polygonData.harmonization}</S.Bold>
          </>
        )}
      </S.Expand>
    </S.Container>
  );
};

export default GraphScreen;
