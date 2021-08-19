import styled from 'styled-components/native';

interface ExpandProps {
  flex: number;
}

export const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export const Text = styled.Text`
  color: white;
  font-size: 22px;
  text-align: center;
`;

export const Bold = styled(Text)`
  font-weight: 600;
  margin-top: 4px;
`;

export const Expand = styled.View<ExpandProps>`
  flex: ${(props) => props.flex};
  justify-content: center;
`;
