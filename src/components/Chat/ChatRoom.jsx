import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

const ChatRoomcontainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
`;
const Chatbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  width: 800px;
  height: 85vh;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;
const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 0.5px solid #ddd;
`;
const StyledArrowBackIosIcon = styled(ArrowBackIosIcon)`
  margin: 0 20px;
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
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
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

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
    console.log(newMessage);
  };

  const handleSendMessage = () => {
    // 메시지 전송 로직
    if (newMessage !== '') {
      // 새로운 메시지 객체 생성
      const newMsgObj = {
        content: newMessage,
        sender: 'me', // 현재 사용자를 나타내는 문자열, 필요에 따라 변경 가능
        // 추가적인 메시지 정보 (예: timestamp)를 여기에 포함할 수 있습니다.
      };
      // 기존 메시지에 새 메시지 추가
      setMessages([...messages, newMsgObj]);
      // 입력 필드 초기화
      setNewMessage('');
    }
  };

  // useEffect(() => {
  //   const fetchChat = async () => {
  //     try {
  //       const response = await axiosPrivate().get(`/chat/:roomId`);
  //       setMessages(response.data.content);
  //     } catch (error) {
  //       console.error('Failed to fetch chat', error);
  //     }
  //   };

  //   fetchChat();
  // }, []);

  // const handleSendMessage = async () => {
  //   if (newMessage !== '') {
  //     try {
  //       const response = await axiosPrivate().patch(`/chat/:roomId`, {
  //         content: newMessage,
  //       });
  //       setMessages(response.data);
  //       setNewMessage('');
  //     } catch (error) {
  //       console.error('Failed to send message', error);
  //     }
  //   }
  // };
  return (
    <ChatRoomcontainer>
      <Chatbox>
        <ChatHeader>
          <StyledArrowBackIosIcon sx={{ fontSize: 32 }} />
          <StyledAccountCircleIcon sx={{ fontSize: 36 }} />
          <HeaderNickname>인생은 모른디</HeaderNickname>
        </ChatHeader>
        <MessageList>
          {messages.map((message, index) => (
            <Message key={index} $mine={message.sender === 'me'}>
              {message.content}
            </Message>
          ))}
        </MessageList>
        <MessageInput>
          <Input
            type="text"
            placeholder="메세지를 입력해주세요"
            value={newMessage}
            onChange={handleMessageChange}
          />
          <StyledSendIcon sx={{ fontSize: 31 }} onClick={handleSendMessage} />
        </MessageInput>
      </Chatbox>
    </ChatRoomcontainer>
  );
};

export default ChatRoom;
