import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const NoContent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto !important;
  width: 86rem;
  font-size: ${theme.fontSizes.subtitle};
  height: 25vh;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.large};
  }
`;

export default function MyPageNoContent({ text }) {
  return <NoContent>{text}</NoContent>;
}
