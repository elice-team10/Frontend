import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import DeleteIcon from '@mui/icons-material/Delete';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router';
import ModalBasic from '../UI/Modal';
import ToastAlert from '../UI/ToastAlert';

const ChatListMain = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
`;
const ChatListContainer = styled.div`
  display: flex;
  height: 90vh;
  margin: 60px 0;
  background-color: #eee;
`;
const ChatleftBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  background: linear-gradient(
    135deg,
    rgba(255, 165, 0, 0.8),
    rgba(255, 127, 80, 0.8),
    rgba(255, 103, 0, 0.8)
  );
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;
const StyledQuestionAnswerIcon = styled(QuestionAnswerIcon)`
  color: white;
  margin-top: 10px;
`;
const ChatListbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  background-color: #fff;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.7px;
`;
const ListHeader = styled.div`
  display: flex;
  align-items: center;
  height: 7rem;
  border-bottom: 2px solid #ddd;
`;
const MyNickname = styled.p`
  margin-left: 20px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
`;
const ListBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 94rem;
`;
const Chats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  border-bottom: 0.5px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;
const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: #ccc;
  margin-left: 20px;
`;
const ChatPartnerBox = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 20px;
`;
const ChatPartner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 20px;
`;
const ChatPartnerNickname = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  margin: 0;
`;
const ChatContent = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  font-weight: 300;
  margin: 0;
`;
const StyledDeleteIcon = styled(DeleteIcon)`
  color: white;
`;
const Deletebtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 28px;
  margin-right: 20px;
  background-color: rgba(300, 40, 0, 0.7);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    filter: brightness(1.5);
  }
`;

const ChatListComponent = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const onShowModal = (event, roomId) => {
    event.stopPropagation();
    setSelectedRoomId(roomId);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const handleChatClick = (event, roomId) => {
    event.stopPropagation();
    navigate(`/chat/${roomId}`);
  };

  const getFunction = (roomId) => {
    deleteChat(selectedRoomId);
    console.log(`Deleting chat room with ID: ${roomId}`);
    onCloseModal();
  };

  const authString = localStorage.getItem('auth'); // 'auth' 키 로컬 스토리지에서 사용자 정보 가져오기
  let localNickname;
  if (authString) {
    const authObj = JSON.parse(authString);
    localNickname = authObj.nickname; // 로컬 스토리지 닉네임 추출
  }

  const fetchChatList = async () => {
    try {
      const response = await axiosPrivate().get(`/chat`);
      setChatRooms(response.data);
      console.log('Chat rooms:', response.data);
    } catch (error) {
      console.error('Failed to fetch chat', error);
    }
  };
  useEffect(() => {
    fetchChatList();
  }, []);

  const deleteChat = async (roomId) => {
    try {
      await axiosPrivate().delete(`/chat/${roomId}`);
      fetchChatList();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 0);
    } catch (error) {
      console.error('Error deleting users: ', error);
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalBasic
          title={'채팅 나가기'}
          content={'대화내용이 삭제되고 복구할 수 없어요.'}
          btnText={'나갈래요'}
          onCloseModal={onCloseModal}
          getFunction={getFunction}
        />
      )}
      {showSuccessToast && (
        <ToastAlert icon="success" title="채팅방을 나갔습니다." />
      )}
      <ChatListMain>
        <ChatListContainer>
          <ChatleftBox>
            <StyledQuestionAnswerIcon sx={{ fontSize: 64 }} />
          </ChatleftBox>
          <ChatListbox>
            <ListHeader>
              <MyNickname>{localNickname}님의 소중한 대화들</MyNickname>
            </ListHeader>
            <ListBody>
              {chatRooms.map((chatRoom) => {
                // 마지막 메시지 내용 추출
                const lastMessage =
                  chatRoom.roomId.content.length > 0
                    ? chatRoom.roomId.content[
                        chatRoom.roomId.content.length - 1
                      ].content
                    : '대화내용이 없습니다.';
                return (
                  <Chats
                    key={chatRoom.roomId._id}
                    onClick={(e) => handleChatClick(e, chatRoom.roomId._id)}
                  >
                    <ChatPartnerBox>
                      <StyledAccountCircleIcon sx={{ fontSize: 44 }} />
                      <ChatPartner>
                        <ChatPartnerNickname>
                          {chatRoom.oppenent.nickname}
                        </ChatPartnerNickname>
                        <ChatContent>{lastMessage}</ChatContent>
                      </ChatPartner>
                    </ChatPartnerBox>
                    <Deletebtn
                      onClick={(e) => onShowModal(e, chatRoom.roomId._id)}
                    >
                      <StyledDeleteIcon />
                    </Deletebtn>
                  </Chats>
                );
              })}
            </ListBody>
          </ChatListbox>
        </ChatListContainer>
      </ChatListMain>
    </>
  );
};

export default ChatListComponent;
