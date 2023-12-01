import styled, { css } from 'styled-components';
import theme from '../../config/theme';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const WriteButton = styled.button`
  width: 10rem;
  font-size: ${theme.fontSizes.medium};
  line-height: 22px;
  color: ${theme.colors.textWhite};
  padding: 0.8rem;
  margin: 19px 0 19px auto;
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  font-weight: 400;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.15);
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.medium};
    width: 8rem;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 5rem;

  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    max-width: 102.4rem;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    max-width: 76.8rem;
    width: 73%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const EachTab = styled.p`
  font-size: ${theme.fontSizes.subtitle};
  line-height: 22px;
  color: ${theme.colors.text};
  padding: 0.8rem;
  cursor: pointer;
  + p {
    margin-left: 1.6rem;
  }

  ${(props) =>
    props.$active &&
    css`
      color: ${theme.colors.text};
      font-weight: 700;
      box-shadow: inset 0px -4px 0px ${theme.colors.primary};
    `}

  /* 1024px / 16px = 64 */
    @media (max-width: 64em) {
    font-size: ${theme.fontSizes.medium};
    line-height: 30px;
    + p {
      margin-left: 0.4rem;
    }
  }
`;

CommunityTab.defaultProps = {
  currentTab: '찾아요',
  onClick: () => {},
};

const tabs = ['찾아요', '주웠어요'];

function CommunityTab({ currentTab, onClick }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <EachTab
            key={`${tab}-${i}`}
            $active={currentTab === tab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </EachTab>
        );
      })}
      {auth && (
        <WriteButton
          onClick={() =>
            navigate(
              `/community/write?board_category=${
                currentTab === '찾아요' ? 0 : 1
              }`,
            )
          }
        >
          글 작성
        </WriteButton>
      )}
    </Container>
  );
}

export default CommunityTab;
