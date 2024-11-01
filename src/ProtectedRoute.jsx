import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('userId'); // Or however you store auth state
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login/candidate" replace />;
  }

  return children;
};

export default ProtectedRoute; 