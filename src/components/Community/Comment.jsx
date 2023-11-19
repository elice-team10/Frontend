import styled from "styled-components";
import theme from "../../config/theme";

const ReplyContainer = styled.div`
  width: 56rem;
  height: 100%;

  & ul {
    list-style: none;
    padding: 1.3rem;
    border: 1px solid #ccc;
    border-radius: 12px;
  }

  & li {
  }
  & p {
    // border: 1px solid #ccc;
    // border-radius: 4px;
    margin: 12px;
    padding-left: 12px;
    font-size: ${theme.fontSizes.medium};
  }

  & div {
    font-weight: bold;
    font-size: ${theme.fontSizes.small};
  }
`;

const ReplyForm = styled.form`
  padding: 1rem;
  display: flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 12px;

  & textarea {
    color: ${theme.colors.text};
    display: block;
    width: 90%;
    margin: 0px;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: ${theme.fontSizes.medium};
    letter-spacing: inherit;
    height: 36px;
    bottom: 0px;
    overflow: hidden;
    resize: none;
  }

  & button {
    position: absolute;
    right: 11px;
    top: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.textWhite};
    background-color: ${theme.colors.border};
    border: 1px solid ${theme.colors.border};
    border-radius: 4px;
    padding: 0.5rem;

    &:hover {
      filter: brightness(1.15);
    }
  }
`;

const ReplyBoard = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: inherit;

    + div {
      margin-left: 0.6rem;
    }
  }
`;

const ReplyButton = styled.div`
  display: flex;
  justify-content: inherit;
  color: ${theme.colors.textLightgray};

  & div:hover {
    color: ${theme.colors.primary};
  }
`;

function Comment() {

  return (
    <>
      <ReplyContainer>
        <ReplyForm>
          <textarea placeholder="댓글을 남겨보세요."></textarea>
          <button>등록</button>
        </ReplyForm>
        <ul>
          <li>
            <ReplyBoard>
              <div>
                <span>닉네임 • </span>
                <span>11-18</span>
              </div>
              <ReplyButton>
                <div>수정</div>
                <div style={{ paddingLeft: `8px` }}>삭제</div>
              </ReplyButton>
            </ReplyBoard>
            <p>그거 제가 주웠어요!</p>
          </li>
        </ul>
      </ReplyContainer>
    </>
  );
}

export default Comment;
