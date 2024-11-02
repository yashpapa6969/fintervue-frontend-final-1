import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresNoAuth = false }) => {
  const interviewee = JSON.parse(localStorage.getItem('interviewee'));
  const interviewer = JSON.parse(localStorage.getItem('interviewer'));

  // Determine if interviewee or interviewer is valid
  const isValidInterviewee = interviewee !== null && interviewee !== undefined;
  const isValidInterviewer = interviewer !== null && interviewer !== undefined;

  // Redirect to signup if neither user is valid and route requires authentication
  if (!isValidInterviewee && !isValidInterviewer && !requiresNoAuth) {
    return <Navigate to="/signup" replace />;
  }

  // Extract IDs and set userId based on user type
  const intervieweeId = interviewee?.interviewee_id;
  const interviewerId = interviewer?.interviewer_id;
  const userId = intervieweeId || interviewerId;

  // Store userId and userType in localStorage
  localStorage.setItem('userId', userId || '');
  if (intervieweeId) {
    localStorage.setItem('userType', 'interviewee');
  } else if (interviewerId) {
    localStorage.setItem('userType', 'interviewer');
  }

  // If route requires no authentication but user is logged in, redirect based on userType
  if (requiresNoAuth && userId) {
    const userType = localStorage.getItem('userType');
    if (userType === 'interviewee') {
      return <Navigate to="/display" replace />;
    }
    if (userType === 'interviewer') {
      return <Navigate to="/pendingInterviews" replace />;
    }
  }

  // Redirect to login if userId is not set and path requires authentication
  if (!userId) {
    const currentPath = window.location.pathname;
    localStorage.setItem('redirectPath', currentPath);

    if (currentPath.includes('/interviewer')) {
      return <Navigate to="/login/interviewer" replace />;
    }
    return <Navigate to="/login/candidate" replace />;
  }

  // Redirect if user tries to access a route not permitted for their userType
  const userType = localStorage.getItem('userType');
  const currentPath = window.location.pathname;
  const isInterviewerRoute = currentPath.includes('/interviewer');

  if (userType === 'interviewer' && !isInterviewerRoute) {
    return <Navigate to="/pendingInterviews" replace />;
  }
  if (userType === 'interviewee' && isInterviewerRoute) {
    return <Navigate to="/display" replace />;
  }

  // Render children if all checks pass
  return children;
};

export default ProtectedRoute;
