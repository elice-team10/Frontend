import styled from 'styled-components';
// import { PostContainer } from './CommunityWrite';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Chip from '@mui/material/Chip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import Comment from './Comment';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { deleteEvent, fetchEvents, queryClient } from '../../api/http';
import { useNavigate, useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBlock from '../UI/ErrorBlock';
import { useCallback, useState } from 'react';
import ModalBasic from '../UI/Modal';
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const DetailContainer = styled.div`
  width: 56rem;
  height: 70%;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 5rem auto;
  padding: 3rem;
  background-color: white;
  border-radius: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    width: 46rem;
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    width: 36rem;
  }
`;

const Background = styled.div`
  background-color: #eee;
  height: 100%;
  padding: 3px;
  flex-grow: 1;
`;

const StyledArrowIcon = styled(ArrowBackIosIcon)`
  margin: 0 auto 1rem 0;
  font-size: xx-large;
  color: ${theme.colors.primary};
  cursor: pointer;
`;

const PhotoContainer = styled.div`
  width: 56rem;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    display: block;
  }
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

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    width: 36rem;
  }
`;

const ContentContainer = styled.div`
  width: 56rem;
  height: 100%;
  padding: -2rem 1rem 3rem;
  flex-direction: column;
  display: flex;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const TitleContainer = styled.div`
  padding: 2rem 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Title = styled.p`
  padding: 12px 0;
  font-weight: bold;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
`;

const ButtonContainer = styled.div`
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2rem;

  && button {
    display: flex;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.textWhite};
    background-color: ${theme.colors.border};
    border: 1px solid ${theme.colors.border};
    border-radius: 1.9rem;
    padding: 0.9rem;
    margin: 0 0.4rem 1rem;
    cursor: pointer;
  }
  && button:hover {
    color: ${theme.colors.textWhite};
    background-color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
  }
`;

const PositionContainer = styled.div`
  padding: 12px 4px;
  display: flex;
  align-items: center;
  height: 4rem;
  flex-direction: column;
  align-items: start;

  && div {
    display: flex;
  }
`;

const LocAndDateContainer = styled.div``;

const Name = styled.div`
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-left: 0.8rem;
`;

const Location = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  margin: 0.4rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LocationIcon = styled(PlaceIcon)`
  color: ${theme.colors.text};
  bottom: 3px;
`;

const Date = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  margin: 0.4rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DateIcon = styled(CalendarMonthIcon)`
  color: ${theme.colors.text};
`;

const Content = styled.p`
  padding: 0 2rem 3rem;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  line-height: 2.5rem;
  margin: auto 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const BasicProfile = styled(AccountCircleIcon)`
  width: 38.4px !important;
  height: 38.4px !important;
  color: #ccc;
`;

const Avartar = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 38.4px;
  height: 38.4px;
`;

const BadgeAndBtn = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled(Chip)`
  && {
    width: fit-content;
    font-size: ${theme.fontSizes.small};
    font-weight: 400;
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

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ImageModal = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background: #fffaf0;
  border-radius: 12px;
  // border: 3px solid black;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

function CommunityDetail() {
  const [isModal, setIsModal] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();

  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: () => fetchEvents(`post/detail/${params.id}`),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: deleteEvent,
    onSettled: () => {
      queryClient.invalidateQueries('events');
      navigate('/community');
    },
  });

  // 이미지 모달 백드롭 닫기
  const onCloseImageModal = () => {
    setImageModalOpen(false);
  };

  // 삭제 질문 모달
  const handleStartDelete = () => {
    setIsModal(true);
  };

  const handleStopDelete = () => {
    setIsModal(false);
  };

  const handleDelete = () => {
    mutate({ postId: params.id, userId: data.userId._id });
    navigate('/community');
  };

  const handleEdit = () => {
    navigate(`/community/post/${params.id}/edit`, {
      state: { userId: data.userId._id },
    });
  };

  /* --------------------챗방 추가-------------------- */
  const authString = localStorage.getItem('auth'); // 'auth' 키 로컬 스토리지에서 사용자 정보 가져오기
  let localNickname;
  if (authString) {
    const authObj = JSON.parse(authString);
    localNickname = authObj.nickname; // 로컬 스토리지 닉네임 추출
  }

  const handleAddChat = async () => {
    try {
      const postingUserId = data.userId._id;
      const opponentNickname = data?.userId?.nickname;
      const response = await axiosPrivate().post(`/chat/${postingUserId}`);
      navigate(`/chat/${response.data.roomId}?nickname=${opponentNickname}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 에러가 Axios 에러인 경우
        if (error.response) {
          // 서버가 응답을 반환한 경우
          const status = error.response.status;
          if (status === 409) {
            // 같은 상대에게 다시 건 경우
            alert('이미 대화중인 상대입니다.');
          } else {
            // 다른 HTTP 에러 코드인 경우
            alert('오류가 발생했습니다. 다시 시도해 주세요.');
          }
        } else {
          // 요청이 서버에 도달하지 못한 경우
          alert('네트워크 오류가 발생했습니다.');
        }
      } else {
        // 로그인을 안 한 경우
        alert('로그인을 먼저 해주세요.');
      }
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
                onClick={() => setImageModalOpen(true)}
              />
            )}
          </PhotoContainer>
          <BadgeAndBtn>
            <Badge label={`${data.isFound ? '완료' : '미완료'}`} size="small" />
            {localNickname !== data?.userId?.nickname && (
              <ChatBtn onClick={handleAddChat}>채팅하기</ChatBtn>
            )}
          </BadgeAndBtn>
          {/* 프로필 컨테이너 */}
          <ProfileContainer>
            {data.userId.profileImg === '1' ? (
              <BasicProfile />
            ) : (
              <Avartar
                src={`/profiles/profile${data.userId.profileImg}.webp`}
              />
            )}
            <PositionContainer>
              <Name>{data?.userId?.nickname}</Name>
              {/* 장소 날짜 컨테이너 */}
              <LocAndDateContainer>
                <Location>
                  <LocationIcon />
                  {`서울시 ${data.event_location}`}
                </Location>
                <Date>
                  <DateIcon />
                  {data.event_date ? data.event_date : '-'}
                </Date>
              </LocAndDateContainer>
            </PositionContainer>
          </ProfileContainer>
          {/* 타이틀과 컨텐츠 컨테이너 */}
          <TitleContainer>
            <Title>{data.title}</Title>
          </TitleContainer>
          <Content>{data.content}</Content>
        </ContentContainer>
        {/* 리플 컨테이너 */}
        <Comment postId={params.id} />
      </>
    );
  }

  return (
    <>
      {isImageModalOpen && (
        <StyledBackdrop onClick={onCloseImageModal}>
          <ImageModal
            src={`http://kdt-sw-6-team10.elicecoding.com${data.picture}`}
            onClose={() => setImageModalOpen(false)}
          />
        </StyledBackdrop>
      )}
      {isModal && (
        <ModalBasic
          title="게시글 삭제"
          content="이 글을 삭제하시겠습니까?"
          btnText="삭제"
          onCloseModal={handleStopDelete}
          getFunction={handleDelete}
        />
      )}
      <Background>
        <DetailContainer style={{ height: '100%' }}>
          <ButtonContainer>
            <StyledArrowIcon fontSize="3.5rem" onClick={() => navigate(-1)} />
            {data && data.userId.email === auth?.email && (
              <>
                <button onClick={handleEdit}>
                  <ModeEditOutlineOutlinedIcon fontSize="medium" />
                  {/* <div className="buttonName">수정</div> */}
                </button>
                <button onClick={handleStartDelete}>
                  <DeleteOutlineOutlinedIcon fontSize="medium" />
                  {/* <div className="buttonName">삭제</div> */}
                </button>
              </>
            )}
          </ButtonContainer>
          {content}
        </DetailContainer>
      </Background>
    </>
  );
}

export default CommunityDetail;
