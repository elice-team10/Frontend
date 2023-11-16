import React from 'react';
import styled from 'styled-components';
import HomeSearchBar from '../components/Home/HomeSearchBar';
import HomeButtons from '../components/Home/HomeButtons';
import CardCarousel from '../components/Home/CardCarousel';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeSearchBar></HomeSearchBar>
      <HomeButtons />
      <CardCarousel />
    </HomeContainer>
  );
};

export default Home;
