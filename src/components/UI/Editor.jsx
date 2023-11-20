import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [value, setValue] = useState('');
    // quill에서 사용할 모듈
  // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
        ],
      },
    }
  }, [])

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ width: '53rem', height: '24rem' }}
      placeholder="찾는(은) 물건의 위치, 장소와 날짜를 상세하게 적을 수록 찾을 수 있는 확률이 높아져요!"
      modules={modules}
    />
  );
}

export default Editor;
