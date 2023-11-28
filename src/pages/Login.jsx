import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { EMAIL_REGEX, PWD_REGEX } from '../config/regex';
import { CheckLoggedIn } from '../utils/CheckLoggedIn';
import api from '../api/axios';
import AuthContainer from '../components/Auth/AuthContainer';
// import title from '../assets/로고11.png';
import TypingText from '../components/UI/TypingText';

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2rem 4.8rem 2rem; // 바꿈
  border-radius: 12px;
  background-color: #eee;
  color: ${theme.colors.text};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeaderTitle = styled.h1`
  align-self: center;
  margin-bottom: 4.8rem;
  font-size: ${theme.fontSizes.subtitle};
`;

const Title = styled.img`
  align-self: center;
  margin-bottom: 3rem;
  width: 17rem;
`;
const FormLabel = styled.label`
  font-size: ${theme.fontSizes.medium};
`;

const ErrorMessage = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.error};
`;

const AuthLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  a {
    color: ${theme.colors.textLightgray};
    font-size: ${theme.fontSizes.small};

    transition: all 0.3s;

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

const LOGIN_URL = '/user/login';

const Login = () => {
  const navigate = useNavigate();

  const { saveAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (CheckLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrMsg('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (!PWD_REGEX.test(password)) {
      setErrMsg('비밀번호는 최소 5자리 이상이어야 합니다.');
      return;
    }

    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      const nickname = response?.data?.nickname;
      const accessToken = response?.data?.token;
      const status = response?.data?.status;

      saveAuth({ email, nickname, status, accessToken });

      setEmail('');
      setPassword('');

      if (status === 0) navigate('/admin');
      if (status === 1) navigate('/');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('서버에서 응답이 없습니다.');
      } else if (err.response?.status === 400) {
        setErrMsg('이메일 또는 비밀번호를 잘못 입력했습니다.');
      } else if (err.response?.status === 401) {
        setErrMsg('인증 실패하였습니다.');
      } else {
        setErrMsg('로그인에 실패였습니다.');
      }
    }
  };

  const handleInputChange = (id, value) => {
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  return (
    <AuthContainer>
      <LoginFormContainer>
        {/* <Title src={title} /> */}
        {/* <HeaderTitle style={{ color: '#ff5000' }}>Lost & Found</HeaderTitle> */}
        {/* <HeaderTitle>로그인</HeaderTitle> */}
        <HeaderTitle>
          <TypingText
            strings={[
              '안녕하세요!',
              'LAF에 방문해주셔서',
              '감사합니다 🦊',
              '로그인을 해주세요 👀',
            ]}
          />
        </HeaderTitle>
        <LoginForm onSubmit={handleSubmit}>
          {/* <FormLabel htmlFor="email">이메일</FormLabel> */}
          <AuthFormInput
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onInputChange={handleInputChange}
          />
          {/* <FormLabel htmlFor="password">비밀번호</FormLabel> */}
          <AuthFormInput
            id="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onInputChange={handleInputChange}
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
          <AuthFormButton text="로그인" />
          <AuthLinksContainer>
            <Link to="/register">회원가입</Link>
            <Link to="/forgotpassword">비밀번호 찾기</Link>
          </AuthLinksContainer>
        </LoginForm>
      </LoginFormContainer>
    </AuthContainer>
  );
};

export default Login;
