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
import CommunityBoard from './components/Community/CommunityBoard.jsx';
import CommunityDetail from './components/Community/CommunityDetail.jsx';
import CommunityWrite from './components/Community/CommunityWrite.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ForgotPassword from './pages/ForgotPassword.jsx';
import MyPage from './pages/MyPage.jsx';
import Chat from './pages/Chat';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import SearchResult from './pages/SearchResult.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/search',
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
      {
        path: '/mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/community',
        element: <CommunityBoard />,
      },
      {
        path: '/community/post',
        element: <CommunityDetail />,
      },
      {
        path: '/community/post/:id',
        element: <CommunityDetail />,
      },
      {
        path: '/community/write',
        element: <CommunityWrite />,
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      { path: '/mypage', element: <MyPage /> },
      { path: '/admin', element: <Admin /> },
      { path: '/chat', element: <Chat /> },
      // ... 다른 컴포넌트들
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
