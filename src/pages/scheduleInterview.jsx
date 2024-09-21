// ScheduleInterviewForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ScheduleInterviewForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [interviewee_id, setIntervieweeId] = useState(null);

  const navigate = useNavigate();

  // Fetch interviewee_id from local storage when the component mounts
  useEffect(() => {
    const intervieweeData = localStorage.getItem('interviewee');
    const interviewee = intervieweeData ? JSON.parse(intervieweeData) : null;
    const id = interviewee ? interviewee.interviewee_id : null;
    setIntervieweeId(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if interviewee_id is available
    if (!interviewee_id) {
      setSeverity('error');
      setMessage('Please log in to schedule an interview.');
      return;
    }

    if (!date || !time) {
      setSeverity('warning');
      setMessage('Please select both date and time.');
      return;
    }

    try {
      setLoading(true);
      // Combine date and time into a single DateTime string
      const dateTimeString = `${date}T${time}`;
      const dateTime = new Date(dateTimeString);

      const response = await axios.post(
        //'https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/createInterviewRequest',
        'http://localhost:2000/api/interviewee/createInterviewRequest',

        {
          interviewee_id,
          date,
          time,

        }
      );

      setSeverity('success');
      setMessage(response.data.message);
      // Reset form fields
      setDate('');
      setTime('');

      // Navigate to the display page after successful scheduling
      navigate('/display'); // Replace '/display' with your actual route
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setSeverity('error');
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage('An error occurred while scheduling the interview.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Schedule an Interview
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setDate(e.target.value);
              setMessage('');
            }}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
            Select Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setMessage('');
            }}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Scheduling...' : 'Schedule Interview'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 p-4 rounded-md text-center ${
            severity === 'success'
              ? 'bg-green-100 text-green-800'
              : severity === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default ScheduleInterviewForm;
