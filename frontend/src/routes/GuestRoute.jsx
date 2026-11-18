import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/atoms/Spinner';

export default function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner fullscreen />;
  return user ? <Navigate to="/tasks" replace /> : <Outlet />;
}
