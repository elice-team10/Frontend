import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import CommunityTab from './CommunityTab';
import CommunityCard from './CommunityCard';
import { fetchEvents } from '../../api/http';
import ErrorBlock from '../UI/ErrorBlock';

const Background = styled.div`
  background-color: #eee;
`;

const CommunityContainer = styled.div`
  width: 1200px;
  height: 100%;
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

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
  console.log(data);
  let content;

  if (isPending) {
    content = <div>Loading...</div>;
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
    const lostItem = data.filter((event) => event.board_category === 0);
    const foundItem = data.filter((event) => event.board_category === 1);

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
                nickname={item.nickname}
                replyCount={'0'}
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
                nickname={item.nickname}
                replyCount={'0'}
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
    </Background>
  );
}

export default CommunityBoard;
