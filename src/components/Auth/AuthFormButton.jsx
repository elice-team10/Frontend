import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Button = styled.button`
  padding: 1.8rem 3.2rem;
  margin: ${(props) => (props.type === 'cancel' ? '0' : '4.8rem 0 2.4rem')};
  border: ${(props) =>
    props.type === 'cancel' ? `1px solid ${theme.colors.border}` : 'none'};
  border-radius: 8px;
  font-size: ${theme.fontSizes.large};
  color: ${(props) =>
    props.type === 'cancel' ? theme.colors.text : theme.colors.textWhite};
  background-color: ${(props) =>
    props.type === 'cancel' ? theme.colors.background : theme.colors.primary};

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.type === 'cancel' ? '#e6e6e6' : theme.colors.accent};
  }
`;

AuthFormButton.defaultProps = {
  type: '',
};

export default function AuthFormButton({ text, onButtonClick, type }) {
  return (
    <Button type={type} onClick={onButtonClick}>
      {text}
    </Button>
  );
}
