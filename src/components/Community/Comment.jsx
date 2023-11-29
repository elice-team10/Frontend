import styled from 'styled-components';
import theme from '../../config/theme';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createNewComment,
  deleteComment,
  fetchComments,
  queryClient,
  updateComment,
} from '../../api/http';
import CircularProgress from '@mui/material/CircularProgress';
import { formatDate } from '../../utils/FormatDate';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const ReplyContainer = styled.div`
  width: 56rem;
  height: 100%;

  & ul {
    list-style: none;
    padding: 1.3rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

const ReplyForm = styled.div`
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
    top: 13px;
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

  & span {
    + span {
      margin-left: 0.6rem;
    }
  }
`;

const ReplyButton = styled.div`
  display: flex;
  justify-content: inherit;
  color: ${theme.colors.textLightgray};

  & div {
    padding-left: 8px;
  }

  & div:hover {
    color: ${theme.colors.primary};
  }
`;

const ReplyCount = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  font-weight: bold;
`;

function Comment({ postId }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const commentRef = useRef({});

  // 수정 버튼 클릭시 p태그 포커스
  useEffect(() => {
    if (isEdit) {
      const commentId = Object.keys(isEdit).find((key) => isEdit[key] === true);
      if (commentRef.current[commentId]) {
        commentRef.current[commentId].focus();
      }
    }
  }, [isEdit]);

  // 댓글 읽기
  const {
    data: commentData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['commentData'],
    queryFn: () => fetchComments(`/comment/${postId}`),
  });

  // 댓글 작성
  const { mutate: commentMutate } = useMutation({
    mutationFn: createNewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentData'],
      });
    },
  });

  // 댓글 삭제
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentData'],
      });
    },
  });

  // 댓글 수정
  const { mutate: addMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentData'],
      });
    },
  });

  const handleAddComment = (event) => {
    event.preventDefault();
    commentMutate({ postId, content: String(comment) });
    setComment('');
  };

  const handleDeletComment = (commentId, userId) => {
    console.log('commentid', commentId);
    console.log('userid', userId);
    deleteMutate({ commentId, userId });
  };

  const handleEditComment = (commentId, userId, comment) => {
    console.log('edit', commentId, userId, comment, commentRef);
    addMutate({ commentId, userId, content: String(comment) });
  };

  let content;

  if (isPending) {
    content = <CircularProgress sx={{ color: '#ff6700' }} />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="에러 발생"
        message={error.info?.message || '데이터를 가져오는데 실패했습니다.'}
      />
    );
  }
  if (commentData && commentData.length !== 0) {
    console.log('data', commentData);
    content = (
      <ul>
        {commentData.map((item, index) => (
          <li key={item._id}>
            <ReplyBoard>
              <div>
                <span>{`${item.userId.nickname} •`}</span>
                <span>{formatDate(item.createdAt)}</span>
              </div>
              <ReplyButton>
                {isEdit[item._id] ? (
                  <>
                    <div
                      type="button"
                      onClick={() => {
                        handleEditComment(
                          item._id,
                          item.userId._id,
                          commentRef.current[item._id].innerText,
                        );
                        setIsEdit((prevIsEdit) => ({
                          ...prevIsEdit,
                          [item._id]: false,
                        }));
                      }}
                    >
                      등록
                    </div>
                    <div
                      type="button"
                      onClick={() =>
                        setIsEdit((prevIsEdit) => ({
                          ...prevIsEdit,
                          [item._id]: false,
                        }))
                      }
                    >
                      취소
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      type="button"
                      onClick={() => {
                        setIsEdit((prevIsEdit) => ({
                          ...prevIsEdit,
                          [item._id]: true,
                        }));
                        commentRef.current[item._id].focus();
                      }}
                    >
                      수정
                    </div>
                    <div
                      type="button"
                      onClick={() =>
                        handleDeletComment(item._id, item.userId._id)
                      }
                    >
                      삭제
                    </div>
                  </>
                )}
              </ReplyButton>
            </ReplyBoard>
            <p
              contentEditable={isEdit[item._id] || false}
              suppressContentEditableWarning={isEdit[item._id] || false}
              // 각각 댓글 요소의 개별 참조 설정
              ref={(el) => (commentRef.current[item._id] = el)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault(); // Enter 키 누르면 생기는 줄바꿈 방지
                  handleEditComment(
                    item._id,
                    item.userId._id,
                    commentRef.current[item._id].innerText,
                  );
                  setIsEdit((prevIsEdit) => ({
                    ...prevIsEdit,
                    [item._id]: false,
                  }));
                }
              }}
            >
              {item.content}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ReplyCount>{`댓글 ${
        commentData ? commentData.length : '0'
      }`}</ReplyCount>
      <ReplyContainer>
        <ReplyForm>
          <textarea
            placeholder="댓글을 남겨보세요."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault(); // Enter 키 누르면 생기는 줄바꿈 방지
                handleAddComment(event);
              }
            }}
          ></textarea>
          <button type="button" onClick={handleAddComment}>
            등록
          </button>
        </ReplyForm>
        {content}
      </ReplyContainer>
    </>
  );
}

export default Comment;
