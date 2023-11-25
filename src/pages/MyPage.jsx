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

const MyPageContainer = styled.div`
  display: flex;
  padding: 1.2rem 9.6rem 0 9.6rem;
`;

const NavAside = styled.aside`
  width: 22rem;
  padding: 2.4rem;
  flex-shrink: 0;
`;

const NavTitle = styled.h1`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.title};
`;

const UserInfoPanel = styled.div`
  flex-grow: 1;
  padding: 4.8rem 12.8rem 11.2rem 8rem;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled.li`
  font-size: ${theme.fontSizes.subtitle};
  color: ${theme.colors.textLightgray};
  margin-bottom: 2rem;
  transition: all 250ms ease-in-out;
  cursor: pointer;

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

const UserInfoCard = styled.div`
  background-color: #fff;
  /* border: 1px solid #ccc; */
  padding: 2rem;
  border-radius: 12px;
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-weight: bold;
  font-size: ${theme.fontSizes.large};
`;

const ActionLinksContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 2rem;
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
        '닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.',
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
  border-bottom: 1px solid ${theme.colors.textLightgray};
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
`;

const EditInput = styled.input`
  width: 100%;
  padding: 1.6rem 0;
  font-size: ${theme.fontSizes.medium};
  outline: none;
  border: none;
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
  padding-left: 0.8rem;
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
