import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import AuthFormInput from '../components/Auth/AuthFormInput';
import AuthFormButton from '../components/Auth/AuthFormButton';
import { EMAIL_REGEX } from '../config/regex';
import background from '../assets/background.webp';
import api from '../api/axios';
import { CheckLoggedIn } from '../utils/CheckLoggedIn';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const RESET_PASSWORD_URL = '/user/reset-password';

const ForgotPasswordContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 9rem);
  background: url(${background});
`;

const ForgotPasswordFormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2rem 3rem 2rem; //바꿈
  border-radius: 12px;
  background-color: #eee; //바꿈
`;

const StyledArrowIcon = styled(ArrowBackIosIcon)`
  position: absolute;
  top: 3rem;
  font-size: ${theme.fontSizes.subtitle} !important;
  color: ${theme.colors.primary};
  cursor: pointer;
`;

const ForgotPasswordForm = styled.form`
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

const Message = styled.span`
  padding-left: 0.8rem;
  font-size: ${theme.fontSizes.medium};
  color: ${(props) =>
    props.type === 'error' ? theme.colors.error : theme.colors.text};
`;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (CheckLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setIsError(true);
      setMessage('유효한 이메일 주소를 입력하세요.');
      return;
    }

    try {
      const res = await api.post(
        RESET_PASSWORD_URL,
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      // TODO: 비밀번호 찾기 마무리

      setIsError(false);

      // setMessage('임시 비밀번호를 이메일로 전송했습니다.');
      setMessage(res.data.message);
    } catch (error) {
      console.error(' 오류 발생: ', error);
      setIsError(true);
      setMessage('이메일 전송 중 오류가 발생했습니다.');
    }
  };

  const handleInputChange = (id, value) => {
    setEmail(value);
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordFormContainer>
        <StyledArrowIcon onClick={() => navigate(-1)} />
        <HeaderTitle>비밀번호 찾기</HeaderTitle>
        <ForgotPasswordForm onSubmit={handleSubmit}>
          {/* <FormLabel htmlFor="email">이메일</FormLabel> */}
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
          <AuthFormButton text="비밀번호 찾기" />
        </ForgotPasswordForm>
      </ForgotPasswordFormContainer>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
