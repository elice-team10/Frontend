import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from '../config/theme';
import MyPageUserPostTable from '../components/MyPage/MyPagePostTable';
import MyPageCommentTable from '../components/MyPage/MyPageCommentTable';
import MyPageChangePassword from '../components/MyPage/MyPageChangePassword';
import { NICKNAME_REGEX, EMAIL_REGEX } from '../config/regex';
import useAuth from '../hooks/useAuth';
import { axiosPrivate } from '../api/axios';
import useLogout from '../hooks/useLogout';
import ModalBasic from '../components/UI/Modal';
import UserAvatar from '../components/UI/UserAvatar';

const MyPageContainer = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  max-width: 120rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 6.4rem;
  gap: 9.6rem;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    max-width: 102.4rem;
    gap: 3.6rem;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    max-width: 76.8rem;
    gap: 1.2rem;
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    /* max-width: 54.4rem;
    flex-direction: column; */
  }
`;

const NavAside = styled.aside`
  width: 24rem;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    width: 22rem;
  }
`;

const NavTitle = styled.h1`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.title};
  margin-bottom: 2.4rem;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.subtitle};
  }
`;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  list-style: none;

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    /* display: flex; */
  }
`;

const NavigationItem = styled.li`
  font-size: ${theme.fontSizes.subtitle};
  color: ${theme.colors.textLightgray};
  /* margin-bottom: 2rem; */
  transition: all 250ms ease-in-out;
  cursor: pointer;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.large};
  }

  ${(props) =>
    props.$active &&
    css`
      color: ${theme.colors.text};
      font-weight: bold;
    `}

  &:hover {
    color: ${theme.colors.text};
    font-weight: bold;
  }
`;

const UserInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4.8rem;
  margin-top: 1.2rem;
  padding-left: 1.6rem;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    margin-top: 0.6rem;
  }
`;

const UserInfoCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 4.8rem;
  align-items: center;

  @media (max-width: 64em) {
    column-gap: 3.2rem;
  }
`;

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background-color: #fff;
  border-radius: 12px;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    gap: 0;
  }
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-weight: bold;
  font-size: ${theme.fontSizes.large};

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.medium};
  }
`;

const ActionLinksContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledChangePasswordLink = styled(Link)`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.textLightgray};
`;

const StyledDeactivateLink = styled(Link)`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};

  margin-left: 2rem;
`;

const tabs = ['회원 정보수정/탈퇴', '나의 게시물', '나의 댓글'];

const MyPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth, updateAuth } = useAuth();

  const [currTab, setCurrTab] = useState('회원 정보수정/탈퇴');
  const [nickname, setNickname] = useState(auth?.nickname);
  const [email, setEmail] = useState(auth?.email);
  const [tempNickname, setTempNickname] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isNicknameEditMode, setIsNicknameEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);
  const [errorMsgNickname, setErrorMsgNickname] = useState('');
  const [errorMsgEmail, setErrorMsgEmail] = useState('');
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axiosPrivate().get('/user/detail');
        const nickname = response?.data?.nickname;
        const email = response?.data?.email;

        setNickname(nickname);
        setEmail(email);
      } catch (err) {
        console.error(err);
      }
    }
    getUserInfo();
  }, []);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  const handleNicknameConfirm = async () => {
    // 닉네임 데이터 업데이트 요청
    // 닉네임 유효성 검사
    if (tempNickname.length < 2 || tempNickname.length > 10) {
      setErrorMsgNickname(
        '닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.',
      );
      return;
    }

    if (!NICKNAME_REGEX.test(tempNickname)) {
      setErrorMsgNickname(
        '닉네임은 2~10자의 한글, 영문, 숫자만 사용 할 수 있고, 띄워쓰기는 허용되지 않습니다.',
      );
      return;
    }

    try {
      const response = await axiosPrivate().put('/user', {
        nickname: tempNickname,
      });

      // 닉네임 유효성 검사 통과 -> 로컬 스토리지 데이터 업데이트
      updateAuth({ nickname: tempNickname });

      setNickname(tempNickname);
      setErrorMsgNickname('');
      setIsNicknameEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailConfirm = async () => {
    // 이메일 데이터 업데이트 요청
    // 이메일 유효성 검사 필요
    if (!EMAIL_REGEX.test(tempEmail)) {
      setErrorMsgEmail('유효한 이메일 주소를 입력하세요.');
      return;
    }

    try {
      const response = await axiosPrivate().put('/user', {
        email: tempEmail,
      });

      // 닉네임 유효성 검사 통과 -> 로컬 스토리지 데이터 업데이트
      updateAuth({ email: tempNickname });

      // 이메일 유효성 검사 통과 -> 상태 업데이트
      setEmail(tempEmail);
      setErrorMsgEmail('');
      setIsEmailEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosPrivate().delete('/user');
      console.log(response);

      alert('이용해주셔서 감사합니다.');
      logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickEditNickname = () => {
    setTempNickname(nickname);
    setIsNicknameEditMode((prev) => !prev);
  };

  const handleClickEditEmail = () => {
    setTempEmail(email);
    setIsEmailEditMode((prev) => !prev);
  };

  const handleNicknameChange = (e) => {
    setTempNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setTempEmail(e.target.value);
  };

  const handleNicknameCancel = () => {
    setTempNickname('');
    setErrorMsgNickname('');
    setIsNicknameEditMode(false);
  };

  const handleEmailCancel = () => {
    setTempEmail('');
    setErrorMsgEmail('');
    setIsEmailEditMode(false);
  };

  const handleOpenPasswordChangeModal = () => {
    setIsPasswordChangeModalOpen(true);
  };

  const handleClosePasswordChangeModal = () => {
    setIsPasswordChangeModalOpen(false);
  };

  const handleOpenDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const handleCloseDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  return (
    <>
      <MyPageContainer>
        <NavAside>
          <NavTitle>마이 페이지</NavTitle>
          <NavigationList>
            {tabs.map((tab, i) => (
              <NavigationItem
                key={`${tab}-${i}`}
                $active={currTab === tab}
                onClick={() => handleClickTab(tab)}
              >
                {tab}
              </NavigationItem>
            ))}
          </NavigationList>
        </NavAside>
        {isPasswordChangeModalOpen && (
          <MyPageChangePassword
            isModalOpen={isPasswordChangeModalOpen}
            onCloseModal={handleClosePasswordChangeModal}
          />
        )}

        {currTab === '회원 정보수정/탈퇴' && (
          <UserInfoPanel>
            <UserInfoCardWrapper>
              <UserAvatar />
              <UserInfoCard>
                <Label htmlFor="nickname">닉네임</Label>
                <MyPageNickname
                  nickname={nickname}
                  tempNickname={tempNickname}
                  isEditMode={isNicknameEditMode}
                  onEditMode={handleClickEditNickname}
                  onConfirmClick={handleNicknameConfirm}
                  onCancelClick={handleNicknameCancel}
                  onChange={handleNicknameChange}
                  errorMsg={errorMsgNickname}
                />
              </UserInfoCard>
            </UserInfoCardWrapper>
            <UserInfoCard>
              <Label htmlFor="email">이메일</Label>
              <MyPageEmail
                email={email}
                tempEmail={tempEmail}
                isEditMode={isEmailEditMode}
                onEditMode={handleClickEditEmail}
                onConfirmClick={handleEmailConfirm}
                onCancelClick={handleEmailCancel}
                onChange={handleEmailChange}
                errorMsg={errorMsgEmail}
              />
            </UserInfoCard>

            <ActionLinksContainer>
              <StyledChangePasswordLink onClick={handleOpenPasswordChangeModal}>
                비밀번호 변경
              </StyledChangePasswordLink>
              <StyledDeactivateLink onClick={handleOpenDeleteAccountModal}>
                회원 탈퇴
              </StyledDeactivateLink>
            </ActionLinksContainer>
            {isDeleteAccountModalOpen && (
              <ModalBasic
                title="Lost And Found 계정 탈퇴"
                content="회원 탈퇴 하시겠습니까?"
                btnText="확인"
                getFunction={handleDeleteAccount}
                onCloseModal={handleCloseDeleteAccountModal}
              />
            )}
          </UserInfoPanel>
        )}
        {currTab === '나의 게시물' && <MyPageUserPostTable />}
        {currTab === '나의 댓글' && <MyPageCommentTable />}
      </MyPageContainer>
    </>
  );
};

export default MyPage;

/**
 * MyPageNickname
 */
const UserInfoContainer = styled.div`
  padding: 1.2rem 0;
  border-bottom: 1px solid ${theme.colors.textLightgray};

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    padding: 0.6rem 0;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserNicknameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserNickname = styled.p`
  font-size: ${theme.fontSizes.medium};

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.small};
  }
`;

