import React from 'react';
import styled from 'styled-components';

const FooterLayout = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  border-top: 0.5px solid #bcbcbc;
`;

const FooterContainer = styled.div`
  display: flex;
  width: 1024px;
  height: 80px;
  justify-content: center;
  background-color: #f5f5f5;
`;

const FooterBox1 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  color: #888b8c;
  letter-spacing: 2px;

  h3 {
    margin: 0 0 2px 44px;
    font-size: 12px;
  }

  p {
    font-size: 10px;
    margin: 0;
  }
`;
const FooterBox2 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #888b8c;
  letter-spacing: 2px;

  p {
    font-size: 12px;
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <FooterLayout>
      <FooterContainer>
        <FooterBox1>
          <h3>법적고지사항</h3>
          <p>
            검색결과는 경찰청 및 산하기관으로 부터 제공받으며 해당 사이트는
            <br />
            내용에 대해 책임을 지지 않습니다.
          </p>
        </FooterBox1>
        <FooterBox2>
          <p>
            상호: Lost And Found
            <br />
            주소: 서울 성동구 아차산로17길 48 성수낙낙 2층
            <br />
            전화: 070-4633-2740
          </p>
        </FooterBox2>
      </FooterContainer>
    </FooterLayout>
  );
};

export default Footer;
