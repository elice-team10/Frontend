import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import lafLogo from '../../assets/laf_logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { Box, LinearProgress, CircularProgress } from '@mui/material';
import { useSearch } from '../../context/SearchProvider';
import axios from 'axios';
import { fetchSubwayItems, fetchItems } from './fetchItems';

const HomeContainer = styled.div`
  width: 1200px;
  background-color: #fff;
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
  border: 2.5px solid #ff6700;
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
  outline: none;
  width: 70rem;
  margin: auto 30px auto 30px;
  font-size: 1.8rem;
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
  // transition: color 0.3s;
  // ::placeholder {
  //   color: rgba(57, 61, 63, 0.3);
  // }
`;

export async function fetchSubwayItems(productName, place, page) {
  const url =
    'http://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundInfoAccTpNmCstdyPlace'; // 경찰청외 포털기관 (지하철, 공항..)
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // Service key
  );
  const queryParams = {
    serviceKey, // 서비스 키
    PRDT_NM: productName, // 상품명
    DEP_PLACE: place, // 보관 장소
    pageNo: page, // 페이지 번호
    numOfRows: '10', // 행 수
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    // XML 파싱을 위한 파서 생성
    // const parser = new XMLParser();
    // const parsedResponse = parser.parse(response.data);
    console.log(response);
    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const arr = [];
    for (const lostItem of lostItems) {
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
      };

      arr.push(item);
    }
    // 결과 출력
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log(
      `지하철: Num of Rows:${numOfRows}, Page No. : ${pageNo}, Total Count : ${totalCount}`,
    );
    return arr;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchLostItems(productName, place, page) {
  const url =
    'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccTpNmCstdyPlace'; // 경찰청 포털기관
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // 경찰청 포털기관 Service Key
  );
  const queryParams = {
    serviceKey, // 서비스 키
    PRDT_NM: productName, // 상품명
    DEP_PLACE: place, // 보관 장소
    pageNo: page, // 페이지 번호
    numOfRows: '10', // 행 수
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    // XML 파싱을 위한 파서 생성
    // const parser = new XMLParser();
    // const parsedResponse = parser.parse(response.data);
    console.log(response);
    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const arr = [];
    for (const lostItem of lostItems) {
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
      };

      arr.push(item);
    }
    // 결과 출력
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Parsed Body:', arr);
    console.log(
      `Num of Rows:${numOfRows}, Page No. : ${pageNo}, Total Count : ${totalCount}`,
    );
    return arr;
  } catch (error) {
    console.error('Error:', error);
  }
}

const HomeSearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    subwayLine,
    district,
    page,
    setResult,
    result,
  } = useSearch('');
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 로딩 시작

    const requests = [];

    // 셀렉터를 선택하지 않으면 모든 api에 대한 결과를 보여줍니다.
    if ((district === '') & (subwayLine === '')) {
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
      if (responses) {
        const flattenedResults = responses.flat(); // 중첩된 배열을 하나의 배열로 펼침
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
