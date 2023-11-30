import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
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
  background: white;
  border: none;
  padding-bottom: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
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
  justify-content: flex-end;
  align-items: center;
  padding: 0 12px !important;
  height: 30px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;
const TitleText = styled.p`
  font-size: 12px;
  color: #767a87;
  display: none;
`;

const Text = styled.p`
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 375;
  margin: 8px !important;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px !important;
`;

const styleClearIcon = {
  color: '#7c9299',
  fontSize: '25px',
  cursor: 'pointer',
  ':hover': {
    color: '#ff6700',
  },
};

const styleQuestionIcon = {
  color: '#ed7117',
  fontSize: '70px',
  alignSelf: 'center',
};

const styleButton1 = {
  transition: 'all 0.2s',
  width: '120px',
  height: '40px',
  fontSize: '17px',
  fontWeight: '375',
  color: 'black',
  //borderRadius: '8px',
  border: 'none',
  backgroundColor: '#7C9299',
  ':hover': {
    backgroundColor: '#ddd',
  },
};

const styleButton2 = {
  transition: 'all 0.2s',
  width: '120px',
  height: '40px',
  fontSize: '17px',
  fontWeight: '375',
  boxShadow: 'none',
  //borderRadius: '8px',
  color: '#fff',
  backgroundColor: '#151618',
  ':hover': {
    backgroundColor: '#ddd',
    color: 'black',
  },
};

function ModalBasic({ getFunction, onCloseModal, title, content, btnText }) {
  const handleFunction = () => {
    getFunction(); // 버튼 클릭시 실행헐 부모 컴포넌트의 함수
    onCloseModal(); // 모달 닫기
  };

  return (
    <>
      <StyledBackdrop onClick={onCloseModal}>
        <ModalContainer>
          <Titlebox>
            {/* 모달 헤더 글귀 */}
            <TitleText>{title}</TitleText>
            <ClearIcon onClick={onCloseModal} sx={styleClearIcon} />
          </Titlebox>
          {/* <HelpOutlineSharpIcon sx={styleQuestionIcon} /> */}
          {/* 모달 본문 */}
          <Text>{content}</Text>
          <BtnBox>
            {/* 취소 버튼 (바꿈) */}
            <Button onClick={onCloseModal} sx={styleButton1}>
              취소
            </Button>
            {/* 확인 버튼 (클릭 시 부모 컴포넌트 함수 실행 후 모달 닫기) */}
            <Button
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
