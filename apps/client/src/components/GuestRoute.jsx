import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

const GuestRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>

    return !user ? <Outlet /> : <Navigate to="/" replace />;
}

export default GuestRoute