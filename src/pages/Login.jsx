import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';

const LoginContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  height: 100vh;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeaderTitle = styled.h1`
  font-size: ${theme.fontSizes.heading1};
  margin-top: -4rem;
  margin-bottom: 6.4rem;
  align-self: center;
`;

const FormLabel = styled.label`
  font-size: ${theme.fontSizes.medium};
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 1.2rem 2.8rem;
  width: 32rem;
  height: 3.2rem;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
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
  font-size: ${theme.fontSizes.large};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.medium};
  padding-left: 0.8rem;
  margin-bottom: 0.8rem;
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
    font-size: ${theme.fontSizes.small};
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    // TODO: 로그인 로직 추가하기

    // 로그인 성공하면 다음 페이지로 이동
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <HeaderTitle>로그인</HeaderTitle>
        <LoginForm>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <Input
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel htmlFor="">비밀번호</FormLabel>
          <Input
            id="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button onClick={handleLogin}>로그인</Button>
          <AuthLinksContainer>
            <Link to="/register">회원가입</Link>
            <Link to="/findPassword">비밀번호 찾기</Link>
          </AuthLinksContainer>
        </LoginForm>
      </LoginFormContainer>
      <Image
        src="https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="분실물"
      />
    </LoginContainer>
  );
};

export default Login;
