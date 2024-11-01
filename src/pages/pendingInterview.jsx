import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import config from "../config";

function PendingInterviews() {
  const [pendingInterviews, setPendingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acceptError, setAcceptError] = useState('');
  const navigate = useNavigate();

  const authHeader = useAuthHeader()
  const interviewerId = useAuthUser().uid;

  useEffect(()=>{
    fetchPendingInterviews()
  },[interviewerId])
  
  const fetchPendingInterviews = async () => {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/api/interviewee/getAllScheduledInterview`,{
          headers: {
            Authorization: authHeader, 
          },
        }
      );
      setPendingInterviews(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pending interviews:', err);
      setError('Failed to load pending interviews.');
      setLoading(false);
    }
  };

  const acceptInterview = async (interviewId) => {
    try {
      await axios.post(
        `${config.apiBaseUrl}/api/interviewee/acceptInterviewRequest`,
        {
          interviewer_id: interviewerId,
          interviewee_id: interviewId,
        }
      );
      // Update the list after accepting
      setPendingInterviews((prev) =>
        prev.filter((interview) => interview._id !== interviewId)
      );
    } catch (err) {
      console.error('Error accepting interview:', err);
      setAcceptError('Failed to accept the interview.');
    }
  };

  if (loading) {
    return <div>Loading pending interviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Pending Interview Requests
      </h2>
      {acceptError && (
        <div className="text-red-500 mb-4 text-center">{acceptError}</div>
      )}
      {pendingInterviews.length === 0 ? (
        <p>No pending interviews at the moment.</p>
      ) : (
        <ul>
          {pendingInterviews.map((interview) => (
            <li key={interview._id} className="mb-4 p-4 border rounded-md">
              <p>
                <strong>Interviewee ID:</strong> {interview.interviewee_id}
              </p>
              <p>
                <strong>Date and Time:</strong>{' '}
                {new Date(
                  `${interview.date}T${interview.time}`
                ).toLocaleString()}
              </p>
              <button
                onClick={() => acceptInterview(interview.interviewee_id)}
                className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
              >
                Accept Interview
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {/* Button to navigate to Upcoming Interviews */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/upcomingInterviews')}
          className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Go to Upcoming Interviews
        </button>
      </div>
    </div>
  );
}

export default PendingInterviews;
