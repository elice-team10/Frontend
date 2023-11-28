import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { axiosPrivate } from '../../api/axios';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from 'react-query';

const ChatRoomcontainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
`;
const Chatbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 0;
  width: 800px;
  height: 90vh;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;
const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1.5px solid #ddd;
`;
const StyledArrowBackIosIcon = styled(ArrowBackIosIcon)`
  margin: 0 10px 0 24px;
  color: ${theme.colors.primary};
  cursor: pointer;
  &:hover {
    filter: brightness(1.15);
  }
`;
const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  margin-right: 10px;
  color: #ccc;
`;
const HeaderNickname = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  letter-spacing: 1px;
`;

const MessageList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
`;

const Message = styled.div`
  margin-bottom: 10px;
  font-size: ${theme.fontSizes.medium};
  padding: 8px 12px;
  border-radius: 10px;
  color: ${(props) => (props.$mine ? 'white' : '${theme.colors.text}')};
  background-color: ${(props) =>
    props.$mine ? 'rgba(255, 103, 0, 0.9)' : 'rgba(0, 190, 0, 0.9)'};
  align-self: ${(props) => (props.$mine ? 'flex-end' : 'flex-start')};
`;

const MessageInput = styled.div`
  display: flex;
  height: 52px;
  padding: 10px;
  border-top: 0.5px solid #ddd;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1.7px solid ${theme.colors.border};
  border-radius: 8px;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  &:focus {
    outline: none;
  }
`;

const StyledSendIcon = styled(SendIcon)`
  padding: 10px 15px;
  margin-left: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;

  &:hover {
    filter: brightness(1.15);
  }
`;

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { roomId } = useParams(); // roomId 값을 추출
  const navigate = useNavigate();
  const [isComposing, setIsComposing] = useState(false);

  const authString = localStorage.getItem('auth'); // 'auth' 키 로컬 스토리지에서 사용자 정보 가져오기
  let localNickname;
  if (authString) {
    const authObj = JSON.parse(authString);
    localNickname = authObj.nickname; // 로컬 스토리지 닉네임 추출
  }

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const fetchChat = async (roomId) => {
    const response = await axiosPrivate().get(`/chat/${roomId}`);
    return response.data;
  };

  // useQuery를 사용하여 2초마다 채팅 데이터를 가져옵니다.
  const { data } = useQuery(['chat', roomId], () => fetchChat(roomId), {
    refetchInterval: 400,
    staleTime: 100000, // 10초 동안 데이터는 최신으로 간주
    cacheTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 새로고침
  });

  // data가 변경될 때마다 messages 상태를 업데이트합니다.
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (newMessage !== '') {
      try {
        await axiosPrivate().patch(`/chat/${roomId}`, {
          content: newMessage,
        });
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message', error);
      }
    }
  };
  return (
    <ChatRoomcontainer>
      <Chatbox>
        <ChatHeader>
          <StyledArrowBackIosIcon
            sx={{ fontSize: 32 }}
            onClick={() => navigate('/chatList')}
          />
          <StyledAccountCircleIcon sx={{ fontSize: 36 }} />
          <HeaderNickname>{localNickname}</HeaderNickname>
        </ChatHeader>
        <MessageList>
          {messages.map((messages, index) => (
            <Message key={index} $mine={messages.nickname === localNickname}>
              {messages.content}
            </Message>
          ))}
        </MessageList>
        <MessageInput>
          <Input
            type="text"
            placeholder="메세지를 입력해주세요"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <StyledSendIcon sx={{ fontSize: 31 }} onClick={handleSendMessage} />
        </MessageInput>
      </Chatbox>
    </ChatRoomcontainer>
  );
};

export default ChatRoom;
