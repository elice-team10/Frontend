import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; // 필요에 따라 z-index 조정
`;
const Titlebox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 30px;
  background: linear-gradient(
    135deg,
    rgba(255, 103, 0, 0.8),
    rgba(255, 127, 80, 0.7),
    rgba(255, 165, 0, 0.7)
  );
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;
const TitelText = styled.p`
  font-size: 12px;
  color: white;
`;

const Text = styled.p`
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  margin: 8px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
`;
const styleClearIcon = {
  color: 'white',
  fontSize: '28px',
  cursor: 'pointer',
  ':hover': {
    color: '#ccc',
  },
};

const styleButton1 = {
  transition: 'all 0.2s',
  width: '180px',
  height: '40px',
  fontSize: '16px',
  borderRadius: '12px',
  color: '#393D3F',
  borderColor: '#393D3F',
  ':hover': {
    borderColor: '#393D3F',
    backgroundColor: '#ddd',
  },
};

const styleButton2 = {
  transition: 'all 0.2s',
  width: '180px',
  height: '40px',
  fontSize: '16px',
  borderRadius: '12px',
  backgroundColor: '#FF6700',
  ':hover': {
    backgroundColor: '#FF6700',
    filter: 'brightness(1.15)',
  },
};

// sx 속성 변수로 뺴기 !!!

function ModalBasic({ setModalOpen, title, content, btnText, getFunction }) {
  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const handleFunction = () => {
    getFunction(); // 버튼 클릭시 실행헐 부모 컴포넌트의 함수
    closeModal(); // 모달 닫기
  };

  return (
    <>
      <StyledBackdrop onClick={closeModal}>
        <ModalContainer>
          <Titlebox>
            {/* 모달 헤더 글귀 */}
            <TitelText>{title}</TitelText>
            <ClearIcon onClick={closeModal} sx={styleClearIcon} />
          </Titlebox>
          {/* 모달 본문 */}
          <Text>{content}</Text>
          <BtnBox>
            <Button onClick={closeModal} sx={styleButton1} variant="outlined">
              취소
            </Button>
            <Button
              // 클릭 시 부모 컴포넌트 함수 실행 후 모달 닫기
              onClick={handleFunction}
              sx={styleButton2}
              variant="contained"
            >
              {/* 버튼 글귀*/}
              {btnText}
            </Button>
          </BtnBox>
        </ModalContainer>
      </StyledBackdrop>
    </>
  );
}
export default ModalBasic;