import styled from 'styled-components';
import { PostContainer } from './CommunityWrite';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Chip from '@mui/material/Chip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const StyledArrowIcon = styled(ArrowBackIosIcon)`
  margin: 0 auto 1rem 0;
  font-size: xx-large;
  color: ${theme.colors.primary};
`;

const PhotoContainer = styled.div`
  width: 56rem;
  height: 20rem;
  border: 1px solid #7c9299;

  img {
    width: 56rem;
    height: 20rem;
  }
`;

const ContentContainer = styled.div`
width: 52rem;
height: 29rem;
border: 1px solid #7c9299;
padding: 0 2rem;
`;

const ReplyContainer = styled.div`
  width: 56rem;
  height: 100%;
  border: 1px solid #7c9299;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: ${theme.fontSizes.subtitle};
  color: ${theme.colors.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  && button {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.border};
    ${theme.colors.text};
    background-color: ${theme.colors.textWhite};
    border: 1px solid ${theme.colors.border};
    border-radius: 4px;
    padding: 0.6rem;
    margin: 0 0.4rem 1rem;
  }
  && button:hover {
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.text};
    background-color: #eee;
  }
`;

const PositionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Location = styled.p`
  font-size: ${theme.fontSizes.medium};
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 0.4rem;
`;

const LocationIcon = styled(PlaceIcon)`
  color: ${theme.colors.text};
`;

const Date = styled.p`
  font-size: ${theme.fontSizes.medium};
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 0.8rem;
`;

const DateIcon = styled(CalendarMonthIcon)`
  color: ${theme.colors.text};
`;

const Content = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  line-height: 2rem;
  height: 9rem;
`;

const Badge = styled(Chip)`
  && {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.textWhite};
  }
`;

const ReplyCount = styled.p`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
  font-weight: bold;
`;

const ReplyForm = styled.form`
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  & textarea {
    color: ${theme.colors.text};
    display: block;
    width: 100%;
    margin: 0px;
    box-sizing: border-box;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    height: 36px;
    bottom: 0px;
    overflow: hidden;
    resize: none;
  }
  & button {
  }
`;

CommunityDetail.defaultProps = {
  title: '에어팟 찾아요.',
  complete: '미완료',
  content:
    '성수동 성수낙낙에서 에어팟을 잃어버렸습니다. 제 소중한 에어팟을 찾아주세요!',
  location: '성동구',
  date: '23-11-14',
  nickname: '라프',
  replyCount: '2',
};

function CommunityDetail({
  title,
  location,
  date,
  content,
  complete,
  replyCount,
}) {
  return (
    <PostContainer style={{ height: '100%' }}>
      <ButtonContainer>
        <StyledArrowIcon fontSize='3.5rem' />
        <button>수정</button>
        <button>삭제</button>
      </ButtonContainer>
      <PhotoContainer>
        <img src="https://th3.tmon.kr/thumbs/image/7de/c9c/84d/c7123664a_700x700_95_FIT.jpg" />
      </PhotoContainer>
      <ContentContainer>
        {/* 타이틀 컨테이너 */}
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        {/* 장소 날짜 컨테이너 */}
        <PositionContainer>
          <LocationIcon />
          <Location>{`서울시 ${location}`}</Location>
          <DateIcon />
          <Date>{date}</Date>
        </PositionContainer>
        {/* 컨텐츠와 완료 뱃지 */}
        <Content>{content}</Content>
        <Badge label={`${complete}`} size="small" />
      </ContentContainer>
      {/* 리플 컨테이너 */}
      <ReplyCount>댓글 {replyCount}</ReplyCount>
      <ReplyContainer>
        <ReplyForm>
          <textarea placeholder="댓글을 남겨보세요."></textarea>
          <button>등록</button>
        </ReplyForm>
        {/* <Replyboard></Replyboard> */}
        <ul>
          <li>
            <div>닉네임 11-18</div>
            <div>그거 제가 주웠어요!</div>
          </li>
        </ul>
      </ReplyContainer>
    </PostContainer>
  );
}

export default CommunityDetail;
