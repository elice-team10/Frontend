import styled, { css } from 'styled-components';
import theme from '../../config/theme';
import EditIcon from '@mui/icons-material/Edit';
import { StyledEngineProvider } from '@mui/styled-engine';
import Button from '@mui/material/Button';

const WriteButton = styled(Button)`
  && {
    font-size: ${theme.fontSizes.medium};
    line-height: 22px;
    color: ${theme.colors.text}; /* 원래 색상 */
    padding: 0.8rem;
    margin: 19px 0 19px auto;
    background-color: ${theme.colors.textWhite};
    border: 1px solid ${theme.colors.text};
    font-weight: bold;
  }
`;

const Icon = styled(EditIcon)`
  color: ${theme.colors.primary};
  font-size: 'large';
  margin-right: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 5rem;

`;

const EachTab = styled.p`
  font-size: ${theme.fontSizes.large};
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
   
        <WriteButton variant="outlined" size="small">
          <Icon fontSize="large" />
          등록
        </WriteButton>
      
    </Container>
  );
}

export default CommunityTab;
