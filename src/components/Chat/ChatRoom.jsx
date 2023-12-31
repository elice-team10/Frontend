import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { axiosPrivate } from '../../api/axios';
import { useParams, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

const ChatRoomcontainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
  flex-grow: 1;
`;
const Chatbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 60px 0;
  width: 800px;
  @media (max-width: 1024px) {
    width:  450px !important;
  }
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
const HeaderNickname = styled.p`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
  font-weight: 500;
  letter-spacing: 1px;
`;

const MessageList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
`;

const Message = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
  margin-bottom: 10px;
  font-size: ${theme.fontSizes.medium};
  color: ${(props) => (props.$mine ? 'white' : '#004000')};
  align-self: ${(props) => (props.$mine ? 'flex-end' : 'flex-start')};
`;
const Avartar = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 34px;
  height: 34px;
  margin-right: 4px;
`;
const MessageText = styled.div`
padding: 6px 10px;
border-radius: 10px;
background-color: ${(props) =>
  props.$mine ? 'rgba(255, 103, 0, 0.9)' : 'rgba(0, 190, 0, 0.8)'};
`;
const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: #ccc;
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
  background-color: rgba(300, 40, 0, 0.8);
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
  const location = useLocation();
  const messageListRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  let opponentNickname = searchParams.get('nickname');

  const searchParamsDirect = new URLSearchParams(location.search);
  const opponentNicknameDirect = searchParamsDirect.get('nickname');

  if (!opponentNickname) {
    opponentNickname = opponentNicknameDirect;
  }

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

  // useQuery를 사용하여 0.4초마다 채팅 데이터를 가져옵니다.
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
  // 메시지 목록의 길이가 변경될 때 스크롤 위치를 조정
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <ChatRoomcontainer>
      <Chatbox>
        <ChatHeader>
          <StyledArrowBackIosIcon
            sx={{ fontSize: 32 }}
            onClick={() => navigate('/chatList')}
          />
          <HeaderNickname>{opponentNickname}</HeaderNickname>
        </ChatHeader>
        <MessageList ref={messageListRef}> {/*  메시지 목록의 길이가 변경 참조 */}
         {messages.map((message, index) => (
            <Message
              key={index}
              $mine={message.userId.nickname === localNickname}
            >
              {message.userId.profileImg === '1' ? (
                <StyledAccountCircleIcon sx={{ fontSize: 40 }} />
              ) : (
                <Avartar
                  src={`/profiles/profile${message.userId.profileImg}.webp`}
                />
              )}
              <MessageText $mine={message.userId.nickname === localNickname}>{message.content}</MessageText>
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
