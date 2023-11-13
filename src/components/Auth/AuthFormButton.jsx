import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Button = styled.button`
  padding: 1.8rem 3.2rem;
  margin: 4.8rem 0 2.4rem;
  border: none;
  border-radius: 8px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.textWhite};
  background-color: ${theme.colors.primary};

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

export default function AuthFormButton({ text, onButtonClick }) {
  return <Button onClick={onButtonClick}>{text}</Button>;
}
