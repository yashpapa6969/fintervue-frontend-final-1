import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";
import { useUser } from "./context/UserProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, setUser } = useUser();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const isInterViewerRotute = location.pathname.includes("/interviewer");

    useEffect(() => {
        const funcToSetIsLoggedIn = async () => {
            const sessionExists = await Session.doesSessionExist();
            setIsLoggedIn(sessionExists);
            if (!sessionExists) {
                setUser({
                    type: "null",
                    user: null,
                });
            }

            setIsLoading(false);
        };

        funcToSetIsLoggedIn();
    }, []);

    if (isLoading)
        return <p className="w-full my-5 text-center text-md">Loading...</p>;

    if (isLoggedIn) {
        if (isInterViewerRotute && user?.type === "interviewer") {
            return children;
        } else if (isInterViewerRotute && user?.type === "interviewee") {
            return <Navigate to="/display" />;
        } else {
            return children;
        }
    } else {
        return <Navigate to="/signup" />;
    }
};

export default ProtectedRoute;

/* 

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
 */
