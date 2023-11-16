import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';

const columns = [
  { field: 'id', headerName: '게시물 번호', width: 150 },
  { field: 'title', headerName: '제목', width: 230 },
  {
    field: 'age',
    headerName: '종류',
    width: 170,
  },
  { field: 'firstName', headerName: '이메일', width: 250 },
  { field: 'lastName', headerName: '닉네임', width: 200 },
  {
    field: 'date',
    headerName: '작성 시기',
    width: 148,
  },
];

const rows = [
  { id: 1,title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Snow', firstName: 'Jon@gmail.com', age: '에어팟', date: '2023/11/14' },
  { id: 2, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 3, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 4, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Stark', firstName: 'Arya@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 5, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 6, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Melisandre', firstName: 'Rossini@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 7, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Clifford', firstName: 'Ferrara@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 8, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Frances', firstName: 'Rossini@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 9, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 10, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 11, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Snow', firstName: 'Jon@gmail.com', age: '에어팟', date: '2023/11/14' },
  { id: 12, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 13, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: '에어팟', date: '2023/11/14'  },
  { id: 14, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Stark', firstName: 'Arya@gmail.com', age: '지갑', date: '2023/11/14'  },
  { id: 15, title: '에어팟 잃어버렸어요ㅜㅜ ',lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: '에어팟', date: '2023/11/14'  },
];

export default function AdminFoundBoard() {
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
                borderBottom: '0.5px solid black'
            },
          }}
      />
    </div>
  );
}
