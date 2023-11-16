import React from 'react';
import styled from 'styled-components';
import LafButton from './LafButton';
import SubwaySelector from './SubwaySelector';
import DistrictSelector from './DistrictSelector';

const HomeButtonsContainer = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  gap: 3rem; /* 버튼 사이의 간격 */
`;

const HomeButtons = () => {
  return (
    <HomeButtonsContainer>
      <LafButton text="찾아요" />
      <LafButton text="주웠어요" />
      <SubwaySelector label="지하철 노선" />
      <DistrictSelector label="지하철 노선" />
    </HomeButtonsContainer>
  );
};

export default HomeButtons;
