import styled from 'styled-components';
import HomeSearchBar from '../components/Home/HomeSearchBar';
import HomeButtons from '../components/Home/HomeButtons';
import CardCarousel from '../components/Home/CardCarousel';
import LostItemCarousel from '../components/Home/LostItemCarousel';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex-grow: 1;
`;

const GradationBox = styled.div`
  width: 70rem;
  height: 1rem;
  background: linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
  margin-top: 4rem;
  border-radius: 12px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeSearchBar />
      <HomeButtons />
      <CardCarousel />
      <GradationBox />
      <LostItemCarousel />
    </HomeContainer>
  );
};

export default Home;
