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

function SearchResultDetail() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(searchResults.slice(0, 9));
  const { result1, result2 } = useSearch('');

  async function fetchItemById(id) {
    const url =
      'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo'; // 경찰청 포털기관
    const serviceKey = decodeURIComponent(
      'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // 경찰청 포털기관 Service Key
    );
    const queryParams = {
      serviceKey, // 서비스 키
      ATC_ID: id, // ID
    };

    try {
      const response = await axios.get(url, { params: queryParams });

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
    setSearchResults([]);
  };

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1200px', width: '70%' }}>
      <Stack direction="row" spacing={1} mt={10} mb={1}>
        <IconButton onClick={() => navigate(-1)} sx={{ padding: '0' }}>
          <ArrowBackIosIcon style={{ color: '#ff6700', fontSize: '2.5rem' }} />
        </IconButton>
      </Stack>
      <GradationBox />
    </div>
  );
}

export default SearchResultDetail;
