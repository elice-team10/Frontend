import styled from 'styled-components';
import theme from '../../config/theme';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useNavigate } from 'react-router-dom';
// import logoImg from '../../assets/로고10.png';

const Card = styled.div`
  background-color: ${theme.colors.background};
  // border: 0.1rem solid ${theme.colors.border};
  border-radius: 12px;
  width: 29.6rem;
  height: 40.7rem;
  box-sizing: border-box;
  padding: 2.8rem 2.4rem 0;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  transition: all 0.1s ease-in;

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
  font-weight: bold;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
`;

const Badge = styled(Chip)`
  && {
    background-color: ${(props) =>
      props.label === '미완료'
        ? `${theme.colors.primary}`
        : `${theme.colors.border}`};
    color: ${theme.colors.textWhite};
  }
`;

const Content = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  line-height: 2rem;
  height: 9rem;
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
  width: 29.5rem;
  height: 0.009rem;
  background-color: #ccc;
  position: absolute;
  left: 0;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.6rem;
  justify-content: space-between;
`;

const Nickname = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${theme.colors.text};
`;

const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ReplyIcon = styled(CommentOutlinedIcon)`
  color: ${theme.colors.text};
`;

const Reply = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 0.8rem;
`;

CommunityCard.defaultProps = {
  title: '에어팟 찾아요.',
  complete: '미완료',
  content:
    '성수동 성수낙낙에서 에어팟을 잃어버렸습니다. 제 소중한 에어팟을 찾아주세요!',
  location: '성동구',
  date: '23-11-14',
  nickname: '라프',
  replyCount: '2',
};

function CommunityCard({
  picture,
  title,
  complete,
  content,
  location,
  date,
  nickname,
  replyCount,
}) {
  let navigate = useNavigate();

  return (
    <CardContainer>
      <Card onClick={() => navigate('/community/post')}>
        <PhotoContainer>
          {picture ? <img src='picture' /> : <img src={logoImg} />}
          {/* <WallpaperOutlinedIcon fontSize="large" /> */}
        </PhotoContainer>
        <DividerLine />
        <TitleContainer>
          <Title>{title}</Title>
          <Badge label={`${complete}`} size="small" />
        </TitleContainer>
        <Content>{content}</Content>
        <PositionContainer>
          <LocationIcon />
          <Location>{`서울시 ${location}`}</Location>
          <DateIcon />
          <Date>{date}</Date>
        </PositionContainer>
        <DividerLine />
        <UserContainer>
          <Nickname>{nickname}</Nickname>
          <ReplyContainer>
            <ReplyIcon />
            <Reply>{replyCount}</Reply>
          </ReplyContainer>
        </UserContainer>
      </Card>
    </CardContainer>
  );
}

export default CommunityCard;
