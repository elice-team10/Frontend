import React from 'react';
import styled from 'styled-components';

const HomeSearchBarContainer = styled.div`
  height: 800px;
  width: 1200px;
  background-color: #eee;
  border-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;

const HomeSearchBar = () => {
  return (
    <HomeSearchBarContainer>
      <img src="../../../assets/laf_logo.png" />
      <h1>메인페이지입니당</h1>
    </HomeSearchBarContainer>
  );
};

export default HomeSearchBar;
