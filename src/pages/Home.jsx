import React from 'react';
import styled from 'styled-components';
import HomeSearchBar from '../components/Home/HomeSearchBar';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeSearchBar />
    </HomeContainer>
  );
};

export default Home;
