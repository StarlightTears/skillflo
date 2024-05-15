import styled from '@emotion/styled';

interface VerticalLineProps {
  margin?: number;
  height?: number;
}

const VerticalLine = styled.span<VerticalLineProps>`
  display: inline-block;
  width: 0.1rem;
  height: ${(props) => props.height || 1.2}rem;
  margin: 0 ${(props) => (props.margin || 10) / 10}rem;
  border-radius: 0.05rem;

  background-color: var(--legacy-color-gray-200);
`;

export default VerticalLine;
