import React from 'react';
import styled from 'styled-components';
import lafLogo from '../../assets/laf_logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Header from '../UI/Header';

const HomeContainer = styled.div`
  width: 1200px;
  background-color: #fff;
`;

const Image = styled.img`
  display: block;
  margin: 2rem auto 0 auto;
  cursor: pointer;
  width: 170px;
`;

const HomeSearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  height: 50px;
  border-radius: 32px;
  border: 2.5px solid #ff6700;
  transition:
    border-color 0.1s,
    box-shadow 0.2s;
  &:hover {
    border-color: #ff4000;
    box-shadow: 0 0 5px 2px rgb(225, 225, 226);
    input:: placeholder {
      // color: #ff4500;
    }
  }
`;

const StyledIcon = styled(SearchIcon)`
  font-size: 4rem !important;
  color: #ff6700;
  margin-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  &:hover {
  }
`;

const SearchInput = styled.input`
  border: none;
  color: #393d3f;
  outline: none;
  width: 700px;
  margin: auto 30px auto 30px;
  font-size: 2rem;
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
  // transition: color 0.3s;
  // ::placeholder {
  //   color: rgba(57, 61, 63, 0.3);
  // }
`;

const HomeSearchBar = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Image
          src={lafLogo}
          onClick={() => {
            window.location.href = '/';
          }}
        />
        <HomeSearchBarContainer>
          <SearchBox>
            <SearchInput type="text" placeholder="무엇을 잃어버렸나요?" />
            <StyledIcon />
          </SearchBox>
          {/* <SubmitButton>검색</SubmitButton> */}
        </HomeSearchBarContainer>
      </HomeContainer>
    </>
  );
};

export default HomeSearchBar;
