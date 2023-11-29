import styled from 'styled-components';
import { PostContainer } from './CommunityWrite';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Chip from '@mui/material/Chip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import Comment from './Comment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { deleteEvent, fetchEvents, queryClient } from '../../api/http';
import { useNavigate, useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBlock from '../UI/ErrorBlock';
import { useState } from 'react';
import ModalBasic from '../UI/Modal';
import { axiosPrivate } from '../../api/axios';

const Background = styled.div`
  background-color: #eee;
  height: 100%;
  padding: 3px;
`;

const StyledArrowIcon = styled(ArrowBackIosIcon)`
  margin: 0 auto 1rem 0;
  font-size: xx-large;
  color: ${theme.colors.primary};
`;

const PhotoContainer = styled.div`
  width: 56rem;
  height: 25rem;
  display: flex;
  // justify-content: center;
  align-items: center;
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
const BadgeAndBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled(Chip)`
  && {
    width: fit-content;
    font-size: ${theme.fontSizes.small};
    font-weight: bold;
    background-color: ${(props) =>
      props.label === '미완료'
        ? `${theme.colors.primary}`
        : `${theme.colors.border}`};
    color: ${theme.colors.textWhite};
  }
`;
const ChatBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 28px;
  margin-right: 4px;
  background-color: rgba(0, 180, 0, 1);
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.small};
  }
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    filter: brightness(1.15);
  }
`;

function CommunityDetail() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: () => fetchEvents(`post/detail/${params.id}`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      console.log('Delete event succeeded');
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
      navigate('/community');
    },
    onError: (error) => {
      console.error('Delete event failed:', error);
    },
  });

  // 삭제 질문 모달
  // const handleStartDelete = () => {
  //   console.log('Before setIsModalOpen(true):', isModalOpen);
  //   setIsModalOpen(true);
  //   console.log('After setIsModalOpen(true):', isModalOpen);
  // };

  // const handleStopDelete = () => {
  //   setIsModalOpen(false);
  //   console.log(isModalOpen);
  // };

  const handleDelete = () => {
    console.log('handleDelete called');
    mutate({ postId: params.id, userId: data.userId._id });
    navigate('/community');
  };

  const handleEdit = () => {
    navigate(`/community/post/${params.id}/edit`, {
      state: { userId: data.userId._id },
    });
  };

  /* --------------------챗방 추가-------------------- */
  const handleAddChat = () => {
    addChat();
  };

  const addChat = async () => {
    try {
      const postingUserId = data.userId._id;
      const response = await axiosPrivate().post(`/chat/${postingUserId}`);
      navigate(`/chat/${response.data.roomId}`);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during the POST chat:', error);
    }
  };
  /* --------------------챗방 추가-------------------- */
  let content;

  if (isPending) {
    content = <CircularProgress sx={{ color: '#ff6700' }} />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="에러 발생"
        message={error.info?.message || '데이터를 가져오는데 실패했습니다.'}
      />
    );
  }

  if (data) {
    content = (
      <>
        <ContentContainer>
          <PhotoContainer>
            {data.picture === 'null' ? (
              <WallpaperOutlinedIcon fontSize="large" />
            ) : (
              <img
                src={`http://kdt-sw-6-team10.elicecoding.com${data.picture}`}
              />
            )}
          </PhotoContainer>
          <BadgeAndBtn>
            <Badge label={`${data.isFound ? '완료' : '미완료'}`} size="small" />
            <ChatBtn onClick={handleAddChat}>채팅하기</ChatBtn>
          </BadgeAndBtn>
          {/* 장소 날짜 컨테이너 */}
          <PositionContainer>
            <Name>{data.userId.nickname}</Name>
            <LocationIcon />
            <Location>{`서울시 ${data.event_location}`}</Location>
            <DateIcon />
            <Date>{data.event_date}</Date>
          </PositionContainer>
          {/* 타이틀 컨테이너 */}
          <TitleContainer>
            <Title>{data.title}</Title>
          </TitleContainer>
          {/* 컨텐츠와 완료 뱃지 */}
          <Content>{data.content}</Content>
        </ContentContainer>
        {/* 리플 컨테이너 */}
        <Comment postId={params.id} />
      </>
    );
  }

  return (
    <>
      {/* {isModalOpen && (
        <ModalBasic
          title="게시글 삭제"
          content="이 글을 삭제하시겠습니까?"
          btnText="삭제"
          onCloseModal={handleStopDelete}
          getFunction={handleDelete}
        />
      )} */}
      <Background>
        <PostContainer style={{ height: '100%' }}>
          <ButtonContainer>
            <StyledArrowIcon fontSize="3.5rem" onClick={() => navigate(-1)} />
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </ButtonContainer>
          {content}
        </PostContainer>
      </Background>
    </>
  );
}

export default CommunityDetail;
