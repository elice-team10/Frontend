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
import api, { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { plPL } from '@mui/x-data-grid';


const fake_data = [
  {
    postId: 1,
    postDate: '2023-01-01',
    postTitle: '잃어버린 열쇠',
    foundOrFind: '찾았어요',
    completedStatus: '완료',
  },
  {
    postId: 2,
    postDate: '2023-01-05',
    postTitle: '분실된 지갑',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 3,
    postDate: '2023-02-10',
    postTitle: '실내에서 놓은 휴대폰 찾아요',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 4,
    postDate: '2023-02-15',
    postTitle: '도서관에서 분실된 책',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 5,
    postDate: '2023-03-03',
    postTitle: '운동화를 찾습니다',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 6,
    postDate: '2023-03-10',
    postTitle: '분실된 자전거 열쇠',
    foundOrFind: '찾았어요',
    completedStatus: '완료',
  },
  {
    postId: 7,
    postDate: '2023-04-02',
    postTitle: '잃어버린 지갑',
    foundOrFind: '찾았어요',
    completedStatus: '미완료',
  },
  {
    postId: 8,
    postDate: '2023-04-15',
    postTitle: '도서관에서 분실된 노트북',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 9,
    postDate: '2023-05-01',
    postTitle: '분실된 열쇠',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 10,
    postDate: '2023-05-10',
    postTitle: '잃어버린 서류 가방',
    foundOrFind: '찾았어요',
    completedStatus: '완료',
  },
  {
    postId: 11,
    postDate: '2023-06-05',
    postTitle: '분실된 학생증',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 12,
    postDate: '2023-06-15',
    postTitle: '운동장에서 놓은 모자 찾아요',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 13,
    postDate: '2023-07-01',
    postTitle: '분실된 휴대폰',
    foundOrFind: '찾았어요',
    completedStatus: '완료',
  },
  {
    postId: 14,
    postDate: '2023-07-10',
    postTitle: '도서관에서 놓은 서적',
    foundOrFind: '찾았어요',
    completedStatus: '미완료',
  },
  {
    postId: 15,
    postDate: '2023-08-03',
    postTitle: '분실된 카메라',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 16,
    postDate: '2023-08-15',
    postTitle: '도서관에서 놓은 노트북 어댑터',
    foundOrFind: '찾아요',
    completedStatus: '미완료',
  },
  {
    postId: 17,
    postDate: '2023-09-01',
    postTitle: '분실된 신용카드',
    foundOrFind: '미완료',
    completedStatus: '미완료',
  },
  {
    postId: 18,
    postDate: '2023-09-10',
    postTitle: '운동화를 찾아요',
    foundOrFind: '찾았어요',
    completedStatus: '완료',
  },
];

const columns = [
  { id: 'postId', label: '게시물 번호', minWidth: '9rem', align: 'center' },
  { id: 'postDate', label: '게시일', minWidth: '9rem', align: 'center' },
  {
    id: 'postTitle',
    label: '제목',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
  {
    id: 'foundOrFind',
    label: '찾았어요/찾아요',
    minWidth: 130,
    align: 'center',
    format: (value) => value.toLocaleString('ko-KR'),
  },
  {
    id: 'completedStatus',
    label: '완료 상태',
    minWidth: 130,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

const MyTablePagination = styled(TablePagination)`
  div,
  p,
  svg {
    font-size: ${theme.fontSizes.medium};
  }
`;

export default function MyPageUserPostTable() {
  const { auth } = useAuth();
  const [postData, setPostData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    async function getUserPostData() {
      setIsLoading(true);
      try {
        const response = await axiosPrivate().get(
          `/post/홍길동/?page=${page}&pageSize=${5}`,
          {
            withCredentials: true,
          },
        );

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
    foundOrFind,
    completedStatus,
  ) {
    return { postId, postDate, postTitle, foundOrFind, completedStatus };
  }

  // const rows = fake_data.map(
  //   ({ postId, postDate, postTitle, foundOrFind, completedStatus }) =>
  //     createData(postId, postDate, postTitle, foundOrFind, completedStatus),
  // );

  const rows = postData.map(({ _id: postId, createdAt, title, isFound }) =>
    createData(
      postId,
      createdAt,
      title,
      isFound ? '찾았다' : '찾아요',
      isFound ? '완료 상태 못 받음' : '수정이 필요함',
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
    <CircularProgress sx={{ color: '#ff6700' }} />
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
      <TableContainer sx={{ maxHeight: 680 }}>
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
                    key={row.postId}
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
                          }}
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
