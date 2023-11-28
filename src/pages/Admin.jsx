import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import AdminTemplate from '../components/Admin/AdminTemplate';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const AdminTitleBox = styled.div`
  text-align: center;
  margin: 70px 0 30px 0;
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
