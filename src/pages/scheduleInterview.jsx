import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Text,
  VStack,
  Grid,
  Flex,
  Container,
  Heading,
  IconButton,
  useToast,
  HStack,
  Icon,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from '@chakra-ui/icons';
import { MdOutlineAccessTime, MdPersonOutline, MdCalendarToday, MdOutlineVideoCall } from 'react-icons/md';
import { motion } from 'framer-motion';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay 
} from 'date-fns';
import Logo from "../assests/logo/logo.png";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionFlex = motion(Flex);

const BLUE_700 = "#1d4ed8";

const Navbar = () => (
  <Box bg="white" py={4} borderBottom="1px" borderColor="gray.100" position="fixed" top={0} width="100%" zIndex={10}>
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
      <a href="/home">
        <img src={Logo} alt="Logo" className="cursor-pointer w-40 h-auto md:w-60" />
      </a>
        <Button color={BLUE_700} variant="ghost">
          <a href="/home">Home</a>
        </Button>
      </Flex>
    </Container>
  </Box>
);

const Footer = () => (
  <Box bg="gray.50" py={8} borderTop="1px" borderColor="gray.200">
    <Container maxW="container.xl">
      <VStack spacing={4}>
        <HStack spacing={4} color={BLUE_700}>
          <Icon as={MdOutlineVideoCall} w={6} h={6} />
        </HStack>
        <Text color="gray.600">&copy; {new Date().getFullYear()} Fintervue. All rights reserved.</Text>
      </VStack>
    </Container>
  </Box>
);

function ScheduleInterviewForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
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
    const dummyAvailableTimes = ['9:00 AM', '3:00 PM', '6:00 PM'];
    setAvailableTimes(dummyAvailableTimes);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAvailableTimes(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select both date and time.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const dateTimeString = `${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`;
      const response = await axios.post(
        'https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/createInterviewRequest',
        {
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
        }
      );

      toast({
        title: "Interview Scheduled",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/display');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <Grid templateColumns="repeat(7, 1fr)" gap={3}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <Text key={day} textAlign="center" fontWeight="bold" color="gray.500" fontSize="sm">
            {day}
          </Text>
        ))}
        {days.map((day) => {
          const isAvailable = availableDates.some(d => isSameDay(d, day));
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <MotionBox
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              p={2} // Reduced padding for mobile
              borderRadius="xl"
              bg={isSelected ? "blue.700" : isAvailable ? "blue.50" : "gray.50"}
              cursor={isAvailable ? "pointer" : "not-allowed"}
              onClick={() => isAvailable && handleDateClick(day)}
              textAlign="center"
              boxShadow={isSelected ? "lg" : "none"}
              transition="all 0.2s"
            >
              <Text 
                color={isSelected ? "white" : isAvailable ? "blue.700" : "gray.400"}
                fontWeight={isSelected || isAvailable ? "bold" : "normal"}
              >
                {format(day, "d")}
              </Text>
            </MotionBox>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box minH="100vh" bg="gray.50" pt={32} pb={20}>
      <Container maxW="container.xl">
        <MotionFlex
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          direction={{ base: "column", lg: "row" }} // Switch direction for mobile
          gap={10}
        >
          {/* Description Section */}
          <VStack flex="1" align="flex-start" spacing={6}>
            <Heading size="xl" color={BLUE_700} textAlign={{ base: "center", lg: "left" }}>
              Schedule Your Interview
            </Heading>
            <Text fontSize="md" color="gray.600" lineHeight="tall" textAlign={{ base: "center", lg: "left" }}>
              Get ready for a seamless interview experience with our AI-powered platform.
            </Text>
            <Box bg="blue.50" p={4} borderRadius="xl" width="full">
              <VStack align="flex-start" spacing={4}>
                <HStack spacing={4}>
                  <Icon as={MdOutlineVideoCall} w={6} h={6} color={BLUE_700} />
                  <Text fontSize="lg" color={BLUE_700}>AI-Powered Video Interview</Text>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={MdOutlineAccessTime} w={6} h={6} color={BLUE_700} />
                  <Text fontSize="lg" color={BLUE_700}>30-Minute Session</Text>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={MdPersonOutline} w={6} h={6} color={BLUE_700} />
                  <Text fontSize="lg" color={BLUE_700}>One-on-One Format</Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Calendar Section */}
          <Box flex="1.2" bg="white" p={6} borderRadius="2xl" boxShadow="xl">
            <VStack spacing={6} align="stretch">
              {/* Date Selection */}
              <Box>
                <HStack justify="space-between" mb={6}>
                  <Heading size="md" color={BLUE_700}>Select Date</Heading>
                  <HStack>
                    <IconButton
                      aria-label="Previous Month"
                      icon={<ChevronLeftIcon />}
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      size="lg"
                      color={BLUE_700}
                      variant="ghost"
                    />
                    <Text fontSize="lg" fontWeight="bold" color={BLUE_700}>
                      {format(currentMonth, 'MMMM yyyy')}
                    </Text>
                    <IconButton
                      aria-label="Next Month"
                      icon={<ChevronRightIcon />}
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      size="lg"
                      color={BLUE_700}
                      variant="ghost"
                    />
                  </HStack>
                </HStack>
                {renderCalendar()}
              </Box>

              {/* Time Selection */}
              <Box>
                <Heading size="md" mb={6} color={BLUE_700}>Select Time</Heading>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                  {timeSlots.map((time) => (
                    <MotionButton
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      size="md" // Adjust button size for mobile
                      variant={selectedTime === time ? "solid" : "outline"}
                      bg={selectedTime === time ? BLUE_700 : "transparent"}
                      color={selectedTime === time ? "white" : BLUE_700}
                      borderColor={BLUE_700}
                      onClick={() => availableTimes.includes(time) && handleTimeClick(time)}
                      isDisabled={!availableTimes.includes(time)}
                      leftIcon={<TimeIcon />}
                      _hover={{
                        bg: selectedTime === time ? BLUE_700 : `${BLUE_700}10`,
                      }}
                    >
                      {time}
                    </MotionButton>
                  ))}
                </Grid>
              </Box>

              {/* Schedule Button */}
              <MotionButton
                size="lg"
                bg={BLUE_700}
                color="white"
                isLoading={loading}
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                height="60px"
                fontSize="lg"
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  bg: "#1e40af",
                  boxShadow: "xl",
                }}
              >
                Schedule Interview
              </MotionButton>
            </VStack>
          </Box>
        </MotionFlex>
      </Container>
    </Box>
  );
}

export default function ScheduleInterviewPage() {
  return (
    <Box>
      <Navbar />
      <Box as="main" pt={10}>
        <ScheduleInterviewForm />
      </Box>
      <Footer />
    </Box>
  );
}
