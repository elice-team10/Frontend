import React from 'react';
import styled from 'styled-components';
import testImage from '../../assets/로고1.png';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import theme from '../../config/theme';

const AvatarWrapper = styled.div`
  position: relative;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
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
  right: 1.4rem;
  bottom: 1.8rem;
  border-radius: 50%;
  border: 1px solid ${theme.colors.border};
  padding: 0.4rem !important;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    right: 2.6rem;
    bottom: 1.6rem;
    font-size: 2.8rem !important;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    right: 0.8rem;
    bottom: 1.2rem;
    font-size: 2.4rem !important;
  }
`;

UserAvatar.defaultProps = {
  //   imageUrl:
  // 'https://velog.velcdn.com/images/heelieben/profile/e634958b-a3a5-424f-921a-66f8165923f9/image.png',
  imageUrl: testImage,
  altText: 'avatar',
  sizes: { width: 20, height: 20 },
};

export default function UserAvatar({ imageUrl, altText, sizes }) {
  const handleImageUpload = () => {
    console.log('Uploading image... 어떻게 하는 거지...?');
  };

  return (
    <AvatarWrapper onClick={handleImageUpload}>
      <Avatar src={imageUrl} alt={altText} sizes={sizes} />
      <MyCameraIcon />
    </AvatarWrapper>
  );
}
