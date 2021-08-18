import styled from 'styled-components/native';

interface SizeProps {
  size: number;
}

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Text = styled.Text`
  color: white;
  font-size: 22px;
  text-align: center;
`;

export const Bold = styled.Text`
  font-weight: 600;
`;

export const Space = styled.View<SizeProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
