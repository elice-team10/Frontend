import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import airpods from '../../assets/airpods.jpg';
import watch from '../../assets/watch.jpg';
import card from '../../assets/card.jpg';
import wallet from '../../assets/wallet.jpg';
import phone from '../../assets/iphone.jpg';
import bag from '../../assets/bag.jpg';
import jewerly from '../../assets/jewerly.jpg';
import clothes from '../../assets/clothes.jpg';
import laptop from '../../assets/laptop.jpg';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120rem;
  // background-color: #f7f3f0;
  padding: 0rem 5rem 4rem 5rem;
  margin-bottom: 2rem;
`;

const CarouselText = styled.span`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  margin-left: 5rem;
  display: block;
  font-size: 1.4rem;
  flex-self: flex-start;
  color: #7c9299;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  max-width: 88rem;
`;

const CarouselSlide = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
`;

const CardContainer = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.05);
    div {
      display: block;
    }
  }
`;

const CardImage = styled.img`
  margin: 1rem 1rem;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  width: 20rem;
  height: 20rem;
`;

const CardText = styled.div`
  display: none;
  position: absolute;
  bottom: 1rem;
  left: 10rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 5px;
`;

const cardsData = [
  {
    image: airpods,
    label: '이어폰',
    categoryCode: 'PRG000',
    categoryCode2: 'PRG900',
  },
  { image: wallet, label: '지갑', categoryCode: 'PRH000' },
  { image: phone, label: '휴대폰', categoryCode: 'PRJ000' },
  { image: card, label: '카드', categoryCode: 'PRP000' },
  { image: bag, label: '가방', categoryCode: 'PRA000' },
  { image: jewerly, label: '귀금속', categoryCode: 'PRO000' },
  { image: clothes, label: '의류', categoryCode: 'PRK000' },
  { image: laptop, label: '노트북', categoryCode: 'PRI000' },
  {
    image: watch,
    label: '시계',
    categoryCode: 'PRO000',
    categoryCode2: 'PRO400',
  },
];

async function fetchItemCategory(categoryCode, categoryCode2 = null) {
  const url =
    'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd';
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D',
  );

  const queryParams = {
    serviceKey, // 서비스 키
    PRDT_CL_CD_01: categoryCode, // 상품명
    N_FD_LCT_CD: 'LCA000',
    pageNo: 1, // 페이지 번호
    numOfRows: '20', // 행 수
  };

  if (categoryCode2) {
    queryParams.PRDT_CL_CD_02 = categoryCode2;
  }

  try {
    const response = await axios.get(url, { params: queryParams });

    // XML 파싱을 위한 파서 생성
    // const parser = new XMLParser();
    // const parsedResponse = parser.parse(response.data);

    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const results = [];
    for (const lostItem of lostItems) {
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
        productCategory: lostItem.prdtClNm,
        totalCount,
      };

      results.push(item);
    }
    // 결과 출력
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Parsed Body:', results);
    console.log(
      `Num of Rows:${numOfRows}, Page No. : ${pageNo}, Total Count : ${totalCount}`,
    );
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

const CardCarousel = () => {
  // 초기 인덱스를 0으로 설정합니다.
  const [activeStep, setActiveStep] = useState(0);
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 0.3s ease-in-out',
  );
  const [loading, setLoading] = useState(false);
  const { setResult, setPoliceCount, setSubwayCount } = useSearch('');
  const navigate = useNavigate();

  const handleClick = async (card) => {
    setLoading(true); // 로딩 시작
    setResult([]);
    const requests = [];
    if (card.categoryCode2) {
      requests.push(fetchItemCategory(card.categoryCode, card.categoryCode2));
    } else {
      requests.push(fetchItemCategory(card.categoryCode));
    }

    try {
      const responses = await Promise.all(requests);
      if (responses) {
        const flattenedResults = responses.flat(); // 중첩된 배열을 하나의 배열로 펼침
        setResult(flattenedResults);

        const policeItem = flattenedResults.find(
          (item) => item.id && item.id.startsWith('f'),
        );
        const subwayItem = flattenedResults.find(
          (item) => item.id && item.id.startsWith('v'),
        );

        if (policeItem) {
          setPoliceCount(policeItem.totalCount);
        }

        if (subwayItem) {
          setSubwayCount(subwayItem.totalCount);
        }
      }

      setLoading(false);
      navigate('/search'); // 리다이렉트
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    // 애니메이션 효과를 비활성화하는 조건을 체크합니다.
    if (activeStep === cardsData.length - 4) {
      setCarouselTransition('none'); // 애니메이션 효과 제거
      setActiveStep(0);
    } else {
      setCarouselTransition('transform 0.3s ease-out'); // 기본 애니메이션 복구
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    // 애니메이션 효과를 비활성화하는 조건을 체크합니다.
    if (activeStep === 0) {
      setCarouselTransition('none'); // 애니메이션 효과 제거
      setActiveStep(cardsData.length - 4);
    } else {
      setCarouselTransition('transform 0.3s ease-out'); // 기본 애니메이션 복구
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Container>
      {loading ? (
        <CarouselText>
          <CircularProgress
            sx={{ color: '#7c9299', marginRight: '1rem' }}
            size="1.4rem"
          />
          {'검색중입니다. 잠시만 기다려주세요!'}
        </CarouselText>
      ) : (
        <CarouselText>자주 잃어버리는 물건들</CarouselText>
      )}

      <CarouselContainer>
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2rem' }} />
        </IconButton>
        <CarouselWrapper>
          <CarouselSlide
            style={{
              transition: `${carouselTransition}`,
              transform: `translateX(-${activeStep * 25}%)`,
            }}
          >
            {cardsData.map((card, index) => (
              <CardContainer key={index} onClick={() => handleClick(card)}>
                <CardImage src={card.image} key={index} />
                <CardText>{card.label}</CardText>
              </CardContainer>
            ))}
          </CarouselSlide>
        </CarouselWrapper>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon style={{ color: '#ff6700', fontSize: '2rem' }} />
        </IconButton>
      </CarouselContainer>
    </Container>
  );
};

export default CardCarousel;
