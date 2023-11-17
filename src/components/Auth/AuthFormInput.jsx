import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import theme from '../../config/theme';

const InputContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;

  &:focus-within svg {
    color: ${theme.colors.primary};
  }
`;

const MyUserIcon = styled(PersonIcon)`
  padding: 0 4px;
  position: absolute;
  top: 40%;
  left: 2px;
  transform: translateY(-40%);
  font-size: 2.4rem !important;
  color: ${theme.colors.text};
`;

const MyEmailIcon = styled(EmailIcon)`
  padding: 0 4px;
  position: absolute;
  top: 40%;
  left: 2px;
  transform: translateY(-40%);
  font-size: 2.4rem !important;
  color: ${theme.colors.text};
`;

const MyPasswordIcon = styled(LockIcon)`
  padding: 0 4px;
  position: absolute;
  top: 40%;
  left: 2px;
  transform: translateY(-40%);
  font-size: 2.4rem !important;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  width: 32rem;
  height: 3.2rem;
  padding: 1.2rem 2.8rem 1.2rem 3.6rem;
  margin-bottom: 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    font-size: ${theme.fontSizes.medium};
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
    <InputContainer>
      {id === 'nickname' && <MyUserIcon />}
      {id === 'email' && <MyEmailIcon />}
      {(id === 'password' ||
        id === 'current_password' ||
        id === 'new_password' ||
        id === 'confirm_new_password') && <MyPasswordIcon />}
      <Input
        type={type}
        id={id}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(id, e.target.value)}
      />
    </InputContainer>
  );
}
