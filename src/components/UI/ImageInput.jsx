import { useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ToastAlert from './ToastAlert';

const InputContainer = styled.div`
  width: 177px;
  height: 31.38px;
  display: flex;
  padding: 8px;
  margin: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${theme.colors.text};
  box-sizing: border-box;
  &:hover {
    border: 1px solid ${theme.colors.text};
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    width: 20.8rem;
    margin: 0px;
  }
`;
const ImgInput = styled.input`
  border: none;
  width: 80%;
  &::placeholder {
    color: ${theme.colors.text};
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
  }
`;
const ImgLabel = styled.label`
  background: ${theme.colors.textWhite};
  color: gray;
  box-sizing: border-box;
  padding-left: 4px;
  outline: none;
  &:hover {
    color: ${theme.colors.text};
  }
`;
const Input = styled.input`
  display: none;
`;

function ImageInput({ onChange, defaultValue }) {
  const [placeholder, setPlaceholder] = useState(defaultValue || '사진 등록');
  const [showAlert, setShowAlert] = useState(false);
  const imgRef = useRef(null);

  return (
    <InputContainer>
      <ImgInput type="text" placeholder={placeholder} disabled />
      <ImgLabel htmlFor="imgFile">
        <FileDownloadIcon />
      </ImgLabel>
      <Input
        type="file"
        id="imgFile"
        accept="image/png, image/jpeg"
        ref={imgRef}
        onChange={(event) => {
          // 파일 콜백 호출
          onChange(event);
          // 파일 이름으로 placeholder 지정
          if (imgRef.current && imgRef.current.files.length > 0) {
            // 파일 크기 체크
            const filesize = imgRef.current.files[0].size / 1024 / 1024;
            if (filesize > 1) {
              setShowAlert(true);
              // 파일 선택 초기화
              imgRef.current.value = '';
              setPlaceholder('사진 등록');
              return;
            }
            // 파일 콜백 호출
            onChange(event);
            // 파일 이름으로 placeholder 지정
            const filename = imgRef.current.files[0].name;
            setPlaceholder(filename);
          }
          setShowAlert(false);
        }}
      />
      {showAlert && (
        <ToastAlert
          icon="error"
          title="파일 크기는 1MB를 초과할 수 없습니다."
        />
      )}
    </InputContainer>
  );
}

export default ImageInput;
