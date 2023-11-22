import React, { useState } from 'react';
import styled from 'styled-components';
import lafLogo from '../../assets/laf_logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
//import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

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

async function fetchLostItems(productName, place, page) {
  const url =
    'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccTpNmCstdyPlace';
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D',
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
        dateOfLoss: lostItem.fdYmd,
        location: lostItem.depPlace,
        productCategory: lostItem.prdtClNm,
      };

      // Add image to results
      // if (item.imageUrl) {
      //   item.image = await fetch(item.imageUrl);
      //   item.image = await item.image.buffer();
      // }

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

const HomeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPlace, setSearchPlace] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    fetchLostItems(searchTerm, searchPlace, 2); // 검색어로 fetchLostItems 실행
  };

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
          <SearchInput
            type="text"
            placeholder="무엇을 잃어버렸나요?"
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
