import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: '회원 번호', width: 150 },
  { field: 'email', headerName: '이메일', width: 318 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  {
    field: 'state',
    headerName: '현재 상태',
    width: 250,
  },
  {
    field: 'date',
    headerName: '가입 시기',
    width: 200,
  },
];

export default function AdminUser() {
  // Redux 스토어의 상태를 가져옴
  const rows = useSelector((state) => state.user);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
            color: theme.colors.text,
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: theme.fontSizes.large,
            color: theme.colors.text,
            borderTop: '1.5px solid black',
            borderBottom: '0.5px solid black',
          },
        }}
      />
    </div>
  );
}