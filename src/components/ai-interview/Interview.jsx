import { Button, Card, CardBody, useToast } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import SearchBox from "../common/SearchBox";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { useNavigate } from "react-router-dom";
const mimeType = "video/webm";

const Interview = ({ audioOn }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [allDomains, setAllDomains] = useState([
    { name: "App Developer", description: "App Development Engineer" },
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
  const [permission, setPermission] = useState(false);
  const cameraPermissionCalledRef = useRef(false);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
      });
      setLoaded(true);
    };
    loadFFmpeg();
    getTextFromAPI();
    // Removed getCameraPermission();
  }, []);

  const submitFinalAnswers = async () => {
    const formData = new FormData();

    audioBlobs.forEach((audioBlob, index) => {
      formData.append(
        "audio",
        new File([audioBlob], `audio_${index}.mp3`, { type: "audio/mp3" })
      );
    });

    videoBlobs.forEach((videoBlob, index) => {
      formData.append(
        "video",
        new File([videoBlob], `video_${index}.mp4`, { type: "video/mp4" })
      );
    });

    questions.forEach((question, index) => {
      formData.append(`question_${index}`, question.questionText);
      formData.append(`transcription_${index}`, JSON.stringify(transcriptions[index]));
    });

    try {
      const response = await axios.post(
        "https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/addAiAnalysis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const { ai_analysis_id } = response.data; // Assuming the response contains the analysis_id
        localStorage.setItem('ai_analysis_id', ai_analysis_id);
        await toast({
          title: "Analysis submitted successfully",
          status: "success",
          duration: 3000,
        });
        await navigate("/analysis");
      }
    } catch (error) {
      console.error("Error submitting analysis:", error);
    }
  };

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

      setStream(combinedStream); // Set combined stream

      // Set video feed for live video
      if (liveVideoFeed.current) {
        liveVideoFeed.current.srcObject = videoStream;
      } else {
        console.error('liveVideoFeed.current is null');
      }

      setPermission(true);

      // Automatically start recording
      startRecording(combinedStream);
    } catch (err) {
      alert("Camera and microphone permission denied: " + err.message);
    }
  };

  const startRecording = async (combinedStream) => {
    if ("MediaRecorder" in window && combinedStream) {
      const media = new MediaRecorder(combinedStream, { mimeType });
      mediaRecorder.current = media;
      setRecordingStatus("recording");
      mediaRecorder.current.start();

      let localVideoChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          localVideoChunks.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const videoBlob = new Blob(localVideoChunks, { type: mimeType });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideoBlob(videoBlob);
        setRecordedVideoURL(videoUrl);
        setVideoBlobs((prevBlobs) => [...prevBlobs, videoBlob]);
        saveVideoBlobToLocalStorage(videoBlob);
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recordingStatus === "recording") {
      setRecordingStatus("inactive");
      mediaRecorder.current.stop();
    }
  };

  const extractAudio = async () => {
    if (!recordedVideoBlob) {
      toast({
        title: "No video recorded",
        description: "Please record a video before extracting audio",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile('input.mp4', await fetchFile(recordedVideoBlob));
    await ffmpeg.exec(['-i', 'input.mp4', '-vn', '-acodec', 'libmp3lame', '-q:a', '2', 'output.mp3']);
    const data = await ffmpeg.readFile('output.mp3');
    const audioBlob = new Blob([data], { type: 'audio/mp3' });
    saveAudioBlobToLocalStorage(audioBlob);
    setAudioBlobs([...audioBlobs, audioBlob]);
    await handleSubmit(audioBlob);
  };

  const handleSubmit = async (audioBlob) => {
    if (!audioBlob) {
      alert('Please record and extract audio before submitting.');
      return;
    }
    const formData = new FormData();
    formData.append("audio_file", new File([audioBlob], "audio.mp3", { type: "audio/mp3" }));

    try {
      const response = await axios.post("http://104.244.242.65:31246/processAudio", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update transcriptions array
      setTranscriptions((prevTranscriptions) => {
        const newTranscriptions = [...prevTranscriptions];
        newTranscriptions[questionNo] = response.data.result;
        return newTranscriptions;
      });

      saveTranscriptionToLocalStorage(response.data.result);
    } catch (error) {
      console.error('Error submitting audio file:', error);
    }
  };

  const saveAudioBlobToLocalStorage = (audioBlob) => {
    const questionKey = `audioBlob_question_${questionNo}`;
    localStorage.setItem(questionKey, URL.createObjectURL(audioBlob));
  };

  const saveVideoBlobToLocalStorage = (videoBlob) => {
    const videoKey = `videoBlob_question_${questionNo}`;
    const videoURL = URL.createObjectURL(videoBlob);
    localStorage.setItem(videoKey, videoURL);
  };

  const saveTranscriptionToLocalStorage = (transcription) => {
    const transcriptionKey = `transcription_question_${questionNo}`;
    localStorage.setItem(transcriptionKey, JSON.stringify(transcription));
  };

  const nextQuestion = () => {
    setRecordedVideoBlob(null);
    setRecordedVideoURL(null);
    // No need to reset transcription
    setQuestionNo((prev) => prev + 1);
  };

  const getTextFromAPI = async () => {
    try {
      const response = await axios.get("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/Interviewee/getAllAIQuestion");
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      console.log("AI finished speaking. Start recording now.");
      startRecording(stream);
    };
    synth.speak(utterance);
  };

  useEffect(() => {
    hasSpokenRef.current = false;
  }, [questionNo]);

  useEffect(() => {
    if (questions[questionNo]?.questionText && !hasSpokenRef.current && selectedDomain) {
      speak(questions[questionNo].questionText);
      hasSpokenRef.current = true;
    }
  }, [questions, questionNo, selectedDomain]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth && !audioOn) synth.pause();
    else if (synth) synth.resume();
  }, [audioOn]);

  if (!loaded) console.log("Browser error: FFmpeg not loaded");
  if (questions.length === 0) return <Loading />;

  return (
    <div className="w-full min-h-[calc(100vh-60px)] mt-10 transition-all">
      {!selectedDomain || selectedDomain === "" ? (
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-8">Select a Domain</h3>
          <SearchBox value={searchDomainValue} setValue={setSearchDomainValue} className="max-w-[600px] mb-4" />
          <div className="grid grid-cols-3 max-w-[600px] gap-5">
            {searchDomainValue
              ? allDomains
                  .filter(domain => domain.name.toLowerCase().includes(searchDomainValue.toLowerCase()))
                  .map((domain, index) => (
                    <Card key={`domain-${index}`} className="h-auto cursor-pointer hover:border-2 hover:border-blue-400" onClick={() => setSelectedDomain(domain.name)}>
                      <CardBody>
                        <h3 className="text-lg font-semibold">{domain.name}</h3>
                        <p className="font-md">{domain.description}</p>
                      </CardBody>
                    </Card>
                  ))
              : allDomains.map((domain, index) => (
                  <Card key={`domain-${index}`} className="h-auto cursor-pointer hover:border-2 hover-border-blue-400" onClick={() => setSelectedDomain(domain.name)}>
                    <CardBody>
                      <h3 className="text-lg font-semibold">{domain.name}</h3>
                      <p className="font-md">{domain.description}</p>
                    </CardBody>
                  </Card>
                ))}
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 rounded-xl w-full">
            <p className="text-xl">{questions[questionNo]?.questionText || <Loading />}</p>
            <br />
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Button onClick={stopRecording}>Stop Recording</Button>
              </div>
              <Button onClick={extractAudio} colorScheme="purple">Submit <ChevronRight size={20} /></Button>
            </div>
            {questions.length >= questionNo + 1 && transcriptions[questionNo]?.length > 0 && (
              <div className="flex flex-col gap-2 items-end mt-2">
                {questions.length === questionNo + 1 && transcriptions[questionNo].length > 0 && (
                  <Button onClick={submitFinalAnswers} colorScheme="purple">Submit Final Answers</Button>
                )}
                {questions.length > questionNo + 1 && transcriptions[questionNo].length > 0 && (
                  <Button onClick={nextQuestion}>Next Question</Button>
                )}
              </div>
            )}
          </div>
          {recordedVideoURL && (
            <div className="mt-4 flex flex-col items-center">
              <h4 className="text-lg font-semibold">Recorded Video</h4>
              <video src={recordedVideoURL} controls className="w-full max-w-md"></video>
            </div>
          )}
          {transcriptions[questionNo]?.length > 0 && (
            <div className="mt-4 w-full max-w-md">
              <h4 className="text-lg font-semibold">Transcription</h4>
              <ul>
                {transcriptions[questionNo].map((item, index) => (
                  <li key={index} className="mt-1">
                    <p className="font-semibold text-sm text-purple-600">Start: {item.Start}, End: {item.End}</p>
                    <strong className={`${(index + 1) % 2 === 0 ? "text-purple-400" : "text-purple-500"}`}>{item.Speaker}:</strong> {item.Text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className="relative h-full flex flex-col items-center justify-center">
        <video
          ref={(ref) => {
            if (ref && !cameraPermissionCalledRef.current) {
              liveVideoFeed.current = ref;
              getCameraPermission();
              cameraPermissionCalledRef.current = true;
            }
          }}
          autoPlay
          style={{ height: "100%" }}
        ></video>
      </div>
    </div>
  );
};

export default Interview;
