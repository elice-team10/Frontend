import styled from 'styled-components';
import theme from '../../config/theme';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import notfound from '../../assets/notfound.jpg';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background-color: rgba(124,146,153,0.2);
  border: none; // 변경
  border-radius: 12px;
  width: 29.6rem; 
  height: 35rem;
  // box-sizing: border-box;
  padding: 2.8rem 2.4rem 0;
  position: relative;
  top: 0;
  transition: all .2s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
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
   object-fit: cover;  // 이미지 비율 유지
`

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
  //font-weight: bold;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
`;

const Badge = styled(Chip)`
  && {
    background-color: #ff6700; 
    opacity: 0.9;
    color: ${theme.colors.textWhite};
    font-size: 1.2rem;
    width: 5rem;
  }
`;

const Content = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  line-height: 2rem;
  height: 4rem;
  margin-bottom: 1rem;
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

ResultCard.defaultProps = {
  title: '에어팟',
  type: '경찰서',
  content:
    '송도달빛축제공원역(인천지하철1호선)에서는 [23.09.27] [삼성 버즈 케이스, 버즈 오른쪽 무선이어폰(화이트(흰)색)]을 습득/보관 하였습니다.',
  location: '성동구',
  foundAt: '택시 안',
  date: '23-11-14',

};

function ResultCard({ title, type, content, location, date, foundAt }) {
  let navigate = useNavigate();
  
  return (
    <CardContainer>
      <Card onClick={() => navigate('/community/detail')}>
        <PhotoContainer>
          {/* <WallpaperOutlinedIcon fontSize="large" /> */}
          <Photo src={notfound} />
        </PhotoContainer>
        <DividerLine />
        <TitleContainer>
          <Title>{title}</Title>
          <Badge label={`${type}`} size="small" />
        </TitleContainer>
        <Location><SearchIcon/>{` ${foundAt}에서 발견`}</Location>
        <Content>{content}</Content>
        <PositionContainer>
          <LocationIcon />
          <Location>{`서울시 ${location}`}</Location>
          <DateIcon />
          <Date>{date}</Date>
        </PositionContainer>
      </Card>
    </CardContainer>
  );
}

export default ResultCard;