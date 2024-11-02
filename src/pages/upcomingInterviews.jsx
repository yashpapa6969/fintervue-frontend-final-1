import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Peer from './Peer';
import config from "../config";

import { useHMSActions, useHMSStore, selectPeers, selectIsConnectedToRoom } from '@100mslive/react-sdk';
function UpcomingInterviews() {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const navigate = useNavigate();
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const storedUserData = JSON.parse(localStorage.getItem(userType) || '{}');
    
    setUserData(storedUserData);
    
    if (userType === "interviewer") {
      setUserId(storedUserData.interviewer_id);
      console.log('Interviewer data:', storedUserData);
    } else if (userType === "interviewee") {
      setUserId(storedUserData.interviewee_id);
      console.log('Interviewee data:', storedUserData);
    }
  }, []);

  useEffect(() => {
    if (userData && userId) {
      fetchUpcomingInterviews();
    }
  }, [userData, userId]);

  const fetchUpcomingInterviews = async () => {
    try {
      const userType = localStorage.getItem('userType');
      
      const payload = {
        interviewer_id: userType === 'interviewer' ? userId : null,
        interviewee_id: userType === 'interviewee' ? userId : null,
      };

      console.log('Payload being sent:', payload);

      const endpoint = `${config.apiBaseUrl}/api/interviewee/getAcceptedInterviews`;
      const response = await axios.post(endpoint, payload);
      setUpcomingInterviews(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching upcoming interviews:', err);
      setError('Failed to load upcoming interviews.');
      setLoading(false);
    }
  };

  const joinInterview = async (interview) => {
    const userType = localStorage.getItem('userType');
    let userName = userType === 'interviewee' ? 'Interviewee' : 'Interviewer';
    let authToken = userType === 'interviewee' ? interview.auth_interviewee : interview.auth_interviewer;

    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);


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
          isConnected ? (
            <div>
              <div className="peers-container">
                {peers.map((peer) => (
                  <Peer key={peer.id} peer={peer} />
                ))}
              </div>
            </div>
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
          )
        )}
      </div>
    </div>
  );
}

export default UpcomingInterviews;
