import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../config/theme';
import AuthFormInput from '../Auth/AuthFormInput';
import AuthFormButton from '../Auth/AuthFormButton';
import { PWD_REGEX } from '../../config/regex';

const ChangePasswordModalWrapper = styled.section`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ChangePasswordModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 4.8rem 4.8rem 4.8rem;
  border-radius: 12px;
  background-color: #fff;
`;

const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeaderTitle = styled.h1`
  align-self: center;
  margin-bottom: 4.8rem;
  font-size: ${theme.fontSizes.subtitle};
`;

const ErrorMessage = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
`;

const MyPageChangePassword = ({ isModalOpen, setIsModalOpen }) => {
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
    // TODO:
    /**
     * fetch가 아닌 axios로 api 요청하기
     * 유효성 검사
     * 현재 비밀번호가 동일한 지, 서버에 요청해서 확인
     * 각 단계마다 문제가 있으면, 에러 메시지 업데이트, return
     * 서버에 새 비밀번호로 업데이트 요청
     * alert 메시지 '로그인 페이지로 이동합니다'를 띄우고,
     * 로그인 페이지로 이동하도록 유도
     */

    if (!validNewPassword) {
      setErrMessage('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    } else if (!validMatch) {
      setErrMessage('비밀번호가 다릅니다.');
      return;
    }

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
        // 로그인 페이지로 이동
        navigate('/login');
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

  const handleModalClick = (e) => {
    e.preventDefault();
    if (
      e.target.className.split(' ')[2] === 'modal-container' ||
      e.target.className.split(' ')[2] === 'cancel'
    ) {
      setIsModalOpen(false);
    }
  };

  return (
    <ChangePasswordModalWrapper
      className="modal-container"
      $isOpen={isModalOpen}
      onClick={handleModalClick}
    >
      <ChangePasswordModalContainer>
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
            className="cancel"
            text="취소"
            type="cancel"
            onButtonClick={handleModalClick}
          />
        </ChangePasswordForm>
      </ChangePasswordModalContainer>
    </ChangePasswordModalWrapper>
  );
};

export default MyPageChangePassword;
