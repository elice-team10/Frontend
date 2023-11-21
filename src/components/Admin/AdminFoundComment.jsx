import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: '댓글 번호', width: 230 },
  { field: 'content', headerName: '제목', width: 230 },
  { field: 'nickname', headerName: '닉네임', width: 230 },
  {
    field: 'postId',
    headerName: '게시물 번호',
    width: 230,
  },
  {
    field: 'timestamps',
    headerName: '작성 시기',
    width: 228,
  },
];
const rows = [
  {
    id: 1,
    nickname: 'Snow',
    content: '찾아주셔서 감사합니다!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    postId: '1',
    timestamps: '2023/11/14',
  },
  {
    id: 2,
    nickname: 'Snow',
    content: '찾아주셔서 감사합니다!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    postId: '1',
    timestamps: '2023/11/14',
  },
];

export default function AdminFoundComment() {
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
