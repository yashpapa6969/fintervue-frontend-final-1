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
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
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
import config from '../../config';
import { v4 as uuidv4 } from 'uuid';


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

  const [isModalOpen, setIsModalOpen] = useState(true);

  const onCloseModal = () => {
    setIsModalOpen(false);
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

  // Update stopRecording function
  const stopRecording = async () => {
    if (!mediaRecorder.current || mediaRecorder.current.state !== "recording") {
      console.log('No active recording');
      return;
    }

    try {
      setRecordingStatus("inactive");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Set loading state
      setLoading(true);

      // Stop the recording and get the blob
      const recordedBlob = await new Promise((resolve) => {
        mediaRecorder.current.stopRecording(() => {
          const blob = mediaRecorder.current.getBlob();
          setRecordedVideoBlob(blob);
          setRecordedVideoURL(URL.createObjectURL(blob));
          setIsQuestionAnswered(true);
          resolve(blob);
        });
      });

      // Upload to S3
      try {
        await uploadToS3(recordedBlob, questionNo);

        // If it's the last question, navigate to analysis
        if (questionNo === questions.length - 1) {
          navigate("/analysis");
        } else {
          nextQuestion();
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload recording. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error("Error stopping recording:", error);
      toast({
        title: "Recording Error",
        description: "Failed to stop recording.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Update uploadToS3 function to use addOrUpdateAiAnalysisWithId
  const uploadToS3 = async (blob, questionNumber) => {
    try {
      setLoading(true);

      // Create unique filename using UUID
      const filename = `${uuidv4()}-q${questionNumber}.webm`;
      
      // Create FormData and properly append the audio blob
      const formData = new FormData();
      
      // Ensure blob is properly formatted with correct MIME type
      const audioBlob = new Blob([blob], { type: 'audio/webm;codecs=opus' });
      formData.append('audio', audioBlob, filename);
      
      // Add required metadata
      formData.append('ai_analysis_id', localStorage.getItem('ai_analysis_id'));
      formData.append('questionIndex', questionNumber);
      formData.append('domain', selectedDomain);
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('tabChangeCount', tabChangeCount.toString());
      formData.append('windowBlurCount', windowBlurCount.toString());
      
      // Add question data
      const fileData = [{
        question: questions[questionNumber].questionText,
        questionId: questions[questionNumber].id,
      }];
      formData.append('fileData', JSON.stringify(fileData));

      // Upload to S3 via API
      const response = await axios.post(
        `${config.uploadBaseUrl}/api/interviewee/addOrUpdateAiAnalysisWithId`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`);
          }
        }
      );

      // Check for successful response with proper data structure
      if (!response.data) {
        throw new Error('Upload failed - invalid response format');
      }
      const updated_analysis = response.data; // Assuming the response contains the updated analysis
      const jsonResponse = {
          "matched_count": updated_analysis.matched_count,
          "modified_count": updated_analysis.modified_count,
          "message": "Analysis updated successfully."
      };
      // Get the audio URL from the response
      if (!jsonResponse) {
        throw new Error('Upload failed - no audio URL returned');
      }

      // Show success messagex
      toast({
        title: "Upload Successful",
        description: "Your answer has been recorded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      return jsonResponse;

    } catch (error) {
      console.error('Error uploading to S3:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload audio recording. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setLoading(false);
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
          `${config.mlBaseUrl}/dgProcessAudio`,
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
      } finally {
        setLoading(false);
      }
    }
    setIsSubmitting(false);
  };

  // Update nextQuestion function to remove separate analysis call
  const nextQuestion = () => {
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

  if (!loaded) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
    {isModalOpen && (
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interview Guidelines</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>1. Look into the screen throughout the interview, casual looking away is ok but doing so continuously will be flagged.</p>
            <p>2. Please refrain from using unfair advantage during the interview, opening another tab or window will be flagged and may result in rejection.</p>
            <p>3. The question once prompted by the AI will also appear on the screen, refrain from engaging in a dialogue with the AI.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
              I Understand
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )}
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
                isDisabled={loading || recordingStatus === "recording"}
              >
                Start Recording
              </Button>
              <Button
                onClick={stopRecording}
                colorScheme="red"
                isDisabled={loading || recordingStatus !== "recording"}
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
              {loading && (
                <>
                  <Spinner size="sm" color="blue.500" />
                  <Text color="blue.500">Processing recording...</Text>
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
            audioBlobs[questionNo] ? (
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Audio
                </Text>
                <Box maxH="200px" overflowY="auto" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                  {audioBlobs[questionNo]}
                </Box>
              </Box>
            ) : null
          )}
      

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
  </>
  );
};

export default Interview;
