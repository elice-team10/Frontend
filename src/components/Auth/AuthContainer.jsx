import React from 'react';
import styled from 'styled-components';
import background from '../../assets/background.webp';

const AuthContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 9rem);
  background: center/cover no-repeat url(${background});
`;

export default AuthContainer;
