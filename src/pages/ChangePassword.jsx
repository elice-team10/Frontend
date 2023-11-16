import React, { useState, useEffect } from 'react';
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
  font-size: ${theme.fontSizes.subtitle};
`;

const ErrorMessage = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
`;

const ChangePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [validNewPassword, setValidNewPassword] = useState('');

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    console.log(result);
    console.log(newPassword);
    setValidNewPassword(result);
    const match = newPassword === matchPassword;
    setValidMatch(match);
  }, [newPassword, matchPassword]);

  useEffect(() => {
    if (!validMatch) setErrMessage('비밀번호가 다릅니다.');
    else setErrMessage('');
  }, [newPassword, matchPassword, validMatch]);

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    if (!validNewPassword) {
      setErrMessage('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    } else if (!validMatch) {
      setErrMessage('비밀번호가 다릅니다.');
      return;
    }

    // TODO: 로컬 스토리지에 저장 된 비밀번호와 현재 비밀번호가 같은 지 비교?
    // 일치하면
    setValidPassword(true);

    if (!validPassword) {
      setErrMessage('현재 비밀번호가 다릅니다.');
      return;
    }

    try {
      // TODO: API 적용
      const res = await fetch('CHANGEPASSWORD_API', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
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

  const handleInputChange = (id, value) => {
    if (id === 'current_password') setPassword(value);
    if (id === 'new_password') setNewPassword(value);
    if (id === 'confirm_new_password') setMatchPassword(value);
  };

  const handleCancelChangePassword = () => {
    // 비밀번호 변경 취소
    // 마이 페이지로 이동
    navigate('/mypage');
  };

  return (
    <ChangePasswordContainer>
      <ChangePasswordFormContainer>
        <HeaderTitle>비밀번호 변경</HeaderTitle>
        <ChangePasswordForm>
          <AuthFormInput
            id="current_password"
            type="password"
            placeholder="현재 비밀번호"
            value={password}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="new_password"
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="confirm_new_password"
            type="password"
            placeholder="새 비밀번호 확인"
            value={matchPassword}
            onInputChange={handleInputChange}
          />
          {(!validPassword || !validNewPassword || !validMatch) && (
            <ErrorMessage>{errMessage}</ErrorMessage>
          )}
          <AuthFormButton
            text="확인"
            onButtonClick={handleSubmitChangePassword}
          />
          <AuthFormButton
            text="취소"
            type="cancel"
            onButtonClick={handleCancelChangePassword}
          />
        </ChangePasswordForm>
      </ChangePasswordFormContainer>
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
