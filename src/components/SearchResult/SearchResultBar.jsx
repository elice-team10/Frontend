import React, { useState } from 'react';
import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // 위치 아이콘
import SubwayIcon from '@mui/icons-material/DirectionsSubway';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import LafImage from '../../assets/laf_button.png';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Navigate, useNavigate } from 'react-router-dom';
import airpods from '../../assets/airpods.jpg';
import iphone from '../../assets/iphone.jpg';
import notfound from '../../assets/notfound.jpg';
import ResultCard from './ResultCard';

const LoadButton = styled.button`
  background:  linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
  border: none;
  color: #fffaf0;
  width: 15rem;
  height: 5rem;
  border-radius: 20px;
  font-size: 1.8rem;
  cursor: pointer;
  transition:
    opacity 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const GradationBox = styled.div`
width: 103rem;
height: 1rem;
background: linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
margin: 2rem 0;
border-radius: 12px;
`;

const LoadButtonContainer = styled.div`
  margin: 3rem 0 5rem 0;
  display: flex;
  justify-content: center;
`;

function SearchResultBar() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(searchResults.slice(0, 9));

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setItemsToShow([
        ...itemsToShow,
        ...itemsData.slice(itemsToShow.length, itemsToShow.length + 9),
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleChipClick = (chipKey) => {
    setSelectedChip(chipKey);
    // TODO: 검색 결과를 가져오는 로직을 여기에 구현
    // 예를 들어, API 호출 등을 통해 검색 결과를 설정할 수 있습니다.
    setSearchResults([
      // 검색 결과 데이터의 예시
      {
        title: '에어팟',
        foundAt: '버스정류장',
        location: '시청역에서 보관중',
        date: '1일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: notfound,
      },
      {
        title: '에어팟 프로',
        foundAt: '택시',
        location: '용산역에서 보관중',
        date: '1일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: airpods,
      },
      {
        title: '에어팟 맥스',
        foundAt: '택시',
        location: '신도림경찰서에서 보관중',
        date: '2일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      {
        title: '빨간 에어팟',
        foundAt: '성수낙낙',
        location: '성동경찰서에서 보관중',
        date: '2일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: notfound,
      },
      {
        title: '검정 에어팟',
        foundAt: '강남사거리',
        location: '강남역에서 보관중',
        date: '4일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: airpods,
      },
      {
        title: '에어팟 6',
        foundAt: '강남역 8번 출구',
        location: '강남역에서 보관중',
        date: '4일전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: notfound,
      },
      {
        title: '에어팟 7',
        foundAt: '어느 뒷골목',
        location: '용산지구대에서 보관중',
        date: '1주일 전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      {
        title: '짝퉁 에어팟',
        foundAt: '보도블럭',
        location: '강남역에서 보관중',
        date: '한 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: notfound,
      },
      {
        title: '에어팟 9',
        foundAt: '강남역 11번출구',
        location: '강남역에서 보관중',
        date: '두 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: notfound,
      },
      {
        title: '에어팟 10',
        foundAt: '강남역 지하상가',
        location: '강남역에서 보관중',
        date: '두 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      {
        title: '에어팟 11',
        foundAt: '강남역 지하상가',
        location: '강남역에서 보관중',
        date: '두 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      {
        title: '에어팟 12',
        foundAt: '강남역 지하상가',
        location: '강남역에서 보관중',
        date: '두 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      {
        title: '에어팟 13',
        foundAt: '강남역 지하상가',
        location: '강남역에서 보관중',
        date: '두 달전',
        content:
          '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
        img: iphone,
      },
      // ... 추가 결과
    ]);
  };

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1200px', width: '70%' }}>
      <Stack direction="row" spacing={1} mt={10} mb={1}>
        <IconButton onClick={() => navigate(-1)} sx={{ padding: '0' }}>
          <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2.5rem' }} />
        </IconButton>
        <Chip
          icon={<LocationOnIcon sx={{ fontSize: '2.5rem' }} />}
          label="경찰서에서 보관중"
          onClick={handleChipClick}
          sx={{ fontSize: '1.6rem' }}
        />
        <Chip
          icon={<SubwayIcon sx={{ fontSize: '2.5rem' }} />}
          label="지하철에서 발견"
          onClick={handleChipClick}
          sx={{ fontSize: '1.6rem', padding: '1rem' }}
        />
        <Chip
          avatar={<Avatar alt="LafButton" src={LafImage} />}
          label="게시판"
          color="warning"
          onClick={handleChipClick}
          sx={{
            fontSize: '1.6rem',
            backgroundColor: '#ff6700',
            color: '#fffaf0',
          }}
        />
      </Stack>
      <GradationBox/>
      {searchResults.length > 0 && (
        <Grid container spacing={2}>
          {searchResults.slice(0, 9).map((result, index) => (
            <Grid item xs={4}>
              <ResultCard/>
            </Grid>
          ))}
        </Grid>
      )}
      <LoadButtonContainer>
        {loading ? (
          <CircularProgress sx={{ color: '#ff6700' }} />
        ) : (
          <LoadButton onClick={handleLoadMore}>더보기</LoadButton>
        )}
      </LoadButtonContainer>
    </div>
  );
}

export default SearchResultBar;
