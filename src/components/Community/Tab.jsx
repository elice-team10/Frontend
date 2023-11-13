import styled from 'styled-components';

Tab.defaultProps = {
  currentTab: "찾아요",
  onClick: () => {},
}

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-main);
  width: 100%;
`;

const eachTab = styled.p`
  font-size: 2.4rem;
  line-height: 22px;
  padding: 8px;
`;

const tabs = ["찾아요", "주웠어요"];

function Tab({currentTab, onClick}) {
  return <Container>
    {tabs.map((tab, i) => {
      return <p key={`${tab}-${i}`}>{tab}</p>
    })}
  </Container>
}

export default Tab;
