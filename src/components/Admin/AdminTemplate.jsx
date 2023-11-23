import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import AdminUser from './AdminUser';
import AdminFoundBoard from './AdminFoundBoard';
import AdminFoundComment from './AdminFoundComment';
import AdminLostBoard from './AdminLostBoard';
import AdminLostComment from './AdminLostComment';
import api from '../../api/axios';

const AdminNavContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 1200px;
  @media (max-width: 1200px) {
    width: 768px;
  }
  height: 30px;
`;

const AdminMenuBox = styled.div`
  display: flex;
`;

const AdminMenu = styled.div`
  width: 150px;
  text-align: center;
  font-size: ${theme.fontSizes.subtitle};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.large};
  }
  color: ${(props) =>
    props.$active ? theme.colors.text : theme.colors.textLightgray};
  letter-spacing: 3px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
`;

const Button = styled.button`
  padding: 12px 16px;
  margin-right: 40px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 12px;
  font-size: ${theme.fontSizes.medium};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.small};
  }
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.15);
  }
`;

const AdminSubNavContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 40px;
  gap: 1.5rem;
`;

const AdminSubNavBox = styled.div`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$width};
  height: 40px;
  gap: 1.5rem;
  @media (max-width: 1200px) {
    width: ${(props) =>
      props.$activeMenu === '찾아요'
        ? '880px'
        : props.$activeMenu === '주웠어요'
          ? '1170px'
          : '0px'};
`;

const AdminSubMenu = styled.div`
  width: 76px;
  @media (max-width: 1200px) {
    width: 60px;
  }
  height: 20px;
  @media (max-width: 1200px) {
    height: 18px;
  }
  text-align: center;
  font-size: ${theme.fontSizes.small};
  letter-spacing: 4px;
  color: ${(props) =>
    props.$active ? theme.colors.text : theme.colors.textLightgray};
  border: ${(props) => (props.$active ? '1.5px' : '0.5px')} solid
    ${(props) =>
      props.$active ? theme.colors.text : theme.colors.textLightgray};
  border-radius: 8px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
`;

const AdminFormContainer = styled.div`
  height: 631px;
  width: 1200px;
  background-color: #eee;
  @media (max-width: 1200px) {
    width: 768px;
  }
  border-radius: 4px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 100px;
`;

const AdminTemplate = () => {
  const [activeMenu, setActiveMenu] = useState('회원정보');
  const [activeSubMenu, setActiveSubMenu] = useState('게시물');
  const [selectedUser, setSelectedUser] = useState([]);

  const handleUserSelection = (ids) => {
    setSelectedUser(ids);
    console.log(ids);
  };

  const deleteUser = async () => {
    try {
      await Promise.all(selectedUser.map((ids) => api.delete(`/user/${ids}`)));
      // AdminUser 컴포넌트 getUser 함수를 호출
    } catch (error) {
      console.error('Error deleting users: ', error);
      console.log(selectedUser);
    }
  };

  let button;
  let table;

  if (activeMenu === '회원정보') {
    button = (
      <Button
        onClick={() => {
          deleteUser();
        }}
      >
        관리자 권한으로 탈퇴
      </Button>
    );
    table = <AdminUser onSelectionChange={handleUserSelection} />;
  }
  if (activeMenu === '찾아요' && activeSubMenu === '게시물') {
    button = <Button>관리자 권한으로 삭제</Button>;
    table = <AdminLostBoard />;
  }
  if (activeMenu === '찾아요' && activeSubMenu === '댓글') {
    button = <Button>관리자 권한으로 삭제</Button>;
    table = <AdminLostComment />;
  }
  if (activeMenu === '주웠어요' && activeSubMenu === '게시물') {
    button = <Button>관리자 권한으로 삭제</Button>;
    table = <AdminFoundBoard />;
  }
  if (activeMenu === '주웠어요' && activeSubMenu === '댓글') {
    button = <Button>관리자 권한으로 삭제</Button>;
    table = <AdminFoundComment />;
  }

  return (
    <>
      <AdminNavContainer>
        <AdminMenuBox>
          <AdminMenu
            $active={activeMenu === '회원정보'}
            onClick={() => {
              setActiveMenu('회원정보');
              setActiveSubMenu('게시물');
            }}
          >
            회원정보
          </AdminMenu>
          <AdminMenu
            $active={activeMenu === '찾아요'}
            onClick={() => {
              setActiveMenu('찾아요');
              setActiveSubMenu('게시물');
            }}
          >
            찾아요
          </AdminMenu>
          <AdminMenu
            $active={activeMenu === '주웠어요'}
            onClick={() => {
              setActiveMenu('주웠어요');
              setActiveSubMenu('게시물');
            }}
          >
            주웠어요
          </AdminMenu>
        </AdminMenuBox>
        {button}
      </AdminNavContainer>
      <AdminSubNavContainer>
        <AdminSubNavBox
          $show={activeMenu === '찾아요' || activeMenu === '주웠어요'}
          $activeMenu={activeMenu}
          $width={
            activeMenu === '찾아요'
              ? '450px'
              : activeMenu === '주웠어요'
                ? '750px'
                : '0px'
          }
        >
          <AdminSubMenu
            $active={activeSubMenu === '게시물'}
            onClick={() => setActiveSubMenu('게시물')}
          >
            게시물
          </AdminSubMenu>
          <AdminSubMenu
            $active={activeSubMenu === '댓글'}
            onClick={() => setActiveSubMenu('댓글')}
          >
            댓글
          </AdminSubMenu>
        </AdminSubNavBox>
      </AdminSubNavContainer>
      <AdminFormContainer>{table}</AdminFormContainer>
    </>
  );
};

export default AdminTemplate;
