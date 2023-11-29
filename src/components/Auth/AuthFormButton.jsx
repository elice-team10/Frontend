import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Button = styled.button`
  padding: 1.5rem 3.2rem !important; // 바꿈
  margin: ${(props) =>
    props.type === 'cancel' ? '0 !important' : '1.6rem 0 !important'};
  /* border: ${(props) =>
    props.type === 'cancel' ? `1px solid ${theme.colors.border}` : 'none'}; */
  border: none;
  border-radius: 32px;
  font-size: ${theme.fontSizes.large};
  color: ${(props) =>
    props.type === 'cancel' ? theme.colors.text : theme.colors.textWhite};

  background: ${(props) =>
    props.type === 'cancel'
      ? 'linear-gradient(135deg, rgba(221,224,233,1) 0%, rgba(237,239,244,1) 41%, rgba(218,221,228,1) 49%, rgba(217,220,226,1) 64%, rgba(217,220,225,1) 69%, rgba(216,219,224,1) 82%)'
      : 'linear-gradient(135deg, #ffa500, #ff7f50, #ff6700)'};

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    /* background-color: ${(props) =>
      props.type === 'cancel' ? '#ddd' : theme.colors.accent}; */
    filter: ${(props) =>
      props.type === 'cancel' ? 'brightness(1.05)' : 'brightness(1.15)'};
  }
`;

AuthFormButton.defaultProps = {
  type: '',
  onButtonClick: () => {},
  className: '',
};

export default function AuthFormButton({
  text,
  onButtonClick,
  type,
  className,
}) {
  return (
    <Button className={className} type={type} onClick={onButtonClick}>
      {text}
    </Button>
  );
}
