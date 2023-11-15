import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../config/theme';

const columns = [
  { field: 'id', headerName: '댓글 번호', width: 150 },
  { field: 'title', headerName: '제목', width: 350 },
  { field: 'lastName', headerName: '닉네임', width: 250 },
  {
    field: 'age',
    headerName: '게시물 번호',
    width: 230,
  },
  {
    field: 'date',
    headerName: '작성 시기',
    width: 168,
  },
];

const rows = [
  { id: 1, title: '그거 제꺼에요!!!', lastName: 'Snow', firstName: 'Jon@gmail.com', age: 1, date: '2023/11/14' },
  { id: 2, title: '그거 제꺼에요!!!',lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: 41, date: '2023/11/14'  },
  { id: 3, title: '그거 제꺼에요!!!',lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: 31, date: '2023/11/14'  },
  { id: 4, title: '그거 제꺼에요!!!',lastName: 'Stark', firstName: 'Arya@gmail.com', age: 13, date: '2023/11/14'  },
  { id: 5, title: '그거 제꺼에요!!!',lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: 15, date: '2023/11/14'  },
  { id: 6, title: '그거 제꺼에요!!!',lastName: 'Melisandre', firstName: 'Rossini@gmail.com', age: 1, date: '2023/11/14'  },
  { id: 7, title: '그거 제꺼에요!!!',lastName: 'Clifford', firstName: 'Ferrara@gmail.com', age: 10, date: '2023/11/14'  },
  { id: 8, title: '그거 제꺼에요!!!',lastName: 'Frances', firstName: 'Rossini@gmail.com', age: 1, date: '2023/11/14'  },
  { id: 9, title: '그거 제꺼에요!!!',lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: 1, date: '2023/11/14'  },
  { id: 10, title: '그거 제꺼에요!!!',lastName: 'Roxie', firstName: 'Harvey@gmail.com', age: 23, date: '2023/11/14'  },
  { id: 11, title: '그거 제꺼에요!!!',lastName: 'Snow', firstName: 'Jon@gmail.com', age: 451, date: '2023/11/14' },
  { id: 12, title: '그거 제꺼에요!!!',lastName: 'Lannister', firstName: 'Cersei@gmail.com', age: 51, date: '2023/11/14'  },
  { id: 13, title: '그거 제꺼에요!!!',lastName: 'Lannister', firstName: 'Jaime@gmail.com', age: 61, date: '2023/11/14'  },
  { id: 14, title: '그거 제꺼에요!!!',lastName: 'Stark', firstName: 'Arya@gmail.com', age: 31, date: '2023/11/14'  },
  { id: 15, title: '그거 제꺼에요!!!',lastName: 'Targaryen', firstName: 'Daenerys@gmail.com', age: 21, date: '2023/11/14'  },
];

export default function AdminFoundComment() {
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