import React from 'react';
import { View } from 'react-native';

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
          <S.Row>
            <S.Text>Combinação: </S.Text>
            <View style={{ width: 85 }}>
              <S.Bold>{polygonData.harmonization}</S.Bold>
            </View>
          </S.Row>
        )}
      </S.Expand>
    </S.Container>
  );
};

export default GraphScreen;
