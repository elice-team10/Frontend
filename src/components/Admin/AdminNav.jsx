import React from 'react';
import styled from 'styled-components';

const AdminNavContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 50px;
`;
const AdminMenu = styled.div`
  width: 150px;
  padding-top: 10px;
  text-align: center;
  font-size: 24px;
  letter-spacing: 3px;
  cursor: pointer;
`;
const AdminSubNavContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 50px;
`;
const AdminSubMenu = styled.div`
  width: 85px;
  height : 25px;
  padding-top: 6px;
  text-align: center;
  font-size: 16px;
  letter-spacing: 4px;
  color: #888b8c;
  border: 0.5px solid #888b8c;
  border-radius: 8px;
  cursor: pointer;
`;

const AdminNav = () => {
  return (
    <>
      <AdminNavContainer>
        <AdminMenu>회원정보</AdminMenu>
        <AdminMenu>찾아요</AdminMenu>
        <AdminMenu>주웠어요</AdminMenu>
      </AdminNavContainer>
      <AdminSubNavContainer>
        <AdminSubMenu>게시물</AdminSubMenu>
        <AdminSubMenu>댓글</AdminSubMenu>
      </AdminSubNavContainer>
    </>
  );
};

export default AdminNav;
