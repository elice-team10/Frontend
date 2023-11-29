import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { axiosPrivate } from '../../api/axios';

const columns = [
  { field: '_id', headerName: '댓글 번호', width: 230 },
  {
    field: 'nickname',
    headerName: '닉네임',
    width: 230,
    renderCell: (params) => <span>{params.row.userId.nickname}</span>,
  },
  { field: 'content', headerName: '내용', width: 230 },
  {
    field: 'postId',
    headerName: '게시물 번호',
    width: 230,
    renderCell: (params) => <span>{params.value?._id}</span>,
  },
  {
    field: 'createdAt',
    headerName: '작성 시기',
    width: 228,
  },
];

const AdminFoundComment = ({ onSelectionChange }, ref) => {
  const [filteredComments, setFilteredComments] = useState([]); // 필터된 댓글 데이터

  const fetchData = async () => {
    try {
      // 서버로부터 board_category가 1인 게시물의 댓글만 가져옴
      const response = await axiosPrivate().get('/comment');
      const filteredData = response.data.filter(
        (comment) => comment.postId && comment.postId.board_category === 1,
      );
      setFilteredComments(filteredData); // 서버로부터 받은 데이터로 rows 상태를 업데이트
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
        rows={filteredComments}
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
            borderBottom: '1.2px solid #7C9299',
          },
        }}
      />
    </div>
  );
};

export default forwardRef(AdminFoundComment);
