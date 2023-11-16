import styled from 'styled-components';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';

import Calander from '../UI/DatePicker';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { Link } from 'react-router-dom';
import Editor from '../UI/Editor';

const PostContainer = styled.div`
  width: 56rem;
  height: 60rem;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  margin: 5rem auto;
  padding: 5rem 3rem;
  border: 1px solid #7c9299;
  border-radius: 1.2rem;
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
  border-bottom: 1px solid ${theme.colors.border};
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
  padding-top: 1.8rem;
`;
const Location = styled.p``;

const ContentContainer = styled.div`
  display: flex;
  height: 58rem;
  align-items: center;
  margin: 0 1.2rem 7rem;
`;
const Content = styled.input`
  margin: auto;
  width: 62rem;
  height: 48rem;
  border: none;
  outline: none;
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
    props.backgroundColor || `${theme.colors.primary}`};
  border: 1px solid ${theme.colors.primary};
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    filter: brightness(1.15);
    background-color: ${(props) => props.backgroundColor === 'white' ? `#ddd` : ''
    }
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
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  margin: 12px;
`;

function CommunityWrite() {
  return (
    <PostContainer>
      <TitleContainer>
        <Title type="text" placeholder="제목을 입력해주세요." />
        {/* <DividerLine style={{ top: '9rem' }} /> */}
      </TitleContainer>
      <ToolbarContainer>
        <StyledSelect>
          <option disabled hidden selected>
            <PlaceIcon /> {`${(<PlaceIcon />)} 지역 선택`}
          </option>
          {[
            '강남구',
            '강동구',
            '강북구',
            '강서구',
            '관악구',
            '광진구',
            '구로구',
            '금천구',
            '노원구',
            '도봉구',
            '동대문구',
            '동작구',
            '마포구',
            '서대문구',
            '서초구',
            '성동구',
            '성북구',
            '송파구',
            '양천구',
            '영등포구',
            '용산구',
            '은평구',
            '종로구',
            '중구',
            '중랑구',
          ].map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </StyledSelect>
        <Calander />
      </ToolbarContainer>
      {/* <DividerLine style={{ top: '15rem' }} /> */}
      <ContentContainer>
        {/* <Content
          cols="50"
          rows="10"
          placeholder="찾는(은) 물건의 위치, 장소와 날짜를 상세하게 적을 수록 찾을 수 있는 확률이 높아져요!"
        ></Content> */}
        <Editor />
      </ContentContainer>
      {/* <DividerLine style={{ top: '64rem' }} /> */}
      <ButtonContainer>
        <SubmitButton>등록</SubmitButton>
        <BoardLink to="/community/board">
          <SubmitButton backgroundColor="white" color="#FF6F0F">
            취소
          </SubmitButton>
        </BoardLink>
      </ButtonContainer>
    </PostContainer>
  );
}

export default CommunityWrite;
