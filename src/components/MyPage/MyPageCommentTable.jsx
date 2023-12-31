import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
} from '@mui/material';
import theme from '../../config/theme';
import styled from 'styled-components';
import { StyledEngineProvider } from '@mui/styled-engine';
import { axiosPrivate } from '../../api/axios';
import MyPageNoContent from './MyPageNoContent';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/FormatDate';

const columns = [
  // 메모: 댓글 번호는 중요하지 않을 것 같다는 피드백으로 주석 처리
  // { id: 'commentId', label: '댓글 번호', minWidth: '22rem', align: 'center' },
  {
    id: 'commentDate',
    label: '댓글 작성일',
    minWidth: '24rem',
    align: 'center',
  },

  {
    id: 'commentContent',
    label: '댓글 내용',
    minWidth: '40rem',
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
];

const CenteredCircularProgress = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25vh',
  flex: 1,
  width: '86rem',
});

const MyPaper = styled(Paper)`
  width: 86rem;

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    margin-top: 0rem !important;
  }

  /* 768px / 16px = 48 */
  @media (max-width: 48em) {
    width: 48rem;
  }
`;

const MyTableCell = styled(TableCell)`
  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    min-width: 15.65rem !important;
  }

  @media (max-width: 64em) {
    font-size: ${theme.fontSizes.small} !important;
  }
`;

const MyTablePagination = styled(TablePagination)`
  div,
  p,
  svg {
    font-size: ${theme.fontSizes.medium};
  }

  @media (max-width: 64em) {
    div,
    p,
    svg {
      font-size: ${theme.fontSizes.small} !important;
    }
  }
`;

export default function MyPageCommentTable() {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [commentData, setCommentData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    async function getUserCommentData() {
      try {
        const response = await axiosPrivate().get(`/comment`);

        setCommentData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getUserCommentData();
  }, []);

  function createData(commentId, postId, commentDate, commentContent) {
    return {
      commentId,
      postId,
      commentDate,
      commentContent,
    };
  }

  const rows = commentData.map(
    ({
      _id: commentId,
      postId: postId,
      createdAt: commentDate,
      content: commentContent,
    }) =>
      createData(
        commentId,
        postId?._id,
        formatDate(commentDate),
        commentContent,
      ),
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return isLoading ? (
    <CenteredCircularProgress>
      <CircularProgress
        sx={{
          color: '#ff6700',
        }}
      />
    </CenteredCircularProgress>
  ) : commentData.length === 0 ? (
    <MyPageNoContent text={'작성한 댓글이 없습니다.'} />
  ) : (
    <MyPaper
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        flexGrow: '1',
        mt: '1.2rem',
        overflow: 'hidden',
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 680,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <MyTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: theme.fontSizes.large,
                    color: theme.colors.text,
                  }}
                >
                  {column.label}
                </MyTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.commentId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <MyTableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            fontSize: theme.fontSizes.medium,
                            color: theme.colors.text,
                            textAlign: 'center',
                            textOverflow: 'ellipsis',
                            maxWidth: 0,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            navigate(`/community/post/${row.postId}`)
                          }
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </MyTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledEngineProvider>
        <MyTablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledEngineProvider>
    </MyPaper>
  );
}
