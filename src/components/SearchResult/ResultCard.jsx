import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import notfound from '../../assets/notfound.jpg';
import axios from 'axios';
import { Box, Modal, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

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
  background-color: #fffaf0;
  border: none; // 변경
  border-radius: 8px;
  width: 29.6rem;
  height: 35rem;
  cursor: pointer;
  // box-sizing: border-box;
  padding: 2.8rem 2.4rem 0;
  position: relative;
  top: 0;
  transition: all 0.2s ease-in;
  display: flex; // flex 디스플레이 추가
  flex-direction: column; // 세로 방향 정렬
  justify-content: space-between; // 컨텐츠 사이의 공간 균등 분배

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
  cursor: pointer;
`;

const LargePhoto = styled.img`
  width: 17rem;
  height: 17rem;
  object-fit: cover; // 이미지 비율 유지
  cursor: pointer;
  transition: transfrom 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
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
  font-weight: bold;
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

const CloseIconStyle = {
  cursor: 'pointer',
  fontSize: '20px',
};

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
  justify-contents: space-between;
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
  border: '3px solid black !Important',
  boxShadow: 24,
  borderRadius: '12px',
  maxHeight: '90vh', // 최대 높이 조정
  overflowY: 'auto', // 내용이 많을 경우 스크롤
  p: 3,
};

function ItemModal({ open, onClose, data }) {
  const ErrorUrl =
    'https://www.lost112.go.kr/lostnfs/images/uploadImg/20171111/error-404.html';

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon onClick={onClose} style={CloseIconStyle} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <PhotoContainer>
            <LargePhoto
              src={data.imageUrl === ErrorUrl ? notfound : data.imageUrl}
              onClick={() => {
                window.open(data.imageUrl, '_blank');
              }}
            />
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
          <br />
          <StyledSpan>ID: {data.id}</StyledSpan>
          <br />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <PhoneIcon />
          <Location>{data.tel}</Location>
          {/* <Location>상태: {data.status}</Location> */}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <LocationIcon />
          <Location>{data.location}에서 보관중</Location>
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
  const navigate = useNavigate();
  const ErrorUrl =
    'https://www.lost112.go.kr/lostnfs/images/uploadImg/20171111/error-404.html';

  const handleClick = async () => {
    if (id[0] === '6') {
      navigate(`/community/post/${id}`);
    }
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
          <Photo src={imageUrl === ErrorUrl ? notfound : imageUrl} />
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 2,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon />
            <Location>{location}</Location>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateIcon />
            <Date>{date}</Date>
          </div>
        </Box>
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
