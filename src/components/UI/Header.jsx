import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/로고10.png';

const HeaderContainer = styled.header`
  background-color: #000000;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer; // 로고에 마우스 오버 시 포인터 모양 변경
  padding: 1rem;
  max-height: 5rem;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end; // 텍스트를 오른쪽 끝으로 정렬
`;

const NavLink = styled.div`
  color: #fffaf0;
  margin-left: 3rem; // 텍스트들 사이의 간격
  cursor: pointer;
  font-size: 1.6rem;
  transition: color 0.2s;
  &:hover {
    color: #ff6700;
  }
`;

const Header = () => {
  let navigate = useNavigate();

  return (
    <HeaderContainer>
      <ContentContainer>
        <Logo src={logoImage} alt="LAF Logo" onClick={() => navigate('/')} />
        <Navigation>
          <NavLink onClick={() => navigate('/community/board')}>게시판</NavLink>
          <NavLink onClick={() => navigate('/mypage')}>마이 페이지</NavLink>
          <NavLink onClick={() => navigate('/logout')}>로그아웃</NavLink>
        </Navigation>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
