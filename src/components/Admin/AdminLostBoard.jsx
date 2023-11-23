import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import api from '../../api/axios';

const columns = [
  { field: '_id', headerName: '게시물 번호', width: 190 },
  { field: 'title', headerName: '제목', width: 190 },
  {
    field: 'product_category',
    headerName: '종류',
    width: 190,
  },
  { field: 'nickname', headerName: '닉네임', width: 190 },
  { field: 'isFound', headerName: '현재 상태', width: 190 },

  {
    field: 'createdAt',
    headerName: '작성 시기',
    width: 198,
  },
];


export default function AdminLostBoard() {
  const [rows, setRows] = useState([]); // 서버로부터 받은 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 board_category가 0인 게시물만 가져옴
        const response = await api.get('/post');
        const filteredData = response.data.filter(
          (post) => post.board_category === 0,
        );
        setRows(filteredData); // 서버로부터 받은 데이터로 rows 상태를 업데이트
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

        rows={rows}
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
