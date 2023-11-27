import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import notfound from '../../assets/notfound.jpg';
import axios from 'axios';
import { Box, Modal, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

async function fetchItemById(id) {
  const url =
    id[0] === 'F'
      ? 'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo'
      : ' http://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundDetailInfo';

  // ID : "F..." -> 경찰청 api,
  // ID: "V..." -> 지하철 api

  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // 경찰청 포털기관 Service Key
  );
  const queryParams = {
    serviceKey, // 서비스 키
    ATC_ID: id, // ID
    FD_SN: 1,
  };

  try {
    const response = await axios.get(url, { params: queryParams });
    console.log(response);

    const lostItem = response.data.response.body.item;

    const item = {
      id: lostItem.atcId,
      status: lostItem.csteSteNm,
      name: lostItem.fdPrdtNm,
      imageUrl: lostItem.fdFilePathImg,
      dateOfLoss: lostItem.fdYmd,
      location: lostItem.depPlace,
      foundAt: lostItem.fdPlace,
      tel: lostItem.tel,
      contentDetail: lostItem.uniq,
    };

    console.log(item);
    return item;
  } catch (error) {
    console.error('Error:', error);
  }
}

const Card = styled.div`
  background-color: rgba(124, 146, 153, 0.2);
  border: none; // 변경
  border-radius: 12px;
  width: 29.6rem;
  height: 35rem;
  // box-sizing: border-box;
  padding: 2.8rem 2.4rem 0;
  position: relative;
  top: 0;
  transition: all 0.2s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
`;

const Photo = styled.img`
  width: 14rem;
  height: 14rem;
  object-fit: cover; // 이미지 비율 유지
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const Content = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  line-height: 2rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const StyledSpan = styled.span`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
`;

const Location = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 0.4rem;
`;

const LocationIcon = styled(PlaceIcon)`
  color: ${theme.colors.text};
`;

const Date = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 0.8rem;
`;

const DateIcon = styled(CalendarMonthIcon)`
  color: ${theme.colors.text};
`;

const PositionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: #fffaf0;
  position: absolute;
  left: 0;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fffaf0',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '12px',
  maxHeight: '90vh', // 최대 높이 조정
  overflowY: 'auto', // 내용이 많을 경우 스크롤
  p: 3,
};

function ItemModal({ open, onClose, data }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ mb: 2 }}>
          {' '}
          {/* 마진 추가 */}
          <PhotoContainer>
            <Photo src={data.imageUrl} />
          </PhotoContainer>
        </Box>

        <DividerLine />

        <Box sx={{ my: 2 }}>
          <TitleContainer>
            <Title>{data.name}</Title>
          </TitleContainer>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Content>{data.contentDetail}</Content>
          <br />
          <br />
          <br />
          <StyledSpan>{data.foundAt}에서 발견</StyledSpan>
          <br />
          <StyledSpan>연락처: {data.tel}</StyledSpan>
          <br />
          <StyledSpan>ID: {data.id}</StyledSpan>
          <br />
          <StyledSpan>상태: {data.status}</StyledSpan>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <LocationIcon />
          <Location>{data.location}</Location>
          <DateIcon />
          <Date>{data.dateOfLoss}</Date>
        </Box>
      </Box>
    </Modal>
  );
}

function ResultCard({ name, content, imageUrl, location, date, id }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      const data = await fetchItemById(id);
      setModalData(data); // 데이터 설정
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error('Error fetching item:', error);
      // 에러 처리 로직
    }
  };

  return (
    <CardContainer>
      <Card onClick={handleClick}>
        <PhotoContainer>
          <Photo src={imageUrl} />
        </PhotoContainer>
        <DividerLine />
        <TitleContainer>
          <Title>{name}</Title>
        </TitleContainer>
        {/* <Location>
          <SearchIcon />
          {` ${location}에서 보관중`}
        </Location> */}
        <Content>{content}</Content>
        <PositionContainer>
          <LocationIcon />
          <Location>{location}</Location>
          <DateIcon />
          <Date>{date}</Date>
        </PositionContainer>
      </Card>
      {isModalOpen && (
        <ItemModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={modalData}
        />
      )}
    </CardContainer>
  );
}

export default ResultCard;
