import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { auth } = useAuth();

  // status가 0: 관리자
  // status가 1: 일반회원
  if (!auth?.email || (requireAdmin && auth?.status !== 0)) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}
