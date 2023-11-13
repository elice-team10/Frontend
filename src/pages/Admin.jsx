import React from 'react';
import styled from 'styled-components';
import AdminUser from '../components/Admin/AdminUser';
import AdminNav from '../components/Admin/AdminNav';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Admin = () => {
  return (
    <AdminContainer>
      <AdminNav />
      <AdminUser />
    </AdminContainer>
  );
};

export default Admin;
