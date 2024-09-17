import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const AuthGuard = () => {
  const { userAuth } = useAuth();
  return userAuth ? <Outlet /> : <Navigate to="/" />;
};
