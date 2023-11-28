import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const ChatListMain = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
`;
const ChatListContainer = styled.div`
  display: flex;
  height: 85vh;
  margin: 20px 0;
  background-color: #eee;
`;
const ChatleftBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  background: linear-gradient(
    135deg,
    rgba(255, 165, 0, 0.5),
    rgba(255, 127, 80, 0.5),
    rgba(255, 103, 0, 0.6)
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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 94rem;
`;
const Chats = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  border-bottom: 0.5px solid #ddd;
  &:hover {
    background-color: #eee;
  }
`;
const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: #ccc;
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

const ChatListComponent = () => {
  // const [myNickname, setMyNickname] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://kdt-sw-6-team10.elicecoding.com/api/user/detail');
  //       setMyNickname(response.data.nickname);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <ChatListMain>
      <ChatListContainer>
        <ChatleftBox>
          <StyledQuestionAnswerIcon sx={{ fontSize: 64 }} />
        </ChatleftBox>
        <ChatListbox>
          <ListHeader>
            <MyNickname>사나이의 묵직한 주먹님의 소중한 대화들</MyNickname>
          </ListHeader>
          <ListBody>
            <Chats>
              <StyledAccountCircleIcon sx={{ fontSize: 44 }} />
              <ChatPartner>
                <ChatPartnerNickname>인생은 모른디</ChatPartnerNickname>
                <ChatContent>감사합니다ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ</ChatContent>
              </ChatPartner>
            </Chats>
            <Chats>
              <StyledAccountCircleIcon sx={{ fontSize: 44 }} />
              <ChatPartner>
                <ChatPartnerNickname>누진세</ChatPartnerNickname>
                <ChatContent>택배로 보내드릴까요?</ChatContent>
              </ChatPartner>
            </Chats>
          </ListBody>
        </ChatListbox>
      </ChatListContainer>
    </ChatListMain>
  );
};

export default ChatListComponent;
