import React from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const StyledScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &:hover {
    background-color: #333333; // 호버 시 색상 변경
  }
`;

const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledScrollToTopButton onClick={scrollToTop}>
      <ArrowUpwardIcon sx={{ fontSize: '20px' }} />
    </StyledScrollToTopButton>
  );
};

export default ScrollTopButton;
