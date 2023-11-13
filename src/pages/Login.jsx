import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  height: 100vh;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h1 {
    margin-top: -8rem;
    margin-bottom: 4.8rem;
    align-self: center;
  }

  label {
    font-size: 1.6rem;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 1.2rem 2.8rem;
  width: 32rem;
  height: 3.2rem;
  font-size: 1.8rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textLightgray};
  }
`;

const Button = styled.button`
  padding: 1.8rem 3.2rem;
  margin: 4.8rem 0 2.4rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 8px;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

const Image = styled.img`
  width: 48rem;
  height: 64rem;
  border-radius: 32px;
`;

const AuthLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  a {
    color: ${theme.colors.textLightgray};
    font-size: 1.2rem;
    transition: all 0.3s;

    /* LVHA */
    &:link,
    &:visited {
      color: ${theme.colors.textLightgray};
    }
    &:hover,
    &:active {
      color: ${theme.colors.primary};
    }
  }
`;

const Login = () => {
  return (
    <LoginFormContainer>
      <InputContainer>
        <h1>로그인</h1>
        <label htmlFor="email">이메일</label>
        <Input id="email" type="email" placeholder="이메일" />
        <label htmlFor="">비밀번호</label>
        <Input id="비밀번호" type="password" placeholder="비밀번호" />
        <Button>로그인</Button>
        <AuthLinksContainer>
          <a href="#">회원가입</a>
          <a href="#">비밀번호 찾기</a>
        </AuthLinksContainer>
      </InputContainer>
      <Image
        src="https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="분실물"
      />
    </LoginFormContainer>
  );
};

export default Login;
