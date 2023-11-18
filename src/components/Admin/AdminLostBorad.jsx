import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';

const columns = [
  { field: 'id', headerName: '게시물 번호', width: 190 },
  { field: 'title', headerName: '제목', width: 190 },
  {
    field: 'product_category',
    headerName: '종류',
    width: 190,
  },
  { field: 'nickname', headerName: '닉네임', width: 190 },
  { field: 'isFound', headerName: '현재 상태', width: 190 },

  {
    field: 'date',
    headerName: '작성 시기',
    width: 198,
  },
];
const rows = [
  {
    id: 1,
    title: '에어팟 잃어버렸어요ㅜㅜ ',
    product_category: '에어팟',
    nickname: 'Snow',
    isFound: '완료',
    date: '2023/11/14',
  },
  {
    id: 2,
    title: '에어팟 잃어버렸어요ㅜㅜ ',
    product_category: '에어팟',
    nickname: 'Snow',
    isFound: '완료',
    date: '2023/11/14',
  },
];

export default function AdminFoundBoard() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
