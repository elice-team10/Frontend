import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { NICKNAME_REGEX, EMAIL_REGEX, PWD_REGEX } from '../config/regex';
import background from '../assets/background.webp';
import api from '../api/axios';
import { isLoggedIn } from '../utils/Auth';

const RegisterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${background});
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2rem 4.8rem 2rem; // 바꿈
  border-radius: 12px;
  background-color: #eee; //바꿈
`;

const RegisterForm = styled.form`
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
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
`;

const REGISTER_URL = '/user/join';

const Register = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickname.length < 2 || nickname.length > 10) {
      setErrMsg('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.');
      return;
    }

    if (!NICKNAME_REGEX.test(nickname)) {
      setErrMsg('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.');
      return;
    }

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
        REGISTER_URL,
        JSON.stringify({ nickname, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      setNickname('');
      setEmail('');
      setPassword('');
      setErrMsg('');
      alert('가입해주셔서 감사합니다. 로그인 페이지로 이동합니다.');

      navigate('/login');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('서버에서 응답이 없습니다.');
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data);
      } else {
        setErrMsg('회원가입에 실패하였습니다.');
      }
      console.error('회원가입 중 오류 발생: ', err);
    }
  };

  const handleInputChange = (id, value) => {
    if (id === 'nickname') {
      setNickname(value);
    }

    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  return (
    <RegisterContainer>
      <RegisterFormContainer>
        <HeaderTitle>회원가입</HeaderTitle>
        <RegisterForm onSubmit={handleSubmit}>
          {/* <FormLabel htmlFor="nickname">닉네임</FormLabel> */}
          <AuthFormInput
            id="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onInputChange={handleInputChange}
          />
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
          <AuthFormButton text="회원가입" />
        </RegisterForm>
      </RegisterFormContainer>
    </RegisterContainer>
  );
};

export default Register;
