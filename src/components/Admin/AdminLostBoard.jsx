import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { axiosPrivate } from '../../api/axios';

const columns = [
  { field: '_id', headerName: '게시물 번호', width: 190 },
  { field: 'title', headerName: '제목', width: 190 },
  {
    field: 'product_category',
    headerName: '종류',
    width: 190,
  },
  { field: 'nickname', headerName: '닉네임', width: 190 },
  {
    field: 'isFound',
    headerName: '현재 상태',
    width: 190,
    renderCell: (params) => (
      <span>{params.value ? '완료' : '미완료'}</span>
    ),
  },

  {
    field: 'createdAt',
    headerName: '작성 시기',
    width: 198,
  },
];

const AdminLostBoard = ({ onSelectionChange }, ref) => {
  const [rows, setRows] = useState([]); // 서버로부터 받은 데이터를 저장할 상태

  const fetchData = async () => {
    try {
      // 서버로부터 board_category가 0인 게시물만 가져옴
      const response = await axiosPrivate().get('/post');
      const filteredData = response.data.filter(
        (post) => post.board_category === 0,
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
};

export default forwardRef(AdminLostBoard);
