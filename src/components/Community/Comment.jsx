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
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import ErrorBlock from '../UI/ErrorBlock';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

const ReplyContainer = styled.div`
  width: 56rem;
  height: 100%;

  & ul {
    list-style: none;
    padding: 1.3rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 0.4s ease-out;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 0.4s ease-out;
    }
  }

  & li {
    border-bottom: 1px solid #ddd;
    margin: 1.2rem;
  }
  & p {
    // border-radius: 4px;
    margin: 12px;
    padding-left: 12px;
    font-size: ${theme.fontSizes.medium};
  }

  & div {
    font-weight: 500;
    font-size: ${theme.fontSizes.small};
  }
`;

const ReplyForm = styled.div`
  padding: 1rem;
  display: flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

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
    cursor: pointer;

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
    cursor: pointer;
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
  const [originalComment, setOriginalComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [commentPlaceholder, setCommentPlaceholder] =
    useState('댓글을 남겨보세요.');
  const commentRef = useRef({});
  const { auth } = useAuth();

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
    if (comment.trim() === '') {
      setCommentPlaceholder('댓글을 작성해주세요.');
      return;
    }
    commentMutate({ postId, content: comment });
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

  // 댓글 날짜 포맷팅
  const formatDate = (data) => {
    const now = new Date();
    const inputDate = new Date(data);

    const diffMs = now - inputDate; // 현재 시간과 댓글 시간의 ms 차이
    const diffSc = diffMs / 1000; // second 차이
    const diffMinute = diffMs / (1000 * 60); // minutes 차이
    const diffHours = diffMs / (1000 * 60 * 60); // hours 차이
    const diffDays = diffMs / (1000 * 60 * 60 * 24); // days 차이

    if (diffMinute < 1) {
      return `${Math.round(diffSc)}초 전`;
    }
    if (diffHours < 1) {
      return `${Math.round(diffMinute)}분 전`;
    }
    if (diffHours < 24) {
      return `${Math.round(diffHours)}시간 전`;
    } else {
      return `${Math.round(diffDays)}일 전`;
    }
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
    content = (
      <TransitionGroup component="ul">
        {commentData.map((item, index) => (
          <CSSTransition
            key={item._id}
            classNames="fade"
            timeout={400}
            component="li"
          >
            <li>
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
                        onClick={() => {
                          commentRef.current[item._id].innerText =
                            originalComment;
                          setIsEdit((prevIsEdit) => ({
                            ...prevIsEdit,
                            [item._id]: false,
                          }));
                        }}
                      >
                        취소
                      </div>
                    </>
                  ) : (
                    item.userId?.nickname === auth?.nickname && (
                      <>
                        <div
                          type="button"
                          onClick={() => {
                            setOriginalComment(
                              commentRef.current[item._id].innerText,
                            );
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
                    )
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  return (
    <>
      <ReplyCount>{`댓글 ${
        commentData ? commentData.length : '0'
      }`}</ReplyCount>
      <ReplyContainer>
        {auth && (
          <ReplyForm>
            <textarea
              placeholder={commentPlaceholder}
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
        )}
        {content}
      </ReplyContainer>
    </>
  );
}

export default Comment;
