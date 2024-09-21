import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpcomingInterviews() {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null); // State for user role
  const [userId, setUserId] = useState(null);     // State for user ID

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const intervieweeData = localStorage.getItem('interviewee');
    const interviewerData = localStorage.getItem('interviewer');
    
    if (intervieweeData) {
      const interviewee = JSON.parse(intervieweeData);
      setUserRole('interviewee');
      setUserId(interviewee.interviewee_id);  // Ensure you're accessing correct keys
      console.log('Interviewee data:', interviewee);
    } else if (interviewerData) {
      const interviewer = JSON.parse(interviewerData);
      setUserRole('interviewer');
      setUserId(interviewer.interviewer_id);  // Ensure you're accessing correct keys
      console.log('Interviewer data:', interviewer);
    } else {
      // If neither, redirect to login
      navigate('/login');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    // Call fetchUpcomingInterviews only after userRole and userId are set
    if (userRole && userId) {
      fetchUpcomingInterviews();
    }
  }, [userRole, userId]);

  const fetchUpcomingInterviews = async () => {
    try {
      console.log('UserRole:', userRole);
      console.log('UserId:', userId);

      const payload = {
        interviewer_id: userRole === 'interviewer' ? userId : null,
        interviewee_id: userRole === 'interviewee' ? userId : null,
      };
  
      console.log('Payload being sent:', payload);  // Debugging: Check the payload
  
      const endpoint = `http://localhost:2000/api/interviewee/getAcceptedInterviews`;
  
      // Send a POST request with the payload
      const response = await axios.post(endpoint, payload);
      setUpcomingInterviews(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching upcoming interviews:', err);
      setError('Failed to load upcoming interviews.');
      setLoading(false);
    }
  };

  const joinInterview = (interview) => {
    let userName = '';
    let role = userRole;  // Get the role from the current userRole
  
    if (role === 'interviewee') {
      userName = 'Interviewee'; // Fetch actual name if available
    } else if (role === 'interviewer') {
      userName = 'Interviewer'; // Fetch actual name if available
    }
  
    // Construct the URL with role and scheduleId as query parameters
    const interviewUrl = `/finalInterviewPage?role=${role}&scheduleId=${interview.schedule_id}&userName=${userName}`;
  
    // Navigate to the InterviewPage with role and scheduleId in the URL
    navigate(interviewUrl);
  };
  

  if (loading) {
    return <div className="text-center mt-10">Loading upcoming interviews...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-8">Upcoming Interviews</h2>
        {upcomingInterviews.length === 0 ? (
          <p className="text-center">No upcoming interviews scheduled.</p>
        ) : (
          <ul>
            {upcomingInterviews.map((interview) => (
              <li
                key={interview._id}
                className="mb-6 p-4 border rounded-md hover:bg-gray-50 transition"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <p>
                      <strong>Interviewee ID:</strong> {interview.interviewee_id}
                    </p>
                    <p>
                      <strong>Date:</strong> {interview.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {interview.time}
                    </p>
                  </div>
                  <button
                    onClick={() => joinInterview(interview)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Join Call
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UpcomingInterviews;
