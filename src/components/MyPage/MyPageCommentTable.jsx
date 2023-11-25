import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import theme from '../../config/theme';
import styled from 'styled-components';
import { StyledEngineProvider } from '@mui/styled-engine';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosPrivate } from '../../api/axios';
import MyPageNoContent from './MyPageNoContent';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/FormatDate';

const columns = [
  { id: 'commentId', label: '댓글 번호', minWidth: '12rem', align: 'center' },
  {
    id: 'commentDate',
    label: '댓글 작성일',
    minWidth: '20rem',
    align: 'center',
  },

  {
    id: 'commentContent',
    label: '댓글 내용',
    minWidth: '28rem',
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
];

const MyTablePagination = styled(TablePagination)`
  div,
  p,
  svg {
    font-size: ${theme.fontSizes.medium};
  }
`;

const CenteredCircularProgress = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  flex: 1,
});

export default function MyPageCommentTable() {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [commentData, setCommentData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    async function getUserPostData() {
      setIsLoading(true);
      try {
        const response = await axiosPrivate().get(
          `/comment/?page=${undefined}&pageSize=${undefined}`,
        );
        console.log(response.data);
        setCommentData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getUserPostData();
  }, []);

  function createData(commentId, commentDate, commentContent) {
    return { commentId, commentDate, commentContent };
  }

  const rows = commentData.map(
    ({ _id: commentId, createdAt: commentDate, content: commentContent }) =>
      createData(commentId, formatDate(commentDate), commentContent),
  );

  const handleChangePage = (event, newPage) => {
    setRowsPerPage(+event.target.value);
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
    <Paper
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        flexGrow: '1',
        padding: '6rem 0 0 8rem',
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
                <TableCell
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
                </TableCell>
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
                        <TableCell
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
                            navigate(`/community/post/${row.commentId}`)
                          }
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
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
    </Paper>
  );
}
