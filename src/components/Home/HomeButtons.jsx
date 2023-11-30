import React, { useState } from 'react';
import styled from 'styled-components';
import LafButton from './LafButton';
import SubwaySelector from './SubwaySelector';
import DistrictSelector from './DistrictSelector';
import { useSearch } from '../../context/SearchProvider';

const HomeButtonsContainer = styled.div`
  display: flex;
  width: 105rem;
  justify-content: center;
  margin: 2rem 0rem;
  gap: 3rem; /* 버튼 사이의 간격 */
  padding-bottom: 1rem;
`;

const HomeButtons = () => {
  const { setCategory } = useSearch('');
  const [selectedButton, setSelectedButton] = useState(1); // 초기값을 1로 설정

  const handleClick = () => {
    const newCategory = selectedButton === 0 ? 1 : 0;
    setCategory(newCategory);
    setSelectedButton(newCategory);
  };

  return (
    <HomeButtonsContainer>
      <LafButton
        text={selectedButton === 0 ? '찾아요' : '주웠어요'}
        selected={selectedButton === 0}
        onClick={handleClick}
      />
      <SubwaySelector label="지하철 노선" />
      <DistrictSelector label="지하철 노선" />
    </HomeButtonsContainer>
  );
};

export default HomeButtons;
