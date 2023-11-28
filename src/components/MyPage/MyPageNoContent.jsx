import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const NoContent = styled.section`
  display: flex;
  align-items: center;
  margin: 0 auto !important;
  font-size: ${theme.fontSizes.subtitle};

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.large};
  }
`;

export default function MyPageNoContent({ text }) {
  return <NoContent>{text}</NoContent>;
}
