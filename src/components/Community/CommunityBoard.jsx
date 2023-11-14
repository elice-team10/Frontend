import styled from "styled-components";
import CommunityTab from "./CommunityTab";
import { useState } from "react";

const CommunityContainer = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  margin: auto;
`;

function CommunityBoard () {
  const [currentTab, setCurrentTab] = useState('찾아요');
  const clickTabHandle = (tab) => {
    setCurrentTab(tab);
  }

  return (
    <CommunityContainer>
      <CommunityTab currentTab={currentTab} onClick={clickTabHandle}/>
    </CommunityContainer>
  );
}

export default CommunityBoard;