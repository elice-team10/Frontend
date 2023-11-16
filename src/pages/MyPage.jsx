import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from '../config/theme';
import UserPostTable from '../components/MyPage/UserPostTable';
import UserCommentTable from '../components/MyPage/UserCommentTable';

const MyPageContainer = styled.div`
  display: flex;
  padding: 8rem 9.6rem 0 9.6rem;
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
  padding: 11.2rem 12.8rem 11.2rem 8rem;
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
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      color: ${theme.colors.text};
      font-weight: bold;
    `}
`;

const UserInfoCard = styled.div`
  background-color: #fff;
  /* border: 1px solid #ccc; */
  padding: 2rem;
  border-radius: 12px;
`;

const UserNicknameContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.textLightgray};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.large};
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
  const [isNicknameEditMode, setNicknameIsEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);

  useEffect(() => {
    setNicknameIsEditMode(false);
    setIsEmailEditMode(false);
    setNickname(previousNickname);
    setEmail(previousEmail);
  }, [currTab, previousEmail, previousNickname]);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  const handleClickEditNickname = () => {
    setNicknameIsEditMode((prev) => !prev);
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

  return (
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
            {!isNicknameEditMode && (
              <UserNicknameContainer>
                <UserNicknameBox>
                  <UserNickname>{nickname}</UserNickname>
                  <EditButton onClick={handleClickEditNickname}>
                    수정
                  </EditButton>
                </UserNicknameBox>
              </UserNicknameContainer>
            )}
            {isNicknameEditMode && (
              <UserNicknameContainer>
                <UserNicknameBox>
                  <EditInput
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    maxLength="24"
                  />
                  <EditButton
                    onClick={() => {
                      // 닉네임 데이터 업데이트 요청
                      // 닉네임 유효성 검사 필요
                      setNicknameIsEditMode(false);
                    }}
                  >
                    확인
                  </EditButton>
                  <EditButton
                    onClick={() => {
                      setNickname(previousNickname);
                      setNicknameIsEditMode(false);
                    }}
                  >
                    취소
                  </EditButton>
                </UserNicknameBox>
              </UserNicknameContainer>
            )}
          </UserInfoCard>
          <UserInfoCard>
            <Label htmlFor="email">이메일</Label>
            {!isEmailEditMode && (
              <UserNicknameContainer>
                <UserNicknameBox>
                  <UserNickname>{email}</UserNickname>
                  <EditButton onClick={handleClickEditEmail}>수정</EditButton>
                </UserNicknameBox>
              </UserNicknameContainer>
            )}
            {isEmailEditMode && (
              <UserNicknameContainer>
                <UserNicknameBox>
                  <EditInput
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    maxLength="30"
                  />
                  <EditButton
                    onClick={() => {
                      // 이메일 데이터 업데이트 요청
                      // 이메일 유효성 검사 필요
                      setIsEmailEditMode(false);
                    }}
                  >
                    확인
                  </EditButton>
                  <EditButton
                    onClick={() => {
                      setEmail(previousEmail);
                      setIsEmailEditMode(false);
                    }}
                  >
                    취소
                  </EditButton>
                </UserNicknameBox>
              </UserNicknameContainer>
            )}
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
  );
};

export default MyPage;
