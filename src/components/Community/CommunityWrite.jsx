import styled from 'styled-components';
import theme from '../../config/theme';
import Calander from '../UI/DatePicker';
import { Link } from 'react-router-dom';
import CustomizedSwitches from '../UI/SwitchButton';
import Header from '../UI/Header';
import { LOCATION_CATEGORY } from '../../config/constants';
import ImageInput from '../UI/ImageInput';
import { useState } from 'react';

const Background = styled.div`
  background-color: #eee;
  height: 100%;
  padding: 3px;
`;

export const PostContainer = styled.div`
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
`;
const TitleContainer = styled.div`
  align-items: center;
  height: 7rem;
`;
const Title = styled.input`
  font-size: ${theme.fontSizes.title};
  color: ${theme.colors.text};
  border: none;
  outline: none;
  height: 7rem;
  width: 53rem;
  margin-left: 1rem;
  // border-bottom: 1px solid ${theme.colors.border};
  &::placeholder {
    color: ${theme.colors.textLightgray}
    font-size: ${theme.fontSizes.title};
  }
`;

const DividerLine = styled.div`
  width: 62rem;
  height: 0.009rem;
  background-color: ${theme.colors.border};
  position: absolute;
  left: 0;
`;

const ToolbarContainer = styled.div`
  display: flex;
  height: 7rem;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 29rem;
  margin: 0.4rem 1.2rem 1.2rem;
`;
const Content = styled.textarea`
  margin: auto;
  padding: 2rem;
  width: 49rem;
  height: 24rem;
  border: 1px solid #ccc;
  border-radius: 1.2rem;
  outline: none;
  overflow: hidden;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};

  &::placeholder {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.textLightgray};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  margin: auto;
  width: 16rem;
  font-size: ${theme.fontSizes.medium};
  color: ${(props) => props.color || `${theme.colors.textWhite}`};
  padding: 0.5rem;
  background-color: ${(props) =>
    props.$background || `${theme.colors.primary}`};
  border: 1px solid ${(props) => props.color || `${theme.colors.primary}`};
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    filter: ${(props) =>
      props.$background === 'white' ? `` : 'brightness(1.15)'};
    background-color: ${(props) =>
      props.$background === 'white' ? `#ddd` : ''};
  }
`;

const BoardLink = styled(Link)`
  margin: auto;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: ${theme.colors.text};
  box-sizing: border-box;
  margin: 12px;
  outline: none;
  &:hover {
    border: 1px solid ${theme.colors.text};
  }
`;

const GradationBox = styled.div`
  width: 54rem;
  height: 0.4rem;
  background: linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
  margin-left: 0.8rem;
  border-radius: 12px;
`;

function CommunityWrite() {
  const [location, setLocation] = useState('');


  return (
    <Background>
      {/* <Header /> */}
      <PostContainer>
        <TitleContainer>
          <Title type="text" placeholder="제목을 입력해주세요." />
          <GradationBox />
        </TitleContainer>
        <ToolbarContainer>
          <StyledSelect value={location} onChange={(event) => setLocation(event.target.value)}>
            {LOCATION_CATEGORY.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </StyledSelect>
          <Calander />
          <ImageInput />
        </ToolbarContainer>
        <CustomizedSwitches />
        <ContentContainer>
          <Content
            cols="50"
            rows="10"
            placeholder="찾는(은) 물건의 위치, 장소와 날짜를 상세하게 적을 수록 찾을 수 있는 확률이 높아져요!"
          ></Content>
          {/* <Editor /> */}
        </ContentContainer>
        <ButtonContainer>
          <SubmitButton>등록</SubmitButton>
          <BoardLink to="/community">
            <SubmitButton $background="white" color="#7C9299">
              취소
            </SubmitButton>
          </BoardLink>
        </ButtonContainer>
      </PostContainer>
    </Background>
  );
}

export default CommunityWrite;
