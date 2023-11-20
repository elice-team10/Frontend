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

const fake_data = [
  {
    commentId: 1,
    commentDate: '2023-01-01',
    commentContent: '잃어버린 자전거 키',
  },
  {
    commentId: 2,
    commentDate: '2023-01-05',
    commentContent: '분실된 아이폰 찾으시는 분, 찾으셨나요?',
  },
  {
    commentId: 3,
    commentDate: '2023-02-10',
    commentContent: '실내에서 놓은 휴대폰 찾아요',
  },
  {
    commentId: 4,
    commentDate: '2023-02-15',
    commentContent:
      '도서관에서 분실된 책 있습니다. 니체의 말이라는 책인데, 요즘 철학에 관심이 많아서, 읽고 있는 책입니다. 이거 반납 안하면, 새 책 사야한데요.',
  },
  {
    commentId: 5,
    commentDate: '2023-03-03',
    commentContent:
      '운동화를 찾습니다. 빨간색 조던인데, 1000만원 값어치하는 거라서, 구하시는 분께 사례할게요',
  },
  {
    commentId: 6,
    commentDate: '2023-03-10',
    commentContent: '분실된 자전거 열쇠',
  },
  {
    commentId: 7,
    commentDate: '2023-04-02',
    commentContent: '잃어버린 지갑',
  },
  {
    commentId: 8,
    commentDate: '2023-04-15',
    commentContent: '도서관에서 분실된 노트북',
  },
  {
    commentId: 9,
    commentDate: '2023-05-01',
    commentContent: '분실된 열쇠',
  },
  {
    commentId: 10,
    commentDate: '2023-05-10',
    commentContent: '잃어버린 가방에 뭐 들어있는 지 말해주시면, 돌려드려요.',
  },
  {
    commentId: 11,
    commentDate: '2023-06-05',
    commentContent: '분실된 학생증. 잘생기셨네요.',
  },
  {
    commentId: 12,
    commentDate: '2023-06-15',
    commentContent: '운동장에서 놓은 모자 찾아요',
  },
  {
    commentId: 13,
    commentDate: '2023-07-01',
    commentContent: '분실된 휴대폰',
  },
  {
    commentId: 14,
    commentDate: '2023-07-10',
    commentContent: '도서관에서 놓은 서적',
  },
  {
    commentId: 15,
    commentDate: '2023-08-03',
    commentContent: '분실된 카메라',
  },
  {
    commentId: 16,
    commentDate: '2023-08-15',
    commentContent:
      '도서관에서 놓은 노트북 어댑터, 제가 주었습니다. 010-1234-5678로 연락주세요',
  },
  {
    commentId: 17,
    commentDate: '2023-09-01',
    commentContent: '분실된 신용카드 카드 비밀번호 알려주세요.',
  },
  {
    commentId: 18,
    commentDate: '2023-09-10',
    commentContent:
      '운동화를 찾아요. 한정판이라서 100켤레 밖에 없는 운동화에요. 신고 다니다고, 보이기만 해봐.',
  },
];

const columns = [
  { id: 'commentId', label: '댓글 번호', minWidth: '7rem', align: 'center' },
  {
    id: 'commentDate',
    label: '댓글 작성일',
    minWidth: '9rem',
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

function createData(commentId, commentDate, commentContent) {
  return { commentId, commentDate, commentContent };
}

const rows = fake_data.map(({ commentId, commentDate, commentContent }) =>
  createData(commentId, commentDate, commentContent),
);

const MyTablePagination = styled(TablePagination)`
  div,
  p,
  svg {
    font-size: ${theme.fontSizes.medium};
  }
`;

export default function MyPageCommentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
