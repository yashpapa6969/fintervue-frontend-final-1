import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresNoAuth = false }) => {
  const interviewee = JSON.parse(localStorage.getItem('interviewee'));
  const interviewer = JSON.parse(localStorage.getItem('interviewer'));

  const intervieweeId = interviewee?.interviewee_id;
  const interviewerId = interviewer?.interviewer_id;
  
  // Set userId based on which type of user is logged in
  const userId = intervieweeId || interviewerId;
  localStorage.setItem('userId', userId || '');

  if (requiresNoAuth && userId) {
    const userType = localStorage.getItem('userType');
    if (userType === 'interviewee') {
      return <Navigate to="/display" replace />;
    }
    if (userType === 'interviewer') {
      return <Navigate to="/pendingInterviews" replace />;
    }
  }

  // Store the user type in localStorage for future reference
  if (intervieweeId) {
    localStorage.setItem('userType', 'interviewee');
  } else if (interviewerId) {
    localStorage.setItem('userType', 'interviewer');
  }
  
  if (!userId) {
    const currentPath = window.location.pathname;
    localStorage.setItem('redirectPath', currentPath);
    
    if (currentPath.includes('/interviewer')) {
      return <Navigate to="/login/interviewer" replace />;
    }
    return <Navigate to="/login/candidate" replace />;
  }

  const userType = localStorage.getItem('userType');
  
  const currentPath = window.location.pathname;
  const isInterviewerRoute = currentPath.includes('/interviewer');
  const isIntervieweeRoute = currentPath.includes('/interviewee');

  // Redirect if user tries to access wrong route type
  if (userType === 'interviewer' && isIntervieweeRoute) {
    return <Navigate to="/pendingInterviews" replace />;
  }
  if (userType === 'interviewee' && isInterviewerRoute) {
    return <Navigate to="/display" replace />;
  }

  return children;
};

export default ProtectedRoute; 