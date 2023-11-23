import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/로고10.png';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

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
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <ContentContainer>
        <Logo src={logoImage} alt="LAF Logo" onClick={() => navigate('/')} />
        <Navigation>
          <NavLink onClick={() => navigate('/community')}>게시판</NavLink>
          {(auth?.status === 0 || auth?.status === 1) && (
            <NavLink onClick={() => navigate('/mypage')}>마이 페이지</NavLink>
          )}
          {auth?.status === 0 && (
            <NavLink onClick={() => navigate('/admin')}>관리자 페이지</NavLink>
          )}
          {auth && <NavLink onClick={signOut}>로그아웃</NavLink>}
          {!auth && (
            <NavLink onClick={() => navigate('/login')}>로그인</NavLink>
          )}
        </Navigation>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
