import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  border-top: 0.5px solid #bcbcbc;
`;

const ContentContainer = styled.div`
  width: 120rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    max-width: 102.4rem;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    max-width: 76.8rem;
  }

  /* 768px / 16px = 48  */
  @media (max-width: 48em) {
    /* 가장 작은 사이즈 */
    max-width: 50rem;
  }
`;

const FooterCopyright = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.textLightgray};
  letter-spacing: 0.1rem;
  line-height: 1;
  gap: 0.6rem;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    gap: 0.4rem;
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    gap: 0.2rem;
  }

  h3 {
    margin: 0;
    margin-top: 0.3rem;
    font-size: ${theme.fontSizes.small};

    /* 768px / 16px = 48 */
    @media (max-width: 48em) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 1rem;
    margin: 0;

    /* 768px / 16px = 48 */
    @media (max-width: 48em) {
      font-size: 0.8rem;
    }
  }
`;
const FooterAddress = styled.address`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${theme.colors.textLightgray};
  letter-spacing: 2px;
  font-style: normal;

  p {
    font-size: ${theme.fontSizes.small};
    margin: 0;

    /* 768px / 16px = 48 */
    @media (max-width: 48em) {
      font-size: 1rem;
    }
  }
`;

const FooterLink = styled.a`
  &:link,
  &:visited {
    text-decoration: none;
    color: ${theme.colors.textLightgray};
    transition: all 0.3s;
  }

  &:hover,
  &:active {
    color: ${theme.colors.text};
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <FooterCopyright>
          <h3>법적고지사항</h3>
          <p>검색결과는 경찰청 및 산하기관으로 부터 제공받으며,</p>
          <p>해당 사이트는 내용에 대해 책임을 지지 않습니다.</p>
          <p>
            Copyright &copy; <span>2025</span> by Lost And Found, Inc. <br />
            All rights reserved.
          </p>
        </FooterCopyright>
        <FooterAddress>
          <p>상호: Lost And Found</p>
          <p>주소: 서울 성동구 아차산로17길 48 성수낙낙 2층</p>
          <p>
            <FooterLink href="tel:070-4633-2740">
              전화: 070-4633-2740
            </FooterLink>
            <br />
            <FooterLink href="mailto::kdt@elice.io">
              이메일: kdt@elice.io
            </FooterLink>
          </p>
        </FooterAddress>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;
