import styled from 'styled-components';
import theme from '../../config/theme';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 12px;
  width: 29.6rem;
  height: 40.7rem;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  transition: all 0.1s ease-in;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  img {
    object-fit: cover;
    width: 29.6rem;
    height: 15rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  padding: 0.7rem 2.4rem;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    padding: 0.7rem 1.4rem;
  }
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
  justify-content: space-between;

  && div {
    display: flex;
    align-items: center;
  }
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
  margin-top: 0.4rem;
  // justify-content: space-between;
  gap: 0.8rem;
  height: 4.3rem;
`;

const BasicProfile = styled(AccountCircleIcon)`
  width: 3.24rem !important;
  height: 3.24rem !important;
  color: #ccc;
`;

const Avartar = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 2.7rem;
  height: 2.7rem;
`;

const Nickname = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.4rem;

  && span {
    color: ${theme.colors.textLightgray};
    font-weight: normal;
  }
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

function CommunityCard({
  picture,
  title,
  complete,
  content,
  location,
  date,
  profile,
  nickname,
  postId,
}) {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <Card onClick={() => navigate(`/community/post/${postId}`)}>
        <PhotoContainer>
          {picture === 'null' ? (
            <WallpaperOutlinedIcon fontSize="large" />
          ) : (
            <img src={`http://kdt-sw-6-team10.elicecoding.com${picture}`} />
          )}

          {/* <WallpaperOutlinedIcon fontSize="large" /> */}
        </PhotoContainer>
        <DividerLine />
        <ContentContainer>
          <TitleContainer>
            <Title>
              {title.length > 12 ? `${title.substring(0, 12)}...` : title}
            </Title>
            <Badge label={`${complete}`} size="small" />
          </TitleContainer>
          <Content>
            {content.length > 30 ? `${content.substring(0, 80)}...` : content}
          </Content>
          <PositionContainer>
            <div>
              <LocationIcon />
              <Location>{`서울시 ${location}`}</Location>
            </div>
            <div>
              <DateIcon />
              <Date>{date ? date : '-'}</Date>
            </div>
          </PositionContainer>
          <DividerLine />
          <UserContainer>
            {profile === '1' ? (
              <BasicProfile />
            ) : (
              <Avartar src={`/profiles/profile${profile}.webp`} />
            )}

            <Nickname>
              <span>by</span>
              {nickname}
            </Nickname>
            {/* <ReplyContainer>
              <ReplyIcon />
              <Reply>{replyCount}</Reply>
            </ReplyContainer> */}
          </UserContainer>
        </ContentContainer>
      </Card>
    </CardContainer>
  );
}

export default CommunityCard;
