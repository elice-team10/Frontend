import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Input = styled.input`
  width: 32rem;
  height: 3.2rem;
  padding: 1.2rem 2.8rem 1.2rem 1.2rem;
  margin-bottom: 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.textLightgray};
  }
`;

export default function AuthFormInput({
  id,
  type,
  placeholder,
  value,
  onInputChange,
}) {
  return (
    <Input
      type={type}
      id={id}
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onInputChange(id, e.target.value)}
    />
  );
}
