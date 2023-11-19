import styled from 'styled-components';
import { PostContainer } from './CommunityWrite';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Chip from '@mui/material/Chip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../UI/Header';

const StyledArrowIcon = styled(ArrowBackIosIcon)`
  margin: 0 auto 1rem 0;
  font-size: xx-large;
  color: ${theme.colors.primary};
`;

const PhotoContainer = styled.div`
  width: 56rem;
  height: 25rem;

  img {
    width: 54rem;
    height: 23rem;
    border-radius: 1.2rem;
    object-fit: cover;
    sizes: 100vw;

    &:hover {
      transform: scale(1.01);
      cursor: pointer;
    }
  }
`;

const ContentContainer = styled.div`
  width: 54rem;
  height: 100%;
  padding: 1rem 1rem 3rem;
  flex-direction: column;
  display: flex;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const ReplyContainer = styled.div`
  width: 56rem;
  height: 100%;

  & ul {
    list-style: none;
    padding: 1.3rem;
    border: 1px solid #ccc;
    border-radius: 12px;
  }

  & li {
    
  }
  & p {
    // border: 1px solid #ccc;
    // border-radius: 4px;
    margin: 12px;
    padding-left: 12px;
    font-size: ${theme.fontSizes.medium};
  }

  & div {
    font-weight: bold;
    font-size: ${theme.fontSizes.small};
  }
`;

const ReplyBoard = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: inherit;

    + div {
    margin-left: 0.6rem;

    }
  }
`;

const ReplyButton = styled.div`
  display: flex;
  justify-content: inherit;
  color: ${theme.colors.textLightgray};

  & div:hover {
    color: ${theme.colors.text};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2rem;

  && button {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.border};
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
  height: 5rem;
`;

const Name = styled.p`
  font-size: ${theme.fontSizes.medium};
  font-weight: bold;
  color: ${theme.colors.text};
  margin-right: 0.4rem;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Location = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  margin: 0.4rem;
`;

const LocationIcon = styled(PlaceIcon)`
  color: ${theme.colors.text};
`;

const Date = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  margin: 0.8rem;
`;

const DateIcon = styled(CalendarMonthIcon)`
  color: ${theme.colors.text};
`;

const Content = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  line-height: 2.5rem;
  margin: auto 0;
`;

const Badge = styled(Chip)`
  && {
    width: fit-content;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.textWhite};
    font-size: ${theme.fontSizes.small};
    font-weight: bold;
  }
`;

const ReplyCount = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  font-weight: bold;
`;

const ReplyForm = styled.form`
  padding: 1rem;
  display: flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 12px;

  & textarea {
    color: ${theme.colors.text};
    display: block;
    width: 90%;
    margin: 0px;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: ${theme.fontSizes.medium};
    letter-spacing: inherit;
    height: 36px;
    bottom: 0px;
    overflow: hidden;
    resize: none;
  }

  & button {
    position: absolute;
    right: 11px;
    top: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.textWhite};
    background-color: ${theme.colors.border};
    border: 1px solid ${theme.colors.border};
    border-radius: 4px;
    padding: 0.5rem;

    &:hover {
      filter: brightness(1.15);
    }
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
  nickname,
  location,
  date,
  content,
  complete,
  replyCount,
}) {
  return (
    <>
      <Header />
      <PostContainer style={{ height: '100%' }}>
        <ButtonContainer>
          <StyledArrowIcon fontSize="3.5rem" />
          <button>수정</button>
          <button>삭제</button>
        </ButtonContainer>
        <ContentContainer>
          <PhotoContainer>
            <img src="https://th3.tmon.kr/thumbs/image/7de/c9c/84d/c7123664a_700x700_95_FIT.jpg" />
          </PhotoContainer>
          <Badge label={`${complete}`} size="small" />
          {/* 장소 날짜 컨테이너 */}
          <PositionContainer>
            <Name>{nickname}</Name>
            <LocationIcon />
            <Location>{`서울시 ${location}`}</Location>
            <DateIcon />
            <Date>{date}</Date>
          </PositionContainer>
          {/* 타이틀 컨테이너 */}
          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>
          {/* 컨텐츠와 완료 뱃지 */}
          <Content>{content}</Content>
        </ContentContainer>
        {/* 리플 컨테이너 */}
        <ReplyCount>댓글 {replyCount}</ReplyCount>
        <ReplyContainer>
          <ReplyForm>
            <textarea placeholder="댓글을 남겨보세요."></textarea>
            <button>등록</button>
          </ReplyForm>
          <ul>
            <li>
              <ReplyBoard>
                <div>
                  <span>닉네임 • </span>
                  <span>11-18</span>
                </div>
                <ReplyButton>
                  <div>수정</div>
                  <div style={{ paddingLeft: `8px` }}>삭제</div>
                </ReplyButton>
              </ReplyBoard>
              <p>그거 제가 주웠어요!</p>
            </li>
          </ul>
        </ReplyContainer>
      </PostContainer>
    </>
  );
}

export default CommunityDetail;
