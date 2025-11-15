import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-policing-blue">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
