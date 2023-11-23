import styled from 'styled-components';
import HomeSearchBar from '../components/Home/HomeSearchBar';
import HomeButtons from '../components/Home/HomeButtons';
import CardCarousel from '../components/Home/CardCarousel';
import Header from '../components/UI/Header';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
  const axiosPrivate = useAxiosPrivate();

  const fetchEvents = async () => {
    const response = await axiosPrivate.get('/post');

    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = response;
      throw error;
    }

    const events = response.data;
    console.log(events);

    return events;
  };

  return (
    <HomeContainer>
      <Header />
      <HomeSearchBar />
      <HomeButtons />
      <CardCarousel />
      <GradationBox />
      <div style={{ width: '100%', height: '10rem' }}>
        <iframe
          src="https://giphy.com/embed/t2aAdTgnU9Ie6jvG0W"
          style={{ position: 'absolute' }}
        />
        <button onClick={fetchEvents}>클릭</button>
      </div>
    </HomeContainer>
  );
};

export default Home;
