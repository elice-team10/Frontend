import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import CommunityTab from './CommunityTab';
import CommunityCard from './CommunityCard';
import { fetchEvents } from '../../api/http';
import ErrorBlock from '../UI/ErrorBlock';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useInfiniteQuery } from 'react-query';

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
`;

function CommunityBoard() {
  const [currentTab, setCurrentTab] = useState('찾아요');
  const clickTabHandle = (tab) => {
    setCurrentTab(tab);
  };

  const elementRef = useRef();

  // 게시글 정보
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['events'],
  //   queryFn: () => fetchEvents(`/post?limit=8skip=${page * 10}`),
  //   staleTime: 5000,
  // });

  const fetchPosts = ({ pageParam = 0 }) => fetchEvents(`/post?limit=8&skip=${pageParam * 8}`);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage
  } = useInfiniteQuery('events', fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 8) return undefined; // 페이지당 8개의 게시물을 불러오므로, 마지막 페이지의 게시물 수가 8보다 작다면 더 이상 불러올 페이지가 없음을 의미
      return pages.length; // 페이지 번호는 0부터 시작하므로, 현재까지 불러온 페이지 개수가 바로 다음 페이지 번호가 됩니다.
    },
  });

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasNextPage) {
      console.log("fetching next page...");
      fetchNextPage();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [elementRef, hasNextPage]);



  let content;

  if (isLoading) {
    content = <CircularProgress sx={{ color: '#ff6700' }} />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="에러 발생"
        message={error.info?.message || '데이터를 가져오는데 실패했습니다.'}
      />
    );
  }

  if (data) {
    console.log(data);
    console.log('isfet' ,isFetchingNextPage);

    const lostItem = [];
    const foundItem = [];
  
    data.pages.forEach((page) => {
      const lost = page.filter((event) => event.board_category === 0);
      const found = page.filter((event) => event.board_category === 1);
      lostItem.push(...lost);
      foundItem.push(...found);
    });
  
    content = (
      <>
        {currentTab === '찾아요' ? (
          <LostContainer>
            {lostItem.map((item, index) => (
              <CommunityCard
                key={item._id}
                picture={item.picture}
                title={item.title}
                complete={item.isFound ? '완료' : '미완료'}
                content={item.content}
                location={item.event_location}
                date={item.event_date}
                nickname={item.userId?.nickname}
                replyCount={'0'}
                postId={item._id}
              />
            ))}
          </LostContainer>
        ) : (
          <FoundContainer>
            {foundItem.map((item, index) => (
              <CommunityCard
                key={item._id}
                picture={item.picture}
                title={item.title}
                complete={item.isFound ? '완료' : '미완료'}
                content={item.content}
                location={item.event_location}
                date={item.event_date}
                nickname={item.userId.nickname}
                replyCount={'0'}
                postId={item._id}
              />
            ))}
          </FoundContainer>
        )}
      </>
    );
  }

  return (
    <>
    <Background>
      <CommunityContainer>
        <CommunityTab currentTab={currentTab} onClick={clickTabHandle} />
        {content}
      </CommunityContainer>
    </Background>
    {isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <CircularProgress />
        </Box>
      )}
      <div ref={elementRef} />
    </>
  );
}

export default CommunityBoard;
