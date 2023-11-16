import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import theme from '../../config/theme';

const CarouselContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  max-width: 70rem; // 캐러셀의 최대 너비를 설정하세요
`;

const CarouselSlide = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
`;

const Card = styled.div`
  width: 15.5rem;
  height: 15.5rem;
  margin: 1rem 1rem;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 12px;
  flex: none;
  font-size: ${theme.fontSizes.medium};
  &:hover {
    box-shadow: 0 2px 0.5rem rgba(0, 0, 0, 0.3); /* 호버 시 그림자 효과 */
    border: 2px solid #ff6700;
  }
`;

const cardsData = [
  { image: '/path/to/earbud_headphones.svg', label: '이어폰' },
  { image: '/path/to/earbud_headphones.svg', label: '지갑' },
  { image: '/path/to/earbud_headphones.svg', label: '휴대폰' },
  { image: '/path/to/earbud_headphones.svg', label: '시계' },
  { image: '/path/to/earbud_headphones.svg', label: '카드' },
  { image: '/path/to/earbud_headphones.svg', label: '가방' },
  { image: '/path/to/earbud_headphones.svg', label: '현금' },
];

const CardCarousel = () => {
  // 카드 데이터를 확장합니다. 마지막 카드 다음에 첫 번째 카드를 추가합니다.
  const extendedCards = [...cardsData, ...cardsData];

  // 초기 인덱스를 0으로 설정합니다.
  const [activeStep, setActiveStep] = useState(0);
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 500ms ease-in-out',
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === cardsData.length - 1 ? 0 : prevActiveStep + 1,
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? cardsData.length - 1 : prevActiveStep - 1,
    );
  };

  return (
    <CarouselContainer>
      <IconButton onClick={handleBack}>
        <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2rem' }} />
      </IconButton>
      <CarouselWrapper>
        <CarouselSlide
          style={{
            transform: `translateX(-${activeStep * 25.25}%)`,
          }}
        >
          {extendedCards.map((card, index) => (
            <Card key={index} elevation={4}>
              {card.label}
            </Card>
          ))}
        </CarouselSlide>
      </CarouselWrapper>
      <IconButton onClick={handleNext}>
        <ArrowForwardIosIcon style={{ color: '#ff6700', fontSize: '2rem' }} />
      </IconButton>
    </CarouselContainer>
  );
};

export default CardCarousel;
