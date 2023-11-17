import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Button = styled.button`
  padding: 1.8rem 3.2rem;
  margin: ${(props) => (props.type === 'cancel' ? '0' : '1.6rem 0')};
  border: ${(props) =>
    props.type === 'cancel' ? `1px solid ${theme.colors.border}` : 'none'};
  border-radius: 12px;
  font-size: ${theme.fontSizes.large};
  color: ${(props) =>
    props.type === 'cancel' ? theme.colors.text : theme.colors.textWhite};
  background-color: ${(props) =>
    props.type === 'cancel' ? theme.colors.background : theme.colors.primary};

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.type === 'cancel' ? '#ddd' : theme.colors.accent};
    filter: brightness(1.15);
  }
`;

AuthFormButton.defaultProps = {
  type: '',
  onButtonClick: () => {},
};

export default function AuthFormButton({ text, onButtonClick, type }) {
  return (
    <Button type={type} onClick={onButtonClick}>
      {text}
    </Button>
  );
}
