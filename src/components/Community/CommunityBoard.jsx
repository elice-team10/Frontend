import styled from 'styled-components';
import CommunityTab from './CommunityTab';
import { useState } from 'react';
import CommunityCard from './CommunityCard';

const CommunityContainer = styled.div`
  width: 1200px;
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
    setCurrentTab(tab);
  };

  return (
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
  );
}

export default CommunityBoard;

