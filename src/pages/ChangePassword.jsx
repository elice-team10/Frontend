import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { PWD_REGEX } from '../config/regex';

const ChangePasswordContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  height: 100vh;
`;

const ChangePasswordFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChangePasswordForm = styled.form`
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

const ChangePassword = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
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
      const res = await fetch('CHANGEPASSWORD_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, email, password }),
      });

      if (res.ok) {
        // 비밀번호 변경 성공
        // 알림 메시지
        // 마이 페이지로 이동
      } else {
        console.error('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생: ', error);
    }
  };

  const handleInputChange = (id, value) => {};

  return (
    <ChangePasswordContainer>
      <ChangePasswordFormContainer>
        <HeaderTitle>비밀번호 변경</HeaderTitle>
        <ChangePasswordForm>
          <AuthFormInput
            id="current_password"
            type="text"
            placeholder="현재 비밀번호"
            value={nickname}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="new_password"
            type="text"
            placeholder="새 비밀번호"
            value={email}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="confirm_new_password"
            type="password"
            placeholder="새 비밀번호 확인"
            value={password}
            onInputChange={handleInputChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <AuthFormButton text="확인" onButtonClick={handleChangePassword} />
          <AuthFormButton
            text="취소"
            type="cancel"
            onButtonClick={handleChangePassword}
          />
        </ChangePasswordForm>
      </ChangePasswordFormContainer>
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
