import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import TypingText from '../UI/TypingText';
import { axiosPrivate } from '../../api/axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from '../../hooks/useAuth';

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const HeaderTitle = styled.h1`
  align-self: center;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.title};

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    font-size: ${theme.fontSizes.subtitle};
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    /* font-size: ${theme.fontSizes.large}; */
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;
  padding: 4.8rem 8rem !important;
  border-radius: 12px;
  background-color: #eee;
`;

const MyBasicAvatar = styled(AccountCircleIcon)`
  width: 24rem !important;
  height: 24rem !important;
  color: #ccc;

  cursor: pointer;

  /* transition: all 0.3s ease-in-out !important;

  &:hover {
    transform: scale(1.1);
  } */

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

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 4.8rem;
`;

const Image = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  object-fit: cover;

  cursor: pointer;
  /* transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  } */

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

const PROFILE_IMAGE_UPDATE_URL = '/user';

MyPageUserAvatarListModal.defaultProps = {
  onProfileModalClose: () => {},
  onSelectImage: null,
};

export default function MyPageUserAvatarListModal({
  onProfileModalClose,
  onSelectImage,
}) {
  const { updateAuth } = useAuth();
  const imageList = [
    '/profiles/profile2.webp',
    '/profiles/profile3.webp',
    '/profiles/profile4.webp',
    '/profiles/profile5.webp',
    '/profiles/profile6.webp',
    '/profiles/profile7.webp',
    '/profiles/profile8.webp',
  ];

  const handleModalClick = (e) => {
    e.preventDefault();

    if (
      e.target.tagName === 'path' ||
      e.target.tagName === 'svg' ||
      e.target?.className?.split(' ')[2] === 'modal-container'
    ) {
      onProfileModalClose();
    }
  };

  const handleImageClick = async (e) => {
    let imageNumber;

    if (
      e.target.tagName === 'svg' ||
      e.target.tagName === 'path' ||
      e.target.tagName === 'IMG'
    ) {
      if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
        imageNumber = '1';
      } else if (e.target.tagName === 'IMG') {
        imageNumber = e.currentTarget.src.split('.webp')[0].at(-1);
      }
    }

    try {
      const response = await axiosPrivate().put(PROFILE_IMAGE_UPDATE_URL, {
        profileImg: imageNumber,
      });

      updateAuth({ profileImg: imageNumber });
      onSelectImage(imageNumber);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalContainer className="modal-container" onClick={handleModalClick}>
      <ModalWrapper>
        <HeaderTitle>
          <TypingText strings={['원하시는 프로필 사진을 선택해주세요!']} />
        </HeaderTitle>
        <ImageList>
          <MyBasicAvatar className="basic" onClick={handleImageClick} />
          {imageList.map((imageUrl, index) => (
            <Image
              key={`ProfileImageUrl-${index}`}
              src={imageUrl}
              alt="Profile Picture"
              onClick={handleImageClick}
            />
          ))}
        </ImageList>
      </ModalWrapper>
    </ModalContainer>
  );
}
