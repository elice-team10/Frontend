import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';

const columns = [
  { field: 'id', headerName: '회원 번호', width: 230 },
  { field: 'email', headerName: '이메일', width: 230 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  {
    field: 'status',
    headerName: '현재 상태',
    width: 230,
  },
  {
    field: 'date',
    headerName: '가입 시기',
    width: 228,
  },
];

const rows = [
  {
    id: 1,
    email: 'Jon@gmail.com',
    nickname: 'Snow',
    status: '일반회원',
    date: '2023/11/14',
  },
  {
    id: 2,
    email: 'Cersei@gmail.com',
    nickname: 'Snow',
    status: '일반회원',
    date: '2023/11/14',
  },
];

export default function AdminUser({ onSelectionChange }) {
  /*
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  */

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        /*
        onSelectionModelChange={(newSelection) => {
        onSelectionChange(newSelection); // 선택된 행 상태를 상위 컴포넌트로 전달
        }}
        */

        rows={rows}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
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
