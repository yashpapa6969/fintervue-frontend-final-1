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
  Badge,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RecordRTC from "recordrtc";
import Loading from "../Loading";
import SearchBox from "../common/SearchBox";

const mimeType = "video/webm";
const MotionBox = motion(Box);

const Interview = ({ audioOn }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [allDomains] = useState([
    { name: "finance", description: "Finance Engineer" },
    { name: "SAP", description: "SAP Developer" },
  ]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [searchDomainValue, setSearchDomainValue] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionNo, setQuestionNo] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [recordedVideos, setRecordedVideos] = useState([]); // Store all videos
  const [loaded, setLoaded] = useState(false);
  const hasSpokenRef = useRef(false);
  const ffmpegRef = useRef(new FFmpeg());
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const liveVideoFeed = useRef(null);
  const [stream, setStream] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0); // For recording time display
  const timerRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false); // Spinner state for loading questions
  const [loadingSubmission, setLoadingSubmission] = useState(false); // Spinner state for final answer submission
  const [loadingTranscription, setLoadingTranscription] = useState(false); 

  // Load FFmpeg for audio processing
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

  const isMediaRecorderSupported = () => {
    return "MediaRecorder" in window || RecordRTC;
  };

  const filteredDomains = useMemo(() => {
    return allDomains.filter((domain) =>
      domain.name.toLowerCase().includes(searchDomainValue.toLowerCase())
    );
  }, [allDomains, searchDomainValue]);

  const getQuestionsByDomain = async (domainName) => {
    try {
      setLoadingQuestions(true);
      const encodedDomain = encodeURIComponent(domainName);
      const response = await axios.get(
        `https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/getAIQuestionByDomain/${encodedDomain}`
      );

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
    } finally {
      setLoadingQuestions(false); // Stop loading spinner once questions are fetched
    }
  };

  const submitFinalAnswers = async () => {
    setLoadingSubmission(true); // Start loading spinner for submission
    const data = {
      questions: questions.map((question, index) => ({
        questionText: question.questionText,
        transcription: transcriptions[index],
      })),
    };

    try {
      const response = await axios.post(
        "https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/addAiAnalysis",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        const { ai_analysis_id } = response.data;
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
    } finally {
      setLoadingSubmission(false); // Stop loading spinner after submission
    }
  };


  useEffect(() => {
    getCameraPermission();
}, []);

const getCameraPermission = async () => {
    try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
            audio: true,
        });
        setStream(videoStream);
        if (liveVideoFeed.current) {
            liveVideoFeed.current.srcObject = videoStream;
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

  const speakQuestion = (questionText) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(questionText);
    synth.speak(utterance);
  };
  
 

  const startRecording = async () => {
    if (!isMediaRecorderSupported() || !stream) {
        toast({
            title: "Unsupported",
            description: "MediaRecorder not supported in this browser. Using fallback.",
            status: "warning",
            duration: 3000,
            isClosable: true,
        });

        // Using the fallback option (RecordRTC) if MediaRecorder is not supported
        const recorder = new RecordRTC(stream, { type: 'video' });
        mediaRecorder.current = recorder;
        recorder.startRecording();
        setRecordingStatus("recording");

        // Proper placement for the stopRecording callback
        recorder.onstop = async () => {
            const blob = recorder.getBlob();
            saveVideoBlob(blob);
            await extractAudioTranscription(blob); // Auto transcription after video recording
        };
    } else {
        try {
            // Check if stream is available
            if (!stream) {
                throw new Error("No video/audio stream available. Please check your camera and microphone permissions.");
            }

            const media = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            mediaRecorder.current = media;
            setRecordingStatus("recording");
            media.start();

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

            media.onstop = async () => {
                clearInterval(timerRef.current);
                const videoBlob = new Blob(localVideoChunks, { type: 'video/webm' });
                saveVideoBlob(videoBlob);
                await extractAudioTranscription(videoBlob); // Auto transcription after video recording
            };
        } catch (error) {
            console.error("Error starting recording:", error);
            toast({
                title: "Recording Error",
                description: "Failed to start recording. Please ensure permissions are granted and your browser supports recording.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
};



  const saveVideoBlob = (videoBlob) => {
    const videoUrl = URL.createObjectURL(videoBlob);
    setRecordedVideos((prev) => {
      const updatedVideos = [...prev];
      updatedVideos[questionNo] = { blob: videoBlob, url: videoUrl };
      return updatedVideos;
    });
    setRecordingStatus("inactive");
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recordingStatus === "recording") {
      if (mediaRecorder.current instanceof MediaRecorder) {
        mediaRecorder.current.stop();
      } else if (mediaRecorder.current instanceof RecordRTC) {
        mediaRecorder.current.stopRecording(() => {
          const videoBlob = mediaRecorder.current.getBlob();
          saveVideoBlob(videoBlob);
          extractAudioTranscription(videoBlob); // Auto transcription after video recording
        });
      }
    }
  };

  const extractAudioTranscription = async (videoBlob) => {
    try {
      setLoadingTranscription(true); // Start loading spinner for transcription
  
      // Initialize SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({
          title: "Unsupported Browser",
          description: "Speech recognition is not supported in this browser.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscriptions((prev) => {
          const updatedTranscriptions = [...prev];
          updatedTranscriptions[questionNo] = transcript;
          return updatedTranscriptions;
        });
  
        toast({
          title: "Transcription Success",
          description: "Your video has been transcribed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };
  
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        toast({
          title: "Transcription Error",
          description: "Failed to transcribe the audio.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      };
  
      // Convert videoBlob to array buffer for SpeechRecognition to process
      const arrayBuffer = await videoBlob.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
      // Start the speech recognition without playing the audio
      recognition.start();
  
      // Stop the recognition after the duration of the audio
      setTimeout(() => {
        recognition.stop();
      }, audioBuffer.duration * 1000); // Use audio duration to stop recognition
    } catch (error) {
      console.error("Error during transcription:", error);
      toast({
        title: "Transcription Error",
        description: "Failed to transcribe the audio.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingTranscription(false); // Stop loading spinner after transcription
    }
  };  
  

  const nextQuestion = () => {
    setQuestionNo((prev) => prev + 1);
    hasSpokenRef.current = false;
  };

  useEffect(() => {
    if (questions[questionNo]?.questionText && !hasSpokenRef.current) {
      speakQuestion(questions[questionNo].questionText);
      
      // Delay starting the recording to allow the question to be read aloud
      const delayTimer = setTimeout(() => {
        startRecording(); 
        hasSpokenRef.current = true;
      }, 2000); // 2-second delay after the question is read
  
      // Clean up the timeout on component unmount or when questionNo changes
      return () => clearTimeout(delayTimer);
    }
  }, [questions, questionNo]);

  const canMoveToNextQuestion = !!recordedVideos[questionNo]?.url;

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
          {/* Heading with blue.700 */}
          <Text fontSize="3xl" fontWeight="bold" mb={8} color="blue.700">
            Select a Domain
          </Text>

          {/* Search Bar with updated styling */}
          <SearchBox
            value={searchDomainValue}
            setValue={setSearchDomainValue}
            className="max-w-md mb-8 px-4 py-2"
            borderRadius="md"
            borderColor="blue.700"
            placeholder="Search domains..."
            _focus={{ borderColor: "blue.700", boxShadow: "0 0 0 2px blue.300" }}
          />

          {/* Updated Grid for domain cards with better spacing */}
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={8}
            maxW="800px"
            width="100%"
          >
            {filteredDomains.map((domain, index) => (
              <GridItem key={`domain-${index}`}>
                <MotionBox
                  whileHover={{ scale: 1.05, boxShadow: "xl" }}
                  whileTap={{ scale: 0.95 }}
                  transition="0.3s ease"
                >
                  <Card
                    cursor="pointer"
                    onClick={() => {
                      setSelectedDomain(domain.name);
                      getQuestionsByDomain(domain.name);
                      getCameraPermission();
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
                        {/* Domain name and description with blue.700 styling */}
                        <Text fontSize="xl" fontWeight="semibold" mb={1} color="blue.700">
                          {domain.name}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                          {domain.description}
                        </Text>
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
          className="p-6 rounded-xl w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Exit Button at the top right */}
          <Flex justify="flex-end" mb={4}>
            <Button
              colorScheme="red"
              onClick={() => {
                if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
                }
                setSelectedDomain("");
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

          {/* Live Video Feed */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Live Video Feed
            </Text>
            <Flex justify="center">
              <video
                ref={liveVideoFeed}
                autoPlay
                muted
                className="w-full max-w-full rounded-md shadow-lg"
                style={{ height: "500px", border: "2px solid #E2E8F0" }}
              ></video>
            </Flex>
            {recordingStatus === "recording" && (
              <Text fontSize="md" color="red.500" mt={2} textAlign="center">
                Recording... {Math.floor(recordingTime / 60)}m {recordingTime % 60}s
              </Text>
            )}
          </Box>

          {/* Next Question Button Below Live Feed */}
          <Flex justify="center" mb={6} gap={4}>
            {questions.length === questionNo + 1 ? (
              <Button colorScheme="purple" onClick={submitFinalAnswers}>
                Submit Final Answers
              </Button>
            ) : (
              <>
                <Button
                  colorScheme="red"
                  onClick={stopRecording}
                  isDisabled={recordingStatus !== "recording"}
                >
                  Stop Recording
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={nextQuestion}
                  isDisabled={!canMoveToNextQuestion}
                >
                  Next Question
                </Button>
              </>
            )}
          </Flex>

          {/* Recorded Videos Section */}
            <Box mt={6}>
              <Heading size="lg" mb={4}>
                Recorded Videos
              </Heading>
              {recordedVideos.map((video, index) => (
                <Box key={index} mb={6}>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    Question {index + 1}: {questions[index]?.questionText}
                  </Text>
                  <Flex direction="column" align="center" mb={4}>
                    {/* Video Player */}
                    <video
                      src={video.url}
                      controls
                      className="w-full max-w-md rounded-md shadow-lg"
                      style={{ border: "2px solid #E2E8F0" }}
                    />
                    
                    {/* Transcription Text */}
                    <Text mt={2} color="gray.600" fontSize="sm">
                      {transcriptions[index]
                        ? `Transcription: ${transcriptions[index]}`
                        : "Interview."}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Box>

        </MotionBox>
      )}
    </MotionBox>
  );
};

export default Interview;
