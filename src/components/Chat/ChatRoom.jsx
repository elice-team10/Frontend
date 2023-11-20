import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatRoomcontainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Chatbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
  height: 101rem;
  background-color: #eee;
  border-left: 0.5px solid ${theme.colors.border};
  border-right: 0.5px solid ${theme.colors.border};
`;
const Chatheader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 0.5px solid ${theme.colors.border};
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
  color: ${theme.colors.textLightgray};
`;
const HeaderNickname = styled.p`
font-size: ${theme.fontSizes.medium};
color: ${theme.colors.text};
`

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.mine ? '#DCF8C6' : '#FFFFFF')};
  align-self: ${(props) => (props.mine ? 'flex-end' : 'flex-start')};
`;

const MessageInput = styled.div`
  display: flex;
  height: 48px;
  padding: 10px;
  border-top: 0.5px solid ${theme.colors.border};
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 80px;
  padding: 10px 15px;
  margin-left: 10px;
  background-color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 12px;
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
  };

  const handleSendMessage = () => {
    // 메시지 전송 로직
  };
  return (
    <ChatRoomcontainer>
      <Chatbox>
        <Chatheader>
          <StyledArrowBackIosIcon sx={{ fontSize: 32 }}/>
          <StyledAccountCircleIcon sx={{ fontSize: 36 }}/>
          <HeaderNickname>인생은 모른디</HeaderNickname>
        </Chatheader>
        <MessageList>
          {messages.map((message, index) => (
            <Message key={index} mine={message.sender === 'me'}>
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
          <Button onClick={handleSendMessage}>전송</Button>
        </MessageInput>
      </Chatbox>
    </ChatRoomcontainer>
  );
};

export default ChatRoom;
