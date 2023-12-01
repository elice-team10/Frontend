import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import lafLogo from '../../assets/laf_logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { Box, LinearProgress, CircularProgress } from '@mui/material';
import { useSearch } from '../../context/SearchProvider';
import { fetchSubwayItems, fetchLostItems, fetchCommunity } from './fetchItems';
import { SearchHistoryIcon } from './SearchHistoryIcon';

const HomeContainer = styled.div`
  max-width: 1200px;
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
  max-width: 120rem;
  //background-color: #7c9299;
  padding: 3rem 11.75rem;
  border-radius: 12px;
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  width: 70rem;
  height: 50px;
  border-radius: 32px;
  background-color: #fff;
  border: 3px solid #ff6700;
  transition:background-color 0.1s,
  &:hover {
    background-color: black;
  }
`;

const SearchButton = styled.button`
  width: 9rem;
  height: 50px;
  border-radius: 32px;
  border: none;
  background-color: #151618;
  color: white;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #ff6700;
    color: black;
  }
`;

const StyledIcon = styled(SearchIcon)`
  font-size: 4rem !important;
  color: #ff6700;
  margin-left: 15px;
  margin-top: auto;
  margin-bottom: auto;
  &:hover {
  }
`;

const SearchInput = styled.input`
  border: none;
  color: #393d3f;
  background-color: white;
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

  const saveSearchTerm = (term) => {
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searches.includes(term)) {
      searches = [term, ...searches].slice(0, 10); // 최근 10개 항목만 저장
      localStorage.setItem('searchHistory', JSON.stringify(searches));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 로딩 시작

    setResult([]);
    setPage(1);
    setSubwayCount(0);
    setPoliceCount(0);
    saveSearchTerm(searchTerm);

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
            <StyledIcon />
          )}

          <SearchInput
            type="text"
            placeholder={loading ? '검색중' : '무엇을 잃어버렸나요?'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchHistoryIcon />
        </SearchBox>
        <SearchButton onClick={handleSubmit}>검색</SearchButton>
      </HomeSearchBarContainer>
    </HomeContainer>
  );
};

export default HomeSearchBar;
