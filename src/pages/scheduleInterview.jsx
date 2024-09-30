import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Text,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Grid,
  Center,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays } from 'date-fns';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const timeSlots = ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];

function ScheduleInterviewForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [interviewee_id, setIntervieweeId] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const intervieweeData = localStorage.getItem('interviewee');
    const interviewee = intervieweeData ? JSON.parse(intervieweeData) : null;
    const id = interviewee ? interviewee.interviewee_id : null;
    setIntervieweeId(id);

    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
    // Replace this with actual API call
    const dummyAvailableDates = [
      new Date(2024, 8, 15),
      new Date(2024, 8, 16),
      new Date(2024, 8, 17),
      new Date(2024, 8, 20),
      new Date(2024, 8, 21),
    ];
    setAvailableDates(dummyAvailableDates);
  };

  const fetchAvailableTimes = async (date) => {
    // Replace this with actual API call
    const dummyAvailableTimes = ['9:00 AM', '3:00 PM', '6:00 PM'];
    setAvailableTimes(dummyAvailableTimes);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAvailableTimes(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    // ... (rest of the handleSubmit function remains the same)
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = addDays(monthStart, -1);
    const endDate = addDays(monthEnd, 7);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(cloneDay, dateFormat);
        const isAvailable = availableDates.some(d => isSameDay(d, cloneDay));
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        days.push(
          <MotionBox
            key={day}
            onClick={() => isAvailable && handleDateClick(cloneDay)}
            style={{
              opacity: !isSameMonth(day, monthStart) || !isAvailable ? 0.3 : 1,
              borderRadius: "full",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isAvailable ? "pointer" : "default",
              position: "relative",
            }}
            whileHover={isAvailable ? { scale: 1.1 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              borderRadius="full"
              border={isSelected ? "2px solid" : "none"}
              borderColor="blue.700"
            />
            <Text
              color={isSelected ? "blue.700" : "inherit"}
              fontWeight={isSelected ? "bold" : "normal"}
            >
              {formattedDate}
            </Text>
          </MotionBox>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Flex key={day} justify="space-between">
          {days}
        </Flex>
      );
      days = [];
    }
    return <VStack spacing={2}>{rows}</VStack>;
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth="800px"
      width="90%"
      mx="auto"
      my={20}
      p={8}
      bg="white"
      boxShadow="xl"
      borderRadius="xl"
      border="2px solid"
      borderColor="blue.700"
    >
      <MotionText
        as="h2"
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        mb={8}
        color="blue.700"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        Schedule an Interview
      </MotionText>

      <Grid templateColumns="1fr 1fr" gap={8}>
        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4} color="blue.700">Select Date</Text>
          <Flex justify="space-between" align="center" mb={4}>
            <MotionBox
              as={ChevronLeftIcon}
              cursor="pointer"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
            <Text fontWeight="bold" color="blue.700">{format(currentMonth, 'MMMM yyyy')}</Text>
            <MotionBox
              as={ChevronRightIcon}
              cursor="pointer"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          </Flex>
          {renderCalendar()}
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4} color="blue.700">Select Time</Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {timeSlots.map((time) => (
              <MotionBox
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => availableTimes.includes(time) && handleTimeClick(time)}
                bg={selectedTime === time ? "blue.700" : "gray.100"}
                color={selectedTime === time ? "white" : "black"}
                p={3}
                borderRadius="md"
                textAlign="center"
                cursor={availableTimes.includes(time) ? "pointer" : "not-allowed"}
                opacity={availableTimes.includes(time) ? 1 : 0.5}
                transition="all 0.2s"
              >
                {time}
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Grid>

      <AnimatePresence>
        {(selectedDate || selectedTime) && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            mt={6}
            p={4}
            bg="blue.50"
            borderRadius="md"
          >
            <Text fontWeight="bold" color="blue.700">Selected:</Text>
            {selectedDate && (
              <Text>Date: {format(selectedDate, 'MMMM d, yyyy')}</Text>
            )}
            {selectedTime && (
              <Text>Time: {selectedTime}</Text>
            )}
          </MotionBox>
        )}
      </AnimatePresence>

      <Center mt={8}>
        <MotionBox
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Scheduling..."
            size="lg"
            bg="blue.700"
            color="white"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.800" }}
            rightIcon={<ChevronRightIcon />}
          >
            Schedule Interview
          </Button>
        </MotionBox>
      </Center>

      {message && (
        <MotionFlex
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          mt={6}
        >
          <Alert status={severity} borderRadius="md">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>{severity === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Box>
          </Alert>
        </MotionFlex>
      )}
    </MotionBox>
  );
}

function Footer() {
  return (
    <Box as="footer" mt={12} py={6} bg="blue.700" color="white" textAlign="center">
      <Text>&copy; 2024 Interview Scheduler. All rights reserved.</Text>
    </Box>
  );
}

function ScheduleInterviewPage() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Box flex={1}>
        <ScheduleInterviewForm />
      </Box>
      <Footer />
    </Box>
  );
}

export default ScheduleInterviewPage;



/*// ScheduleInterviewForm.jsx
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
        'https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/createInterviewRequest',

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

export default ScheduleInterviewForm;*/