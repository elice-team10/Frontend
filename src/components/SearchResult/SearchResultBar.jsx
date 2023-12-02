import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
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
import ResultCard from './ResultCard';
import { useSearch } from '../../context/SearchProvider';
import { fetchSubwayItems, fetchLostItems } from '../Home/fetchItems';

const Container = styled.div`
  min-height: 100vh;
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 2,
    color: 'black',
    fontSize: '12px',
    padding: '0 4px',
  },
}));

const NotFoundBox = styled.div`
  height: 70vh; // 높이 설정
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  text-align: center; // 텍스트 중앙 정렬
  font-size: 3rem;
  font-weight: 375;
`;

const StyledGridContainer = styled(Grid)`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto; // 중앙 정렬
`;

const LoadButton = styled.button`
  background:  #151618;
  border: none;
  color:  white;
  width: 15rem;
  height: 5rem;
  border-radius: 12px;
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
  width: 100%;
  min-width: 117.6rem;
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
  const [selectedChip, setSelectedChip] = useState('all');
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
    subwayCount,
    setSubwayCount,
    policeCount,
    setPoliceCount,
  } = useSearch('');

  useEffect(() => {
    // result 배열이 업데이트 될 때마다 searchResults 상태를 업데이트
    setSearchResults(result);
  }, [result]);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 컴포넌트 마운트 시 최상단으로 스크롤
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const requests = [];

    // 셀렉터를 선택하지 않으면 모든 api에 대한 결과를 보여줍니다.
    if (district === '' && subwayLine === '') {
      requests.push(fetchLostItems(searchTerm, '', nextPage));
      requests.push(fetchSubwayItems(searchTerm, '', nextPage));
    }

    if (district !== '') {
      requests.push(fetchLostItems(searchTerm, district, nextPage));
    }

    if (subwayLine !== '') {
      requests.push(fetchSubwayItems(searchTerm, subwayLine, nextPage));
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

    // 먼저 유효한 결과만 필터링
    const validResults = result.filter((item) => item != null);

    // '전체 검색결과' 칩을 클릭했을 때 모든 유효한 결과를 보여줍니다.
    if (chipKey === 'all') {
      setSearchResults([...validResults]);
    }
    // '경찰서에서 보관중' 칩을 클릭했을 때 ID가 'F'로 시작하는 결과만 필터링합니다.
    else if (chipKey === 'police') {
      setSearchResults(validResults.filter((item) => item.id[0] === 'F'));
    }
    // '지하철 및 기타기관' 칩을 클릭했을 때 해당 결과를 보여줍니다.
    else if (chipKey === 'subway') {
      setSearchResults(validResults.filter((item) => item.id[0] === 'V'));
    }
    // '커뮤니티' 칩을 클릭했을 때 해당 결과를 보여줍니다.
    else if (chipKey === 'community') {
      setSearchResults(validResults.filter((item) => item.id[0] === '6'));
    }
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Stack direction="row" spacing={2} mt={10} mb={1}>
        <IconButton onClick={() => navigate(-1)} sx={{ padding: '0' }}>
          <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2.5rem' }} />
        </IconButton>

        <StyledBadge
          badgeContent={policeCount + subwayCount}
          color="warning"
          max={999}
        >
          <Chip
            icon={<SearchIcon sx={{ fontSize: '2.5rem' }} />}
            label={'전체 검색결과'}
            onClick={() => handleChipClick('all')}
            sx={{
              fontSize: '1.6rem',
              backgroundColor: selectedChip === 'all' ? '#151618' : '',
              color: selectedChip === 'all' ? 'white' : '',
            }}
          />
        </StyledBadge>

        <StyledBadge badgeContent={policeCount} color="warning" max={999}>
          <Chip
            icon={<LocationOnIcon sx={{ fontSize: '2.5rem' }} />}
            label={'경찰서에서 보관중'}
            onClick={() => handleChipClick('police')}
            sx={{
              fontSize: '1.6rem',
              backgroundColor: selectedChip === 'police' ? '#151618' : '',
              color: selectedChip === 'police' ? 'white' : '',
            }}
          />
        </StyledBadge>
        <StyledBadge badgeContent={subwayCount} color="warning" max={999}>
          <Chip
            icon={<SubwayIcon sx={{ fontSize: '2.5rem' }} />}
            label={'지하철 및 기타기관'}
            onClick={() => handleChipClick('subway')}
            sx={{
              fontSize: '1.6rem',
              padding: '1rem',
              backgroundColor: selectedChip === 'subway' ? '#151618' : '',
              color: selectedChip === 'subway' ? 'white' : '',
            }}
          />
        </StyledBadge>

        <Chip
          avatar={<Avatar alt="LafButton" src={LafImage} />}
          label="게시판"
          color="warning"
          onClick={() => handleChipClick('community')}
          sx={{
            fontSize: '1.6rem',
            backgroundColor: '#ff6700',
            color: '#fffaf0',
          }}
        />
      </Stack>
      <GradationBox />
      {searchResults.length ? (
        <StyledGridContainer container spacing={3}>
          {searchResults.map((item, index) =>
            item ? (
              <Grid item xs={3} key={index}>
                <ResultCard {...item} />
              </Grid>
            ) : null,
          )}
        </StyledGridContainer>
      ) : (
        <NotFoundBox>검색 결과가 없습니다. 🥲</NotFoundBox>
      )}
      <LoadButtonContainer>
        {loading ? (
          <CircularProgress sx={{ color: '#ff6700' }} />
        ) : (
          <LoadButton onClick={handleLoadMore}>더보기</LoadButton>
        )}
      </LoadButtonContainer>
    </Container>
  );
}

export default SearchResultBar;
