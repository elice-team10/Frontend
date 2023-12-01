import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import CommunityTab from './CommunityTab';
import CommunityCard from './CommunityCard';
import { fetchEvents } from '../../api/http';
import ErrorBlock from '../UI/ErrorBlock';
import CircularProgress from '@mui/material/CircularProgress';
import theme from '../../config/theme';

const Background = styled.div`
  background-color: #eee;
`;

const CommunityContainer = styled.div`
  max-width: 120rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  // justify-content: center;
  margin: auto;
  padding: 5rem 0;
  flex-grow: 1;
`;

const LostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 29.6rem);
  grid-column-gap: 1.9rem;
  grid-row-gap: 4rem;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    grid-template-columns: repeat(4, 29.6rem);
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 24.6rem);
  }
`;

const FoundContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 29.6rem);
  grid-column-gap: 1.9rem;
  grid-row-gap: 2.4rem;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    grid-template-columns: repeat(4, 29.6rem);
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 29.6rem);
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    grid-template-columns: repeat(1, 29.6rem);
  }
`;

const LoadButtonContainer = styled.div`
  margin: 3rem 0 5rem 0;
  display: flex;
  justify-content: center;
`;

const LoadButton = styled.button`
  background:  #151618;
  border: none;
  color:  ${theme.colors.textWhite};
  width: 8rem;
  height: 4rem;
  border-radius: 12px;
  font-size: 1.4rem;
  cursor: pointer;
  transition:
    opacity 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

function CommunityBoard() {
  const [currentTab, setCurrentTab] = useState('찾아요');
  const clickTabHandle = (tab) => {
    setCurrentTab(tab);
  };
  const [visibleLost, setVisibleLost] = useState(8);
  const [visibleFound, setVisibleFound] = useState(8);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [disableMoreLost, setDisableMoreLost] = useState(false);
  const [disableMoreFound, setDisableMoreFound] = useState(false);

  const loadMoreLostItems = () => {
    setVisibleLost(prevVisible => prevVisible + 8);
  };

  const loadMoreFoundItems = () => {
    setVisibleFound(prevVisible => prevVisible + 8);
  };

  // 게시글 정보
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents('/post'),
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      const lost = data.filter((event) => event.board_category === 0);
      const found = data.filter((event) => event.board_category === 1);
      setLostItems(lost);
      setFoundItems(found);
    }
  }, [data]);

  useEffect(() => {
    setDisableMoreLost(visibleLost >= lostItems.length);
    setDisableMoreFound(visibleFound >= foundItems.length);
  }, [visibleLost, visibleFound, lostItems, foundItems]);

  const visibleLostItems = lostItems.slice(0, visibleLost);
  const visibleFoundItems = foundItems.slice(0, visibleFound);

  let content;

  if (isError) {
    content = (
      <ErrorBlock
        title="에러 발생"
        message={error.info?.message || '데이터를 가져오는데 실패했습니다.'}
      />
    );
  }

  if (data) {
    content = (
      <>
        {currentTab === '찾아요' ? (
          <LostContainer>
            {visibleLostItems.map((item) => (
              <CommunityCard
                key={item._id}
                picture={item.picture}
                title={item.title}
                complete={item.isFound ? '완료' : '미완료'}
                content={item.content}
                location={item.event_location}
                date={item.event_date}
                profile={item.userId?.profileImg}
                nickname={item.userId?.nickname}
                postId={item._id}
              />
            ))}
          </LostContainer>
        ) : (
          <FoundContainer>
            {visibleFoundItems.map((item) => (
              <CommunityCard
                key={item._id}
                picture={item.picture}
                title={item.title}
                complete={item.isFound ? '완료' : '미완료'}
                content={item.content}
                location={item.event_location}
                date={item.event_date}
                profile={item.userId?.profileImg}
                nickname={item.userId.nickname}
                postId={item._id}
              />
            ))}
          </FoundContainer>
        )}
      </>
    );
  }

  return (
    <Background>
      <CommunityContainer>
        <CommunityTab currentTab={currentTab} onClick={clickTabHandle} />
        {content}
      </CommunityContainer>
      <LoadButtonContainer>
        {isLoading ? (
          <CircularProgress sx={{ color: '#ff6700' }} />
        ) : (
          currentTab === '찾아요' ? (
            <LoadButton disabled={visibleLost >= lostItems.length} onClick={loadMoreLostItems}>더보기</LoadButton>
          ) : (
            <LoadButton disabled={visibleFound >= foundItems.length} onClick={loadMoreFoundItems}>더보기</LoadButton>
          )
        )}
      </LoadButtonContainer>
    </Background>
  );
}

export default CommunityBoard;
