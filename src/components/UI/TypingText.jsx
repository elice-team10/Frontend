import React, { useEffect } from 'react';
import TypeIt from 'typeit';

const TypingText = ({ strings }) => {
  useEffect(() => {
    new TypeIt('#myElement', {
      strings: strings,
      speed: 65,
      breakLines: false,
      lifeLike: true,
      cursor: false,
    }).go();
  }, []);
  return <div id="myElement">{/* TypeIt이 텍스트를 렌더링할 요소 */}</div>;
};

export default TypingText;
