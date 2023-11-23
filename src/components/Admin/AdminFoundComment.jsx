import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import api from '../../api/axios';

const columns = [
  { field: '_id', headerName: '댓글 번호', width: 230 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  { field: 'content', headerName: '내용', width: 230 },
  {
    field: 'postId',
    headerName: '게시물 번호',
    width: 230,
  },
  {
    field: 'createdAt',
    headerName: '작성 시기',
    width: 228,
  },
];

export default function AdminFoundComment() {
  const [filteredComments, setFilteredComments] = useState([]); // 필터된 댓글 데이터

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 board_category가 1인 게시물만 가져옴
        const response = await api.get('/comment');
        const filteredData = response.data.filter(
          (comment) => comment.postId.board_category === 1,
        );
        setFilteredComments(filteredData); // 서버로부터 받은 데이터로 rows 상태를 업데이트
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        /*
        onSelectionModelChange={(newSelection) => {
        onSelection(newSelection); // 선택된 행 상태를 상위 컴포넌트로 전달
        }}
        */

        rows={filteredComments}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
        sx={{
          borderRadius: '4px',
          '& .MuiDataGrid-cell': {
            fontSize: theme.fontSizes.medium,
            '@media (max-width: 1200px)': {
              fontSize: theme.fontSizes.small,
            },
            color: theme.colors.text,
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: theme.fontSizes.large,
            '@media (max-width: 1200px)': {
              fontSize: theme.fontSizes.medium,
            },
            color: theme.colors.text,
            borderTop: '1.5px solid black',
            borderBottom: '0.5px solid black',
          },
        }}
      />
    </div>
  );
}
