import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import lafLogo from '../../assets/laf_logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { Box, LinearProgress, CircularProgress } from '@mui/material';
import { useSearch } from '../../context/SearchProvider';
import axios from 'axios';
import { fetchSubwayItems, fetchLostItems, fetchCommunity } from './fetchItems';
import { SecurityUpdateGood } from '@mui/icons-material';

const HomeContainer = styled.div`
  width: 1200px;
`;

const Image = styled.img`
  display: block;
  margin: 2rem auto 0 auto;
  cursor: pointer;
  width: 170px;
`;

const HomeSearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  width: 70rem;
  height: 50px;
  border-radius: 32px;
  border: 3px solid #ff6700;
  transition:
    border-color 0.1s,
    box-shadow 0.2s;
  &:hover {
    border-color: #ff4000;
    box-shadow: 0 0 5px 2px rgb(225, 225, 226);
    input:: placeholder {
      // color: #ff4500;
    }
  }
`;

const StyledIcon = styled(SearchIcon)`
  font-size: 4rem !important;
  color: #ff6700;
  margin-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  &:hover {
  }
`;

const SearchInput = styled.input`
  border: none;
  color: #393d3f;
  background-color: #f7f3f0;
  outline: none;
  width: 70rem;
  margin: auto 30px auto 30px;
  font-size: 1.8rem;
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
`;

const HomeSearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    subwayLine,
    district,
    page,
    setPage,
    setResult,
    result,
    category,
    setSubwayCount,
    setPoliceCount,
    subwayCount,
    policeCount,
  } = useSearch('');
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  useEffect(() => {
    // searchTerm, subwayLine, district, page 중 하나라도 변경될 때 실행됩니다.
    console.log(
      searchTerm,
      subwayLine,
      district,
      page,
      category,
      policeCount,
      subwayCount,
    );
  }, [
    searchTerm,
    subwayLine,
    district,
    page,
    category,
    policeCount,
    subwayCount,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 로딩 시작

    setResult([]);
    setPage(1);
    setSubwayCount(0);
    setPoliceCount(0);
    const requests = [];

    // 셀렉터를 선택하지 않으면 모든 api에 대한 결과를 보여줍니다.
    if (district === '' && subwayLine === '') {
      requests.push(fetchLostItems(searchTerm, '', 1));
      requests.push(fetchSubwayItems(searchTerm, '', 1));
    }

    if (district !== '') {
      requests.push(fetchLostItems(searchTerm, district, 1));
    }

    if (subwayLine !== '') {
      requests.push(fetchSubwayItems(searchTerm, subwayLine, 1));
    }

    requests.push(fetchCommunity(searchTerm, category));

    try {
      const responses = await Promise.all(requests);
      if (responses) {
        const flattenedResults = responses.flat(); // 중첩된 배열을 하나의 배열로 펼침
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

  useEffect(() => {
    console.log('Results updated:', result);
  }, [result]);

  return (
    <HomeContainer>
      <Image
        src={lafLogo}
        onClick={() => {
          window.location.href = '/';
        }}
      />
      <HomeSearchBarContainer>
        <SearchBox onSubmit={handleSubmit}>
          {loading ? (
            <Box sx={{ display: 'flex', marginLeft: '10px' }}>
              <CircularProgress size={30} sx={{ color: '#ff6700' }} />
            </Box>
          ) : (
            ''
          )}

          <SearchInput
            type="text"
            placeholder={loading ? '검색중' : '무엇을 잃어버렸나요?'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StyledIcon />
        </SearchBox>
      </HomeSearchBarContainer>
    </HomeContainer>
  );
};

export default HomeSearchBar;
