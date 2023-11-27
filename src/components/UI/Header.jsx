import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/로고10.png';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import theme from '../../config/theme';

const HeaderContainer = styled.header`
  background-color: #000000;
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 120rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    max-width: 102.4rem;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    max-width: 76.8rem;
  }
`;

const Logo = styled.img`
  cursor: pointer; // 로고에 마우스 오버 시 포인터 모양 변경
  max-height: 5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    scale: 1.2;
    transform: rotate(-12deg);
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    max-height: 4.5rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 3rem; // 텍스트들 사이의 간격 */
`;

const NavLink = styled.div`
  color: #fffaf0;
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
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
