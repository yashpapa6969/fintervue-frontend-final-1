import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoConferenceWrapper from '../components/common/VideoConference';
import axios from 'axios';
import Conference from './Conference';
import config from '../config';

function FinalInterviewPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const scheduleId = searchParams.get('scheduleId');
  const userName = searchParams.get('userName');

  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/interviewee/getByScheduleId/${scheduleId}`);
        const interviewData = response.data;
        
        if (role === 'interviewee') {
          setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmZhM2EyZTQ5NDRmMDY3MzEzYTdhZTgiLCJyb2xlIjoiZ3Vlc3QiLCJyb29tX2lkIjoiNjZmYTY4MDIwYWZjZDdjNDk3M2MxMWE3IiwidXNlcl9pZCI6IjUyNjYzN2NmLTc5ZWUtNGJkZC1iMWY2LTQ3YjEwMjI3YmExYSIsImV4cCI6MTcyNzc3NTg1NywianRpIjoiODVjNGQyODktOTQ0Yy00NTg1LWI2Y2UtM2NhMGUwOTZjNjMzIiwiaWF0IjoxNzI3Njg5NDU3LCJpc3MiOiI2NmZhM2EyZTQ5NDRmMDY3MzEzYTdhZTYiLCJuYmYiOjE3Mjc2ODk0NTcsInN1YiI6ImFwaSJ9.JKpnzp43r7gDTDehCERpRo4G6DHxXnGTj7qzmPij06Y");
        } else if (role === 'interviewer') {
          setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmZhM2EyZTQ5NDRmMDY3MzEzYTdhZTgiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NmZhNjgwMjBhZmNkN2M0OTczYzExYTciLCJ1c2VyX2lkIjoiMTZkNTBhN2YtZDUyNi00MzRiLTkwOTAtZTBkMjJjNTViNWU0IiwiZXhwIjoxNzI3Nzc1OTA3LCJqdGkiOiI3N2EwNzZjMS1hMDUxLTQwMGUtODZhYi00MDJlM2FhNDY1MTIiLCJpYXQiOjE3Mjc2ODk1MDcsImlzcyI6IjY2ZmEzYTJlNDk0NGYwNjczMTNhN2FlNiIsIm5iZiI6MTcyNzY4OTUwNywic3ViIjoiYXBpIn0.fm-2KtqLQAUrkIBEPNk__z9wrawjcAQ2DOvpJQbDhRQ");
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
      <Conference/>
    </div>
  );
}

export default FinalInterviewPage;
