import { useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const InputContainer = styled.div`
  width: 208px;
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
`;
const ImgInput = styled.input`
  border: none;
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

function ImageInput({ onChange }) {
  const [placeholder, setPlaceholder] = useState('사진 등록');
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
            const filename = imgRef.current.files[0].name;
            setPlaceholder(filename);
          }
        }}
      />
    </InputContainer>
  );
}

export default ImageInput;
