import React, { useState } from 'react';
import styled from 'styled-components';
import LafButton from './LafButton';
import SubwaySelector from './SubwaySelector';
import DistrictSelector from './DistrictSelector';
import { useSearch } from '../../context/SearchProvider';

const HomeButtonsContainer = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  gap: 3rem; /* 버튼 사이의 간격 */
`;

const HomeButtons = () => {
  const { setCategory } = useSearch('');
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (category) => {
    setCategory(category);
    setSelectedButton(category);
  };

  return (
    <HomeButtonsContainer>
      <LafButton
        text="찾아요"
        selected={selectedButton === 0}
        onClick={() => handleClick(0)}
      />
      <LafButton
        text="주웠어요"
        selected={selectedButton === 1}
        onClick={() => handleClick(1)}
      />
      <SubwaySelector label="지하철 노선" />
      <DistrictSelector label="지하철 노선" />
    </HomeButtonsContainer>
  );
};

export default HomeButtons;
