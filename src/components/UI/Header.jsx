import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/로고10.png';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import theme from '../../config/theme';
import { IoMenu } from 'react-icons/io5';

const HeaderContainer = styled.header`
  background-color: #000000;
  height: 6.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    z-index: 9999;
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
  }

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    max-height: 4rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 3rem; // 텍스트들 사이의 간격

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    background-color: #000000;
    top: 6.8rem;
    padding: 1rem 0;
    gap: 1.5rem;
  }
`;

const NavLink = styled.div`
  color: #fffaf0;
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
  transition: color 0.2s;

  /* padding: 0.5rem; */
  display: ${({ $isMobile }) => ($isMobile ? 'none' : 'block')};

  &:hover {
    color: #ff6700;
  }

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    display: ${({ $isMobile }) => ($isMobile ? 'block' : 'none')};
  }
`;

const MenuButton = styled(IoMenu)`
  position: absolute;
  top: 1.8rem;
  right: 1rem;
  display: none;
  background: none;
  border: none;
  font-size: ${theme.fontSizes.title};
  color: #fff;
  cursor: pointer;

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    display: block;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo src={logoImage} alt="LAF Logo" onClick={() => navigate('/')} />
      <Navigation $isOpen={isMenuOpen}>
        {(auth?.status === 0 || auth?.status === 1) && (
          <NavLink $isMobile onClick={() => navigate('/chatList')}>
            채팅
          </NavLink>
        )}
        <NavLink $isMobile onClick={() => navigate('/community')}>
          게시판
        </NavLink>
        {(auth?.status === 0 || auth?.status === 1) && (
          <NavLink $isMobile onClick={() => navigate('/mypage')}>
            마이 페이지
          </NavLink>
        )}
        {auth?.status === 0 && (
          <NavLink $isMobile onClick={() => navigate('/admin')}>
            관리자 페이지
          </NavLink>
        )}
        {auth && (
          <NavLink $isMobile onClick={signOut}>
            로그아웃
          </NavLink>
        )}
        {!auth && (
          <NavLink $isMobile onClick={() => navigate('/login')}>
            로그인
          </NavLink>
        )}
      </Navigation>

      <Navigation>
        {(auth?.status === 0 || auth?.status === 1) && (
          <NavLink onClick={() => navigate('/chatList')}>채팅</NavLink>
        )}
        <NavLink onClick={() => navigate('/community')}>게시판</NavLink>
        {(auth?.status === 0 || auth?.status === 1) && (
          <NavLink onClick={() => navigate('/mypage')}>마이 페이지</NavLink>
        )}
        {auth?.status === 0 && (
          <NavLink onClick={() => navigate('/admin')}>관리자 페이지</NavLink>
        )}
        {auth && <NavLink onClick={signOut}>로그아웃</NavLink>}
        {!auth && <NavLink onClick={() => navigate('/login')}>로그인</NavLink>}
      </Navigation>
      <MenuButton onClick={handleMenuToggle} />
    </HeaderContainer>
  );
};

export default Header;
