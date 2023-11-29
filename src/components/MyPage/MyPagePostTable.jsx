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
import useAuth from '../../hooks/useAuth';
import MyPageNoContent from './MyPageNoContent';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/FormatDate';

const columns = [
  { id: 'postId', label: '게시물 번호', minWidth: '14rem', align: 'center' },
  { id: 'postDate', label: '게시일', minWidth: '14rem', align: 'center' },
  {
    id: 'postTitle',
    label: '제목',
    minWidth: '18rem',
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
  {
    id: 'findOrPick',
    label: '찾아요/주었어요',
    minWidth: '20rem',
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
  {
    id: 'completedStatus',
    label: '완료 상태',
    minWidth: '20rem',
    align: 'center',
    format: (value) => value.toFixed(2),
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
`;

const MyTableCell = styled(TableCell)`
  /* 1200px / 16px = 75 */
  @media (max-width: 75em) {
    min-width: 15.65rem !important;
  }

  /* 1024px / 16px = 64 */
  @media (max-width: 64em) {
    min-width: 12.1rem !important;
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

export default function MyPageUserPostTable() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [postData, setPostData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    async function getUserPostData() {
      try {
        const response = await axiosPrivate().get(`/post/page`);

        setPostData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getUserPostData();
  }, []);

  function createData(
    postId,
    postDate,
    postTitle,
    findOrPick,
    completedStatus,
  ) {
    return { postId, postDate, postTitle, findOrPick, completedStatus };
  }

  const rows = postData.map(
    ({
      _id: postId,
      createdAt: postDate,
      title,
      board_category: findOrPick,
      isFound,
    }) =>
      createData(
        postId,
        formatDate(postDate),
        title,
        findOrPick === 0 ? '찾아요' : '주었어요',
        isFound ? '완료' : '미완료',
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
  ) : postData.length === 0 ? (
    <MyPageNoContent text={'작성한 게시물이 없습니다.'} />
  ) : (
    <MyPaper
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        flexGrow: '1',
        overflow: 'hidden',
        mt: '1.2rem',
      }}
    >
      <TableContainer sx={{ maxHeight: 680 }}>
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
                    key={row.postId}
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
