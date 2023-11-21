import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import axios from 'axios';

const columns = [
  { field: '_id', headerName: '회원 번호', width: 230 },
  { field: 'email', headerName: '아이디(이메일)', width: 230 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  {
    field: 'status',
    headerName: '회원 상태',
    width: 230,
  },
  {
    field: 'createdAt',
    headerName: '회원 가입일',
    width: 228,
  },
];

export default function AdminUser({ onSelectionChange }) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://kdt-sw-6-team10.elicecoding.com/api/user');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        
        onSelectionModelChange={(newSelection) => {
        onSelectionChange(newSelection); // 선택된 행 상태를 상위 컴포넌트로 전달
        }}
        

        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
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
