import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styled from 'styled-components';
import CommunityTab from './CommunityTab';
import CommunityCard from './CommunityCard';
import Header from '../UI/Header';
import config from '../../config.json';

const Background = styled.div`
  background-color: #eee;
`;

const CommunityContainer = styled.div`
  width: 1200px;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  margin: auto;
  padding: 5rem 0;
`;

const LostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 29.6rem);
  grid-column-gap: 1.9rem;
  grid-row-gap: 4rem;
`;

const FoundContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 29.6rem);
  grid-column-gap: 1.9rem;
  grid-row-gap: 2.4rem;
`;

function CommunityBoard() {
  const [currentTab, setCurrentTab] = useState('찾아요');
  const clickTabHandle = (tab) => {
    console.log('Tab clicked:', tab);
    setCurrentTab(tab);
  };
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get('/post/detail/', { withCredentials: true });
      setPosts(data);
    };
    fetchPost();
  }, []);

  console.log(posts);

  return (
    <Background>
      <Header />
      <CommunityContainer>
        <CommunityTab currentTab={currentTab} onClick={clickTabHandle} />
        {currentTab === '찾아요' ? (
          <LostContainer>
            {Array(8)
              .fill('')
              .map((item, index) => (
                <CommunityCard key={`card-${index}`} />
              ))}
          </LostContainer>
        ) : (
          <FoundContainer>
            {Array(8)
              .fill('')
              .map((item, index) => (
                <CommunityCard
                  key={`card-${index}`}
                  title={'에어팟 찾았어요.'}
                  content={'그 소중한 에어팟 제가 찾았습니다'}
                />
              ))}
          </FoundContainer>
        )}
      </CommunityContainer>
    </Background>
  );
}

export default CommunityBoard;
