import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { axiosPrivate } from '../../api/axios';

const columns = [
  { field: '_id', headerName: '회원 번호', width: 230 },
  { field: 'email', headerName: '아이디(이메일)', width: 230 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  {
    field: 'status',
    headerName: '회원 상태',
    width: 230,
    renderCell: (params) => (
      <span>{params.value === 0 ? '관리자' : '일반 회원'}</span>
    ),
  },
  {
    field: 'createdAt',
    headerName: '가입 시기',
    width: 228,
  },
];


const AdminUser = ({ onSelectionChange }, ref) => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await axiosPrivate().get('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useImperativeHandle(ref, () => ({
    getUser,
  }));
  

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={user}
        columns={columns}
        getRowId={(user) => user._id}
        checkboxSelection
        onRowSelectionModelChange={(ids) => onSelectionChange(ids)}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          borderRadius: '4px',
          backgroundColor: '#eee',
          '& .MuiDataGrid-cell': {
            outline: 'none !important',
            fontSize: theme.fontSizes.medium,
            '@media (max-width: 1200px)': {
              fontSize: theme.fontSizes.small,
            },
            color: theme.colors.text,
          },
          '& .MuiDataGrid-columnHeader': {
            outline: 'none !important',
            fontSize: theme.fontSizes.large,
            '@media (max-width: 1200px)': {
              fontSize: theme.fontSizes.medium,
            },
            color: theme.colors.text,
            borderBottom: '1.2px solid #7C9299',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#eee', // 행이 호버될 때 배경색 변경
          },
        }}
      />
    </div>
  );
};

export default forwardRef(AdminUser);
