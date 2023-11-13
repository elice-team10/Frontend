import styled from "styled-components";
import CommunityTab from "./CommunityTab";

const CommunityContainer = styled.div`
  width: 1200px;
`;

function CommunityBoard () {
  return (
    <CommunityContainer>
      <CommunityTab />
    </CommunityContainer>
  );
}

export default CommunityBoard;