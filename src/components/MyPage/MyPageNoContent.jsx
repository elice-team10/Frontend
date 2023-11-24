import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const NoContent = styled.section`
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: ${theme.fontSizes.subtitle};
`;

export default function MyPageNoContent({ text }) {
  return <NoContent>{text}</NoContent>;
}
