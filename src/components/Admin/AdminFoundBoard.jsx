import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: '_id', headerName: '게시물 번호', width: 190 },
  { field: 'title', headerName: '제목', width: 190 },
  {
    field: 'product_category',
    headerName: '종류',
    width: 190,
  },
  {
    field: 'nickname',
    headerName: '닉네임',
    width: 190,
    renderCell: (params) => <span>{params.row.userId.nickname}</span>,
  },
  {
    field: 'isFound',
    headerName: '현재 상태',
    width: 190,
    renderCell: (params) => <span>{params.value ? '완료' : '미완료'}</span>,
  },

  {
    field: 'createdAt',
    headerName: '작성 시기',
    width: 198,
  },
];

const AdminFoundBoard = ({ onSelectionChange }, ref) => {
  const [rows, setRows] = useState([]); // 서버로부터 받은 데이터를 저장할 상태
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // 서버로부터 board_category가 1인 게시물만 가져옴
      const response = await axiosPrivate().get('/post');
      const filteredData = response.data.filter(
        (post) => post.board_category === 1,
      );
      setRows(filteredData); // 서버로부터 받은 데이터로 rows 상태를 업데이트
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        onRowClick={(params) => navigate(`/community/post/${params.id}`)}
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
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
            cursor: 'pointer', // 마우스 호버 시 커서 포인터로 변경
          },
        }}
      />
    </div>
  );
};

export default forwardRef(AdminFoundBoard);
