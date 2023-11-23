import React from 'react';
import styled from 'styled-components';
import ButtonImage from '../../assets/laf_button.png';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #ff6700; /* 버튼 배경색 */
  border: none;
  border-radius: 2rem; /* 버튼 모서리 둥글게 */
  padding: 0px;
  cursor: pointer;
  outline: none;
  width: 14rem; /* 버튼의 너비 */
  height: 4rem; /* 버튼의 높이 */
  transition: box-shadow 0.2s; /* 그림자 효과를 위한 전환 */

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 효과 */
  }
`;

const ButtonIcon = styled.img`
  margin-left: 1rem;
  height: 80%; /* 버튼 높이에 맞춰 이미지 크기 조정 */
  margin-right: 10px; /* 아이콘과 텍스트 사이의 간격 */
`;

const ButtonText = styled.span`
  color: #fffaf0; /* 버튼 텍스트 색상 */
  font-size: 1.6rem; /* 버튼 텍스트 크기 */
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
  padding: 0 1rem;
`;

const LafButton = ({ text }) => {
  return (
    <StyledButton>
      <ButtonIcon src={ButtonImage} alt="" />
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
};

export default LafButton;
