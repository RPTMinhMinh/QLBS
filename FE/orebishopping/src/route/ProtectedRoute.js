import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../service/AuthService';

const ProtectedRoute = ({ roles }) => {
  const { user, decode } = useAuth();

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Kiểm tra xem người dùng có quyền truy cập hay không
  if (roles && roles.length > 0) {
    const userRoles = decode()?.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" />;
    }
  }

  // Nếu người dùng có quyền, render các component con
  return <Outlet />;
};

export default ProtectedRoute;