import React, { useState, useEffect } from 'react';
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
import notfound from '../../assets/notfound.jpg';
import ResultCard from './ResultCard';
import { useSearch } from '../../context/SearchProvider';
import { fetchSubwayItems, fetchLostItems } from '../Home/fetchItems';

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
  const {
    searchTerm,
    setSearchTerm,
    subwayLine,
    district,
    page,
    setPage,
    setResult,
    result,
  } = useSearch('');

  useEffect(() => {
    // result 배열이 업데이트 될 때마다 searchResults 상태를 업데이트
    setSearchResults(result);
  }, [result]);

  useEffect(() => {
    // searchTerm, subwayLine, district, page 중 하나라도 변경될 때 실행됩니다.
    console.log(searchTerm, subwayLine, district, page);
  }, [searchTerm, subwayLine, district, page]);

  const handleLoadMore = async () => {
    setLoading(true);
    setPage((current) => current + 1);

    const requests = [];

    // 셀렉터를 선택하지 않으면 모든 api에 대한 결과를 보여줍니다.
    if (district === '' && subwayLine === '') {
      requests.push(fetchLostItems(searchTerm, '', page));
      requests.push(fetchSubwayItems(searchTerm, '', page));
    }

    if (district !== '') {
      requests.push(fetchLostItems(searchTerm, district, page));
    }

    if (subwayLine !== '') {
      requests.push(fetchSubwayItems(searchTerm, subwayLine, page));
    }

    try {
      const responses = await Promise.all(requests);

      const flattenedResults = responses.flat(); // 중첩된 배열을 하나의 배열로 펼침
      setResult((prevResult) => [...prevResult, ...flattenedResults]);

      setLoading(false); // 로딩 종료
    } catch (error) {
      console.log(error);
    }
  };

  const handleChipClick = (chipKey) => {
    setSelectedChip(chipKey);

    // '전체 검색결과' 칩을 클릭했을 때 모든 결과를 보여줍니다.
    if (chipKey === 'all') {
      setSearchResults([...result]);
    }
    // '경찰서에서 보관중' 칩을 클릭했을 때 ID가 'F'로 시작하는 결과만 필터링합니다.
    else if (chipKey === 'police') {
      setSearchResults(result.filter((item) => item.id[0] === 'F'));
    }
    // '지하철 및 기타기관' 칩을 클릭했을 때 해당 결과를 보여줍니다.
    else if (chipKey === 'subway') {
      setSearchResults(result.filter((item) => item.id[0] === 'V'));
    }
  };

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1200px', width: '70%' }}>
      <Stack direction="row" spacing={1} mt={10} mb={1}>
        <IconButton onClick={() => navigate(-1)} sx={{ padding: '0' }}>
          <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2.5rem' }} />
        </IconButton>
        <Chip
          icon={<SearchIcon sx={{ fontSize: '2.5rem' }} />}
          label="전체 검색결과"
          onClick={() => handleChipClick('all')}
          sx={{ fontSize: '1.6rem' }}
        />
        <Chip
          icon={<LocationOnIcon sx={{ fontSize: '2.5rem' }} />}
          label="경찰서에서 보관중"
          onClick={() => handleChipClick('police')}
          sx={{ fontSize: '1.6rem' }}
        />
        <Chip
          icon={<SubwayIcon sx={{ fontSize: '2.5rem' }} />}
          label="지하철 및 기타기관"
          onClick={() => handleChipClick('subway')}
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
      <GradationBox />
      {result.length > 0 && (
        <Grid container spacing={2}>
          {searchResults.map((item, index) => (
            <Grid item xs={3} key={index}>
              <ResultCard {...item} />
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
