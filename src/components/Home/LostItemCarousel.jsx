import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchProvider';
import { fetchRecentItems } from './fetchRecentItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120rem;
  padding: 0rem 5rem 4rem 5rem;
`;

const CarouselText = styled.span`
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  display: block;
  font-size: 1.4rem;
  flex-self: flex-start;
  color: #7c9299;
`;

const CarouselText2 = styled.span`
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  display: block;
  font-size: 1.4rem;
  flex-self: flex-start;
  color: #7c9299;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: black;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  max-width: 105rem;
`;

const CarouselSlide = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: relative;
  width: 20rem;
  height 20rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0;

  &:hover {
    transform: scale(1.05);
    div {
      display: block;
    }
  }
`;

const CardImage = styled.img`
  margin: 1rem 1rem 0rem 1rem;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  width: 17rem;
  height: 17rem;
`;

const CardText = styled.div`
  display: none;
  position: absolute;
  top: 1rem;
  left: 8rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 5px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-weight: 350;
    margin-bottom: 0;
  }

  p {
    color: grey;
    margin-top: 0;
  }
`;

const cardsData = [
  {
    date: '2023-12-01',
    id: 'F2023120100000069',
    imageUrl:
      'https://www.lost112.go.kr/lostnfs/images/uploadImg/20231201/20231201123258323.jpg',
    location: '을지로3가파출소',
    name: '삼성휴대폰',
  },
  {
    date: '2023-12-01',
    id: 'F2023120100000036',
    imageUrl:
      'https://www.lost112.go.kr/lostnfs/images/uploadImg/20231201/20231201010933266.jpg',
    location: '신사지구대',
    name: '아이폰14프로',
  },
  {
    date: '2023-12-01',
    id: 'F2023120100000023',
    imageUrl:
      'https://www.lost112.go.kr/lostnfs/images/uploadImg/20231201/20231201120731235.jpg',
    location: '논현1파출소',
    name: '구찌 여성용 카드지갑',
  },
  {
    date: '2023-12-01',
    id: 'F2023120100000008',
    imageUrl:
      'https://www.lost112.go.kr/lostnfs/images/uploadImg/20231201/20231201122224801.jpg',
    location: '당현지구대',
    name: '빌포드 가방',
  },
  {
    date: '2023-12-01',
    id: 'F2023120100000022',
    imageUrl:
      'https://www.lost112.go.kr/lostnfs/images/uploadImg/20231201/20231201123924746.jpg',
    location: '금천지구대',
    name: '아이폰',
  },
];

const LostItemCarousel = () => {
  // 초기 인덱스를 0으로 설정합니다.
  const [loading, setLoading] = useState(false);
  const { setResult, result, setPoliceCount, setSubwayCount, setPage } =
    useSearch('');
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true); // 로딩 시작
    setResult([]);
    setPage(1);
    setSubwayCount(0);
    setPoliceCount(0);

    const requests = [];
    requests.push(fetchRecentItems());

    try {
      const responses = await Promise.all(requests);

      const filteredResponses = responses.filter((item) => item != null);

      if (filteredResponses) {
        const flattenedResults = filteredResponses.flat(); // 중첩된 배열을 하나의 배열로 펼침
        const policeItem = flattenedResults.find((item) => {
          return item.id && item.id.startsWith('F');
        });
        const subwayItem = flattenedResults.find((item) => {
          return item.id && item.id.startsWith('V');
        });

        if (policeItem) {
          setPoliceCount(policeItem.totalCount);
        }

        if (subwayItem) {
          setSubwayCount(subwayItem.totalCount);
        }
        setResult(flattenedResults);
      }

      setLoading(false); // 로딩 종료

      navigate('/search'); // 리다이렉트
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TextContainer>
        {loading ? (
          <CarouselText>
            <CircularProgress
              sx={{ color: '#7c9299', marginRight: '1rem' }}
              size="1.2rem"
            />
            {'검색중입니다. 잠시만 기다려주세요!'}
          </CarouselText>
        ) : (
          <CarouselText>최근에 찾은 물건들</CarouselText>
        )}
        <CarouselText2 onClick={() => handleClick()}>
          {'더보기 '}
          <ArrowForwardIosIcon
            style={{ color: '#7c9299', fontSize: '1.4rem' }}
          />
        </CarouselText2>
      </TextContainer>

      <CarouselContainer>
        <CarouselWrapper>
          <CarouselSlide>
            {cardsData.map((card, index) => (
              <CardContainer key={index} onClick={() => handleClick()}>
                <CardImage src={card.imageUrl} key={index} />

                <CardContent>
                  <h3>{card.name}</h3>
                  <p>{card.date}</p>
                </CardContent>
                <CardText>{card.location}</CardText>
              </CardContainer>
            ))}
          </CarouselSlide>
        </CarouselWrapper>
      </CarouselContainer>
    </Container>
  );
};

export default LostItemCarousel;
