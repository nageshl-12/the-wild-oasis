import { Navigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return (
      <div className="w-full backdrop-blur-xs h-dvh flex justify-center items-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
