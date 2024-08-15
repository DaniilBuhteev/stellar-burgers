import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserIsCheck } from '../../services/slices/user/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const userIsCheck = useSelector(selectUserIsCheck);
  const location = useLocation();

  if (!onlyUnAuth && !userIsCheck) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userIsCheck) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }
  return children;
};
