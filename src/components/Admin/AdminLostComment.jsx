import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

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

const AdminLostComment = ({ onSelectionChange }, ref) => {
  const [filteredComments, setFilteredComments] = useState([]); // 필터된 댓글 데이터
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // 서버로부터 board_category가 0인 게시물의 댓글만 가져옴
      const response = await axiosPrivate().get('/comment');
      console.log('123', response);
      const filteredData = response.data.filter(
        (comment) => comment.postId && comment.postId.board_category === 0,
      );
      console.log('123', response);
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
        onRowClick={(params) => {
          // params.row.postId._id를 사용하여 postId._id 값에 접근
          const postId = params.row.postId?._id; // postId가 존재하는지 확인
          if (postId) {
            navigate(`/community/post/${postId}`);
          } else {
            // postId가 없는 경우의 처리
            console.log('Post ID not found for this comment');
          }
        }}
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

export default forwardRef(AdminLostComment);
