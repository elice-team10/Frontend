import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { EMAIL_REGEX, PWD_REGEX } from '../config/regex';
import background from '../assets/background.webp';
import Header from '../components/UI/Header.jsx';
import title from '../assets/로고11.png';

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
  padding: 3.2rem 2rem 4.8rem 2rem; // 바꿈
  border-radius: 12px;
  background-color: #eee;
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

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!EMAIL_REGEX.test(email)) {
        setError('유효한 이메일 주소를 입력하세요.');
        return;
      }

      if (!PWD_REGEX.test(password)) {
        setError('비밀번호는 최소 6자리 이상이어야 합니다.');
        return;
      }

      // TODO: API 적용
      const res = await fetch('API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        console.log('로그인 성공!');
        // 로그인에 성공하면 Home 페이지로 이동
        navigate('/');
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생: ', error);
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
    <>
      <Header />
      <LoginContainer>
        <LoginFormContainer>
          {/* <HeaderTitle style={{ color: '#ff5000' }}>Lost & Found</HeaderTitle> */}
          <Title src={title} />
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <AuthFormButton text="로그인" />
            <AuthLinksContainer>
              <Link to="/register">회원가입</Link>
              <Link to="/forgotpassword">비밀번호 찾기</Link>
            </AuthLinksContainer>
          </LoginForm>
        </LoginFormContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
