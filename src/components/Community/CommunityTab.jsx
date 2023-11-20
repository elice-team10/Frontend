import styled, { css } from 'styled-components';
import theme from '../../config/theme';
import { Link } from 'react-router-dom';

const WriteButton = styled.button`
  width: 10rem;
  font-size: ${theme.fontSizes.medium};
  line-height: 22px;
  color: ${theme.colors.textWhite};
  padding: 0.8rem;
  margin: 19px 0 19px 897px;
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    filter: brightness(1.15);
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 5rem;
`;

const EachTab = styled.p`
  font-size: ${theme.fontSizes.subtitle};
  line-height: 22px;
  color: ${theme.colors.text};
  padding: 0.8rem;
  + p {
    margin-left: 1.6rem;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${theme.colors.text};
      font-weight: bold;
      box-shadow: inset 0px -4px 0px ${theme.colors.primary};
    `}
`;

CommunityTab.defaultProps = {
  currentTab: '찾아요',
  onClick: () => {},
};

const tabs = ['찾아요', '주웠어요'];

function CommunityTab({ currentTab, onClick }) {
  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <EachTab
            key={`${tab}-${i}`}
            active={currentTab === tab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </EachTab>
        );
      })}
      <WriteButton>
        <Link
          to="/community/write"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          글 작성
        </Link>
      </WriteButton>
    </Container>
  );
}

export default CommunityTab;
