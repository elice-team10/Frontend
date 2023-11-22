import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, requireAdmin }) {
  const {
    auth,
    auth: { email, status },
  } = useAuth();
  console.log(auth);
  console.log(email, status);

  // status가 0: 일반회원
  // status가 1: 관리자
  if (!email || (requireAdmin && status !== 0)) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}
