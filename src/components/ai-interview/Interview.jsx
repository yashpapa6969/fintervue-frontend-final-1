// src/components/ai-interview/Interview.jsx

import {
  Button,
  Card,
  CardBody,
  useToast,
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import SearchBox from "../common/SearchBox";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const mimeType = "video/webm";
const MotionBox = motion(Box);

const Interview = ({ audioOn }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [allDomains] = useState([
    { name: "finance", description: "Finance Engineer" },
    { name: "Rust Developer", description: "Rust Programmer" },
    { name: "Marketing", description: "Marketing Programme" },
    { name: "Business", description: "Business Programme" },
    { name: "Product Manager", description: "Product Management Programme" },
  ]);
  const [transcriptions, setTranscriptions] = useState([]);

  const [searchDomainValue, setSearchDomainValue] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionNo, setQuestionNo] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const hasSpokenRef = useRef(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [audioBlobs, setAudioBlobs] = useState([]);
  const [videoBlobs, setVideoBlobs] = useState([]);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const liveVideoFeed = useRef(null);
  const [stream, setStream] = useState(null);
  const cameraPermissionCalledRef = useRef(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);

  // Load FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
    
      try {
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
          workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
        });
        setLoaded(true);
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
        toast({
          title: "Error",
          description: "Failed to load video processing library.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    
    loadFFmpeg();
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getQuestionsByDomain = async (domainName) => {
    try {
      const encodedDomain = encodeURIComponent(domainName);
      const response = await axios.get(
        `https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/getAIQuestionByDomain/${encodedDomain}`
      );
  
      console.log('API response:', response.data); // Log the API response for debugging
  
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setQuestions(response.data);
      } else {
        setQuestions([]);
        toast({
          title: "No Questions",
          description: "No questions found for the selected domain.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch questions. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };



// Submit final answers as JSON
const submitFinalAnswers = async () => {
  // Prepare the data as JSON
  const data = {
    questions: questions.map((question, index) => ({
      questionText: question.questionText,
      transcription: transcriptions[index],
    })),
  };

  try {
    const response = await axios.post(
      "https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/addAiAnalysis",
      data, // Send data as JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const { ai_analysis_id } = response.data; // Assuming the response contains the analysis_id
      localStorage.setItem("ai_analysis_id", ai_analysis_id);
      toast({
        title: "Success",
        description: "Analysis submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/analysis");
    }
  } catch (error) {
    console.error("Error submitting analysis:", error);
    toast({
      title: "Submission Error",
      description: "Failed to submit analysis.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};


  // Request camera and microphone permissions
  const getCameraPermission = async () => {
    try {
      const videoConstraints = { video: true };
      const audioConstraints = { audio: true };

      // Combine video and audio streams
      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      setStream(combinedStream);

      // Set video feed for live video
      if (liveVideoFeed.current) {
        liveVideoFeed.current.srcObject = videoStream;
      } else {
        console.error("liveVideoFeed.current is null");
      }

      toast({
        title: "Permissions Granted",
        description: "Camera and microphone access granted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Permission denied:", err);
      toast({
        title: "Permissions Denied",
        description: "Camera and microphone access are required for the interview.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Start Recording
  const startRecording = async () => {
    if ("MediaRecorder" in window && stream) {
      try {
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        setRecordingStatus("recording");
        media.start();

        // Initialize recording time
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);

        toast({
          title: "Recording Started",
          description: "Your responses are being recorded.",
          status: "info",
          duration: 2000,
          isClosable: true,
        });

        let localVideoChunks = [];
        media.ondataavailable = (event) => {
          if (event.data.size > 0) {
            localVideoChunks.push(event.data);
          }
        };

        media.onstop = () => {
          clearInterval(timerRef.current);
          const videoBlob = new Blob(localVideoChunks, { type: mimeType });
          const videoUrl = URL.createObjectURL(videoBlob);
          setRecordedVideoBlob(videoBlob);
          setRecordedVideoURL(videoUrl);
          setVideoBlobs((prevBlobs) => [...prevBlobs, videoBlob]);
          saveVideoBlobToLocalStorage(videoBlob);
          toast({
            title: "Recording Stopped",
            description: "Your response has been recorded.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        };
      } catch (error) {
        console.error("Error starting recording:", error);
        toast({
          title: "Recording Error",
          description: "Failed to start recording.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Unsupported",
        description: "MediaRecorder not supported in this browser.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorder.current && recordingStatus === "recording") {
      mediaRecorder.current.stop();
      setRecordingStatus("inactive");
    }
  };

  // Extract Audio from Video
  const extractAudio = async () => {
    if (!recordedVideoBlob) {
      toast({
        title: "No Video Recorded",
        description: "Please record a video before extracting audio.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.webm", await fetchFile(recordedVideoBlob));
      await ffmpeg.exec(["-i", "input.webm", "-vn", "-acodec", "libmp3lame", "-q:a", "2", "output.mp3"]);
      const data = await ffmpeg.readFile("output.mp3");
      const audioBlob = new Blob([data.buffer], { type: "audio/mp3" });
      saveAudioBlobToLocalStorage(audioBlob);
      setAudioBlobs((prevBlobs) => [...prevBlobs, audioBlob]);
      await handleSubmit(audioBlob);
    } catch (error) {
      console.error("Error extracting audio:", error);
      toast({
        title: "Extraction Error",
        description: "Failed to extract audio from the video.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Submit Audio for Transcription
const handleSubmit = async (audioBlob) => {
  if (!audioBlob) {
    toast({
      title: "No Audio Extracted",
      description: "Please record and extract audio before submitting.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }
  
  const formData = new FormData();
  formData.append("audio_file", new File([audioBlob], "audio.mp3", { type: "audio/mp3" }));
  
  try {
    const response = await axios.post("https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/dgProcessAudio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log('Transcription API response:', response.data); // Log the response from the transcription API

    if (response.data && response.data.result) {
      setTranscriptions((prevTranscriptions) => {
        const newTranscriptions = [...prevTranscriptions];
        newTranscriptions[questionNo] = response.data.result;
        return newTranscriptions;
      });
      saveTranscriptionToLocalStorage(response.data.result);
      toast({
        title: "Transcription Completed",
        description: "Your response has been transcribed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      throw new Error("Invalid transcription response"); // Handle cases where the response is not what we expect
    }
  } catch (error) {
    console.error("Error submitting audio file:", error);
    toast({
      title: "Transcription Error",
      description: "Failed to transcribe your response.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};


  // Save Audio Blob to Local Storage
  const saveAudioBlobToLocalStorage = (audioBlob) => {
    const questionKey = `audioBlob_question_${questionNo}`;
    localStorage.setItem(questionKey, URL.createObjectURL(audioBlob));
  };

  // Save Video Blob to Local Storage
  const saveVideoBlobToLocalStorage = (videoBlob) => {
    const videoKey = `videoBlob_question_${questionNo}`;
    const videoURL = URL.createObjectURL(videoBlob);
    localStorage.setItem(videoKey, videoURL);
  };

  // Save Transcription to Local Storage
  const saveTranscriptionToLocalStorage = (transcription) => {
    const transcriptionKey = `transcription_question_${questionNo}`;
    localStorage.setItem(transcriptionKey, JSON.stringify(transcription));
  };

  // Move to Next Question
  const nextQuestion = () => {
    setRecordedVideoBlob(null);
    setRecordedVideoURL(null);
    setQuestionNo((prev) => prev + 1);
  };

  // Handle Speech Synthesis
  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      console.log("AI finished speaking.");
      // Optionally, you can auto-start recording here
    };
    synth.speak(utterance);
  };

  // Manage speaking state
  useEffect(() => {
    hasSpokenRef.current = false;
  }, [questionNo]);

  useEffect(() => {
    if (questions[questionNo]?.questionText && !hasSpokenRef.current && selectedDomain) {
      speak(questions[questionNo].questionText);
      hasSpokenRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, questionNo, selectedDomain]);

  // Manage Speech Synthesis Pause/Resume based on audioOn prop
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      if (!audioOn) {
        synth.pause();
      } else {
        synth.resume();
      }
    }
  }, [audioOn]);

  if (!loaded) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <MotionBox
      className="w-full min-h-[calc(100vh-60px)] mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!selectedDomain ? (
        <MotionBox
          className="flex flex-col items-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Select a Domain
          </Text>
          <SearchBox
            value={searchDomainValue}
            setValue={setSearchDomainValue}
            className="max-w-md mb-6"
          />
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} maxW="800px">
            {allDomains
              .filter((domain) =>
                domain.name.toLowerCase().includes(searchDomainValue.toLowerCase())
              )
              .map((domain, index) => (
                <GridItem key={`domain-${index}`}>
                  <MotionBox
                    whileHover={{ scale: 1.05, boxShadow: "lg" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      cursor="pointer"
                      onClick={() => {
                        setSelectedDomain(domain.name);
                        getQuestionsByDomain(domain.name);
                        getCameraPermission();
                      }}
                      _hover={{ borderColor: "blue.400", borderWidth: "2px" }}
                      transition="border-color 0.3s"
                      borderWidth="1px"
                      borderColor="gray.200"
                      borderRadius="lg"
                      overflow="hidden"
                      height="100%"
                    >
                      <CardBody>
                        <Flex direction="column" align="start">
                          <Text fontSize="xl" fontWeight="semibold" mb={2}>
                            {domain.name}
                          </Text>
                          <Text color="gray.600">{domain.description}</Text>
                        </Flex>
                      </CardBody>
                    </Card>
                  </MotionBox>
                </GridItem>
              ))}
          </Grid>
        </MotionBox>
      ) : (
        <MotionBox
          className="p-6 rounded-xl w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              {selectedDomain} Interview
            </Text>
            <Button
              colorScheme="red"
              onClick={() => {
                // Reset permissions and state
                if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
                }
                navigate("/"); // Redirect to home or another appropriate route
              }}
            >
              Exit Interview
            </Button>
          </Flex>
          <Box mb={4}>
            <Text fontSize="xl" mb={2}>
              {questions[questionNo]?.questionText || <Loading />}
            </Text>
            <Badge colorScheme="purple" variant="subtle">
              Question {questionNo + 1} of {questions.length}
            </Badge>
          </Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Flex gap={4}>
              <Button
                onClick={startRecording}
                colorScheme="green"
                isDisabled={recordingStatus === "recording"}
              >
                Start Recording
              </Button>
              <Button
                onClick={stopRecording}
                colorScheme="red"
                isDisabled={recordingStatus !== "recording"}
              >
                Stop Recording
              </Button>
            </Flex>
            <Flex align="center" gap={2}>
              {recordingStatus === "recording" && (
                <>
                  <Spinner size="sm" color="red.500" />
                  <Text color="red.500">Recording: {recordingTime}s</Text>
                </>
              )}
            </Flex>
            <Button
              onClick={extractAudio}
              colorScheme="purple"
              rightIcon={<ChevronRight />}
              isDisabled={!recordedVideoBlob}
            >
              Submit
            </Button>
          </Flex>
          {recordingStatus === "recording" && (
            <Box mb={4}>
              <Text color="red.500">Recording in progress...</Text>
            </Box>
          )}
          {recordedVideoURL && (
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Recorded Video
              </Text>
              <video src={recordedVideoURL} controls className="w-full max-w-xl rounded-md shadow-lg" />
            </Box>
          )}
          {transcriptions[questionNo]?.length > 0 && (
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Transcription
              </Text>
              <Box maxH="200px" overflowY="auto" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                {transcriptions[questionNo].map((item, index) => (
                  <Box key={index} mb={2}>
                    <Text fontSize="sm" color="purple.600">
                      Start: {item.Start}, End: {item.End}
                    </Text>
                    <Text>
                      <strong
                        className={`${
                          (index + 1) % 2 === 0 ? "text-purple-400" : "text-purple-500"
                        }`}
                      >
                      </strong>{" "}
                      {item.Text}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          <Flex justify="flex-end" mt={4}>
            {questions.length === questionNo + 1 ? (
              <Button colorScheme="purple" onClick={submitFinalAnswers}>
                Submit Final Answers
              </Button>
            ) : transcriptions[questionNo]?.length > 0 ? (
              <Button colorScheme="blue" onClick={nextQuestion}>
                Next Question
              </Button>
            ) : null}
          </Flex>
          {/* Live Video Feed */}
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Live Video Feed
            </Text>
            <video
              ref={liveVideoFeed}
              autoPlay
              muted
              className="w-full max-w-xl rounded-md shadow-lg"
              style={{ border: "2px solid #E2E8F0" }}
            ></video>
          </Box>
        </MotionBox>
      )}
    </MotionBox>
  );
};

export default Interview;
