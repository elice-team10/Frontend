import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from '../config/theme';
import UserPostTable from '../components/MyPage/UserPostTable';
import UserCommentTable from '../components/MyPage/UserCommentTable';
import UserNicknameInfoComponent from '../components/MyPage/UserNicknameInfoComponent';
import UserEmailInfoComponent from '../components/MyPage/UserEmailInfoComponent';
import Header from '../components/UI/Header';

const MyPageContainer = styled.div`
  display: flex;
  padding: 1.2rem 9.6rem 0 9.6rem;
`;

const NavAside = styled.aside`
  width: 22rem;
  padding: 2.4rem;
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
  const [currTab, setCurrTab] = useState('회원 정보수정/탈퇴');
  const [nickname, setNickname] = useState('유저 이름');
  const [previousNickname, setPreviousNickname] = useState('유저 이름');
  const [email, setEmail] = useState('user@email.com');
  const [previousEmail, setPreviousEmail] = useState('user@email.com');
  const [isNicknameEditMode, setIsNicknameEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);

  useEffect(() => {
    setIsNicknameEditMode(false);
    setIsEmailEditMode(false);
    setNickname(previousNickname);
    setEmail(previousEmail);
  }, [currTab, previousEmail, previousNickname]);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  const handleClickEditNickname = () => {
    setIsNicknameEditMode((prev) => !prev);
  };

  const handleClickEditEmail = () => {
    setIsEmailEditMode((prev) => !prev);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameConfirm = () => {
    // 닉네임 데이터 업데이트 요청
    // 닉네임 유효성 검사 필요
    setIsNicknameEditMode(false);
  };

  const handleNicknameCancel = () => {
    setNickname(previousNickname);
    setIsNicknameEditMode(false);
  };

  const handleEmailConfirm = () => {
    // 닉네임 데이터 업데이트 요청
    // 닉네임 유효성 검사 필요
    setIsEmailEditMode(false);
  };

  const handleEmailCancel = () => {
    setEmail(previousEmail);
    setIsEmailEditMode(false);
  };
  return (
    <>
      <Header />
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

        {currTab === '회원 정보수정/탈퇴' && (
          <UserInfoPanel>
            <UserInfoCard>
              <Label htmlFor="nickname">닉네임</Label>
              <UserNicknameInfoComponent
                nickname={nickname}
                isEditMode={isNicknameEditMode}
                onEditMode={handleClickEditNickname}
                onConfirmClick={handleNicknameConfirm}
                onCancelClick={handleNicknameCancel}
                onChange={handleNicknameChange}
              />
            </UserInfoCard>
            <UserInfoCard>
              <Label htmlFor="email">이메일</Label>
              <UserEmailInfoComponent
                email={email}
                isEditMode={isEmailEditMode}
                onEditMode={handleClickEditEmail}
                onConfirmClick={handleEmailConfirm}
                onCancelClick={handleEmailCancel}
                onChange={handleEmailChange}
              />
            </UserInfoCard>
            <ActionLinksContainer>
              <StyledChangePasswordLink to="/changepassword">
                비밀번호 변경
              </StyledChangePasswordLink>
              <StyledDeactivateLink>회원 탈퇴</StyledDeactivateLink>
            </ActionLinksContainer>
          </UserInfoPanel>
        )}
        {currTab === '나의 게시물' && <UserPostTable />}
        {currTab === '나의 댓글' && <UserCommentTable />}
      </MyPageContainer>
    </>
  );
};

export default MyPage;
