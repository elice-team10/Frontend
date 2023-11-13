import styled, { css } from 'styled-components';
import theme from '../../config/theme';

CommunityTab.defaultProps = {
  currentTab: '찾아요',
  onClick: () => {},
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.primary};
  width: 100%;
`;

const EachTab = styled.p`
  font-size: ${theme.fontSizes.heading1};
  line-height: 22px;
  color: ${theme.colors.text};
  padding: 0.8rem;
  + p {
    margin-left: 1.6rem;
  }

  ${(props) => props.active && css`
    color: ${theme.colors.primary};
    font-weight: bold;
    box-shadow: inset 0px -4px 0px ${theme.colors.primary}
  `}
`;

const tabs = ['찾아요', '주웠어요'];

function CommunityTab({ currentTab, onClick }) {
  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <EachTab key={`${tab}-${i}`} active={currentTab === tab}>
            {tab}
          </EachTab>
        );
      })}
    </Container>
  );
}

export default CommunityTab;
