import React from 'react';
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import theme from '../../config/theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;

  /* transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  } */
`;

const MyBasicAvatar = styled(AccountCircleIcon)`
  /* font-size: 20rem !important; */
  width: 20rem !important;
  height: 20rem !important;
  color: #ccc;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    width: 18rem !important;
    height: 18rem !important;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    width: 14rem !important;
    height: 14rem !important;
  }
`;

const Avatar = styled.img`
  width: ${(props) => props.sizes.width}rem;
  height: ${(props) => props.sizes.height}rem;
  border-radius: 50%;
  object-fit: cover;
  justify-self: center;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    width: 16rem;
    height: 16rem;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    width: 12rem;
    height: 12rem;
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    width: 10rem;
    height: 10rem;
  }
`;

const MyCameraIcon = styled(PhotoCameraIcon)`
  position: absolute;
  font-size: 3.4rem !important;
  right: ${(props) => (props.type === 'basic' ? '3rem' : '2.2rem')};
  bottom: ${(props) => (props.type === 'basic' ? '2rem' : '3.2rem')};
  border-radius: 50%;
  border: 1px solid ${theme.colors.border};
  padding: 0.4rem !important;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    right: ${(props) => (props.type === 'basic' ? '2.8rem' : '2.2rem')};
    bottom: ${(props) => (props.type === 'basic' ? '2.2rem' : '2.2rem')};
    font-size: 2.8rem !important;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    right: ${(props) => (props.type === 'basic' ? '1.8rem' : '1.4rem')};
    bottom: ${(props) => (props.type === 'basic' ? '1rem' : '1.4rem')};
    font-size: 2.4rem !important;
  }
`;

MyPageUserAvatar.defaultProps = {
  onProfileModalOpen: () => {},
  selectedImage: '1',
  altText: 'avatar',
  sizes: { width: 20, height: 20 },
};

export default function MyPageUserAvatar({
  onProfileModalOpen,
  selectedImage,
  altText,
  sizes,
}) {
  return (
    <AvatarWrapper onClick={onProfileModalOpen}>
      {selectedImage === '1' && (
        <>
          <MyBasicAvatar type="basic" />
          <MyCameraIcon type="basic" />
        </>
      )}
      {selectedImage !== '1' && (
        <>
          <Avatar
            src={`/profiles/profile${selectedImage}.webp`}
            alt={altText}
            sizes={sizes}
          />
          <MyCameraIcon />
        </>
      )}
    </AvatarWrapper>
  );
}
