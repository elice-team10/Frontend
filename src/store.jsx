import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : [
    { id: 1, email: 'Jon@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14' },
    { id: 2, email: 'Cersei@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 3, email: 'Jaime@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 4, email: 'Arya@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 5, email: 'Daenerys@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 6, email: 'Rossini@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 7, email: 'Ferrara@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 8, email: 'Rossini@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 9, email: 'Harvey@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 10, email: 'Harvey@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 11, email: 'Jon@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14' },
    { id: 12, email: 'Cersei@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 13, email: 'Jaime@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 14, email: 'Arya@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
    { id: 15, email: 'Daenerys@gmail.com', nickname: 'Snow', age: '일반회원', date: '2023/11/14'  },
  ]
})



export default configureStore({
  reducer: {
    user : user.reducer
  }
}) 