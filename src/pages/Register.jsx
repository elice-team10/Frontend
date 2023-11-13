import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';

const RegisterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  height: 100vh;
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeaderTitle = styled.h1`
  align-self: center;
  margin-top: -4rem;
  margin-bottom: 6.4rem;
  font-size: ${theme.fontSizes.heading1};
`;

const FormLabel = styled.label`
  font-size: ${theme.fontSizes.medium};
`;

const ErrorMessage = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
`;

const Register = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (nickname.length < 2 || nickname.length > 10) {
        setError('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.');
        return;
      }

      const nicknameRegex = /^[A-Za-z가-힣0-9]{2,10}$/;
      if (!nicknameRegex.test(nickname)) {
        setError('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('유효한 이메일 주소를 입력하세요.');
        return;
      }

      if (password.length < 6) {
        setError('비밀번호는 최소 6자리 이상이어야 합니다.');
        return;
      }

      // TODO: API 적용
      const res = await fetch('REGISTER_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, email, password }),
      });

      if (res.ok) {
        console.log('회원가입 성공!');
        alert('가입해주셔서 감사합니다. 로그인 페이지로 이동합니다.');

        // 회원가입에 성공하면 Login 페이지로 이동
        navigate('/login');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생: ', error);
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
        <RegisterForm>
          <FormLabel htmlFor="nickname">닉네임</FormLabel>
          <AuthFormInput
            id="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onInputChange={handleInputChange}
          />
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <AuthFormButton text="회원가입" onButtonClick={handleRegister} />
        </RegisterForm>
      </RegisterFormContainer>
    </RegisterContainer>
  );
};

export default Register;
