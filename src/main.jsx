import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';
import SearchResult from './pages/SearchResult.jsx';
import { Provider } from "react-redux";
import store from './store';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import MyPage from './pages/MyPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/search/result',
        element: <SearchResult />,
      },
      { path: '/login', element: <Login /> },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />,
      },
      { path: '/mypage', element: <MyPage /> },
      {
        path: '/changepassword',
        element: <ChangePassword />,
      },
      {
        path: '/community/board',
        // element: <CommunityBoard />,
      },
      {
        path: '/community/detail',
        // element: <CommunityDetail />,
      },
      {
        path: '/community/write',
        // element: <CommunityWrite />,
      },
      { path: '/admin', element: <Admin /> },
      // ... 다른 컴포넌트들
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
