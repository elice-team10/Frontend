import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';

const FindPasswordContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  height: 100vh;
`;

const FindPasswordFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FindPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeaderTitle = styled.h1`
  align-self: center;
  margin-top: -12rem;
  margin-bottom: 9.6rem;
  font-size: ${theme.fontSizes.heading1};
`;

const FormLabel = styled.label`
  font-size: ${theme.fontSizes.medium};
`;

const Message = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.medium};
  color: ${(props) =>
    props.type === 'error' ? theme.colors.error : theme.colors.text};
`;

const FindPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleFindPassword = async (e) => {
    try {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setIsError(true);
        setMessage('유효한 이메일 주소를 입력하세요.');
        return;
      }

      // TODO: API 적용
      const res = await fetch('FINDPASSWORD_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsError(false);
        console.log('임시 비밀번호를 이메일로 전송했습니다.');
        setMessage('임시 비밀번호를 이메일로 전송했습니다.');
      } else {
        setIsError(true);
        setMessage('임시 비밀번호 전송 실패');
        console.error('임시 비밀번호 전송 실패');
      }
    } catch (error) {
      console.error(' 오류 발생: ', error);
    }
  };

  const handleInputChange = (id, value) => {
    setEmail(value);
  };

  return (
    <FindPasswordContainer>
      <FindPasswordFormContainer>
        <HeaderTitle>비밀번호 찾기</HeaderTitle>
        <FindPasswordForm>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <AuthFormInput
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onInputChange={handleInputChange}
          />
          {isError ? (
            <Message type="error">{message}</Message>
          ) : (
            <Message type="success">{message}</Message>
          )}
          <AuthFormButton
            text="비밀번호 찾기"
            onButtonClick={handleFindPassword}
          />
        </FindPasswordForm>
      </FindPasswordFormContainer>
    </FindPasswordContainer>
  );
};

export default FindPassword;
