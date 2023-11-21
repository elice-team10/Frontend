import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { EMAIL_REGEX, PWD_REGEX } from '../config/regex';
import background from '../assets/background.webp';
import axios from '../api/axios';

const LOGIN_URL = '/user/login';

const LoginContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${background});
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 4.8rem 4.8rem 4.8rem;
  border-radius: 12px;
  background-color: #fff;
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

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrMsg('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (!PWD_REGEX.test(password)) {
      setErrMsg('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      console.log('로그인 성공!');
      console.log(response);
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setEmail('');
      setPassword('');

      navigate('/');
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
    <LoginContainer>
      <LoginFormContainer>
        <HeaderTitle>로그인</HeaderTitle>
        <LoginForm onSubmit={handleSubmit}>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <AuthFormInput
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onInputChange={handleInputChange}
          />
          <FormLabel htmlFor="password">비밀번호</FormLabel>
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
    </LoginContainer>
  );
};

export default Login;
