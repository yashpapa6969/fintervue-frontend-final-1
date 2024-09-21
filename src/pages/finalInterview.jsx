import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoConferenceWrapper from '../components/common/VideoConference';
import axios from 'axios';

function FinalInterviewPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const scheduleId = searchParams.get('scheduleId');
  const userName = searchParams.get('userName');

  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch interview details based on scheduleId
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await axios.get(`https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/getByScheduleId/${scheduleId}`);
        const interviewData = response.data;
        
        // Set the authToken based on the role (either 'auth_interviewee' or 'auth_interviewer')
        if (role === 'interviewee') {
          setAuthToken(interviewData.auth_interviewee);
        } else if (role === 'interviewer') {
          setAuthToken(interviewData.auth_interviewer);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching interview details:', err);
        setError('Failed to fetch interview details.');
        setLoading(false);
      }
    };

    if (scheduleId) {
      fetchInterviewDetails();
    }
  }, [scheduleId, role]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !authToken || !role || !userName) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 text-red-800 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error || 'Missing necessary information to join the interview. Please try again.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass the authToken, role, and userName to the VideoConferenceWrapper */}
      <VideoConferenceWrapper authToken={authToken} role={role} userName={userName} />
    </div>
  );
}

export default FinalInterviewPage;
