import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';

const columns = [
  { field: 'id', headerName: '회원 번호', width: 200 },
  { field: 'firstName', headerName: '이메일', width: 320 },
  { field: 'lastName', headerName: '닉네임', width: 250 },
  {
    field: 'age',
    headerName: '현재 상태',
    width: 250,
  },
  {
    field: 'date',
    headerName: '가입 시기',
    width: 200,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon@gmail.com', age: '일반회원', date: '2023/11/14' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 4, lastName: 'Stark', firstName: 'Arya@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 6, lastName: 'Melisandre', firstName: 'Rossini@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 8, lastName: 'Frances', firstName: 'Rossini@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 11, lastName: 'Snow', firstName: 'Jon@gmail.com', age: '일반회원', date: '2023/11/14' },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 14, lastName: 'Stark', firstName: 'Arya@gmail.com', age: '일반회원', date: '2023/11/14'  },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: '일반회원', date: '2023/11/14'  },
];

export default function AdminUser() {
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
