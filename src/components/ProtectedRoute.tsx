import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePlan?: boolean;
}

export default function ProtectedRoute({ children, requirePlan = false }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const hasPlan = !!localStorage.getItem('plan_purchased');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requirePlan && !hasPlan) {
    return <Navigate to="/payment" replace />;
  }

  return <>{children}</>;
}
