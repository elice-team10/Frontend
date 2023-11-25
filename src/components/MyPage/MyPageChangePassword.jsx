import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../config/theme';
import AuthFormInput from '../Auth/AuthFormInput';
import AuthFormButton from '../Auth/AuthFormButton';
import { PWD_REGEX } from '../../config/regex';
import { axiosPrivate } from '../../api/axios';
import useLogout from '../../hooks/useLogout';
import ToastAlert from '../UI/ToastAlert';

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

const CHANGE_PASSWORD_URL = '/user';

const MyPageChangePassword = ({ isModalOpen, onCloseModal }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    validPassword: false,
    newPassword: '',
    validNewPassword: false,
    matchPassword: '',
    validMatch: false,
    errMessage: '',
    success: false,
  });

  useEffect(() => {
    const result = PWD_REGEX.test(passwordInfo.newPassword);
    setPasswordInfo((prev) => ({ ...prev, validNewPassword: result }));
    const match = passwordInfo.newPassword === passwordInfo.matchPassword;
    setPasswordInfo((prev) => ({ ...prev, validMatch: match }));
  }, [passwordInfo.newPassword, passwordInfo.matchPassword]);

  useEffect(() => {
    if (!passwordInfo.validMatch)
      setPasswordInfo((prev) => ({
        ...prev,
        errMessage: '새 비밀번호와 확인이 일치하지 않습니다.',
      }));
    else
      setPasswordInfo((prev) => ({
        ...prev,
        errMessage: '',
      }));
  }, [passwordInfo.validMatch]);

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordInfo.validNewPassword) {
      setPasswordInfo((prev) => ({
        ...prev,
        errMessage: '비밀번호는 최소 5자리 이상이어야 합니다.',
      }));
      return;
    } else if (!passwordInfo.validMatch) {
      setPasswordInfo((prev) => ({
        ...prev,
        errMessage: '새 비밀번호와 확인이 일치하지 않습니다.',
      }));
      return;
    }

    try {
      const response = await axiosPrivate().put(CHANGE_PASSWORD_URL, {
        password: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword,
      });

      console.log(response);

      // 비밀번호 변경 성공
      setPasswordInfo((prev) => ({ ...prev, validPassword: true }));

      // 로그아웃: 로컬 스토리지 데이터 및 토큰 삭제
      logout();

      setPasswordInfo((prev) => ({ ...prev, success: true }));

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);

      // 로그인 페이지로 이동
    } catch (error) {
      setPasswordInfo((prev) => ({
        ...prev,
        errMessage: '현재 비밀번호가 다릅니다.',
      }));
      console.error('비밀번호 변경 중 오류 발생: ', error);
    }
  };

  const handleInputChange = (id, value) => {
    if (id === 'current_password')
      setPasswordInfo((prev) => ({
        ...prev,
        currentPassword: value,
      }));
    if (id === 'new_password')
      setPasswordInfo((prev) => ({
        ...prev,
        newPassword: value,
      }));
    if (id === 'confirm_new_password')
      setPasswordInfo((prev) => ({
        ...prev,
        matchPassword: value,
      }));
  };

  const handleModalClick = (e) => {
    e.preventDefault();
    if (
      e.target.className.split(' ')[2] === 'modal-container' ||
      e.target.className.split(' ')[2] === 'cancel'
    ) {
      onCloseModal();
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
            value={passwordInfo.currentPassword}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="new_password"
            type="password"
            placeholder="새 비밀번호"
            value={passwordInfo.newPassword}
            onInputChange={handleInputChange}
          />
          <AuthFormInput
            id="confirm_new_password"
            type="password"
            placeholder="새 비밀번호 확인"
            value={passwordInfo.matchPassword}
            onInputChange={handleInputChange}
          />
          {(!passwordInfo.validPassword ||
            !passwordInfo.validNewPassword ||
            !passwordInfo.validMatch) && (
            <ErrorMessage>{passwordInfo.errMessage}</ErrorMessage>
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
          {passwordInfo.success && (
            <ToastAlert
              icon="success"
              title="비밀번호가 변경되어, 로그인 페이지로 이동합니다."
            />
          )}
        </ChangePasswordForm>
      </ChangePasswordModalContainer>
    </ChangePasswordModalWrapper>
  );
};

export default MyPageChangePassword;
