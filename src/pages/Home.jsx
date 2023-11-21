import React from 'react';
import styled from 'styled-components';
import HomeSearchBar from '../components/Home/HomeSearchBar';
import HomeButtons from '../components/Home/HomeButtons';
import CardCarousel from '../components/Home/CardCarousel';
import Header from '../components/UI/Header';
import kakaoMap from '../assets/kakaomap.png';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GradationBox = styled.div`
  width: 70rem;
  height: 5rem;
  //background: linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
  margin-top: 4rem;
  border-radius: 12px;
`;

const MapBox = styled.img`
  width: 70rem;
  margin: 1rem 0 4rem 0;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <HomeSearchBar />
      <HomeButtons />
      <CardCarousel />
      <GradationBox />
    </HomeContainer>
  );
};

export default Home;
