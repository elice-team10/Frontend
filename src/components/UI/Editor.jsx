import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ width: '59rem', height: '40rem' }}
      placeholder="찾는(은) 물건의 위치, 장소와 날짜를 상세하게 적을 수록 찾을 수 있는 확률이 높아져요!"
    />
  );
}

export default Editor;
