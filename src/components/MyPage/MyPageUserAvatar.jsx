import React from 'react';
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import theme from '../../config/theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import profile2 from '../../assets/profiles/profile2.webp';
import profile3 from '../../assets/profiles/profile3.webp';
import profile4 from '../../assets/profiles/profile4.webp';
import profile5 from '../../assets/profiles/profile5.webp';
import profile6 from '../../assets/profiles/profile6.webp';
import profile7 from '../../assets/profiles/profile7.webp';
import profile8 from '../../assets/profiles/profile8.webp';

const AvatarWrapper = styled.div`
  position: relative;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
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
    width: 12rem !important;
    height: 12rem !important;
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
`;

const MyCameraIcon = styled(PhotoCameraIcon)`
  position: absolute;
  font-size: 3.4rem !important;
  right: ${(props) => (props.type === 'basic' ? '3rem' : '1.4rem')};
  bottom: ${(props) => (props.type === 'basic' ? '2rem' : '1.8rem')};
  border-radius: 50%;
  border: 1px solid ${theme.colors.border};
  padding: 0.4rem !important;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    right: ${(props) => (props.type === 'basic' ? '2.8rem' : '2.6rem')};
    bottom: ${(props) => (props.type === 'basic' ? '2.2rem' : '1.6rem')};
    font-size: 2.8rem !important;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    right: ${(props) => (props.type === 'basic' ? '1.8rem' : '0.8rem')};
    bottom: ${(props) => (props.type === 'basic' ? '1rem' : '1.2rem')};
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
      {selectedImage === '2' && (
        <>
          <Avatar src={profile2} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '3' && (
        <>
          <Avatar src={profile3} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '4' && (
        <>
          <Avatar src={profile4} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '5' && (
        <>
          <Avatar src={profile5} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '6' && (
        <>
          <Avatar src={profile6} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '7' && (
        <>
          <Avatar src={profile7} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
      {selectedImage === '8' && (
        <>
          <Avatar src={profile8} alt={altText} sizes={sizes} />
          <MyCameraIcon />
        </>
      )}
    </AvatarWrapper>
  );
}
