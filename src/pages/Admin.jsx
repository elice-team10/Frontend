import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import AdminTemplate from '../components/Admin/AdminTemplate';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdminTitleBox = styled.div`
  width: 1200px;
  text-align: center;
  margin: 30px 0;
  font-weight: bold;
  letter-spacing: 3px;
  font-size: ${theme.fontSizes.title};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.subtitle};
  }
  color: ${theme.colors.text};
`;

const Admin = () => {
  return (
    <AdminContainer>
      <AdminTitleBox>관리자 페이지</AdminTitleBox>
      <AdminTemplate />
    </AdminContainer>
  );
};

export default Admin;
