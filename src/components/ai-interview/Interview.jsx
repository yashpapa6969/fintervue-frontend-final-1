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
import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import Loading from "../Loading";
import SearchBox from "../common/SearchBox";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RecordRTC from "recordrtc";


// Updated MIME type dynamically based on browser compatibility
const getSupportedMimeType = () => {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4'
  ];

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return 'video/webm'; // Fallback
};

const mimeType = getSupportedMimeType();

const MotionBox = motion(Box);

const Interview = ({ audioOn, questions: initialQuestions, selectedDomain }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [questions] = useState(initialQuestions);
  const [transcriptions, setTranscriptions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
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
  const [currentAction, setCurrentAction] = useState("record");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State variables to track tab and window switches
  const [tabChangeCount, setTabChangeCount] = useState(0);
  const [windowBlurCount, setWindowBlurCount] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState({
    camera: false,
    microphone: false
  });

  // Add a flag to prevent duplicate transcriptions
  const transcriptionInProgressRef = useRef(false);

  // Add debounce timeout ref
  const transcriptionDebounceRef = useRef(null);
  
  // Add last transcription timestamp to prevent duplicates
  const lastTranscriptionTimeRef = useRef(null);

  // Add a ref to track TTS status
  const ttsInProgressRef = useRef(false);

  // Load FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;

      try {
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
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
  }, [stream, toast]);

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setTabChangeCount((prevCount) => prevCount + 1);
        toast({
          title: "Tab Switch Detected",
          description: "Switching tabs is not allowed during the interview.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toast]);

  // Window blur detection
  useEffect(() => {
    const handleWindowBlur = () => {
      setWindowBlurCount((prevCount) => prevCount + 1);
      toast({
        title: "Focus Lost",
        description: "Please return to the interview window.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    };

    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [toast]);

  const isMediaRecorderSupported = () => {
    return typeof MediaRecorder !== 'undefined' || typeof RecordRTC !== 'undefined';
  };

  useEffect(() => {
    // Only request permissions once
    if (!cameraPermissionCalledRef.current) {
      cameraPermissionCalledRef.current = true;
      requestPermissions();
    }
  }, []);

  // Add helper function to create MediaStream from tracks
  const createMediaStreamFromTracks = (videoTrack, audioTrack) => {
    const tracks = [];
    if (videoTrack) tracks.push(videoTrack);
    if (audioTrack) tracks.push(audioTrack);
    return new MediaStream(tracks);
  };

  // Update initializeMediaStream function
  const initializeMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          frameRate: { ideal: 30 }
        },
        audio: audioOn ? {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } : false
      });

      // Create new MediaStream from tracks
      const videoTrack = mediaStream.getVideoTracks()[0];
      const audioTrack = audioOn ? mediaStream.getAudioTracks()[0] : null;
      const newStream = createMediaStreamFromTracks(videoTrack, audioTrack);
      
      setStream(newStream);
      if (liveVideoFeed.current) {
        liveVideoFeed.current.srcObject = newStream;
      }

      setPermissionStatus({
        camera: true,
        microphone: audioOn ? true : false
      });

      return newStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Media Access Error",
        description: "Unable to access camera/microphone. Please check permissions.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
      throw error;
    }
  };

  // Update the requestPermissions function
  const requestPermissions = async () => {
    try {
      const [cameraStatus, micStatus] = await Promise.all([
        navigator.permissions.query({ name: 'camera' }),
        navigator.permissions.query({ name: 'microphone' })
      ]);

      if (cameraStatus.state === 'denied' || micStatus.state === 'denied') {
        toast({
          title: "Permission Required",
          description: "Please enable camera and microphone access in your browser settings.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Initialize media stream after permissions are granted
      await initializeMediaStream();
      
    } catch (error) {
      console.error("Error requesting permissions:", error);
      toast({
        title: "Permission Error",
        description: "Failed to request media permissions.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  // Update startRecording function with a guard clause
  const startRecording = async () => {
    // Guard clause to prevent multiple recordings
    if (mediaRecorder.current?.state === "recording") {
      console.log('Recording already in progress');
      return;
    }

    try {
      let mediaStream = stream;
      if (!mediaStream) {
        mediaStream = await initializeMediaStream();
      }

      // Verify we have a valid MediaStream with tracks
      if (!mediaStream || !mediaStream.getTracks().length) {
        throw new Error("No valid media stream available");
      }

      // Create RecordRTC instance with better options
      const recorder = RecordRTC(mediaStream, {
        type: 'video',
        mimeType: mimeType,
        videoBitsPerSecond: 2500000,
        audioBitsPerSecond: audioOn ? 128000 : undefined,
        frameInterval: 20,
        quality: 10,
        disableLogs: false,
        timeSlice: 1000,
        ondataavailable: (blob) => {
          console.log('Data available:', blob.size);
        },
        onStateChanged: (state) => {
          console.log('Recorder state:', state);
        }
      });

      mediaRecorder.current = recorder;
      recorder.startRecording();
      
      setRecordingStatus("recording");
      setRecordingTime(0);
      
      // Start recording timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Error",
        description: `Failed to start recording: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  // Add cleanup function
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const stopRecording = () => {
    if (mediaRecorder.current && recordingStatus === "recording") {
      mediaRecorder.current.stopRecording(() => {
        try {
          const blob = mediaRecorder.current.getBlob();
          if (!blob) {
            throw new Error("No video data available");
          }
          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoBlob(blob);
          setRecordedVideoURL(videoUrl);
          setVideoBlobs((prevBlobs) => [...prevBlobs, blob]);
          extractAudio(blob);
        } catch (error) {
          console.error("Error stopping recording:", error);
          toast({
            title: "Recording Error",
            description: "Failed to stop recording. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true
          });
        }
      });
      setRecordingStatus("inactive");
      clearInterval(timerRef.current);
    }
  };
  

  const extractAudio = async (videoBlob) => {
    if (!videoBlob) {
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
  
      await ffmpeg.writeFile("input.webm", await fetchFile(videoBlob));
  
      await ffmpeg.exec([
        "-i", "input.webm",
        "-vn",
        "-acodec", "libmp3lame",
        "-q:a", "2",
        "output.mp3",
      ]);
  
      const data = await ffmpeg.readFile("output.mp3");
      const audioBlob = new Blob([data.buffer], { type: "audio/mp3" });
  
      setAudioBlobs([audioBlob]);
      await handleSubmit(audioBlob);
  
      await ffmpeg.deleteFile("input.webm");
      await ffmpeg.deleteFile("output.mp3");
  
      toast({
        title: "Audio Extracted and Cleaned Up",
        description: "Audio extracted and memory cleared.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("audio_file", new File([audioBlob], "audio.mp3", { type: "audio/mp3" }));

    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://api.fintervue.com/dgProcessAudio",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (data?.result) {
          setTranscriptions(prev => {
            const newTranscriptions = [...prev];
            newTranscriptions[questionNo] = data.result;
            return newTranscriptions;
          });

          toast({
            title: "Transcription Completed",
            description: "Your response has been transcribed.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          setIsSubmitted(true);
          setCurrentAction(questionNo + 1 < questions.length ? "next" : "finish");
          break;
        } else {
          throw new Error("Invalid transcription response");
        }
      } catch (error) {
        retries++;

        if (retries === maxRetries) {
          toast({
            title: "Transcription Error",
            description: "Failed to transcribe your response after multiple attempts.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }finally {
        setLoading(false);
      }
    }
    setIsSubmitting(false);
  };

  // Add new function to send analysis data
  const sendAnalysisData = async (isFinal = false) => {
    try {
      const currentQuestion = questions[questionNo];
      if (!currentQuestion || !transcriptions[questionNo]) return;

      const analysisData = {
        questions: [{
          questionId: currentQuestion.id,
          questionText: currentQuestion.questionText,
          transcription: transcriptions[questionNo],
          answer: transcriptions[questionNo].map(t => t.Text).join(' ')
        }],
        ai_analysis_id: selectedDomain, // Or however you're tracking the interview session
        tabChangeCount: tabChangeCount.toString(),
        windowBlurCount: windowBlurCount.toString(),
        isFinal
      };

      const response = await axios.post('/api/ai-analysis', analysisData);
      
      if (!response.data) {
        throw new Error('Failed to save analysis data');
      }

      toast({
        title: "Analysis Saved",
        description: isFinal ? "Final analysis submitted successfully" : "Question analysis saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Error",
        description: "Failed to save analysis data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Update nextQuestion function
  const nextQuestion = async () => {
    // Send analysis data for current question before moving to next
    await sendAnalysisData(false);
    
    setRecordedVideoBlob(null);
    setRecordedVideoURL(null);
    setQuestionNo((prev) => prev + 1);
    setCurrentAction("record");
    setIsSubmitted(false);
    setIsQuestionAnswered(false);
    hasSpokenRef.current = false;
    
    if (recordingStatus === "recording") {
      stopRecording();
    }
  };

  // Update or add submitFinalAnswers function
  const submitFinalAnswers = async () => {
    try {
      await sendAnalysisData(true);
      
      // Navigate to results or thank you page
      navigate("/interview-complete");
    } catch (error) {
      console.error('Error submitting final answers:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit final answers. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleQuestionAnswered = () => {
    setIsQuestionAnswered(true);
  };

  // Update the speak function to prevent duplicate TTS
  const speak = (text) => {
    // Guard clause to prevent duplicate TTS
    if (ttsInProgressRef.current) {
      console.log('TTS already in progress');
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set flag when TTS starts
    ttsInProgressRef.current = true;
    
    utterance.onend = () => {
      // Reset flag when TTS ends
      ttsInProgressRef.current = false;
      if (recordingStatus !== "recording") {
        startRecording();
      }
    };

    utterance.onerror = () => {
      // Reset flag if TTS errors
      ttsInProgressRef.current = false;
    };

    synth.speak(utterance);
  };

  useEffect(() => {
    hasSpokenRef.current = false; // Reset the spoken ref on question change
  }, [questionNo]);
  
  // Update the useEffect for question speaking
  useEffect(() => {
    if (
      questions[questionNo]?.questionText && 
      !hasSpokenRef.current && 
      selectedDomain &&
      recordingStatus !== "recording" &&
      !ttsInProgressRef.current // Add check for TTS in progress
    ) {
      const synth = window.speechSynthesis;
      if (!synth) {
        console.error("Speech synthesis not supported in this browser");
        startRecording();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(questions[questionNo].questionText);
      
      // Set flag when TTS starts
      ttsInProgressRef.current = true;

      utterance.onend = () => {
        // Reset flag when TTS ends
        ttsInProgressRef.current = false;
        if (recordingStatus !== "recording") {
          startRecording();
        }
      };

      utterance.onerror = () => {
        // Reset flag if TTS errors
        ttsInProgressRef.current = false;
      };

      if (!audioOn) {
        startRecording();
      } else {
        synth.speak(utterance);
      }

      hasSpokenRef.current = true;
    }
  }, [questions, questionNo, selectedDomain, audioOn, recordingStatus]);
  
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

  // Add function to handle transcription with debouncing and duplicate prevention
  const handleTranscription = async (audioBlob) => {
    // Prevent duplicate transcriptions within 2 seconds
    const now = Date.now();
    if (lastTranscriptionTimeRef.current && 
        now - lastTranscriptionTimeRef.current < 2000) {
      console.log('Preventing duplicate transcription');
      return;
    }

    // Clear any pending debounced transcription
    if (transcriptionDebounceRef.current) {
      clearTimeout(transcriptionDebounceRef.current);
    }

    // Set debounce timeout
    transcriptionDebounceRef.current = setTimeout(async () => {
      if (transcriptionInProgressRef.current) {
        console.log('Transcription already in progress');
        return;
      }

      try {
        transcriptionInProgressRef.current = true;
        lastTranscriptionTimeRef.current = now;

        // Your existing transcription logic here
        const formData = new FormData();
        formData.append("audio", audioBlob);
        
        const response = await axios.post("/api/transcribe", formData);
        
        // Update transcriptions state only if response contains new text
        if (response.data?.length > 0) {
          setTranscriptions(prev => {
            const updated = [...prev];
            updated[questionNo] = response.data;
            return updated;
          });
        }

      } catch (error) {
        console.error('Transcription error:', error);
        toast({
          title: "Error",
          description: "Failed to transcribe audio",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        transcriptionInProgressRef.current = false;
      }
    }, 500); // 500ms debounce delay
  };

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
      style={{ backgroundColor: "blue.700" }} 
    >
      {!selectedDomain ? (
        <MotionBox
          className="flex flex-col items-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="3xl" fontWeight="bold" mb={8} color="blue.700">
            Select a Domain
          </Text>
          <SearchBox
            value={searchDomainValue}
            setValue={setSearchDomainValue}
            className="max-w-md mb-8 px-4 py-2"
            borderRadius="md"
            borderColor="blue.700"
            placeholder="Search domains..."
            _focus={{ borderColor: "blue.700", boxShadow: "0 0 0 2px blue.300" }}
          />
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)", // 1 column on mobile
              sm: "repeat(2, 1fr)", // 2 columns on small screens
              md: "repeat(3, 1fr)", // 3 columns on medium screens
              lg: "repeat(4, 1fr)", // 4 columns on larger screens
            }}
            gap={8} 
            maxW="800px"
            width="100%"
          >
            {filteredDomains.map((domain, index) => (
              <GridItem key={`domain-${index}`}>
                <MotionBox
                  whileHover={{ scale: 1.05, boxShadow: "lg" }}
                  whileTap={{ scale: 0.95 }}
                   transition="0.3s ease"
                >
                  <Card
                    cursor="pointer"
                    onClick={() => {
                      if (permissionStatus.camera && permissionStatus.microphone) {
                        setSelectedDomain(domain.name);
                        getCameraPermission();
                      }
                    }}
                    _hover={{
                      borderColor: "blue.700",
                      borderWidth: "2px",
                      backgroundColor: "blue.50",
                      transition: "background-color 0.3s ease",
                    }}
                    transition="border-color 0.3s, background-color 0.3s ease"
                    borderWidth="1px"
                    borderColor="gray.300"
                    borderRadius="lg"
                    overflow="hidden"
                    height="100%"
                  >
                    <CardBody>
                      <Flex direction="column" align="start">
                        <Text fontSize="xl" fontWeight="semibold" mb={1} color="blue.700">
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
                if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
                }
                navigate("/"); 
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
                isDisabled={
                  (questionNo === 0 && recordingStatus === "recording") || // Disable while recording the first question
                  (questionNo > 0 && (!isQuestionAnswered || recordingStatus === "recording")) // Disable for subsequent questions until answered
                }
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

          {/* Transcription loading below the recorded video */}
        {isSubmitting ? (
          <Flex justify="center" align="center" mt={4}>
            <Spinner size="lg" color="teal.500" />
            <Text mt={4}>Transcribing...</Text>
          </Flex>
        ) : (
          transcriptions[questionNo]?.length > 0 && (
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
                      <strong className={`text-purple-${(index + 1) % 2 === 0 ? "400" : "500"}`}>
                        {index + 1}.
                      </strong>{" "}
                      {item.Text}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )
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
          <Flex justify="center">
            <video
              ref={liveVideoFeed}
              autoPlay
              muted
              className="w-full max-w-full rounded-md shadow-lg"
              style={{ height: "550px", border: "2px solid #E2E8F0" }}
            ></video>
          </Flex>
        </Box>
      </MotionBox>
    )}
  </MotionBox>
);
};

export default Interview;