const EditInput = styled.input`
  width: 100%;
  font-size: ${theme.fontSizes.medium};
  outline: none;
  border: none;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.small};
  }
`;

const EditButton = styled.button`
  width: 4.6rem;
  height: 2.6rem;
  border: 1px solid ${theme.colors.textLightgray};
  background-color: transparent;
  border-radius: 12px;
  font-size: ${theme.fontSizes.small};
  color: #252525;
  flex-shrink: 0;
  cursor: pointer;
  & + button {
    margin-left: 0.8rem;
  }
`;

const ErrorMessage = styled.span`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
`;

function MyPageNickname({
  nickname,
  tempNickname,
  isEditMode,
  onEditMode,
  onConfirmClick,
  onCancelClick,
  onChange,
  errorMsg,
}) {
  return (
    <>
      <UserInfoContainer>
        <UserNicknameBox>
          {!isEditMode && (
            <>
              <UserNickname>{nickname}</UserNickname>
              <EditButton onClick={onEditMode}>수정</EditButton>
            </>
          )}
          {isEditMode && (
            <>
              <EditInput
                type="text"
                id="nickname"
                value={tempNickname}
                onChange={onChange}
                maxLength="24"
              />
              <EditButton onClick={onConfirmClick}>확인</EditButton>
              <EditButton onClick={onCancelClick}>취소</EditButton>
            </>
          )}
        </UserNicknameBox>
      </UserInfoContainer>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </>
  );
}

/**
 * MyPageEmail
 */

const UserEmail = styled.p`
  font-size: ${theme.fontSizes.medium};

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    font-size: ${theme.fontSizes.small};
  }
`;

function MyPageEmail({
  email,
  tempEmail,
  isEditMode,
  onEditMode,
  onConfirmClick,
  onCancelClick,
  onChange,
  errorMsg,
}) {
  return (
    <>
      <UserInfoContainer>
        <UserInfoBox>
          {!isEditMode && (
            <>
              <UserEmail>{email}</UserEmail>
              <EditButton onClick={onEditMode}>수정</EditButton>
            </>
          )}
          {isEditMode && (
            <>
              <EditInput
                type="text"
                id="email"
                value={tempEmail}
                onChange={onChange}
                maxLength="24"
              />
              <EditButton onClick={onConfirmClick}>확인</EditButton>
              <EditButton onClick={onCancelClick}>취소</EditButton>
            </>
          )}
        </UserInfoBox>
      </UserInfoContainer>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </>
  );
}
